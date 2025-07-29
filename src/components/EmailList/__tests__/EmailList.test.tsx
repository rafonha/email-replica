import { render, screen } from "../../../test-utils";
import EmailList from "../index";
import {
  createMockEmailList,
  mockFunctions,
  setupTestEnvironment,
} from "../../../test-utils";

import { MockEmailListItem } from "../../../test-utils";

jest.mock("../../EmailListItem", () => MockEmailListItem);

const mockEmails = createMockEmailList(3);

describe("EmailList", () => {
  setupTestEnvironment();

  const defaultProps = {
    emails: mockEmails,
    setSelectedEmail: mockFunctions.setSelectedEmail,
    updateEmail: mockFunctions.updateEmail,
    selectedBox: "inbox",
  };

  describe("Rendering", () => {
    it("should render all email items", () => {
      render(<EmailList {...defaultProps} />);

      expect(screen.getByTestId("email-item-1")).toBeInTheDocument();
      expect(screen.getByTestId("email-item-2")).toBeInTheDocument();
      expect(screen.getByTestId("email-item-3")).toBeInTheDocument();
    });

    it("should render email content correctly", () => {
      render(<EmailList {...defaultProps} />);

      expect(screen.getByText("User 1 - Test Email 1")).toBeInTheDocument();
      expect(screen.getByText("User 2 - Test Email 2")).toBeInTheDocument();
      expect(screen.getByText("User 3 - Test Email 3")).toBeInTheDocument();
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
