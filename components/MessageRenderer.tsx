import React from 'react'

interface MessageRendererProps {
  content: string
  className?: string
}

const MessageRenderer: React.FC<MessageRendererProps> = ({ content, className = '' }) => {
  // Format the message content with better styling
  const formatMessage = (text: string) => {
    // Split by double newlines for paragraphs
    const paragraphs = text.split('\n\n')
    
    return paragraphs.map((paragraph, index) => {
      // Handle bullet points
      if (paragraph.includes('*') || paragraph.includes('•')) {
        const lines = paragraph.split('\n')
        return (
          <div key={index} className="mb-3">
            {lines.map((line, lineIndex) => {
              const trimmedLine = line.trim()
              
              // Handle bullet points
              if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('• ')) {
                const bulletText = trimmedLine.substring(2)
                const [title, ...description] = bulletText.split(':')
                
                return (
                  <div key={lineIndex} className="flex items-start mb-2">
                    <span className="text-blue-400 mr-2 mt-1 text-xs">●</span>
                    <div className="flex-1">
                      {description.length > 0 ? (
                        <>
                          <span className="font-semibold text-blue-300">{title}:</span>
                          <span className="ml-1">{description.join(':')}</span>
                        </>
                      ) : (
                        <span>{title}</span>
                      )}
                    </div>
                  </div>
                )
              }
              
              // Regular line
              if (trimmedLine) {
                return (
                  <p key={lineIndex} className="mb-1">
                    {formatInlineText(trimmedLine)}
                  </p>
                )
              }
              
              return null
            })}
          </div>
        )
      }
      
      // Regular paragraph
      return (
        <p key={index} className="mb-3 leading-relaxed">
          {formatInlineText(paragraph)}
        </p>
      )
    })
  }

  // Format inline text with bold, links, etc.
  const formatInlineText = (text: string) => {
    // Handle **bold** text
    const boldRegex = /\*\*(.*?)\*\*/g
    const parts = text.split(boldRegex)
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-semibold text-white">{part}</strong>
      }
      
      // Handle links (basic URL detection)
      const urlRegex = /(https?:\/\/[^\s]+)/g
      if (urlRegex.test(part)) {
        return part.split(urlRegex).map((segment, segIndex) => {
          if (urlRegex.test(segment)) {
            return (
              <a 
                key={segIndex} 
                href={segment} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                {segment}
              </a>
            )
          }
          return segment
        })
      }
      
      return part
    })
  }

  return (
    <div className={`text-sm leading-relaxed ${className}`}>
      {formatMessage(content)}
    </div>
  )
}

export default MessageRenderer
