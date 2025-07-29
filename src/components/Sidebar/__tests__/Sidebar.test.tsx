import { render, screen, fireEvent } from "../../../test-utils";
import Sidebar from "../index";
import {
  createMockEmailCounts,
  mockFunctions,
  setupTestEnvironment,
} from "../../../test-utils";

describe("Sidebar", () => {
  setupTestEnvironment();

  const defaultProps = {
    selectedMailbox: "inbox",
    setSelectedMailbox: mockFunctions.setSelectedMailbox,
    emailCountByBox: createMockEmailCounts(),
    setSelectedEmail: mockFunctions.setSelectedEmail,
  };

  describe("Rendering", () => {
    it("should render sidebar with navigation items", () => {
      render(<Sidebar {...defaultProps} />);

      expect(screen.getByText("Inbox")).toBeInTheDocument();
      expect(screen.getByText("Starred")).toBeInTheDocument();
      expect(screen.getByText("All Mail")).toBeInTheDocument();
      expect(screen.getByText("Spam")).toBeInTheDocument();
      expect(screen.getByText("Trash")).toBeInTheDocument();
    });

    it("should render email counts for inbox and spam", () => {
      render(<Sidebar {...defaultProps} />);

      expect(screen.getByText("5")).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("should not render count for trash when count is 0", () => {
      render(<Sidebar {...defaultProps} />);

      expect(screen.queryByText("0")).not.toBeInTheDocument();
    });

    it("should have correct sidebar structure", () => {
      render(<Sidebar {...defaultProps} />);

      const sidebar = screen.getByRole("navigation").parentElement;
      expect(sidebar).toHaveClass("w-[256px]", "h-full", "px-3", "shrink-0");
    });
  });

  describe("Navigation", () => {
    it("should call setSelectedMailbox when inbox is clicked", () => {
      render(<Sidebar {...defaultProps} />);

      const inboxButton = screen.getByText("Inbox");
      fireEvent.click(inboxButton);

      expect(defaultProps.setSelectedMailbox).toHaveBeenCalledWith("inbox");
      expect(defaultProps.setSelectedEmail).toHaveBeenCalledWith(null);
    });

    it("should call setSelectedMailbox when starred is clicked", () => {
      render(<Sidebar {...defaultProps} />);

      const starredButton = screen.getByText("Starred");
      fireEvent.click(starredButton);

      expect(defaultProps.setSelectedMailbox).toHaveBeenCalledWith("starred");
      expect(defaultProps.setSelectedEmail).toHaveBeenCalledWith(null);
    });

    it("should call setSelectedMailbox when spam is clicked", () => {
      render(<Sidebar {...defaultProps} />);

      const spamButton = screen.getByText("Spam");
      fireEvent.click(spamButton);

      expect(defaultProps.setSelectedMailbox).toHaveBeenCalledWith("spam");
      expect(defaultProps.setSelectedEmail).toHaveBeenCalledWith(null);
    });

    it("should call setSelectedMailbox when trash is clicked", () => {
      render(<Sidebar {...defaultProps} />);

      const trashButton = screen.getByText("Trash");
      fireEvent.click(trashButton);

      expect(defaultProps.setSelectedMailbox).toHaveBeenCalledWith("trash");
      expect(defaultProps.setSelectedEmail).toHaveBeenCalledWith(null);
    });

    it("should call setSelectedMailbox when all mail is clicked", () => {
      render(<Sidebar {...defaultProps} />);

      const allMailButton = screen.getByText("All Mail");
      fireEvent.click(allMailButton);

      expect(defaultProps.setSelectedMailbox).toHaveBeenCalledWith("all-mail");
      expect(defaultProps.setSelectedEmail).toHaveBeenCalledWith(null);
    });
  });

  describe("Active State", () => {
    it("should highlight inbox when selectedMailbox is inbox", () => {
      render(<Sidebar {...defaultProps} selectedMailbox="inbox" />);

      const inboxButton = screen.getByText("Inbox").closest("button");
      expect(inboxButton).toHaveClass("bg-[rgb(211,227,253)]");
    });

    it("should highlight spam when selectedMailbox is spam", () => {
      render(<Sidebar {...defaultProps} selectedMailbox="spam" />);

      const spamButton = screen.getByText("Spam").closest("button");
      expect(spamButton).toHaveClass("bg-[rgb(211,227,253)]");
    });

    it("should not highlight other items when inbox is selected", () => {
      render(<Sidebar {...defaultProps} selectedMailbox="inbox" />);

      const starredButton = screen.getByText("Starred").closest("button");
      expect(starredButton).not.toHaveClass("bg-[rgb(211,227,253)]");
    });
  });

  describe("Email Counts", () => {
    it("should display count for inbox when greater than 0", () => {
      render(
        <Sidebar {...defaultProps} emailCountByBox={{ inbox: 10, spam: 0 }} />
      );

      expect(screen.getByText("10")).toBeInTheDocument();
      expect(screen.queryByText("0")).not.toBeInTheDocument();
    });

    it("should display count for spam when greater than 0", () => {
      render(
        <Sidebar {...defaultProps} emailCountByBox={{ inbox: 0, spam: 3 }} />
      );

      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("should not display count for starred or all mail", () => {
      render(
        <Sidebar
          {...defaultProps}
          emailCountByBox={{ inbox: 5, spam: 2, starred: 1, "all-mail": 10 }}
        />
      );

      expect(screen.getByText("5")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.queryByText("1")).not.toBeInTheDocument();
      expect(screen.queryByText("10")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper button structure for navigation items", () => {
      render(<Sidebar {...defaultProps} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(5);
    });

    it("should have proper alt text for icons", () => {
      render(<Sidebar {...defaultProps} />);

      const icons = document.querySelectorAll("img");
      icons.forEach((icon) => {
        expect(icon).toHaveAttribute("alt");
      });
    });
  });
});
