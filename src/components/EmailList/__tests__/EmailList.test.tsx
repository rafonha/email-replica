import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmailList from "../index";
import { EmailItem } from "../EmailItems";

jest.mock("../../EmailListItem", () => {
  return function MockEmailListItem({ email }: { email: EmailItem }) {
    return (
      <div data-testid={`email-item-${email.id}`}>
        {email.from} - {email.title}
      </div>
    );
  };
});

const mockEmails: EmailItem[] = [
  {
    id: 1,
    title: "Test Email 1",
    from: "John Doe",
    content: "Test content 1",
    isRead: false,
    isSpam: false,
    isStarred: false,
    reply: [],
    date: new Date("2025-03-14T10:30:00Z"),
    sender: "john@example.com",
    receiver: "me",
    box: "inbox",
  },
  {
    id: 2,
    title: "Test Email 2",
    from: "Jane Smith",
    content: "Test content 2",
    isRead: true,
    isSpam: false,
    isStarred: true,
    reply: [],
    date: new Date("2025-03-14T11:30:00Z"),
    sender: "jane@example.com",
    receiver: "me",
    box: "inbox",
  },
  {
    id: 3,
    title: "Test Email 3",
    from: "Bob Wilson",
    content: "Test content 3",
    isRead: false,
    isSpam: false,
    isStarred: false,
    reply: [],
    date: new Date("2025-03-14T12:30:00Z"),
    sender: "bob@example.com",
    receiver: "me",
    box: "inbox",
  },
];

describe("EmailList", () => {
  const defaultProps = {
    emails: mockEmails,
    setSelectedEmail: jest.fn(),
    updateEmail: jest.fn(),
    selectedBox: "inbox",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render all email items", () => {
      render(<EmailList {...defaultProps} />);

      expect(screen.getByTestId("email-item-1")).toBeInTheDocument();
      expect(screen.getByTestId("email-item-2")).toBeInTheDocument();
      expect(screen.getByTestId("email-item-3")).toBeInTheDocument();
    });

    it("should render email content correctly", () => {
      render(<EmailList {...defaultProps} />);

      expect(screen.getByText("John Doe - Test Email 1")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith - Test Email 2")).toBeInTheDocument();
      expect(screen.getByText("Bob Wilson - Test Email 3")).toBeInTheDocument();
    });

    it("should have correct container structure", () => {
      render(<EmailList {...defaultProps} />);

      const headerSpacer = document.querySelector(
        ".flex.h-\\[48px\\].items-center.px-4"
      );
      expect(headerSpacer).toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("should render empty message when no emails", () => {
      render(<EmailList {...defaultProps} emails={[]} />);

      expect(screen.getByText("Empty")).toBeInTheDocument();
      expect(screen.queryByTestId("email-item-1")).not.toBeInTheDocument();
    });

    it("should have correct empty state styling", () => {
      render(<EmailList {...defaultProps} emails={[]} />);

      const emptyMessage = screen.getByText("Empty");
      expect(emptyMessage).toHaveClass("p-8", "text-center", "text-gray-500");
    });
  });

  describe("Email Item Props", () => {
    it("should pass correct props to EmailListItem", () => {
      render(<EmailList {...defaultProps} />);

      const emailItems = screen.getAllByTestId(/email-item-/);
      expect(emailItems).toHaveLength(3);
    });

    it("should render correct number of emails", () => {
      const singleEmail = [mockEmails[0]];
      render(<EmailList {...defaultProps} emails={singleEmail} />);

      expect(screen.getByTestId("email-item-1")).toBeInTheDocument();
      expect(screen.queryByTestId("email-item-2")).not.toBeInTheDocument();
    });
  });

  describe("Different Selected Boxes", () => {
    it("should render emails for inbox", () => {
      render(<EmailList {...defaultProps} selectedBox="inbox" />);

      expect(screen.getByTestId("email-item-1")).toBeInTheDocument();
    });

    it("should render emails for spam", () => {
      render(<EmailList {...defaultProps} selectedBox="spam" />);

      expect(screen.getByTestId("email-item-1")).toBeInTheDocument();
    });

    it("should render emails for trash", () => {
      render(<EmailList {...defaultProps} selectedBox="trash" />);

      expect(screen.getByTestId("email-item-1")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("should render header spacer", () => {
      render(<EmailList {...defaultProps} />);

      const headerSpacer = document.querySelector(
        ".flex.h-\\[48px\\].items-center.px-4"
      );
      expect(headerSpacer).toBeInTheDocument();
    });

    it("should render email items container", () => {
      render(<EmailList {...defaultProps} />);

      const emailItems = screen.getAllByTestId(/email-item-/);
      expect(emailItems.length).toBe(3);
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic structure", () => {
      render(<EmailList {...defaultProps} />);

      const emailItems = screen.getAllByTestId(/email-item-/);
      expect(emailItems.length).toBe(3);
    });

    it("should render all email items with proper test IDs", () => {
      render(<EmailList {...defaultProps} />);

      mockEmails.forEach((email) => {
        expect(
          screen.getByTestId(`email-item-${email.id}`)
        ).toBeInTheDocument();
      });
    });
  });
});
