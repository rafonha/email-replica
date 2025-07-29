import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../index";

describe("Header", () => {
  it("should render header with logo", () => {
    render(<Header />);

    const logo = screen.getByAltText("BMail Logo");
    expect(logo).toBeInTheDocument();
  });

  it("should have correct header structure", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("h-16", "px-4", "py-2", "flex", "items-center");
  });

  it("should render logo with correct attributes", () => {
    render(<Header />);

    const logo = screen.getByAltText("BMail Logo");
    expect(logo).toHaveAttribute("loading", "lazy");
    expect(logo).toHaveAttribute("decoding", "async");
    expect(logo).toHaveAttribute("width", "109");
    expect(logo).toHaveAttribute("height", "40");
    expect(logo).toHaveClass("object-contain");
  });

  it("should have proper semantic HTML structure", () => {
    render(<Header />);

    const header = document.querySelector("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("h-16", "px-4", "py-2", "flex", "items-center");
  });
});
