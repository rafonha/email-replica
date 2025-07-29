import navItems from '../NavItems'

describe('NavItems', () => {
  it('should have correct structure for all navigation items', () => {
    expect(navItems).toBeInstanceOf(Array)
    expect(navItems.length).toBe(5)
  })

  it('should have required properties for each nav item', () => {
    navItems.forEach((item) => {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('label')
      expect(item).toHaveProperty('iconSrc')
      expect(item).toHaveProperty('count')
      expect(item).toHaveProperty('isActive')

      expect(typeof item.id).toBe('string')
      expect(typeof item.label).toBe('string')
      expect(typeof item.iconSrc).toBe('string')
      expect(typeof item.count).toBe('number')
      expect(typeof item.isActive).toBe('boolean')
    })
  })

  it('should have correct navigation items', () => {
    const expectedItems = ['inbox', 'starred', 'all-mail', 'spam', 'trash']
    
    navItems.forEach((item, index) => {
      expect(item.id).toBe(expectedItems[index])
    })
  })

  it('should have correct labels', () => {
    const expectedLabels = ['Inbox', 'Starred', 'All Mail', 'Spam', 'Trash']
    
    navItems.forEach((item, index) => {
      expect(item.label).toBe(expectedLabels[index])
    })
  })

  it('should have valid icon sources', () => {
    navItems.forEach((item) => {
      expect(item.iconSrc).toBeTruthy()
      expect(item.iconSrc.length).toBeGreaterThan(0)
    })
  })

  it('should have initial count of 0 for all items', () => {
    navItems.forEach((item) => {
      expect(item.count).toBe(0)
    })
  })

  it('should have only inbox as initially active', () => {
    const inboxItem = navItems.find(item => item.id === 'inbox')
    const otherItems = navItems.filter(item => item.id !== 'inbox')

    expect(inboxItem?.isActive).toBe(true)
    otherItems.forEach(item => {
      expect(item.isActive).toBe(false)
    })
  })

  it('should have unique IDs', () => {
    const ids = navItems.map(item => item.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('should have non-empty labels', () => {
    navItems.forEach((item) => {
      expect(item.label.trim()).toBeTruthy()
      expect(item.label).not.toBe('')
    })
  })

  it('should have valid icon file paths', () => {
    navItems.forEach((item) => {
      expect(item.iconSrc).toMatch(/\.(webp|png|jpg|jpeg|svg)$/i)
    })
  })
}) 