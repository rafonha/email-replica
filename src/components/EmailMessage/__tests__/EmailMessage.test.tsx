import { render, screen, fireEvent } from "../../../test-utils";
import EmailMessage from "../index";
import {
  createMockEmail,
  createMockReply,
  mockFunctions,
  setupTestEnvironment,
} from "../../../test-utils";

const mockEmail = createMockEmail({
  id: 1,
  title: "Test Email",
  from: "John Doe",
  content: "This is a test email content",
  date: new Date("2025-03-14T10:30:00Z"),
  sender: "john.doe@example.com",
  receiver: "me",
  box: "inbox",
});

const mockReply = createMockReply({
  id: 1.1,
  from: "Jane Smith",
  content: "This is a test reply content",
  date: new Date("2025-03-14T11:30:00Z"),
  sender: "jane.smith@example.com",
  receiver: "me",
});

describe("EmailMessage", () => {
  setupTestEnvironment();

  const defaultProps = {
    isMinimized: false,
    onToggleMinimization: mockFunctions.onToggleMinimization,
  };

  describe("Main Email", () => {
    it("should render main email correctly", () => {
      render(<EmailMessage email={mockEmail} {...defaultProps} />);

      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test email content")
      ).toBeInTheDocument();
      expect(screen.getByText("<john.doe@example.com>")).toBeInTheDocument();
      expect(screen.getByText("to me")).toBeInTheDocument();
    });

    it("should show avatar with correct initials for main email", () => {
      render(<EmailMessage email={mockEmail} {...defaultProps} />);

      const avatar = screen.getByText("JD");
      expect(avatar).toBeInTheDocument();
      const avatarContainer = avatar.closest("div");
      expect(avatarContainer).toHaveClass(
        "w-10",
        "h-10",
        "bg-blue-500",
        "rounded-full",
        "flex",
        "items-center",
        "justify-center",
        "text-white"
      );
    });

    it("should call onToggleMinimization when clicked", () => {
      const mockToggle = jest.fn();
      render(
        <EmailMessage
          email={mockEmail}
          {...defaultProps}
          onToggleMinimization={mockToggle}
        />
      );

      const clickableArea = screen.getByText("John Doe").closest("div");
      fireEvent.click(clickableArea!);

      expect(mockToggle).toHaveBeenCalledTimes(1);
    });

    it("should show star button when showStarButton is true", () => {
      render(
        <EmailMessage
          email={mockEmail}
          {...defaultProps}
          showStarButton={true}
          onToggleStar={jest.fn()}
        />
      );

      const starButton = screen.getByAltText("Star");
      expect(starButton).toBeInTheDocument();
    });

    it("should call onToggleStar when star button is clicked", () => {
      const mockToggleStar = jest.fn();
      render(
        <EmailMessage
          email={mockEmail}
          {...defaultProps}
          showStarButton={true}
          onToggleStar={mockToggleStar}
        />
      );

      const starButton = screen.getByAltText("Star");
      fireEvent.click(starButton);

      expect(mockToggleStar).toHaveBeenCalledTimes(1);
    });

    it("should show filled star when email is starred", () => {
      const starredEmail = { ...mockEmail, isStarred: true };
      render(
        <EmailMessage
          email={starredEmail}
          {...defaultProps}
          showStarButton={true}
          onToggleStar={jest.fn()}
        />
      );

      const starButton = screen.getByAltText("Star");
      expect(starButton).toHaveAttribute("src");
      expect(starButton.getAttribute("src")).toBeTruthy();
    });

    it("should use getTimeDifference when provided", () => {
      const mockGetTimeDifference = jest
        .fn()
        .mockReturnValue("Custom time format");
      render(
        <EmailMessage
          email={mockEmail}
          {...defaultProps}
          getTimeDifference={mockGetTimeDifference}
        />
      );

      expect(mockGetTimeDifference).toHaveBeenCalledWith(mockEmail.date);
      expect(screen.getByText("Custom time format")).toBeInTheDocument();
    });
  });

  describe("Minimized Email", () => {
    it("should hide extra information when minimized", () => {
      render(
        <EmailMessage email={mockEmail} {...defaultProps} isMinimized={true} />
      );

      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test email content")
      ).toBeInTheDocument();

      expect(
        screen.queryByText("<john.doe@example.com>")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("to me")).not.toBeInTheDocument();
    });

    it("should apply truncation classes when minimized", () => {
      render(
        <EmailMessage email={mockEmail} {...defaultProps} isMinimized={true} />
      );

      const content = screen.getByText("This is a test email content");
      expect(content).toHaveClass("truncate", "text-[13px]", "text-gray-600");
    });
  });

  describe("Reply", () => {
    it("should render reply correctly", () => {
      render(
        <EmailMessage email={mockReply} {...defaultProps} isReply={true} />
      );

      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test reply content")
      ).toBeInTheDocument();
      expect(screen.getByText("<jane.smith@example.com>")).toBeInTheDocument();
      expect(screen.getByText("to me")).toBeInTheDocument();
    });

    it("should show avatar with correct initial for reply", () => {
      render(
        <EmailMessage email={mockReply} {...defaultProps} isReply={true} />
      );

      const avatar = screen.getByText("J");
      expect(avatar).toBeInTheDocument();
      const avatarContainer = avatar.closest("div");
      expect(avatarContainer).toHaveClass(
        "w-8",
        "h-8",
        "bg-green-500",
        "rounded-full",
        "flex",
        "items-center",
        "justify-center",
        "text-white"
      );
    });

    it("should not show bottom margin when it is a reply", () => {
      render(
        <EmailMessage email={mockReply} {...defaultProps} isReply={true} />
      );

      const container = screen
        .getByText("Jane Smith")
        .closest("div")?.parentElement;
      expect(container).not.toHaveClass("mb-4");
    });

    it("should use default date formatting for replies", () => {
      render(
        <EmailMessage email={mockReply} {...defaultProps} isReply={true} />
      );

      const dateText = screen.getByText(/14 de março de 2025/);
      expect(dateText).toBeInTheDocument();
    });
  });

  describe("Special Cases", () => {
    it("should handle multi-word names for initials", () => {
      const multiNameEmail = { ...mockEmail, from: "John Michael Doe" };
      render(<EmailMessage email={multiNameEmail} {...defaultProps} />);

      const avatar = screen.getByText("JM");
      expect(avatar).toBeInTheDocument();
    });

    it("should handle single word names for reply", () => {
      const singleNameReply = { ...mockReply, from: "Alice" };
      render(
        <EmailMessage
          email={singleNameReply}
          {...defaultProps}
          isReply={true}
        />
      );

      const avatar = screen.getByText("A");
      expect(avatar).toBeInTheDocument();
    });

    it("should prevent event propagation on star button", () => {
      const mockToggle = jest.fn();
      const mockToggleStar = jest.fn();

      render(
        <EmailMessage
          email={mockEmail}
          {...defaultProps}
          onToggleMinimization={mockToggle}
          showStarButton={true}
          onToggleStar={mockToggleStar}
        />
      );

      const starButton = screen.getByAltText("Star");
      fireEvent.click(starButton);

      expect(mockToggleStar).toHaveBeenCalledTimes(1);
      expect(mockToggle).not.toHaveBeenCalled();
    });
  });
});
