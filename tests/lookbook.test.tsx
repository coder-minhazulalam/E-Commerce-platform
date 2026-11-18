import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LookbookViewer } from "../components/lookbook-viewer";
import { NINE_LOOKS } from "../lib/looks";

describe("LookbookViewer component", () => {
  it("renders with Ring view active by default and displays Look 01", () => {
    render(<LookbookViewer />);

    expect(screen.getByRole("tab", { name: "Ring view" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Grid view" })).toHaveAttribute("aria-selected", "false");

    // Check Look 01 title & details
    expect(screen.getByText("Weekend Edit")).toBeInTheDocument();
    expect(screen.getByText(/Soft layers & relaxed ease/i)).toBeInTheDocument();

    // Check all 9 look pills exist in ring navigation
    const dialTabs = screen.getAllByRole("tab", { name: /^Look 0\d/ });
    expect(dialTabs).toHaveLength(9);
  });

  it("navigates between looks using next and previous buttons", () => {
    render(<LookbookViewer />);

    const nextBtn = screen.getByLabelText("Next look (Right Arrow)");
    fireEvent.click(nextBtn);

    // Look 02 should now be displayed
    expect(screen.getByText("Calm Living")).toBeInTheDocument();
    expect(screen.getByText(/Look 02 \/ 09/i)).toBeInTheDocument();

    const prevBtn = screen.getByLabelText("Previous look (Left Arrow)");
    fireEvent.click(prevBtn);

    // Returned to Look 01
    expect(screen.getByText("Weekend Edit")).toBeInTheDocument();
  });

  it("navigates directly when clicking a look pill", () => {
    render(<LookbookViewer />);

    const look3Pill = screen.getByRole("tab", { name: /Look 03: Studio Layers/i });
    fireEvent.click(look3Pill);

    expect(screen.getByText("Studio Layers")).toBeInTheDocument();
    expect(screen.getByText(/Look 03 \/ 09/i)).toBeInTheDocument();
  });

  it("supports keyboard arrow keys to navigate looks", () => {
    render(<LookbookViewer />);

    // Press ArrowRight to move to Look 02
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByText("Calm Living")).toBeInTheDocument();

    // Press ArrowLeft to return to Look 01
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByText("Weekend Edit")).toBeInTheDocument();
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
    expect(screen.getByText("Canvas Tote")).toBeInTheDocument();
    expect(screen.getByText("Striped T-Shirt")).toBeInTheDocument();
  });

  it("switches to Grid view and displays all nine editorial looks", () => {
    render(<LookbookViewer />);

    const gridBtn = screen.getByRole("tab", { name: "Grid view" });
    fireEvent.click(gridBtn);

    expect(gridBtn).toHaveAttribute("aria-selected", "true");

    // All 9 looks titles should be in document
    NINE_LOOKS.forEach((look) => {
      expect(screen.getByRole("heading", { name: look.title })).toBeInTheDocument();
    });

    // Clicking "Focus in ring" on Look 4 switches back to ring view
    const focusButtons = screen.getAllByRole("button", { name: "Focus in ring" });
    expect(focusButtons).toHaveLength(9);
    fireEvent.click(focusButtons[3]); // Look 4

    expect(screen.getByRole("tab", { name: "Ring view" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Monochrome Ease")).toBeInTheDocument();
  });

  it("announces look changes accessibly via aria-live status", () => {
    render(<LookbookViewer />);

    expect(
      screen.getByText("Viewing look 01 of 09: Weekend Edit", { selector: ".sr-only" }),
    ).toBeInTheDocument();
  });
});
