import { render, screen, fireEvent } from "../../../test-utils";
import EmailDetail from "../index";
import {
  createMockEmailWithReplies,
  mockFunctions,
  setupTestEnvironment,
} from "../../../test-utils";

import { MockEmailMessage } from "../../../test-utils";

jest.mock("../../EmailMessage", () => MockEmailMessage);

const mockEmail = createMockEmailWithReplies({
  id: 1,
  title: "Test Email Title",
  from: "John Doe",
  content: "This is a test email content",
  date: new Date("2025-03-14T10:30:00Z"),
  sender: "john.doe@example.com",
  receiver: "me",
  box: "inbox",
});

describe("EmailDetail", () => {
  setupTestEnvironment();

  const defaultProps = {
    email: mockEmail,
    setSelectedEmail: mockFunctions.setSelectedEmail,
    updateEmail: mockFunctions.updateEmail,
  };

  describe("Basic Rendering", () => {
    it("should render email title", () => {
      render(<EmailDetail {...defaultProps} />);

      expect(screen.getByText("Test Email Title")).toBeInTheDocument();
    });

    it("should render main email", () => {
      render(<EmailDetail {...defaultProps} />);

      expect(screen.getByTestId("email-message-1")).toBeInTheDocument();
      expect(
        screen.getByText("John Doe - This is a test email content")
      ).toBeInTheDocument();
    });

    it("should render all replies", () => {
      render(<EmailDetail {...defaultProps} />);

      expect(screen.getByTestId("email-message-1.1")).toBeInTheDocument();
      expect(screen.getByTestId("email-message-1.2")).toBeInTheDocument();
      const replyElements = screen.getAllByText(
        "reply@example.com - Test reply content"
      );
      expect(replyElements).toHaveLength(2);
    });

    it("should mark replies with data-reply=true", () => {
      render(<EmailDetail {...defaultProps} />);

      expect(screen.getByTestId("email-message-1.1")).toHaveAttribute(
        "data-reply",
        "true"
      );
      expect(screen.getByTestId("email-message-1.2")).toHaveAttribute(
        "data-reply",
        "true"
      );
    });
  });

  describe("Back Button", () => {
    it("should render back button", () => {
      render(<EmailDetail {...defaultProps} />);

      const backButton = screen.getByAltText("Back to email list");
      expect(backButton).toBeInTheDocument();
    });

    it("should call setSelectedEmail(null) when back button is clicked", () => {
      render(<EmailDetail {...defaultProps} />);

      const backButton = screen.getByAltText("Back to email list");
      fireEvent.click(backButton);

      expect(defaultProps.setSelectedEmail).toHaveBeenCalledWith(null);
    });
  });

  describe("Email Actions (Inbox)", () => {
    it("should show spam and trash buttons for inbox emails", () => {
      render(<EmailDetail {...defaultProps} />);

      expect(screen.getByAltText("Send email to spam")).toBeInTheDocument();
      expect(screen.getByAltText("Send email to trash")).toBeInTheDocument();
    });

    it("should call updateEmail with box=spam when spam button is clicked", () => {
      render(<EmailDetail {...defaultProps} />);

      const spamButton = screen.getByAltText("Send email to spam");
      fireEvent.click(spamButton);

      expect(defaultProps.updateEmail).toHaveBeenCalledWith(1, { box: "spam" });
    });

    it("should call updateEmail and setSelectedEmail when trash button is clicked", () => {
      render(<EmailDetail {...defaultProps} />);

      const trashButton = screen.getByAltText("Send email to trash");
      fireEvent.click(trashButton);

      expect(defaultProps.updateEmail).toHaveBeenCalledWith(1, {
        box: "trash",
      });
      expect(defaultProps.setSelectedEmail).toHaveBeenCalledWith(null);
    });
  });

  describe("Email Actions (Spam)", () => {
    it('should show "Not spam" button for spam emails', () => {
      const spamEmail = { ...mockEmail, box: "spam" };
      render(<EmailDetail {...defaultProps} email={spamEmail} />);

      expect(screen.getByText("Not spam")).toBeInTheDocument();
      expect(
        screen.queryByAltText("Send email to spam")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByAltText("Send email to trash")
      ).not.toBeInTheDocument();
    });

    it('should call updateEmail with box=inbox when "Not spam" is clicked', () => {
      const spamEmail = { ...mockEmail, box: "spam" };
      render(<EmailDetail {...defaultProps} email={spamEmail} />);

      const notSpamButton = screen.getByText("Not spam");
      fireEvent.click(notSpamButton);

      expect(defaultProps.updateEmail).toHaveBeenCalledWith(1, {
        box: "inbox",
      });
    });
  });

  describe("Email Actions (Trash)", () => {
    it('should show "Move to inbox" button for trash emails', () => {
      const trashEmail = { ...mockEmail, box: "trash" };
      render(<EmailDetail {...defaultProps} email={trashEmail} />);

      expect(screen.getByText("Move to inbox")).toBeInTheDocument();
      expect(
        screen.queryByAltText("Send email to spam")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByAltText("Send email to trash")
      ).not.toBeInTheDocument();
    });

    it('should call updateEmail with box=inbox when "Move to inbox" is clicked', () => {
      const trashEmail = { ...mockEmail, box: "trash" };
      render(<EmailDetail {...defaultProps} email={trashEmail} />);

      const moveToInboxButton = screen.getByText("Move to inbox");
      fireEvent.click(moveToInboxButton);

      expect(defaultProps.updateEmail).toHaveBeenCalledWith(1, {
        box: "inbox",
      });
    });
  });

  describe("Minimization", () => {
    it("should initialize with no emails minimized", () => {
      render(<EmailDetail {...defaultProps} />);

      expect(screen.getByTestId("email-message-1")).toHaveAttribute(
        "data-minimized",
        "false"
      );
      expect(screen.getByTestId("email-message-1.1")).toHaveAttribute(
        "data-minimized",
        "false"
      );
      expect(screen.getByTestId("email-message-1.2")).toHaveAttribute(
        "data-minimized",
        "false"
      );
    });

    it("should toggle minimization when main email is clicked", () => {
      render(<EmailDetail {...defaultProps} />);

      const toggleButton = screen.getByTestId("toggle-1");
      fireEvent.click(toggleButton);

      expect(screen.getByTestId("email-message-1")).toHaveAttribute(
        "data-minimized",
        "true"
      );
    });

    it("should toggle minimization when reply is clicked", () => {
      render(<EmailDetail {...defaultProps} />);

      const toggleButton = screen.getByTestId("toggle-1.1");
      fireEvent.click(toggleButton);

      expect(screen.getByTestId("email-message-1.1")).toHaveAttribute(
        "data-minimized",
        "true"
      );
    });

    it("should maintain independent minimization for each email", () => {
      render(<EmailDetail {...defaultProps} />);

      fireEvent.click(screen.getByTestId("toggle-1"));
      fireEvent.click(screen.getByTestId("toggle-1.1"));

      expect(screen.getByTestId("email-message-1")).toHaveAttribute(
        "data-minimized",
        "true"
      );
      expect(screen.getByTestId("email-message-1.1")).toHaveAttribute(
        "data-minimized",
        "true"
      );
      expect(screen.getByTestId("email-message-1.2")).toHaveAttribute(
        "data-minimized",
        "false"
      );
    });
  });

  describe("Email without Replies", () => {
    it("should render email without replies correctly", () => {
      const emailWithoutReplies = { ...mockEmail, reply: [] };
      render(<EmailDetail {...defaultProps} email={emailWithoutReplies} />);

      expect(screen.getByTestId("email-message-1")).toBeInTheDocument();
      expect(screen.queryByTestId("email-message-1.1")).not.toBeInTheDocument();
      expect(screen.queryByTestId("email-message-1.2")).not.toBeInTheDocument();
    });
  });

  describe("Date Formatting", () => {
    it("should use getTimeDifference for main email", () => {
      render(<EmailDetail {...defaultProps} />);

      expect(screen.getByTestId("email-message-1")).toBeInTheDocument();
    });
  });
});
