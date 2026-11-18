import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CollectionViewer } from "../components/collection-viewer";
import { NINE_COLLECTIONS } from "../lib/collections";

describe("CollectionViewer component", () => {
  it("renders with Ring view active by default and displays Collection 01", () => {
    render(<CollectionViewer />);

    // Mode toggle tabs
    expect(screen.getByRole("tab", { name: "Ring view" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Grid view" })).toHaveAttribute("aria-selected", "false");

    // Collection 01 heading
    expect(screen.getByRole("heading", { name: "The Morning Edit" })).toBeInTheDocument();

    // Subtitle appears in focus-viewer details
    expect(screen.getByText("Soft layers for unhurried starts")).toBeInTheDocument();

    // All 9 collection pills exist in ring navigation
    const dialTabs = screen.getAllByRole("tab", { name: /^Collection 0\d/ });
    expect(dialTabs).toHaveLength(9);
  });

  it("navigates between collections using next and previous buttons", () => {
    render(<CollectionViewer />);

    const nextBtn = screen.getByLabelText("Next collection (Right Arrow)");
    fireEvent.click(nextBtn);

    // Collection 02 heading visible in focus viewer
    expect(screen.getByRole("heading", { name: "Office Hours" })).toBeInTheDocument();
    expect(screen.getByText("Collection 02 / 09")).toBeInTheDocument();

    const prevBtn = screen.getByLabelText("Previous collection (Left Arrow)");
    fireEvent.click(prevBtn);

    // Returned to Collection 01
    expect(screen.getByRole("heading", { name: "The Morning Edit" })).toBeInTheDocument();
    expect(screen.getByText("Collection 01 / 09")).toBeInTheDocument();
  });

  it("navigates directly when clicking a collection pill", () => {
    render(<CollectionViewer />);

    const col3Pill = screen.getByRole("tab", { name: /Collection 03: Weekend Ease/i });
    fireEvent.click(col3Pill);

    expect(screen.getByRole("heading", { name: "Weekend Ease" })).toBeInTheDocument();
    expect(screen.getByText("Collection 03 / 09")).toBeInTheDocument();
  });

  it("supports keyboard arrow keys to navigate collections", () => {
    render(<CollectionViewer />);

    // Press ArrowRight to move to Collection 02
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByRole("heading", { name: "Office Hours" })).toBeInTheDocument();

    // Press ArrowLeft to return to Collection 01
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByRole("heading", { name: "The Morning Edit" })).toBeInTheDocument();
  });

  it("renders interactive item dots and displays product tooltips on interaction", () => {
    render(<CollectionViewer />);

    // Item dots for Collection 01: Wool Overcoat, Ribbed Crewneck, Oxford Shirt
    const overcoatDot = screen.getByLabelText("Item: Wool Overcoat");
    expect(overcoatDot).toBeInTheDocument();

    // Click on item dot to open tooltip
    fireEvent.click(overcoatDot);

    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent("The Wool Overcoat");
    expect(tooltip).toHaveTextContent("$285.00");
    expect(screen.getByRole("link", { name: "View piece →" })).toHaveAttribute(
      "href",
      "/products/wool-overcoat",
    );
  });

  it("renders product pills and links to product details", () => {
    render(<CollectionViewer />);

    expect(screen.getByText("Pieces in this collection")).toBeInTheDocument();
    expect(screen.getByText("The Wool Overcoat")).toBeInTheDocument();
    expect(screen.getByText("Ribbed Knit Crewneck")).toBeInTheDocument();
  });

  it("switches to Grid view and displays all nine editorial collections", () => {
    render(<CollectionViewer />);

    const gridBtn = screen.getByRole("tab", { name: "Grid view" });
    fireEvent.click(gridBtn);

    expect(gridBtn).toHaveAttribute("aria-selected", "true");

    // All 9 collection headings appear in grid cards
    NINE_COLLECTIONS.forEach((col) => {
      expect(screen.getByRole("heading", { name: col.title })).toBeInTheDocument();
    });

    // Clicking "Focus in ring" on Collection 4 (index 3) switches back to ring view
    const focusButtons = screen.getAllByRole("button", { name: "Focus in ring" });
    expect(focusButtons).toHaveLength(9);
    fireEvent.click(focusButtons[3]); // Collection 4

    expect(screen.getByRole("tab", { name: "Ring view" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("heading", { name: "The Layer Game" })).toBeInTheDocument();
  });

  it("announces collection changes accessibly via aria-live status", () => {
    render(<CollectionViewer />);

    expect(
      screen.getByText("Viewing collection 01 of 09: The Morning Edit"),
    ).toBeInTheDocument();
  });
});
