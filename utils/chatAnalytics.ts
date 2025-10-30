interface ChatMetrics {
  sessionId: string
  messageCount: number
  topics: string[]
  userIntent: string[]
  responseTime: number[]
  satisfaction?: number
  leadQuality?: 'high' | 'medium' | 'low'
}

class ChatAnalytics {
  private metrics = new Map<string, ChatMetrics>()

  trackSession(sessionId: string) {
    if (!this.metrics.has(sessionId)) {
      this.metrics.set(sessionId, {
        sessionId,
        messageCount: 0,
        topics: [],
        userIntent: [],
        responseTime: []
      })
    }
  }

  trackMessage(sessionId: string, intent: string, responseTime: number) {
    const session = this.metrics.get(sessionId)
    if (session) {
      session.messageCount++
      session.userIntent.push(intent)
      session.responseTime.push(responseTime)
      
      // Determine lead quality based on conversation patterns
      session.leadQuality = this.assessLeadQuality(session)
    }
  }

  private assessLeadQuality(session: ChatMetrics): 'high' | 'medium' | 'low' {
    const hasContactIntent = session.userIntent.includes('contact') || session.userIntent.includes('collaboration')
    const hasTechnicalQuestions = session.userIntent.includes('technical') || session.userIntent.includes('projects')
    const messageDepth = session.messageCount
    
    if (hasContactIntent && hasTechnicalQuestions && messageDepth >= 3) return 'high'
    if (hasContactIntent || (hasTechnicalQuestions && messageDepth >= 2)) return 'medium'
    return 'low'
  }

  getSessionInsights(sessionId: string) {
    return this.metrics.get(sessionId)
  }

  // Export for portfolio owner insights
  exportAnalytics() {
    const sessions = Array.from(this.metrics.values())
    return {
      totalSessions: sessions.length,
      highQualityLeads: sessions.filter(s => s.leadQuality === 'high').length,
      averageMessageCount: sessions.reduce((acc, s) => acc + s.messageCount, 0) / sessions.length,
      topTopics: this.getTopTopics(sessions),
      averageResponseTime: this.getAverageResponseTime(sessions)
    }
  }

  private getTopTopics(sessions: ChatMetrics[]) {
    const topicCount = new Map<string, number>()
    sessions.forEach(session => {
      session.userIntent.forEach(intent => {
        topicCount.set(intent, (topicCount.get(intent) || 0) + 1)
      })
    })
    return Array.from(topicCount.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
  }

  private getAverageResponseTime(sessions: ChatMetrics[]) {
    const allTimes = sessions.flatMap(s => s.responseTime)
    return allTimes.reduce((acc, time) => acc + time, 0) / allTimes.length
  }
}

export const chatAnalytics = new ChatAnalytics()
