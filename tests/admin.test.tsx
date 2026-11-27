import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import AdminLoginPage from "../app/admin/login/page";
import AdminConsolePage from "../app/admin/page";
import { ADMIN_CONFIG } from "../lib/auth-context";

let mockIsAdmin = false;
let mockIsLoading = false;
const mockAdminLogin = vi.fn();
const mockLogout = vi.fn();

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/admin",
}));

// Mock auth-context
vi.mock("../lib/auth-context", () => ({
  ADMIN_CONFIG: {
    EMAIL: "admin@ootfy.com",
    PASSKEY: "OotfyAtelier2026!Admin",
    ROLE: "admin",
    NAME: "Atelier Director",
  },
  useAuth: () => ({
    user: mockIsAdmin
      ? { id: "usr_atelier_director", email: "admin@ootfy.com", fullName: "Atelier Director", role: "admin" }
      : null,
    isAuthenticated: mockIsAdmin,
    isAdmin: mockIsAdmin,
    isLoading: mockIsLoading,
    adminLogin: mockAdminLogin,
    logout: mockLogout,
    isAuthModalOpen: false,
    openAuthModal: vi.fn(),
    closeAuthModal: vi.fn(),
    login: vi.fn(),
    authReason: "",
  }),
}));

describe("Admin Authentication & Atelier Director Console", () => {
  beforeEach(() => {
    mockIsAdmin = false;
    mockIsLoading = false;
    mockAdminLogin.mockClear();
    mockLogout.mockClear();
  });

  it("renders Admin Login screen with Secret Passkey input", () => {
    render(<AdminLoginPage />);

    expect(screen.getByText("ROLE: ATELIER DIRECTOR")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Console Sign-In", level: 1 })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("admin@ootfy.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter secret passkey")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enter Director Console/i })).toBeInTheDocument();
  });

  it("admin login calls adminLogin with secret passkey", async () => {
    mockAdminLogin.mockResolvedValueOnce({ success: true });

    render(<AdminLoginPage />);

    const passkeyInput = screen.getByPlaceholderText("Enter secret passkey");
    fireEvent.change(passkeyInput, { target: { value: "OotfyAtelier2026!Admin" } });

    const submitBtn = screen.getByRole("button", { name: /Enter Director Console/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockAdminLogin).toHaveBeenCalledWith("admin@ootfy.com", "OotfyAtelier2026!Admin");
    });
  });

  it("blocks non-admin users from accessing /admin with Restricted Access gate", () => {
    mockIsAdmin = false;

    render(<AdminConsolePage />);

    expect(screen.getByText("ATELIER SECURITY GATE")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Restricted Access", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Sign In with Atelier Passkey/i })).toBeInTheDocument();
  });

  it("renders Atelier Director Console with metrics and tabs when user is admin", () => {
    mockIsAdmin = true;

    render(<AdminConsolePage />);

    // Top Header & Status
    expect(screen.getByText("Director Console")).toBeInTheDocument();
    expect(screen.getByText("Atelier Operations Overview")).toBeInTheDocument();

    // KPI Cards
    expect(screen.getByText("Gross Merchandise Value")).toBeInTheDocument();
    expect(screen.getByText("৳428,500")).toBeInTheDocument();
    expect(screen.getByText("Master Weavers Active")).toBeInTheDocument();

    // Tab buttons
    expect(screen.getByRole("button", { name: /Overview & KPIs/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Products/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Orders/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Fabric & Stock/i })).toBeInTheDocument();

    // Switch to Products tab
    const productsTab = screen.getByRole("button", { name: /^Products/i });
    fireEvent.click(productsTab);

    expect(screen.getByRole("heading", { name: /Masterworks Manager/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Masterwork/i })).toBeInTheDocument();
  });
});
