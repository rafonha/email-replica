import { render, screen, fireEvent } from "@testing-library/react";
import SearchField from "../index";

describe("SearchField", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it("renders search input with placeholder", () => {
    render(<SearchField onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText("Search in mail");
    expect(searchInput).toBeInTheDocument();
  });

  it("renders search input with custom placeholder", () => {
    render(<SearchField onSearch={mockOnSearch} placeholder="Custom placeholder" />);
    
    const searchInput = screen.getByPlaceholderText("Custom placeholder");
    expect(searchInput).toBeInTheDocument();
  });

  it("calls onSearch when user types", () => {
    render(<SearchField onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText("Search in mail");
    fireEvent.change(searchInput, { target: { value: "test query" } });
    
    expect(mockOnSearch).toHaveBeenCalledWith("test query");
  });

  it("shows clear button when there is text", () => {
    render(<SearchField onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText("Search in mail");
    fireEvent.change(searchInput, { target: { value: "test" } });
    
    const clearButton = screen.getByRole("button");
    expect(clearButton).toBeInTheDocument();
  });

  it("clears search when clear button is clicked", () => {
    render(<SearchField onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText("Search in mail");
    fireEvent.change(searchInput, { target: { value: "test" } });
    
    const clearButton = screen.getByRole("button");
    fireEvent.click(clearButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith("");
    expect(searchInput).toHaveValue("");
  });

  it("does not show clear button when input is empty", () => {
    render(<SearchField onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText("Search in mail");
    expect(searchInput).toHaveValue("");
    
    const clearButton = screen.queryByRole("button");
    expect(clearButton).not.toBeInTheDocument();
  });
}); 