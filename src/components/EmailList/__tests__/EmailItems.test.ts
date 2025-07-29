import { EmailItem, ReplyItem, emailItems } from '../EmailItems'

describe('EmailItems', () => {
  describe('Interfaces', () => {
    it('should have correct structure for EmailItem', () => {
      const email: EmailItem = {
        id: 1,
        title: "Test Email",
        from: "John Doe",
        content: "Test content",
        isRead: false,
        isSpam: false,
        isStarred: false,
        reply: [],
        date: new Date(),
        sender: "john@example.com",
        receiver: "me",
        box: "inbox",
      }

      expect(email.id).toBe(1)
      expect(email.title).toBe("Test Email")
      expect(email.from).toBe("John Doe")
      expect(email.content).toBe("Test content")
      expect(email.isRead).toBe(false)
      expect(email.isSpam).toBe(false)
      expect(email.isStarred).toBe(false)
      expect(email.reply).toEqual([])
      expect(email.date).toBeInstanceOf(Date)
      expect(email.sender).toBe("john@example.com")
      expect(email.receiver).toBe("me")
      expect(email.box).toBe("inbox")
    })

    it('should have correct structure for ReplyItem', () => {
      const reply: ReplyItem = {
        id: 1.1,
        from: "Jane Smith",
        content: "Reply content",
        sender: "jane@example.com",
        receiver: "me",
        isStarred: false,
        date: new Date(),
      }

      expect(reply.id).toBe(1.1)
      expect(reply.from).toBe("Jane Smith")
      expect(reply.content).toBe("Reply content")
      expect(reply.sender).toBe("jane@example.com")
      expect(reply.receiver).toBe("me")
      expect(reply.isStarred).toBe(false)
      expect(reply.date).toBeInstanceOf(Date)
    })
  })

  describe('Sample Data', () => {
    it('should have non-empty emailItems array', () => {
      expect(emailItems).toBeInstanceOf(Array)
      expect(emailItems.length).toBeGreaterThan(0)
    })

    it('should have valid structure for all emails', () => {
      emailItems.forEach((email) => {
        expect(email).toHaveProperty('id')
        expect(email).toHaveProperty('title')
        expect(email).toHaveProperty('from')
        expect(email).toHaveProperty('content')
        expect(email).toHaveProperty('isRead')
        expect(email).toHaveProperty('isSpam')
        expect(email).toHaveProperty('isStarred')
        expect(email).toHaveProperty('reply')
        expect(email).toHaveProperty('date')
        expect(email).toHaveProperty('sender')
        expect(email).toHaveProperty('receiver')
        expect(email).toHaveProperty('box')

        expect(typeof email.id).toBe('number')
        expect(typeof email.title).toBe('string')
        expect(typeof email.from).toBe('string')
        expect(typeof email.content).toBe('string')
        expect(typeof email.isRead).toBe('boolean')
        expect(typeof email.isSpam).toBe('boolean')
        expect(typeof email.isStarred).toBe('boolean')
        expect(Array.isArray(email.reply)).toBe(true)
        expect(email.date).toBeInstanceOf(Date)
        expect(typeof email.sender).toBe('string')
        expect(typeof email.receiver).toBe('string')
        expect(typeof email.box).toBe('string')
      })
    })

    it('should have unique IDs for all emails', () => {
      const ids = emailItems.map(email => email.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have emails with different box types', () => {
      const boxes = emailItems.map(email => email.box)
      expect(boxes).toContain('inbox')
      expect(boxes).toContain('spam')
    })

    it('should have emails with and without replies', () => {
      const emailsWithReplies = emailItems.filter(email => email.reply.length > 0)
      const emailsWithoutReplies = emailItems.filter(email => email.reply.length === 0)

      expect(emailsWithReplies.length).toBeGreaterThan(0)
      expect(emailsWithoutReplies.length).toBeGreaterThan(0)
    })

    it('should have valid structure for all replies', () => {
      emailItems.forEach(email => {
        email.reply.forEach((reply) => {
          expect(reply).toHaveProperty('id')
          expect(reply).toHaveProperty('from')
          expect(reply).toHaveProperty('content')
          expect(reply).toHaveProperty('sender')
          expect(reply).toHaveProperty('receiver')
          expect(reply).toHaveProperty('isStarred')
          expect(reply).toHaveProperty('date')

          expect(typeof reply.id).toBe('number')
          expect(typeof reply.from).toBe('string')
          expect(typeof reply.content).toBe('string')
          expect(typeof reply.sender).toBe('string')
          expect(typeof reply.receiver).toBe('string')
          expect(typeof reply.isStarred).toBe('boolean')
          expect(reply.date).toBeInstanceOf(Date)
        })
      })
    })

    it('should have unique IDs for all replies', () => {
      const allReplyIds: number[] = []
      emailItems.forEach(email => {
        email.reply.forEach(reply => {
          allReplyIds.push(reply.id)
        })
      })
      const uniqueReplyIds = new Set(allReplyIds)
      expect(uniqueReplyIds.size).toBe(allReplyIds.length)
    })

    it('should have emails with different read states', () => {
      const readEmails = emailItems.filter(email => email.isRead)
      const unreadEmails = emailItems.filter(email => !email.isRead)

      expect(readEmails.length).toBeGreaterThan(0)
      expect(unreadEmails.length).toBeGreaterThan(0)
    })

    it('should have emails with different starred states', () => {
      const starredEmails = emailItems.filter(email => email.isStarred)
      const unstarredEmails = emailItems.filter(email => !email.isStarred)

      expect(starredEmails.length).toBeGreaterThan(0)
      expect(unstarredEmails.length).toBeGreaterThan(0)
    })

    it('should have emails with different spam states', () => {
      const spamEmails = emailItems.filter(email => email.isSpam)
      const nonSpamEmails = emailItems.filter(email => !email.isSpam)

      expect(spamEmails.length).toBeGreaterThan(0)
      expect(nonSpamEmails.length).toBeGreaterThan(0)
    })
  })

  describe('Data Validation', () => {
    it('should have emails with non-empty content', () => {
      emailItems.forEach(email => {
        expect(email.content.trim()).toBeTruthy()
        expect(email.title.trim()).toBeTruthy()
        expect(email.from.trim()).toBeTruthy()
        expect(email.sender.trim()).toBeTruthy()
        expect(email.receiver.trim()).toBeTruthy()
      })
    })

    it('should have emails with valid dates', () => {
      emailItems.forEach(email => {
        expect(email.date.getTime()).not.toBeNaN()
        expect(email.date.getTime()).toBeGreaterThan(0)
      })
    })

    it('should have replies with non-empty content', () => {
      emailItems.forEach(email => {
        email.reply.forEach(reply => {
          expect(reply.content.trim()).toBeTruthy()
          expect(reply.from.trim()).toBeTruthy()
          expect(reply.sender.trim()).toBeTruthy()
          expect(reply.receiver.trim()).toBeTruthy()
        })
      })
    })

    it('should have replies with valid dates', () => {
      emailItems.forEach(email => {
        email.reply.forEach(reply => {
          expect(reply.date.getTime()).not.toBeNaN()
          expect(reply.date.getTime()).toBeGreaterThan(0)
        })
      })
    })
  })
}) 