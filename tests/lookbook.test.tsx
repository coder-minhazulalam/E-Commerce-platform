import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LookbookViewer } from "../components/lookbook-viewer";
import { NINE_LOOKS } from "../lib/looks";

describe("LookbookViewer component", () => {
  it("renders with Ring view active by default and displays Look 01", () => {
    render(<LookbookViewer />);

    // Mode toggle tabs
    expect(screen.getByRole("tab", { name: "Ring view" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Grid view" })).toHaveAttribute("aria-selected", "false");

    // Look 01 heading (h3 in focus viewer — uniquely identified by role)
    expect(screen.getByRole("heading", { name: "Weekend Edit" })).toBeInTheDocument();

    // Subtitle appears only once in the focus-viewer details
    expect(screen.getByText("Soft layers & relaxed ease")).toBeInTheDocument();

    // All 9 look pills exist in ring navigation
    const dialTabs = screen.getAllByRole("tab", { name: /^Look 0\d/ });
    expect(dialTabs).toHaveLength(9);
  });

  it("navigates between looks using next and previous buttons", () => {
    render(<LookbookViewer />);

    const nextBtn = screen.getByLabelText("Next look (Right Arrow)");
    fireEvent.click(nextBtn);

    // Look 02 heading visible in focus viewer
    expect(screen.getByRole("heading", { name: "Calm Living" })).toBeInTheDocument();
    // Counter in section-index is unique
    expect(screen.getByText("Look 02 / 09")).toBeInTheDocument();

    const prevBtn = screen.getByLabelText("Previous look (Left Arrow)");
    fireEvent.click(prevBtn);

    // Returned to Look 01
    expect(screen.getByRole("heading", { name: "Weekend Edit" })).toBeInTheDocument();
    expect(screen.getByText("Look 01 / 09")).toBeInTheDocument();
  });

  it("navigates directly when clicking a look pill", () => {
    render(<LookbookViewer />);

    const look3Pill = screen.getByRole("tab", { name: /Look 03: Studio Layers/i });
    fireEvent.click(look3Pill);

    expect(screen.getByRole("heading", { name: "Studio Layers" })).toBeInTheDocument();
    expect(screen.getByText("Look 03 / 09")).toBeInTheDocument();
  });

  it("supports keyboard arrow keys to navigate looks", () => {
    render(<LookbookViewer />);

    // Press ArrowRight to move to Look 02
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByRole("heading", { name: "Calm Living" })).toBeInTheDocument();

    // Press ArrowLeft to return to Look 01
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByRole("heading", { name: "Weekend Edit" })).toBeInTheDocument();
  });

  it("renders interactive item dots and displays product tooltips on interaction", () => {
    render(<LookbookViewer />);

    // Item dots for Look 01: Linen Shirt, Canvas Tote, Striped T-Shirt
    const shirtDot = screen.getByLabelText("Item: Linen Shirt");
    expect(shirtDot).toBeInTheDocument();

    // Click on item dot to open tooltip
    fireEvent.click(shirtDot);

    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent("Linen Shirt");
    expect(tooltip).toHaveTextContent("$68.00");
    expect(screen.getByRole("link", { name: "View piece →" })).toHaveAttribute("href", "/shop/linen-shirt");
  });

  it("renders product pills and links to product details", () => {
    render(<LookbookViewer />);

    expect(screen.getByText("Pieces in this look")).toBeInTheDocument();
    // Pills in product-pills section: check by role listitem names
    expect(screen.getByText("Canvas Tote")).toBeInTheDocument();
    expect(screen.getByText("Striped T-Shirt")).toBeInTheDocument();
  });

  it("switches to Grid view and displays all nine editorial looks", () => {
    render(<LookbookViewer />);

    const gridBtn = screen.getByRole("tab", { name: "Grid view" });
    fireEvent.click(gridBtn);

    expect(gridBtn).toHaveAttribute("aria-selected", "true");

    // All 9 look headings appear in grid cards (h3 elements)
    NINE_LOOKS.forEach((look) => {
      expect(screen.getByRole("heading", { name: look.title })).toBeInTheDocument();
    });

    // Clicking "Focus in ring" on Look 4 (index 3) switches back to ring view
    const focusButtons = screen.getAllByRole("button", { name: "Focus in ring" });
    expect(focusButtons).toHaveLength(9);
    fireEvent.click(focusButtons[3]); // Look 4

    expect(screen.getByRole("tab", { name: "Ring view" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("heading", { name: "Monochrome Ease" })).toBeInTheDocument();
  });

  it("announces look changes accessibly via aria-live status", () => {
    render(<LookbookViewer />);

    // The polite live region in .sr-only
    expect(
      screen.getByText("Viewing look 01 of 09: Weekend Edit"),
    ).toBeInTheDocument();
  });
});
