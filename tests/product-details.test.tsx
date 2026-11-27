import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { ProductDetailsClient } from "../app/products/[id]/product-details-client";
import { VirtualTryonStudio } from "../components/virtual-tryon-studio";
import { OOTFY_PRODUCTS } from "../lib/products";

let mockIsAuthenticated = true;
const mockOpenAuthModal = vi.fn();

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/products/OOT-PAN-001",
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock auth-context
vi.mock("../lib/auth-context", () => ({
  useAuth: () => ({
    user: mockIsAuthenticated
      ? { id: "u1", email: "patron@ootfy.com", fullName: "Atelier Patron", role: "customer" }
      : null,
    isAuthenticated: mockIsAuthenticated,
    isLoading: false,
    isAuthModalOpen: false,
    openAuthModal: mockOpenAuthModal,
    closeAuthModal: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
    authReason: "",
  }),
}));

describe("Product Details & Virtual Try-On Studio", () => {
  const sampleProduct = OOTFY_PRODUCTS[0]; // OOT-PAN-001 Ivory Panjabi

  beforeEach(() => {
    window.scrollTo = vi.fn();
    mockIsAuthenticated = true;
    mockOpenAuthModal.mockClear();
  });

  it("renders Patron Sign-In Required gate when not authenticated", () => {
    mockIsAuthenticated = false;

    render(
      <ProductDetailsClient
        product={sampleProduct}
        fallbackHero="/assets/products/jamdani-saree-clean.jpg"
        relatedProducts={OOTFY_PRODUCTS.slice(1, 5)}
      />
    );

    expect(screen.getByText("Patron Sign-In Required")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign In as Atelier Patron/i })).toBeInTheDocument();

    const signInBtn = screen.getByRole("button", { name: /Sign In as Atelier Patron/i });
    fireEvent.click(signInBtn);
    expect(mockOpenAuthModal).toHaveBeenCalled();
  });

  it("renders Product Details screen matching reference layout when authenticated", () => {
    mockIsAuthenticated = true;

    render(
      <ProductDetailsClient
        product={sampleProduct}
        fallbackHero="/assets/products/jamdani-saree-clean.jpg"
        relatedProducts={OOTFY_PRODUCTS.slice(1, 5)}
      />
    );

    // Product title and price
    expect(screen.getByRole("heading", { name: sampleProduct.name, level: 1 })).toBeInTheDocument();
    expect(screen.getAllByText(/2,490/i)[0]).toBeInTheDocument();

    // 4 canonical thumbnail tags
    expect(screen.getAllByText("01 / FRONT").length).toBeGreaterThan(0);
    expect(screen.getByText("02 / FIT")).toBeInTheDocument();
    expect(screen.getByText("03 / WEAVE")).toBeInTheDocument();
    expect(screen.getByText("04 / FOLDED")).toBeInTheDocument();

    // Action buttons
    expect(screen.getByRole("button", { name: /Add To Cart/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Buy Now/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /See It On You/i })).toBeInTheDocument();

    // Accordions
    expect(screen.getByText(/Fabric & Care/i)).toBeInTheDocument();
    expect(screen.getByText(/Shipping & Returns/i)).toBeInTheDocument();
  });

  it("clicking 'See It On You' opens the Virtual Try-On Studio", () => {
    mockIsAuthenticated = true;

    render(
      <ProductDetailsClient
        product={sampleProduct}
        fallbackHero="/assets/products/jamdani-saree-clean.jpg"
        relatedProducts={OOTFY_PRODUCTS.slice(1, 5)}
      />
    );

    const tryOnButton = screen.getByRole("button", { name: /See It On You/i });
    fireEvent.click(tryOnButton);

    // Virtual Studio header and controls
    expect(screen.getByText("SEE IT ON YOU")).toBeInTheDocument();
    expect(screen.getByText("OOTFY Atelier Studio — 2026")).toBeInTheDocument();

    // Camera view controls
    expect(screen.getByRole("button", { name: "VIDEO" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "FRONT" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "¾ VIEW" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "BACK" })).toBeInTheDocument();

    // Presets
    expect(screen.getByRole("button", { name: "Slim" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Regular" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Relaxed" })).toBeInTheDocument();

    // Try Another Outfit button
    expect(screen.getByRole("button", { name: /Try Another Outfit/i })).toBeInTheDocument();

    // Back to details button
    const backBtn = screen.getByRole("button", { name: /Back to Product Details/i });
    fireEvent.click(backBtn);

    // Returns to Product Details view
    expect(screen.getByRole("button", { name: /See It On You/i })).toBeInTheDocument();
  });

  it("VirtualTryonStudio allows switching camera views and body presets", () => {
    const onAddToCart = vi.fn();
    const onClose = vi.fn();
    const onSelectProduct = vi.fn();

    render(
      <VirtualTryonStudio
        product={sampleProduct}
        onClose={onClose}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        allProducts={OOTFY_PRODUCTS}
      />
    );

    // Switch view to 3/4 VIEW
    const threeQuarterBtn = screen.getByRole("button", { name: "¾ VIEW" });
    fireEvent.click(threeQuarterBtn);
    expect(threeQuarterBtn).toHaveClass("bg-[#243329]");

    // Switch Body Preset to Slim
    const slimBtn = screen.getByRole("button", { name: "Slim" });
    fireEvent.click(slimBtn);
    expect(slimBtn).toHaveClass("bg-[#243329]");

    // Add to cart in studio
    const addCartBtn = screen.getByRole("button", { name: /Add To Cart/i });
    fireEvent.click(addCartBtn);
    expect(onAddToCart).toHaveBeenCalledTimes(1);
  });
});
