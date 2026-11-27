"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Package,
  Layers,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Plus,
  Edit2,
  LogOut,
  ExternalLink,
  ChevronRight,
  Eye,
  Lock,
  KeyRound,
  Filter,
  Truck,
  Users,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { useAuth, ADMIN_CONFIG } from "../../lib/auth-context";
import { OOTFY_PRODUCTS, type OotfyProduct, formatPriceBDT } from "../../lib/products";
import { PRODUCT_IMAGE_MAP } from "../../components/product-card";

interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryCity: string;
  deliveryAddress: string;
  totalBDT: number;
  status: "Pending" | "Artisan Preparing" | "Dispatched" | "Delivered";
  createdAt: string;
  giftWrap: boolean;
  bespokeNotes?: string;
  items: Array<{
    productName: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
  }>;
}

const DEFAULT_ORDERS: AdminOrder[] = [
  {
    id: "ord_101",
    orderNumber: "OOT-91482",
    customerName: "Mahmudur Rahman",
    customerPhone: "+880 1711-892301",
    customerEmail: "mahmud@example.com",
    deliveryCity: "Gulshan-2, Dhaka",
    deliveryAddress: "House 14, Road 71, Gulshan-2, Dhaka 1212",
    totalBDT: 8990,
    status: "Artisan Preparing",
    createdAt: "Nov 27, 2026",
    giftWrap: true,
    bespokeNotes: "Sleeve length adjusted to 33.5 inches for festive wedding wear.",
    items: [
      {
        productName: "Embroidered Ivory Panjabi",
        size: "42 (L)",
        color: "Ivory",
        quantity: 1,
        price: 2490,
      },
      {
        productName: "Midnight Double-Breasted Wool Blazer",
        size: "40",
        color: "Midnight Blue",
        quantity: 1,
        price: 6500,
      },
    ],
  },
  {
    id: "ord_102",
    orderNumber: "OOT-84920",
    customerName: "Nusrat Jahan",
    customerPhone: "+880 1823-456789",
    customerEmail: "nusrat.j@example.com",
    deliveryCity: "Dhanmondi, Dhaka",
    deliveryAddress: "Apartment 5B, Road 9A, Dhanmondi",
    totalBDT: 14500,
    status: "Pending",
    createdAt: "Nov 28, 2026",
    giftWrap: true,
    bespokeNotes: "Signature gold wax seal packaging requested for anniversary gift.",
    items: [
      {
        productName: "Dhakai Muslin Gold Zari Jamdani Saree",
        size: "Standard 6.5m",
        color: "Antique Gold",
        quantity: 1,
        price: 14500,
      },
    ],
  },
  {
    id: "ord_103",
    orderNumber: "OOT-77319",
    customerName: "Farhan Tanvir",
    customerPhone: "+880 1912-334455",
    customerEmail: "farhan@tanvir.org",
    deliveryCity: "Chittagong",
    deliveryAddress: "Nasirabad Housing Society, Road 3, Chittagong",
    totalBDT: 3450,
    status: "Dispatched",
    createdAt: "Nov 26, 2026",
    giftWrap: false,
    bespokeNotes: "Deliver before 5 PM via Sundarban Express.",
    items: [
      {
        productName: "Minimalist Slate Grey Panjabi",
        size: "40 (M)",
        color: "Slate Grey",
        quantity: 1,
        price: 3450,
      },
    ],
  },
];

export default function AdminConsolePage() {
  const router = useRouter();
  const { user, isAdmin, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "inventory" | "security">("overview");

  // Live products state
  const [productsList, setProductsList] = useState<OotfyProduct[]>(OOTFY_PRODUCTS);
  const [productSearch, setProductSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Orders state
  const [orders, setOrders] = useState<AdminOrder[]>(DEFAULT_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  // New product modal
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("Panjabi");
  const [newProductPrice, setNewProductPrice] = useState(2500);
  const [newProductFabric, setNewProductFabric] = useState("Handloom Khadi Cotton");

  // Inventory sizing simulation
  const [inventoryStock, setInventoryStock] = useState<Record<string, Record<string, number>>>({
    "OOT-PAN-001": { S: 8, M: 14, L: 4, XL: 2, XXL: 5 },
    "OOT-SAR-002": { "Standard 6.5m": 3 },
    "OOT-BLZ-003": { "38": 4, "40": 6, "42": 2, "44": 1 },
    "OOT-PAN-004": { S: 10, M: 12, L: 8, XL: 6, XXL: 3 },
  });

  // Guard: if unauthenticated or not admin, show gate
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111914] text-[#fcf9f4] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#fed892] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest text-[#a2aca3]">Verifying Atelier Credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#111914] text-[#fcf9f4] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#16211a] border border-white/15 p-8 text-center shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-red-950/60 border border-red-700/50 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-red-400" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#fed892] font-semibold block mb-1">
            ATELIER SECURITY GATE
          </span>
          <h1 className="font-serif text-2xl text-white mb-2">Restricted Access</h1>
          <p className="text-xs text-[#a2aca3] leading-relaxed mb-6">
            The Atelier Director Console requires secret passkey authorization. Non-administrative users cannot inspect or modify inventory records.
          </p>
          <div className="space-y-3">
            <Link
              href="/admin/login"
              className="w-full py-3 bg-[#fed892] hover:bg-[#eac073] text-[#111914] text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all block"
            >
              Sign In with Atelier Passkey
            </Link>
            <Link
              href="/"
              className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-widest font-medium flex items-center justify-center transition-all block border border-white/10"
            >
              Return to Public Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filtered products
  const filteredProducts = productsList.filter((p) => {
    const matchQuery =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase());
    const matchCategory = categoryFilter === "All" || p.category === categoryFilter;
    return matchQuery && matchCategory;
  });

  const handleUpdateProductStatus = (id: string, newStatus: OotfyProduct["stock_status"]) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock_status: newStatus } : p))
    );
  };

  const handleUpdateProductBadge = (id: string, newBadge: OotfyProduct["badge"]) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, badge: newBadge } : p))
    );
  };

  const handleUpdateOrderStatus = (orderId: string, nextStatus: AdminOrder["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: nextStatus } : null));
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `OOT-${newProductCategory.slice(0, 3).toUpperCase()}-${String(productsList.length + 1).padStart(3, "0")}`;
    const created: OotfyProduct = {
      id: newId,
      name: newProductName,
      subtitle_or_tagline: "Bespoke Dhaka Atelier Edition",
      category: newProductCategory,
      collection: "Heritage Festive Edit",
      gender: newProductCategory === "Saree" || newProductCategory === "Lehenga" ? "Women" : "Men",
      price_bdt: newProductPrice,
      original_price_bdt: null,
      description: `Handcrafted in Bangladesh featuring pristine ${newProductFabric}. Designed for timeless sartorial elegance.`,
      fabric: newProductFabric,
      craft_technique: "Handloom Weaving & Atelier Tailoring",
      colors: [{ name: "Classic", hex: "#1c1c19", is_default: true }],
      badge: "NEW",
      stock_status: "In Stock",
      sizes: ["S", "M", "L", "XL"],
      images: {
        hero_flatlay: "/assets/products/jamdani-saree-clean.jpg",
        hanging_view: "/assets/products/jamdani-saree-clean.jpg",
        fabric_macro_detail: "/assets/eid/eid-muslin-detail.jpg",
        back_view: "/assets/products/jamdani-saree-clean.jpg",
        folded_view: "/assets/eid/eid-folded-silks.jpg",
      },
      has_3d_view: true,
      has_virtual_try_on: true,
      avatar_preview_id: "preview_mannequin",
      fit_recommendation: "True to size. Bespoke tailoring available.",
    };

    setProductsList([created, ...productsList]);
    setIsAddProductOpen(false);
    setNewProductName("");
  };

  return (
    <div className="min-h-screen bg-[#0e1611] text-[#fcf9f4] flex flex-col font-sans selection:bg-[#fed892] selection:text-[#0e1611]">
      {/* Top Director Bar */}
      <header className="sticky top-0 z-40 bg-[#142018]/95 backdrop-blur-xl border-b border-white/10 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-serif text-2xl tracking-[0.25em] uppercase text-white font-medium">
              OOTFY
            </span>
            <span className="px-2 py-0.5 bg-[#755a21]/40 border border-[#755a21] text-[#fed892] text-[10px] uppercase tracking-widest font-semibold">
              Director Console
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-black/20 p-1 border border-white/10 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === "overview" ? "bg-[#243329] text-[#fed892] font-semibold shadow" : "text-[#a2aca3] hover:text-white"
              }`}
            >
              Overview & KPIs
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("products")}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === "products" ? "bg-[#243329] text-[#fed892] font-semibold shadow" : "text-[#a2aca3] hover:text-white"
              }`}
            >
              Products ({productsList.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === "orders" ? "bg-[#243329] text-[#fed892] font-semibold shadow" : "text-[#a2aca3] hover:text-white"
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("inventory")}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === "inventory" ? "bg-[#243329] text-[#fed892] font-semibold shadow" : "text-[#a2aca3] hover:text-white"
              }`}
            >
              Fabric & Stock
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeTab === "security" ? "bg-[#243329] text-[#fed892] font-semibold shadow" : "text-[#a2aca3] hover:text-white"
              }`}
            >
              Security
            </button>
          </nav>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#a2aca3] hover:text-[#fed892] transition-colors"
          >
            <span>Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-2 pl-4 border-l border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#243329] border border-[#755a21] flex items-center justify-center text-xs font-semibold text-[#fed892]">
              AD
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-white leading-tight">Atelier Director</p>
              <p className="text-[10px] text-[#fed892] font-mono leading-tight">admin@ootfy.com</p>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/admin/login");
              }}
              title="Sign Out"
              className="p-1.5 text-[#a2aca3] hover:text-red-400 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Tabbed Content */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 lg:px-12 py-8">
        {/* TAB 1: OVERVIEW & KPIS */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#fed892] font-semibold">
                OOTFY EXECUTIVE SUITE
              </span>
              <h1 className="font-serif text-3xl text-white mt-1">Atelier Operations Overview</h1>
              <p className="text-xs text-[#a2aca3] mt-1">Real-time status of Dhaka handloom production, VIP dispatches, and inventory health.</p>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-[#142018] border border-white/10 p-5 rounded-lg shadow-sm">
                <div className="flex items-center justify-between text-[#a2aca3] text-xs mb-3">
                  <span>Gross Merchandise Value</span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-semibold text-white">৳428,500</div>
                <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                  <span>+18.4%</span>
                  <span className="text-[#737873]">from last 30 days</span>
                </p>
              </div>

              <div className="bg-[#142018] border border-white/10 p-5 rounded-lg shadow-sm">
                <div className="flex items-center justify-between text-[#a2aca3] text-xs mb-3">
                  <span>Active Atelier Orders</span>
                  <ShoppingBag className="w-4 h-4 text-[#fed892]" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-semibold text-white">{orders.length + 31}</div>
                <p className="text-[11px] text-[#fed892] mt-2">
                  <span>3 Pending VIP Review</span>
                </p>
              </div>

              <div className="bg-[#142018] border border-white/10 p-5 rounded-lg shadow-sm">
                <div className="flex items-center justify-between text-[#a2aca3] text-xs mb-3">
                  <span>Master Weavers Active</span>
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-semibold text-white">12 Artisans</div>
                <p className="text-[11px] text-[#a2aca3] mt-2">Tangail, Comilla, Narayanganj</p>
              </div>

              <div className="bg-[#142018] border border-white/10 p-5 rounded-lg shadow-sm">
                <div className="flex items-center justify-between text-[#a2aca3] text-xs mb-3">
                  <span>Average Order Value</span>
                  <Sparkles className="w-4 h-4 text-[#fed892]" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-semibold text-white">৳12,600</div>
                <p className="text-[11px] text-[#737873] mt-2">High-margin bespoke pieces</p>
              </div>
            </div>

            {/* Two-Column Middle Section: Recent Orders & Stock Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Recent Orders Pipeline (7 cols) */}
              <div className="lg:col-span-7 bg-[#142018] border border-white/10 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg text-white">Incoming Order Pipeline</h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab("orders")}
                    className="text-xs text-[#fed892] hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="p-3.5 bg-black/20 border border-white/10 rounded flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[#fed892] font-semibold">{order.orderNumber}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                              order.status === "Pending"
                                ? "bg-amber-900/60 text-amber-200"
                                : order.status === "Artisan Preparing"
                                ? "bg-blue-900/60 text-blue-200"
                                : "bg-emerald-900/60 text-emerald-200"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-white font-medium mt-1">{order.customerName}</p>
                        <p className="text-[11px] text-[#737873]">{order.deliveryCity} · {order.items.length} items</p>
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-sm font-semibold text-white">
                          {formatPriceBDT(order.totalBDT)}
                        </span>
                        <p className="text-[10px] text-[#737873] mt-0.5">{order.createdAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Low Stock / Craft Reorder Feeds (5 cols) */}
              <div className="lg:col-span-5 bg-[#142018] border border-white/10 p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4 text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                  <h3 className="font-serif text-lg text-white">Atelier Stock Alerts</h3>
                </div>
                <p className="text-xs text-[#a2aca3] mb-4">Garments nearing critical re-loom thresholds:</p>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-amber-950/30 border border-amber-900/50 rounded flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Natural Mulberry Silk Tangail Saree</p>
                      <p className="text-[10px] text-amber-400">Only 2 handwoven drapes remaining in Tangail</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("products")}
                      className="px-2.5 py-1 bg-[#243329] text-[#fed892] text-[10px] uppercase tracking-wider rounded font-semibold"
                    >
                      Restock
                    </button>
                  </div>
                  <div className="p-3 bg-amber-950/30 border border-amber-900/50 rounded flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Embroidered Ivory Panjabi (Size 42)</p>
                      <p className="text-[10px] text-amber-400">Only 4 master pieces in Comilla warehouse</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("inventory")}
                      className="px-2.5 py-1 bg-[#243329] text-[#fed892] text-[10px] uppercase tracking-wider rounded font-semibold"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#fed892] font-semibold">
                  CATALOG INVENTORY
                </span>
                <h1 className="font-serif text-3xl text-white mt-1">Masterworks Manager ({productsList.length})</h1>
              </div>

              <button
                type="button"
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2.5 bg-[#fed892] hover:bg-[#eac073] text-[#111914] text-xs uppercase tracking-widest font-bold flex items-center gap-2 rounded transition-all cursor-pointer self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Add Masterwork</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#142018] p-4 border border-white/10 rounded-lg">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-[#737873] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter masterworks by title, weave, or SKU..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#0e1611] border border-white/15 text-xs text-white placeholder:text-[#525a53] rounded focus:outline-none focus:border-[#fed892]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-[#a2aca3]">Category:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-[#0e1611] border border-white/15 text-xs text-white px-3 py-2 rounded focus:outline-none focus:border-[#fed892]"
                >
                  <option value="All">All Categories</option>
                  <option value="Panjabi">Panjabi</option>
                  <option value="Saree">Saree</option>
                  <option value="Blazer">Blazer / Suits</option>
                  <option value="Trousers">Trousers</option>
                  <option value="Shirt">Shirts</option>
                  <option value="Lehenga">Lehenga</option>
                </select>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-[#142018] border border-white/10 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs text-white">
                <thead className="bg-black/30 border-b border-white/10 text-[10px] uppercase tracking-wider text-[#a2aca3]">
                  <tr>
                    <th className="p-4">Masterwork</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price (BDT)</th>
                    <th className="p-4">Badge</th>
                    <th className="p-4">Stock Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredProducts.map((product) => {
                    const img =
                      PRODUCT_IMAGE_MAP[product.id] ||
                      product.images?.hero_flatlay ||
                      "/assets/products/jamdani-saree-clean.jpg";

                    return (
                      <tr key={product.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-12 bg-black/40 border border-white/10 rounded overflow-hidden shrink-0">
                              <Image
                                src={img}
                                alt={product.name}
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-serif text-sm font-medium text-white">{product.name}</p>
                              <p className="text-[10px] text-[#737873] font-mono">{product.id} · {product.fabric}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-[#a2aca3]">{product.category}</td>
                        <td className="p-4 font-serif font-semibold text-[#fed892]">
                          {formatPriceBDT(product.price_bdt)}
                        </td>
                        <td className="p-4">
                          <select
                            value={product.badge || "NONE"}
                            onChange={(e) =>
                              handleUpdateProductBadge(
                                product.id,
                                e.target.value === "NONE" ? undefined : (e.target.value as any)
                              )
                            }
                            className="bg-[#0e1611] border border-white/15 text-[11px] text-white px-2 py-1 rounded"
                          >
                            <option value="NONE">None</option>
                            <option value="NEW">NEW</option>
                            <option value="LIMITED">LIMITED</option>
                            <option value="EXCLUSIVE">EXCLUSIVE</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <select
                            value={product.stock_status}
                            onChange={(e) =>
                              handleUpdateProductStatus(
                                product.id,
                                e.target.value as OotfyProduct["stock_status"]
                              )
                            }
                            className={`border text-[11px] px-2 py-1 rounded font-semibold ${
                              product.stock_status === "In Stock"
                                ? "bg-emerald-950/60 border-emerald-700 text-emerald-300"
                                : product.stock_status === "Low Stock"
                                ? "bg-amber-950/60 border-amber-700 text-amber-300"
                                : "bg-red-950/60 border-red-700 text-red-300"
                            }`}
                          >
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Made to Order">Made to Order</option>
                            <option value="Sold Out">Sold Out</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <Link
                            href={`/products/${product.id}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-[#fed892] hover:underline text-[11px]"
                          >
                            <span>Inspect</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Modal: Add New Product */}
            {isAddProductOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                <div className="w-full max-w-lg bg-[#142018] border border-white/20 p-6 rounded-lg shadow-2xl">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                    <h3 className="font-serif text-lg text-white">Add New Atelier Masterwork</h3>
                    <button
                      type="button"
                      onClick={() => setIsAddProductOpen(false)}
                      className="text-[#a2aca3] hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-[#a2aca3] mb-1">Masterwork Name *</label>
                      <input
                        type="text"
                        required
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        placeholder="e.g. Royal Muslin Gold Panjabi"
                        className="w-full p-2.5 bg-[#0e1611] border border-white/15 text-white rounded focus:outline-none focus:border-[#fed892]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#a2aca3] mb-1">Category *</label>
                        <select
                          value={newProductCategory}
                          onChange={(e) => setNewProductCategory(e.target.value)}
                          className="w-full p-2.5 bg-[#0e1611] border border-white/15 text-white rounded focus:outline-none"
                        >
                          <option value="Panjabi">Panjabi</option>
                          <option value="Saree">Saree</option>
                          <option value="Blazer">Blazer</option>
                          <option value="Trousers">Trousers</option>
                          <option value="Shirt">Shirt</option>
                          <option value="Lehenga">Lehenga</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[#a2aca3] mb-1">Price (BDT) *</label>
                        <input
                          type="number"
                          required
                          value={newProductPrice}
                          onChange={(e) => setNewProductPrice(Number(e.target.value))}
                          className="w-full p-2.5 bg-[#0e1611] border border-white/15 text-white rounded focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#a2aca3] mb-1">Fabric & Provenance *</label>
                      <input
                        type="text"
                        required
                        value={newProductFabric}
                        onChange={(e) => setNewProductFabric(e.target.value)}
                        placeholder="e.g. Hand-spun Comilla Khadi"
                        className="w-full p-2.5 bg-[#0e1611] border border-white/15 text-white rounded focus:outline-none"
                      />
                    </div>
                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddProductOpen(false)}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#fed892] text-[#111914] font-bold rounded cursor-pointer"
                      >
                        Publish to Atelier
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ORDERS & FULFILLMENT PIPELINE */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#fed892] font-semibold">
                DISPATCH PIPELINE
              </span>
              <h1 className="font-serif text-3xl text-white mt-1">Orders & Tailoring Fulfillment</h1>
              <p className="text-xs text-[#a2aca3] mt-1">Supervise atelier bespoke orders, courier handovers, and packaging preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Order List */}
              <div className="lg:col-span-7 space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrder(ord)}
                    className={`p-5 rounded-lg border transition-all cursor-pointer ${
                      selectedOrder?.id === ord.id
                        ? "bg-[#18261d] border-[#fed892] shadow-lg"
                        : "bg-[#142018] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-[#fed892]">{ord.orderNumber}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                            ord.status === "Pending"
                              ? "bg-amber-900/60 text-amber-200"
                              : ord.status === "Artisan Preparing"
                              ? "bg-blue-900/60 text-blue-200"
                              : ord.status === "Dispatched"
                              ? "bg-purple-900/60 text-purple-200"
                              : "bg-emerald-900/60 text-emerald-200"
                          }`}
                        >
                          {ord.status}
                        </span>
                        {ord.giftWrap && (
                          <span className="px-1.5 py-0.5 bg-[#755a21] text-white text-[9px] uppercase font-semibold rounded">
                            Gift Wrapped
                          </span>
                        )}
                      </div>
                      <span className="font-serif text-base font-semibold text-white">
                        {formatPriceBDT(ord.totalBDT)}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-[#a2aca3]">
                      <div>
                        <p className="text-white font-medium">{ord.customerName}</p>
                        <p className="text-[11px] text-[#737873]">{ord.customerPhone} · {ord.deliveryCity}</p>
                      </div>
                      <p className="text-[11px] text-[#737873]">{ord.createdAt}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Detail Panel */}
              <div className="lg:col-span-5 bg-[#142018] border border-white/10 p-6 rounded-lg sticky top-24 self-start">
                {selectedOrder ? (
                  <div className="space-y-5 text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <span className="text-[10px] text-[#737873] uppercase tracking-wider">Order Inspection</span>
                        <h3 className="font-serif text-xl text-white font-semibold">{selectedOrder.orderNumber}</h3>
                      </div>
                      <span className="font-mono text-[#fed892] font-semibold">{selectedOrder.createdAt}</span>
                    </div>

                    <div>
                      <p className="text-[#737873] text-[10px] uppercase tracking-wider">Patron Details</p>
                      <p className="text-sm font-semibold text-white mt-0.5">{selectedOrder.customerName}</p>
                      <p className="text-xs text-[#a2aca3]">{selectedOrder.customerEmail} · {selectedOrder.customerPhone}</p>
                      <p className="text-xs text-[#a2aca3] mt-1 bg-black/20 p-2 rounded border border-white/5">
                        📍 {selectedOrder.deliveryAddress}
                      </p>
                    </div>

                    {selectedOrder.bespokeNotes && (
                      <div className="bg-[#755a21]/15 border border-[#755a21]/40 p-3 rounded text-amber-200">
                        <p className="font-semibold text-[10px] uppercase tracking-wider text-[#fed892]">Bespoke Atelier Notes</p>
                        <p className="mt-1 text-xs">{selectedOrder.bespokeNotes}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-[#737873] text-[10px] uppercase tracking-wider mb-2">Garments ({selectedOrder.items.length})</p>
                      <div className="space-y-2">
                        {selectedOrder.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2 bg-black/20 rounded border border-white/5">
                            <div>
                              <p className="font-medium text-white">{it.productName}</p>
                              <p className="text-[11px] text-[#737873]">Size: {it.size} · Color: {it.color} (Qty: {it.quantity})</p>
                            </div>
                            <span className="font-serif font-semibold text-[#fed892]">{formatPriceBDT(it.price * it.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status Update Actions */}
                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <p className="text-[#737873] text-[10px] uppercase tracking-wider">Update Pipeline Status</p>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdateOrderStatus(selectedOrder.id, "Artisan Preparing")}
                          className="py-2 bg-blue-950/80 hover:bg-blue-900 border border-blue-700 text-blue-200 text-[10px] uppercase font-semibold rounded transition-colors cursor-pointer"
                        >
                          Preparing
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateOrderStatus(selectedOrder.id, "Dispatched")}
                          className="py-2 bg-purple-950/80 hover:bg-purple-900 border border-purple-700 text-purple-200 text-[10px] uppercase font-semibold rounded transition-colors cursor-pointer"
                        >
                          Dispatch
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateOrderStatus(selectedOrder.id, "Delivered")}
                          className="py-2 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700 text-emerald-200 text-[10px] uppercase font-semibold rounded transition-colors cursor-pointer"
                        >
                          Delivered
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-16 text-center text-[#737873]">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">Select an order from the left to inspect garments, packaging notes, and dispatch status.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: INVENTORY & SIZE MATRIX */}
        {activeTab === "inventory" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#fed892] font-semibold">
                REAL-TIME STOCKS
              </span>
              <h1 className="font-serif text-3xl text-white mt-1">Fabric & Sizing Matrix</h1>
              <p className="text-xs text-[#a2aca3] mt-1">Manage size inventory across all physical workshops in Bangladesh.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(inventoryStock).map(([productId, sizes]) => {
                const prod = productsList.find((p) => p.id === productId);
                if (!prod) return null;

                return (
                  <div key={productId} className="bg-[#142018] border border-white/10 p-5 rounded-lg space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <h3 className="font-serif text-base text-white font-medium">{prod.name}</h3>
                        <p className="text-[11px] text-[#fed892] font-mono">{productId} · {prod.fabric}</p>
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-[#243329] text-[#fed892] rounded">
                        {prod.stock_status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {Object.entries(sizes).map(([sz, qty]) => (
                        <div key={sz} className="flex items-center justify-between p-2 bg-black/20 rounded text-xs">
                          <span className="font-semibold text-white">Size: {sz}</span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                setInventoryStock((prev) => ({
                                  ...prev,
                                  [productId]: {
                                    ...prev[productId],
                                    [sz]: Math.max(0, qty - 1),
                                  },
                                }))
                              }
                              className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
                            >
                              -
                            </button>
                            <span className="font-mono text-sm w-8 text-center text-[#fed892] font-semibold">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setInventoryStock((prev) => ({
                                  ...prev,
                                  [productId]: {
                                    ...prev[productId],
                                    [sz]: qty + 1,
                                  },
                                }))
                              }
                              className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: SECURITY & CREDENTIALS */}
        {activeTab === "security" && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#fed892] font-semibold">
                ROLE-BASED ACCESS CONTROL
              </span>
              <h1 className="font-serif text-3xl text-white mt-1">Atelier Security & Passkey</h1>
              <p className="text-xs text-[#a2aca3] mt-1">Confidential credentials assigned to the OOTFY Atelier Director.</p>
            </div>

            <div className="bg-[#142018] border border-white/10 p-6 rounded-lg space-y-5 text-xs">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-full bg-[#243329] border border-[#755a21] flex items-center justify-center text-[#fed892]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white">Active Administrative Account</h3>
                  <p className="text-emerald-400 text-[11px] font-medium">● Verified Atelier Master Director Privileges</p>
                </div>
              </div>

              <div className="space-y-3 font-mono">
                <div className="p-3 bg-black/30 rounded border border-white/5 flex justify-between items-center">
                  <span className="text-[#a2aca3]">Authorized Email:</span>
                  <span className="text-[#fed892] font-semibold">{ADMIN_CONFIG.EMAIL}</span>
                </div>
                <div className="p-3 bg-black/30 rounded border border-white/5 flex justify-between items-center">
                  <span className="text-[#a2aca3]">Secret Passkey:</span>
                  <span className="text-[#fed892] font-semibold">{ADMIN_CONFIG.PASSKEY}</span>
                </div>
                <div className="p-3 bg-black/30 rounded border border-white/5 flex justify-between items-center">
                  <span className="text-[#a2aca3]">Assigned Role:</span>
                  <span className="text-white uppercase font-bold">{ADMIN_CONFIG.ROLE}</span>
                </div>
              </div>

              <div className="p-4 bg-[#755a21]/20 border border-[#755a21]/40 rounded text-[11px] text-[#fed892] leading-relaxed">
                <p className="font-bold uppercase tracking-wider mb-1">Administrative Confidentiality Note:</p>
                This email and passkey grant complete read/write access to customer orders, catalog prices, and handloom inventory. Do not share outside of atelier executive management.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
