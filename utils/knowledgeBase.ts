import portfolioData from '@/data/portfolio.json'

interface KnowledgeEntry {
  id: string
  content: string
  category: string
  keywords: string[]
  relevanceScore?: number
}

class PortfolioKnowledgeBase {
  private knowledge: KnowledgeEntry[] = []

  constructor() {
    this.buildKnowledgeBase()
  }

  private buildKnowledgeBase() {
    const { personal, skills, projects, about } = portfolioData

    // Personal information
    this.knowledge.push({
      id: 'personal-info',
      content: `${personal.name} is a ${personal.title} based in ${personal.location}. ${about.description}`,
      category: 'personal',
      keywords: ['name', 'title', 'location', 'about', 'developer', 'full stack']
    })

    // Skills knowledge
    Object.entries(skills).forEach(([category, skillList]) => {
      this.knowledge.push({
        id: `skills-${category}`,
        content: `${category.replace('_', ' ').toUpperCase()}: ${skillList.join(', ')}`,
        category: 'skills',
        keywords: [...skillList.map(s => s.toLowerCase()), category]
      })
    })

    // Project knowledge
    projects.forEach(project => {
      this.knowledge.push({
        id: `project-${project.id}`,
        content: `${project.title}: ${project.description}. Impact: ${project.impact}. Technologies: ${project.tech.join(', ')}.`,
        category: 'projects',
        keywords: [...project.tech.map(t => t.toLowerCase()), project.title.toLowerCase(), 'project', 'demo']
      })
    })

    // Contact information
    this.knowledge.push({
      id: 'contact-info',
      content: `Contact ${personal.name}: Email: ${personal.email}, Phone: ${personal.phone}, LinkedIn: ${personal.linkedin}, GitHub: ${personal.github}`,
      category: 'contact',
      keywords: ['contact', 'email', 'phone', 'linkedin', 'github', 'reach', 'connect']
    })
  }

  searchKnowledge(query: string, limit: number = 3): KnowledgeEntry[] {
    const queryWords = query.toLowerCase().split(' ')
    
    // Calculate relevance scores
    this.knowledge.forEach(entry => {
      let score = 0
      queryWords.forEach(word => {
        // Exact keyword match
        if (entry.keywords.some(keyword => keyword.includes(word))) {
          score += 2
        }
        // Content match
        if (entry.content.toLowerCase().includes(word)) {
          score += 1
        }
      })
      entry.relevanceScore = score
    })

    // Return top matches
    return this.knowledge
      .filter(entry => (entry.relevanceScore || 0) > 0)
      .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
      .slice(0, limit)
  }

  getContextForIntent(intent: string): string {
    const categoryMap = {
      'skills': 'skills',
      'projects': 'projects',
      'contact': 'contact',
      'experience': 'personal',
      'collaboration': 'contact',
      'technical': 'skills'
    }

    const category = categoryMap[intent] || 'personal'
    const relevantEntries = this.knowledge.filter(entry => entry.category === category)
    
    return relevantEntries.map(entry => entry.content).join('\n')
  }

  // Get smart follow-up questions based on conversation context
  generateFollowUps(currentIntent: string, previousIntents: string[]): string[] {
    const followUpMap = {
      'skills': {
        'projects': ["Which projects showcase these skills best?", "Can you show me implementations?"],
        'experience': ["How long have you been using these technologies?", "What's your expertise level?"],
        'collaboration': ["Are these the skills you'd use for my project?", "What's your rate for these technologies?"]
      },
      'projects': {
        'skills': ["What technologies were used in this project?", "How complex was the implementation?"],
        'contact': ["Can I see the source code?", "Is this project available for demo?"],
        'collaboration': ["Could you build something similar for me?", "What would a project like this cost?"]
      },
      'contact': {
        'projects': ["What's your portfolio like?", "Can you show me your best work?"],
        'skills': ["What are your strongest technical skills?", "What technologies do you specialize in?"],
        'collaboration': ["What's your availability?", "What are your rates?"]
      }
    }

    const lastIntent = previousIntents[previousIntents.length - 1]
    return followUpMap[currentIntent]?.[lastIntent] || [
      "Tell me more about this",
      "What else should I know?",
      "How can we work together?"
    ]
  }
}

export const knowledgeBase = new PortfolioKnowledgeBase()
