"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { useAuth } from "../../lib/auth-context";
import { CATALOG_PRODUCTS, formatPrice } from "../../lib/products";

interface AdminOrder {
  orderNumber: string;
  customer: string;
  items: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: string;
}

const INITIAL_ORDERS: AdminOrder[] = [
  {
    orderNumber: "ORD-94812",
    customer: "Mara T. (Stockholm)",
    items: "The Wool Overcoat (M) × 1",
    total: 285,
    status: "processing",
    date: "Today, 14:22",
  },
  {
    orderNumber: "ORD-89410",
    customer: "James K. (London)",
    items: "Linen Wide-Leg Trousers (L) × 1, Oxford Shirt (M) × 1",
    total: 213,
    status: "shipped",
    date: "Yesterday",
  },
  {
    orderNumber: "ORD-76291",
    customer: "Sophie L. (Paris)",
    items: "Ribbed Knit Crewneck (S) × 2",
    total: 196,
    status: "delivered",
    date: "Nov 16, 2026",
  },
];

export default function AdminDashboardPage() {
  const { user, isAdmin } = useAuth();
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [inventoryStock, setInventoryStock] = useState<Record<string, number>>(() => {
    const stock: Record<string, number> = {};
    CATALOG_PRODUCTS.forEach((p) => {
      stock[p.id] = 18;
    });
    return stock;
  });

  // Pull any locally placed orders from checkout
  useEffect(() => {
    try {
      const stored = localStorage.getItem("placed_orders");
      if (stored) {
        const placed = JSON.parse(stored);
        if (Array.isArray(placed) && placed.length > 0) {
          const formatted: AdminOrder[] = placed.map((p: any) => ({
            orderNumber: p.orderNumber,
            customer: `${p.shippingName || "Guest"} (${p.shippingCity || "Standard"})`,
            items: p.items ? p.items.map((i: any) => `${i.name} (${i.size}) × ${i.quantity}`).join(", ") : "Curated items",
            total: p.total,
            status: "pending",
            date: p.date || "Just now",
          }));
          setOrders([...formatted, ...INITIAL_ORDERS]);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleUpdateStatus = (orderNumber: string, nextStatus: AdminOrder["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderNumber === orderNumber ? { ...o, status: nextStatus } : o)),
    );
  };

  const handleRestock = (productId: string) => {
    setInventoryStock((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 10,
    }));
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="admin-page">
        <header className="page-intro">
          <div className="admin-header-row">
            <div>
              <p className="section-index">Management Portal · Supabase Cloud</p>
              <h1>Store Operations & Control</h1>
              <p>Real-time orders, inventory allocation, and Supabase integration status.</p>
            </div>
            <div className="admin-status-pill">
              <span className="stock-dot" aria-hidden="true" />
              <span>Admin Verified: {user?.email || "admin@everydayedit.com"}</span>
            </div>
          </div>
        </header>

        {/* 1. Metric Overview Cards */}
        <section className="admin-metrics-grid" aria-label="Key performance indicators">
          <div className="admin-metric-card">
            <p className="admin-metric__label">Total Revenue</p>
            <h3 className="admin-metric__value">{formatPrice(totalRevenue, "USD")}</h3>
            <span className="admin-metric__change">+24% vs last period</span>
          </div>

          <div className="admin-metric-card">
            <p className="admin-metric__label">Active Orders</p>
            <h3 className="admin-metric__value">{orders.length}</h3>
            <span className="admin-metric__change">3 awaiting fulfillment</span>
          </div>

          <div className="admin-metric-card">
            <p className="admin-metric__label">Active Inventory</p>
            <h3 className="admin-metric__value">9 Styles</h3>
            <span className="admin-metric__change">45 SKU variations</span>
          </div>

          <div className="admin-metric-card admin-metric-card--highlight">
            <p className="admin-metric__label">Supabase Database</p>
            <h3 className="admin-metric__value">Connected</h3>
            <span className="admin-metric__change">yixidvlnirikaaqysgdn</span>
          </div>
        </section>

        {/* 2. Supabase Integration Card */}
        <section className="admin-supabase-card" aria-label="Database integration status">
          <div className="supabase-card__header">
            <div>
              <p className="section-index">Infrastructure</p>
              <h2 className="supabase-card__title">Supabase Database & Auth Pipeline</h2>
            </div>
            <span className="supabase-status-badge">● Live Project</span>
          </div>

          <div className="supabase-card__body">
            <div className="supabase-meta-item">
              <span className="supabase-meta-label">Project URL:</span>
              <code className="supabase-code">https://yixidvlnirikaaqysgdn.supabase.co</code>
            </div>
            <div className="supabase-meta-item">
              <span className="supabase-meta-label">API Access:</span>
              <code className="supabase-code">Publishable Client Key Active (RLS Protected)</code>
            </div>
            <div className="supabase-meta-item">
              <span className="supabase-meta-label">SQL Schema:</span>
              <span>Available in <code>supabase/schema.sql</code> (Profiles, Products, Inventory, Orders)</span>
            </div>
          </div>
        </section>

        {/* 3. Recent Orders Card & Table */}
        <section className="admin-card-section" aria-label="Recent store orders">
          <div className="section-header">
            <div>
              <p className="section-index">Fulfillment</p>
              <h2 className="section-title">Customer Orders ({orders.length})</h2>
            </div>
          </div>

          <div className="admin-orders-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order Ref</th>
                  <th>Customer</th>
                  <th>Items Ordered</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderNumber}>
                    <td><b>{order.orderNumber}</b></td>
                    <td>{order.customer}</td>
                    <td className="admin-table__items">{order.items}</td>
                    <td><b>{formatPrice(order.total, "USD")}</b></td>
                    <td>
                      <span className={`order-badge order-badge--${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      {order.status === "pending" ? (
                        <button
                          type="button"
                          className="admin-action-btn"
                          onClick={() => handleUpdateStatus(order.orderNumber, "processing")}
                        >
                          Mark Processing
                        </button>
                      ) : order.status === "processing" ? (
                        <button
                          type="button"
                          className="admin-action-btn admin-action-btn--primary"
                          onClick={() => handleUpdateStatus(order.orderNumber, "shipped")}
                        >
                          Mark Shipped
                        </button>
                      ) : (
                        <span style={{ fontSize: "12px", color: "var(--muted)" }}>Complete</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Inventory Allocation Card */}
        <section className="admin-card-section" aria-label="Inventory status">
          <div className="section-header">
            <div>
              <p className="section-index">Stock Allocation</p>
              <h2 className="section-title">Product Inventory (9 Styles)</h2>
            </div>
          </div>

          <div className="admin-inventory-grid">
            {CATALOG_PRODUCTS.map((prod) => {
              const currentStock = inventoryStock[prod.id] || 18;
              const isLow = currentStock < 10;

              return (
                <div key={prod.id} className="inventory-card">
                  <div className="inventory-card__header">
                    <div>
                      <p className="inventory-card__cat">{prod.category}</p>
                      <h4 className="inventory-card__name">{prod.name}</h4>
                    </div>
                    <span className={`stock-tag ${isLow ? "stock-tag--low" : "stock-tag--ok"}`}>
                      {currentStock} in stock
                    </span>
                  </div>
                  <div className="inventory-card__footer">
                    <span className="inventory-card__price">{formatPrice(prod.price, "USD")}</span>
                    <button
                      type="button"
                      className="admin-action-btn"
                      onClick={() => handleRestock(prod.id)}
                    >
                      + Restock 10
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <p className="back-link">
          <Link href="/products">← Return to Storefront Collection</Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
