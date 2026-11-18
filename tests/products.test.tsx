import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductGrid } from "../components/product-card";
import { formatPrice, productListUrl, type Product } from "../lib/products";

const sample: Product = { id: "p1", slug: "linen-shirt", name: "Linen shirt", category: "Shirts", description: "An easy layer.", price: 89, currency: "USD", imageIndex: 2, imageAlt: "Model wearing a pale linen shirt" };

describe("product API helpers", () => {
  it("builds the relative endpoint URL with only supplied contract parameters", () => {
    expect(productListUrl({ category: "Shirts", q: "linen", sort: "price-asc", page: 2, pageSize: 12 })).toBe("/api/products?category=Shirts&q=linen&sort=price-asc&page=2&pageSize=12");
    expect(productListUrl()).toBe("/api/products");
  });
  it("formats a product price using its currency", () => {
    expect(formatPrice(89, "USD")).toBe("$89.00");
  });
});

describe("ProductGrid", () => {
  it("announces loading and error states accessibly", () => {
    const { rerender } = render(<ProductGrid products={[]} state="loading" />);
    expect(screen.getByRole("status")).toHaveTextContent("Gathering the edit");
    rerender(<ProductGrid products={[]} state="error" />);
    expect(screen.getByRole("alert")).toHaveTextContent("could not be loaded");
  });
  it("explains an empty result and renders supplied product details", () => {
    const { rerender } = render(<ProductGrid products={[]} />);
    expect(screen.getByRole("status")).toHaveTextContent("No pieces match");
    rerender(<ProductGrid products={[sample]} />);
    expect(screen.getByRole("heading", { name: "Linen shirt" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: sample.imageAlt })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Linen shirt" })).toHaveAttribute("href", "/shop/linen-shirt");
  });
});
