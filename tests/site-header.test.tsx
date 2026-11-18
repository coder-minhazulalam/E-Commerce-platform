import React from "react";
import { HeroUIProvider } from "@heroui/react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "../components/site-header";
import { LOOKBOOK_CUTS, imageProxyUrl, lookbookImage } from "../lib/assets";

function renderHeader() {
  return render(
    <HeroUIProvider>
      <SiteHeader />
    </HeroUIProvider>,
  );
}

describe("SiteHeader", () => {
  it("uses the owner-provided logo as the home link without retyping its wordmark", () => {
    renderHeader();

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("href", "/");
    expect(screen.getByRole("img", { name: "Brand logo" })).toBeInTheDocument();
  });

  it("exposes the primary navigation and discovery action", () => {
    renderHeader();

    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute("href", "/products");
    expect(screen.getByRole("link", { name: "Collections" })).toHaveAttribute("href", "/collections");
    expect(screen.getByRole("button", { name: "Shop the edit" })).toHaveAttribute("href", "/products");
  });
});

describe("lookbook assets", () => {
  it("builds proxied URLs for source campaign images", () => {
    const url = lookbookImage(0, 914);
    expect(url).toContain("https://images.higgs.ai/?default=1&output=webp&url=");
    expect(url).toContain("&w=914&q=85");
    expect(decodeURIComponent(new URL(url).searchParams.get("url") ?? "")).toContain(LOOKBOOK_CUTS[0]);
  });

  it("rejects an invalid look index and supports the reusable proxy helper", () => {
    expect(() => lookbookImage(9, 914)).toThrow(RangeError);
    expect(imageProxyUrl("campaign.png", 571)).toContain("&w=571&q=85");
  });
});
