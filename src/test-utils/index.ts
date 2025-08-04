import { EmailItem } from "../components/EmailList/EmailItems";

export const createMockEmail = (overrides: Partial<EmailItem> = {}): EmailItem => ({
  id: Math.floor(Math.random() * 1000),
  title: "Test Email",
  from: "test@example.com",
  content: "Test email content",
  isRead: false,
  isSpam: false,
  isStarred: false,
  reply: [],
  date: new Date("2025-03-14T10:30:00Z"),
  sender: "test@example.com",
  receiver: "me",
  box: "inbox",
  ...overrides,
});

export const createMockReply = (overrides: Partial<EmailItem> = {}): EmailItem => ({
  id: Math.floor(Math.random() * 1000) + 0.1,
  title: "Test Reply",
  from: "reply@example.com",
  content: "Test reply content",
  sender: "reply@example.com",
  receiver: "me",
  isStarred: false,
  date: new Date("2025-03-14T11:30:00Z"),
  isRead: false,
  isSpam: false,
  reply: [],
  box: "inbox",
  ...overrides,
});

export const createMockEmailWithReplies = (
  emailOverrides: Partial<EmailItem> = {},
  replies: EmailItem[] = []
): EmailItem => {
  const baseEmail = createMockEmail(emailOverrides);
  return {
    ...baseEmail,
    reply: replies.length > 0 ? replies : [
      createMockReply({ id: baseEmail.id + 0.1 }),
      createMockReply({ id: baseEmail.id + 0.2 }),
    ],
  };
};

export const createMockEmailList = (count: number = 3): EmailItem[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockEmail({
      id: index + 1,
      title: `Test Email ${index + 1}`,
      from: `User ${index + 1}`,
      content: `Test content ${index + 1}`,
      isRead: index % 2 === 0,
      isStarred: index % 3 === 0,
      date: new Date(`2025-03-14T${10 + index}:30:00Z`),
    })
  );
};

export const createMockEmailCounts = (): Record<string, number> => ({
  inbox: 5,
  starred: 2,
  "all-mail": 5,
  spam: 1,
  trash: 0,
});

export const mockFunctions = {
  setSelectedEmail: jest.fn(),
  updateEmail: jest.fn(),
  setSelectedMailbox: jest.fn(),
  onToggleMinimization: jest.fn(),
  onToggleStar: jest.fn(),
};

export const clearMockFunctions = () => {
  Object.values(mockFunctions).forEach(fn => fn.mockClear());
};

export * from "./setup";
export * from "./mocks"; 