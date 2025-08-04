import React from "react";
import Image from "next/image";
import { EmailItem } from "../components/EmailList/EmailItems";

export const MockEmailMessage = ({
  email,
  isMinimized,
  onToggleMinimization,
  onToggleStar,
  showStarButton = false,
}: {
  email: EmailItem;
  isMinimized: boolean;
  onToggleMinimization: () => void;
  onToggleStar?: () => void;
  showStarButton?: boolean;
}) => (
  <div
    data-testid={`email-message-${email.id}`}
    data-minimized={isMinimized}
  >
    <div onClick={onToggleMinimization} data-testid={`toggle-${email.id}`}>
      {email.from} - {email.content}
    </div>
    {showStarButton && onToggleStar && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleStar();
        }}
        data-testid={`star-${email.id}`}
      >
        {email.isStarred ? "★" : "☆"}
      </button>
    )}
  </div>
);

export const MockEmailListItem = ({ email }: { email: EmailItem }) => (
  <div data-testid={`email-item-${email.id}`}>
    {email.from} - {email.title}
  </div>
);

export const MockSidebar = ({
  selectedMailbox,
  setSelectedMailbox,
  emailCountByBox,
}: {
  selectedMailbox: string;
  setSelectedMailbox: (mailbox: string) => void;
  emailCountByBox: Record<string, number>;
}) => (
  <div data-testid="sidebar">
    <div data-testid="selected-mailbox">{selectedMailbox}</div>
    <button
      onClick={() => setSelectedMailbox("inbox")}
      data-testid="inbox-button"
    >
      Inbox ({emailCountByBox.inbox || 0})
    </button>
    <button
      onClick={() => setSelectedMailbox("starred")}
      data-testid="starred-button"
    >
      Starred ({emailCountByBox.starred || 0})
    </button>
    <button
      onClick={() => setSelectedMailbox("spam")}
      data-testid="spam-button"
    >
      Spam ({emailCountByBox.spam || 0})
    </button>
  </div>
);

export const MockHeader = () => (
  <header data-testid="header">
    <Image src="/bmail-logo.webp" alt="BMail Logo" width={109} height={40} />
  </header>
);
