import { render, screen, fireEvent } from "../../../test-utils";
import EmailListItem from "../index";
import {
  createMockEmail,
  createMockEmailWithReplies,
  mockFunctions,
  setupTestEnvironment,
} from "../../../test-utils";

const mockEmail = createMockEmail({
  id: 1,
  title: "Test Email",
  from: "John Doe",
  content: "This is a test email content",
  date: new Date("2025-03-14T10:30:00Z"),
  sender: "john@example.com",
  receiver: "me",
  box: "inbox",
});

const mockEmailWithReplies = createMockEmailWithReplies({
  id: 2,
  title: "Email with Replies",
  from: "Jane Smith",
  content: "Original email content",
  date: new Date("2025-03-14T10:30:00Z"),
  sender: "jane@example.com",
  receiver: "me",
  box: "inbox",
});

describe("EmailListItem", () => {
  setupTestEnvironment();

  const defaultProps = {
    email: mockEmail,
    setSelectedEmail: mockFunctions.setSelectedEmail,
    updateEmail: mockFunctions.updateEmail,
    selectedBox: "inbox",
    searchQuery: "",
  };

  describe("Rendering", () => {
    it("should render email item with correct content", () => {
      render(<EmailListItem {...defaultProps} />);

      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Test Email")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test email content")
      ).toBeInTheDocument();
    });

    it("should render star button when not in trash", () => {
      render(<EmailListItem {...defaultProps} />);

      const starButton = screen.getByRole("button");
      expect(starButton).toBeInTheDocument();
    });

    it("should not render star button when in trash", () => {
      render(<EmailListItem {...defaultProps} selectedBox="trash" />);

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("should not render star button when email is in trash box", () => {
      const trashEmail = { ...mockEmail, box: "trash" };
      render(<EmailListItem {...defaultProps} email={trashEmail} />);

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("Search Functionality", () => {
    it("should highlight search query in title", () => {
      render(<EmailListItem {...defaultProps} searchQuery="Test" />);

      const highlightedElements = screen.getAllByText("Test");
      expect(highlightedElements.length).toBeGreaterThan(0);
      highlightedElements.forEach(element => {
        expect(element).toHaveClass("bg-yellow-200");
      });
    });

    it("should highlight search query in sender name", () => {
      render(<EmailListItem {...defaultProps} searchQuery="John" />);

      const highlightedElements = screen.getAllByText("John");
      expect(highlightedElements.length).toBeGreaterThan(0);
      highlightedElements.forEach(element => {
        expect(element).toHaveClass("bg-yellow-200");
      });
    });

    it("should highlight search query in content", () => {
      render(<EmailListItem {...defaultProps} searchQuery="test" />);

      const highlightedElements = screen.getAllByText("test");
      expect(highlightedElements.length).toBeGreaterThan(0);
      highlightedElements.forEach(element => {
        expect(element).toHaveClass("bg-yellow-200");
      });
    });

    it("should not highlight when search query is empty", () => {
      render(<EmailListItem {...defaultProps} searchQuery="" />);

      const titleElement = screen.getByText("Test Email");
      expect(titleElement).not.toHaveClass("bg-yellow-200");
    });

    it("should be case insensitive for search highlighting", () => {
      render(<EmailListItem {...defaultProps} searchQuery="john" />);

      const highlightedElements = screen.getAllByText("John");
      expect(highlightedElements.length).toBeGreaterThan(0);
      highlightedElements.forEach(element => {
        expect(element).toHaveClass("bg-yellow-200");
      });
    });

    it("should highlight all case variations of search term", () => {
      render(<EmailListItem {...defaultProps} searchQuery="test" />);

      const highlightedElements = screen.getAllByText("Test");
      expect(highlightedElements.length).toBeGreaterThan(0);
      highlightedElements.forEach(element => {
        expect(element).toHaveClass("bg-yellow-200");
      });
    });

    it("should highlight multiple occurrences of search query", () => {
      const emailWithMultipleMatches = {
        ...mockEmail,
        title: "Test Email Test",
        content: "This is a test email with test content",
      };
      render(<EmailListItem {...defaultProps} email={emailWithMultipleMatches} searchQuery="test" />);

      const highlightedElements = screen.getAllByText("test");
      expect(highlightedElements.length).toBeGreaterThan(1);
      highlightedElements.forEach(element => {
        expect(element).toHaveClass("bg-yellow-200");
      });
    });
  });

  describe("Email with Replies", () => {
    it("should display sender with participant count", () => {
      render(<EmailListItem {...defaultProps} email={mockEmailWithReplies} />);

      expect(screen.getByText("Jane Smith (3)")).toBeInTheDocument();
    });

    it("should display latest reply content as preview", () => {
      render(<EmailListItem {...defaultProps} email={mockEmailWithReplies} />);

      expect(screen.getByText("Test reply content")).toBeInTheDocument();
    });

    it("should highlight search query in reply content", () => {
      render(<EmailListItem {...defaultProps} email={mockEmailWithReplies} searchQuery="reply" />);

      const highlightedElements = screen.getAllByText("reply");
      expect(highlightedElements.length).toBeGreaterThan(0);
      highlightedElements.forEach(element => {
        expect(element).toHaveClass("bg-yellow-200");
      });
    });
  });

  describe("Email without Replies", () => {
    it("should display sender without participant count", () => {
      render(<EmailListItem {...defaultProps} />);

      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("should display original email content as preview", () => {
      render(<EmailListItem {...defaultProps} />);

      expect(
        screen.getByText("This is a test email content")
      ).toBeInTheDocument();
    });
  });

  describe("Star Functionality", () => {
    it("should call updateEmail when star button is clicked", () => {
      render(<EmailListItem {...defaultProps} />);

      const starButton = screen.getByRole("button");
      fireEvent.click(starButton);

      expect(defaultProps.updateEmail).toHaveBeenCalledWith(1, {
        isStarred: true,
      });
    });

    it("should toggle star state correctly", () => {
      const starredEmail = { ...mockEmail, isStarred: true };
      render(<EmailListItem {...defaultProps} email={starredEmail} />);

      const starButton = screen.getByRole("button");
      fireEvent.click(starButton);

      expect(defaultProps.updateEmail).toHaveBeenCalledWith(1, {
        isStarred: false,
      });
    });

    it("should prevent event propagation on star click", () => {
      render(<EmailListItem {...defaultProps} />);

      const starButton = screen.getByRole("button");
      const mockEvent = { stopPropagation: jest.fn() };

      fireEvent.click(starButton, mockEvent);
    });
  });

  describe("Email Selection", () => {
    it("should call setSelectedEmail and updateEmail when email is clicked", () => {
      render(<EmailListItem {...defaultProps} />);

      const emailItem = screen.getByText("John Doe").closest("div");
      fireEvent.click(emailItem!);

      expect(defaultProps.setSelectedEmail).toHaveBeenCalledWith(mockEmail);
      expect(defaultProps.updateEmail).toHaveBeenCalledWith(1, {
        isRead: true,
      });
    });
  });

  describe("Date Formatting", () => {
    it("should format today date as time", () => {
      const todayEmail = {
        ...mockEmail,
        date: new Date("2025-03-14T10:30:00Z"),
      };
      render(<EmailListItem {...defaultProps} email={todayEmail} />);

      const timeElement = screen.getByText(/Mar 14/);
      expect(timeElement).toBeInTheDocument();
    });

    it("should format older date as month and day", () => {
      const oldEmail = { ...mockEmail, date: new Date("2025-01-15T10:30:00Z") };
      render(<EmailListItem {...defaultProps} email={oldEmail} />);

      const dateElement = screen.getByText(/Jan 15/);
      expect(dateElement).toBeInTheDocument();
    });
  });

  describe("Read State Styling", () => {
    it("should apply unread styling when email is not read", () => {
      render(<EmailListItem {...defaultProps} />);

      const emailItem = document.querySelector(".relative.flex.h-\\[40px\\]");
      expect(emailItem).toHaveClass("bg-white");
    });

    it("should apply read styling when email is read", () => {
      const readEmail = { ...mockEmail, isRead: true };
      render(<EmailListItem {...defaultProps} email={readEmail} />);

      const emailItem = document.querySelector(".relative.flex.h-\\[40px\\]");
      expect(emailItem).toHaveClass("bg-gray-50");
    });

    it("should apply correct font weight for unread email", () => {
      render(<EmailListItem {...defaultProps} />);

      const senderElement = screen.getByText("John Doe");
      expect(senderElement).toHaveClass("font-semibold");
    });

    it("should apply correct font weight for read email", () => {
      const readEmail = { ...mockEmail, isRead: true };
      render(<EmailListItem {...defaultProps} email={readEmail} />);

      const senderElement = screen.getByText("John Doe");
      expect(senderElement).toHaveClass("font-normal");
    });
  });

  describe("Layout and Structure", () => {
    it("should have correct container classes", () => {
      render(<EmailListItem {...defaultProps} />);

      const container = document.querySelector(".relative.flex.h-\\[40px\\]");
      expect(container).toHaveClass(
        "relative",
        "flex",
        "h-[40px]",
        "cursor-pointer",
        "items-center",
        "gap-3",
        "border-b",
        "border-gray-200",
        "px-4",
        "text-sm",
        "hover:z-10",
        "hover:shadow-md"
      );
    });

    it("should have proper flex layout", () => {
      render(<EmailListItem {...defaultProps} />);

      const flexContainer = screen.getByText("John Doe").closest(".flex-1");
      expect(flexContainer).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper button structure for star button", () => {
      render(<EmailListItem {...defaultProps} />);

      const starButton = screen.getByRole("button");
      expect(starButton).toHaveClass(
        "p-1",
        "hover:bg-gray-100",
        "rounded-full",
        "transition-colors",
        "cursor-pointer"
      );
    });

    it("should have proper alt text for star icon", () => {
      render(<EmailListItem {...defaultProps} />);

      const starIcon = screen.getByAltText("Star");
      expect(starIcon).toBeInTheDocument();
    });
  });
});
