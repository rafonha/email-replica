export interface EmailItem {
  id: number;
  title: string;
  from: string; 
  content: string;
  isRead: boolean;
  isSpam: boolean;
  isStarred: boolean;
  reply: Array<ReplyItem>;
  date: Date;
  sender: string;
  receiver: string;
  box: string;
}

export interface ReplyItem {
  id: number;
  from: string;
  content: string;
  sender: string;
  receiver: string;
  isStarred: boolean;
  date: Date;
}

export const emailItems: EmailItem[] = [
  {
    id: 1,
    title: "Welcome to your new Gmail account",
    from: "Gmail Team",
    content: "Welcome! Your new Gmail account is ready to use. You can now send and receive emails.",
    isRead: false,
    isSpam: false,
    isStarred: false,
    reply: [],
    date: new Date("2025-03-14T10:30:00Z"),
    sender: "noreply@gmail.com",
    receiver: "me",
    box: "inbox",
  },
  {
    id: 2,
    title: "Your order has shipped",
    from: "Amazon",
    content: "Good news! Your recent order has been shipped and is on its way to you.",
    isRead: true,
    isSpam: false,
    isStarred: true,
    reply: [],
    date: new Date("2025-03-13T15:45:00Z"),
    sender: "no-reply@amazon.com",
    receiver: "me",
    box: "inbox",
  },
  {
    id: 3,
    title: "Re: Team meeting tomorrow",
    from: "Sarah Johnson, Mike Chen",
    content: "Don't forget about our team meeting tomorrow at 2 PM in the conference room.",
    isRead: false,
    isSpam: false,
    isStarred: true,
    date: new Date("2025-03-13T09:20:00Z"),
    sender: "sarah.johnson@company.com",
    receiver: "me",
    box: "inbox",
    reply: [
      {
        id: 3.1,
        from: "Mike Chen",
        content: "Thanks for the reminder! Should I bring the quarterly reports?",
        sender: "mike.chen@company.com",
        receiver: "me",
        isStarred: false,
        date: new Date("2025-03-13T10:15:00Z"),
      },
      {
        id: 3.2,
        from: "Sarah Johnson",
        content: "Yes, please bring the Q4 reports. Also, let's discuss the new project timeline.",
        sender: "sarah.johnson@company.com",
        receiver: "me",
        isStarred: false,
        date: new Date("2025-03-13T11:30:00Z"),
      }
    ],
  },
  {
    id: 4,
    title: "Re: Dinner plans this weekend?",
    from: "Alex Rivera, You",
    content: "Hey! Want to try that new Italian place downtown this Saturday?",
    isRead: false,
    isSpam: false,
    isStarred: false,
    date: new Date("2025-03-11T18:45:00Z"),
    sender: "alex.rivera@gmail.com",
    receiver: "me",
    box: "inbox",
    reply: [
      {
        id: 4.1,
        from: "You",
        content: "Sure, I'm free. What time should we meet?",
        sender: "you@gmail.com",
        receiver: "me",
        isStarred: false,
        date: new Date("2025-03-11T19:20:00Z"),
      },
      {
        id: 4.2,
        from: "Alex Rivera",
        content: "How about 7 PM? I'll make a reservation for us.",
        sender: "alex.rivera@gmail.com",
        receiver: "me",
        isStarred: false,
        date: new Date("2025-03-12T09:30:00Z"),
      },
    ],
  },
  {
    id: 5,
    title: "Newsletter: Weekly updates",
    from: "Tech News",
    content: "Here are this week's top tech stories and updates from around the industry.",
    isRead: true,
    isSpam: false,
    isStarred: false,
    reply: [],
    date: new Date("2025-03-12T08:00:00Z"),
    sender: "newsletter@technews.com",
    receiver: "me",
    box: "inbox",
  },
  {
    id: 6,
    title: "You've won $1,000,000!!!",
    from: "Prizze Committee",
    content: "Congratulations! You've been selected as our grand prize winner. Click here to claim your million dollars immediately!!!",
    isRead: false,
    isSpam: true,
    isStarred: false,
    reply: [],
    date: new Date("2025-03-11T14:23:00Z"),
    sender: "definitely-not-spam@totallylegit.com",
    receiver: "me",
    box: "spam",
  },
];