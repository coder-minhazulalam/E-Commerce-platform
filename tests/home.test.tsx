import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "../app/page";

describe("HomePage OOTFY Luxury Storefront", () => {
  it("renders the primary brand header and navigation", () => {
    render(<HomePage />);
    const ootfyLogos = screen.getAllByText("OOTFY");
    expect(ootfyLogos.length).toBeGreaterThan(0);
    expect(screen.getByText(/WOVEN BY HAND, TAILORED FOR TIME/i)).toBeInTheDocument();
  });

  it("renders key editorial sections", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /New Arrivals/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /THE EID EDIT/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /SEE IT ON YOU/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Best Sellers/i })).toBeInTheDocument();
  });
});
