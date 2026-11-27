"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Gift,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
  Building2,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { useCart, type CheckoutDetails, type PlacedOrder } from "../../lib/cart-context";
import { formatPriceBDT } from "../../lib/products";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { PRODUCT_IMAGE_MAP } from "../../components/product-card";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    shippingFee,
    clearCart,
    setLatestOrder,
  } = useCart();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState<CheckoutDetails>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "Dhaka",
    district: "Dhaka",
    postalCode: "1212",
    deliveryNotes: "",
    giftWrap: false,
    giftMessage: "",
    bespokeTailoringNotes: "",
    paymentMethod: "cod",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const giftWrapFee = formData.giftWrap ? 350 : 0;
  const grandTotal = subtotal + shippingFee + giftWrapFee;

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^(\+8801|01)[3-9]\d{8}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
      errors.phone = "Enter a valid Bangladeshi phone number (e.g. 017XXXXXXXX)";
    }
    if (!formData.address.trim()) errors.address = "Delivery address is required";
    if (!formData.city.trim()) errors.city = "City is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
      setCurrentStep(2);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 2) {
      setCurrentStep(3);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep === 3) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    // Simulate luxury order dispatch pipeline
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const orderId = `OOT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: PlacedOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      items: [...items],
      subtotal,
      shippingFee,
      giftWrapFee,
      total: grandTotal,
      checkout: formData,
      status: "Confirmed",
      estimatedDelivery: "2 to 4 business days",
    };

    setLatestOrder(newOrder);
    clearCart();
    router.push(`/checkout/confirmation?orderId=${orderId}`);
  };

  if (items.length === 0) {
    return (
      <div className="w-full min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans">
        <SiteHeader />
        <main className="w-full flex-1 pt-36 pb-20 flex flex-col items-center justify-center px-6">
          <div className="w-16 h-16 rounded-full bg-[#f6f3ee] border border-[#c3c8c2]/60 flex items-center justify-center mb-6">
            <Sparkles className="w-7 h-7 text-[#755a21]" />
          </div>
          <h1 className="font-serif text-3xl text-[#1c1c19] text-center tracking-tight">
            Your Atelier Bag is Empty
          </h1>
          <p className="text-sm text-[#737873] mt-2 text-center max-w-md">
            Please add an authentic Bangladeshi handloom masterwork before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="mt-8 px-8 py-3.5 bg-[#243329] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#1a261e] transition-colors"
          >
            Explore Catalog
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans selection:bg-[#fed892] selection:text-[#785d24]">
      <SiteHeader />

      <main className="w-full flex-1 pt-24 sm:pt-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8 lg:py-12">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#737873] mb-6">
            <Link href="/" className="hover:text-[#1c1c19] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#c3c8c2]" />
            <Link href="/shop" className="hover:text-[#1c1c19] transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#c3c8c2]" />
            <span className="text-[#1c1c19] font-medium">Checkout</span>
          </nav>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1c19] tracking-tight">
            Atelier Checkout & Dispatch
          </h1>
          <p className="text-xs sm:text-sm text-[#737873] mt-1 font-light">
            White-glove courier packaging direct from our Dhaka Handloom Studio.
          </p>

          {/* Stepper Progress Indicator */}
          <div className="mt-8 mb-12 border-y border-[#c3c8c2]/30 py-4">
            <div className="max-w-2xl mx-auto flex items-center justify-between relative">
              {[
                { step: 1, label: "1. Delivery Details" },
                { step: 2, label: "2. Bespoke & Packaging" },
                { step: 3, label: "3. Payment & Dispatch" },
              ].map((s) => {
                const isActive = currentStep === s.step;
                const isDone = currentStep > s.step;

                return (
                  <div key={s.step} className="flex items-center gap-2.5 z-10 bg-[#fcf9f4] px-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                        isDone
                          ? "bg-[#243329] text-white"
                          : isActive
                          ? "bg-[#755a21] text-white ring-4 ring-[#755a21]/20"
                          : "bg-[#ebe8e3] text-[#737873]"
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                    </div>
                    <span
                      className={`text-xs uppercase tracking-wider font-medium hidden sm:inline ${
                        isActive ? "text-[#1c1c19] font-semibold" : "text-[#737873]"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
              {/* Connecting line */}
              <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-[#c3c8c2]/50 -translate-y-1/2 z-0" />
            </div>
          </div>

          {/* Two-Column Grid: Form & Order Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left Column: Multi-Step Form (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* STEP 1: DELIVERY & CONTACT */}
              {currentStep === 1 && (
                <div className="bg-[#f6f3ee] p-6 sm:p-8 border border-[#c3c8c2]/40 shadow-sm animate-fadeIn">
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#c3c8c2]/30">
                    <Truck className="w-5 h-5 text-[#755a21]" />
                    <h2 className="font-serif text-xl text-[#1c1c19]">
                      Shipping & Delivery Address
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block uppercase tracking-wider text-[#434844] font-medium mb-1.5">
                        Full Recipient Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Tanzim Rahman"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full p-3 bg-white border text-xs focus:outline-none focus:border-[#243329] ${
                          formErrors.fullName ? "border-red-500" : "border-[#c3c8c2]/60"
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="text-red-600 text-[11px] mt-1">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#434844] font-medium mb-1.5">
                        Phone Number (for Courier Delivery) *
                      </label>
                      <input
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full p-3 bg-white border text-xs focus:outline-none focus:border-[#243329] ${
                          formErrors.phone ? "border-red-500" : "border-[#c3c8c2]/60"
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-red-600 text-[11px] mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#434844] font-medium mb-1.5">
                        Email Address (for Dispatch Confirmation)
                      </label>
                      <input
                        type="email"
                        placeholder="tanzim@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 bg-white border border-[#c3c8c2]/60 text-xs focus:outline-none focus:border-[#243329]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block uppercase tracking-wider text-[#434844] font-medium mb-1.5">
                        Street Address / Apartment / House / Road *
                      </label>
                      <textarea
                        rows={3}
                        placeholder="House #12, Road #4, Sector 7, Uttara, Dhaka"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className={`w-full p-3 bg-white border text-xs focus:outline-none focus:border-[#243329] ${
                          formErrors.address ? "border-red-500" : "border-[#c3c8c2]/60"
                        }`}
                      />
                      {formErrors.address && (
                        <p className="text-red-600 text-[11px] mt-1">{formErrors.address}</p>
                      )}
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#434844] font-medium mb-1.5">
                        City / Division *
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value, district: e.target.value })}
                        className="w-full p-3 bg-white border border-[#c3c8c2]/60 text-xs focus:outline-none focus:border-[#243329]"
                      >
                        <option value="Dhaka">Dhaka (Same Day / Next Day Atelier Dispatch)</option>
                        <option value="Chittagong">Chittagong</option>
                        <option value="Sylhet">Sylhet</option>
                        <option value="Rajshahi">Rajshahi</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Mymensingh">Mymensingh</option>
                      </select>
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#434844] font-medium mb-1.5">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        placeholder="1212"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full p-3 bg-white border border-[#c3c8c2]/60 text-xs focus:outline-none focus:border-[#243329]"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-3.5 bg-[#243329] hover:bg-[#1a261e] text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
                    >
                      <span>Continue to Bespoke Notes</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: BESPOKE SIZING & GIFT PACKAGING */}
              {currentStep === 2 && (
                <div className="bg-[#f6f3ee] p-6 sm:p-8 border border-[#c3c8c2]/40 shadow-sm animate-fadeIn space-y-6">
                  <div className="flex items-center gap-2 pb-4 border-b border-[#c3c8c2]/30">
                    <Gift className="w-5 h-5 text-[#755a21]" />
                    <h2 className="font-serif text-xl text-[#1c1c19]">
                      Atelier Packaging & Bespoke Customization
                    </h2>
                  </div>

                  {/* Gift Packaging Checkbox */}
                  <div className="p-4 bg-white border border-[#c3c8c2]/50 flex items-start gap-4">
                    <input
                      type="checkbox"
                      id="giftWrap"
                      checked={formData.giftWrap}
                      onChange={(e) => setFormData({ ...formData, giftWrap: e.target.checked })}
                      className="mt-1 h-4 w-4 text-[#755a21] border-[#c3c8c2] focus:ring-[#755a21] cursor-pointer"
                    />
                    <label htmlFor="giftWrap" className="cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base text-[#1c1c19]">
                          Add Signature Gold-Embossed Gift Box (+৳350)
                        </span>
                      </div>
                      <p className="text-xs text-[#737873] mt-1 leading-relaxed">
                        Handcrafted mulberry-paper gift box lined in emerald tissue with handwritten atelier wax-sealed card.
                      </p>
                    </label>
                  </div>

                  {formData.giftWrap && (
                    <div className="animate-fadeIn">
                      <label className="block text-xs uppercase tracking-wider text-[#434844] font-medium mb-1.5">
                        Gift Card Message
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Write your personal message to be handwritten on our calligraphed card..."
                        value={formData.giftMessage}
                        onChange={(e) => setFormData({ ...formData, giftMessage: e.target.value })}
                        className="w-full p-3 bg-white border border-[#c3c8c2]/60 text-xs focus:outline-none focus:border-[#243329]"
                      />
                    </div>
                  )}

                  {/* Bespoke Tailoring Sizing Notes */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#434844] font-medium mb-1.5">
                      Bespoke Tailoring & Measurements (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Sleeve length +1 inch, custom chest 41.5 inches, special neck collar height request..."
                      value={formData.bespokeTailoringNotes}
                      onChange={(e) => setFormData({ ...formData, bespokeTailoringNotes: e.target.value })}
                      className="w-full p-3 bg-white border border-[#c3c8c2]/60 text-xs focus:outline-none focus:border-[#243329]"
                    />
                    <p className="text-[11px] text-[#737873] mt-1">
                      Our master pattern-makers in Mirpur/Old Dhaka inspect sizing notes before hand-finishing.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#c3c8c2]/30 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-3 border border-[#c3c8c2]/60 text-[#434844] hover:text-[#1c1c19] text-xs uppercase tracking-widest font-medium flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-3.5 bg-[#243329] hover:bg-[#1a261e] text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: PAYMENT METHOD */}
              {currentStep === 3 && (
                <div className="bg-[#f6f3ee] p-6 sm:p-8 border border-[#c3c8c2]/40 shadow-sm animate-fadeIn space-y-6">
                  <div className="flex items-center gap-2 pb-4 border-b border-[#c3c8c2]/30">
                    <CreditCard className="w-5 h-5 text-[#755a21]" />
                    <h2 className="font-serif text-xl text-[#1c1c19]">
                      Payment Method
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {/* Cash on Delivery */}
                    <div
                      onClick={() => setFormData({ ...formData, paymentMethod: "cod" })}
                      className={`p-4 bg-white border cursor-pointer transition-all flex items-start gap-4 ${
                        formData.paymentMethod === "cod"
                          ? "border-[#243329] ring-2 ring-[#243329]/20 shadow-sm"
                          : "border-[#c3c8c2]/50 hover:border-[#1c1c19]/60"
                      }`}
                    >
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                        className="mt-1 h-4 w-4 text-[#243329]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#243329]" />
                          <label htmlFor="cod" className="font-serif text-base text-[#1c1c19] font-medium cursor-pointer">
                            Cash on Delivery (COD)
                          </label>
                          <span className="text-[10px] bg-[#243329] text-white px-2 py-0.5 uppercase tracking-wider font-semibold">
                            Recommended
                          </span>
                        </div>
                        <p className="text-xs text-[#737873] mt-1 leading-relaxed">
                          Pay in cash or mobile money upon receiving your atelier courier parcel.
                        </p>
                      </div>
                    </div>

                    {/* bKash / Nagad Mobile Banking */}
                    <div
                      onClick={() => setFormData({ ...formData, paymentMethod: "bkash" })}
                      className={`p-4 bg-white border cursor-pointer transition-all flex items-start gap-4 ${
                        formData.paymentMethod === "bkash"
                          ? "border-[#243329] ring-2 ring-[#243329]/20 shadow-sm"
                          : "border-[#c3c8c2]/50 hover:border-[#1c1c19]/60"
                      }`}
                    >
                      <input
                        type="radio"
                        id="bkash"
                        name="paymentMethod"
                        checked={formData.paymentMethod === "bkash"}
                        onChange={() => setFormData({ ...formData, paymentMethod: "bkash" })}
                        className="mt-1 h-4 w-4 text-[#243329]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-[#e2136e]" />
                          <label htmlFor="bkash" className="font-serif text-base text-[#1c1c19] font-medium cursor-pointer">
                            bKash / Nagad Instant Mobile Banking
                          </label>
                        </div>
                        <p className="text-xs text-[#737873] mt-1 leading-relaxed">
                          Instant SSLCommerz / bKash gateway verification with zero transaction charges.
                        </p>
                      </div>
                    </div>

                    {/* Visa / Mastercard */}
                    <div
                      onClick={() => setFormData({ ...formData, paymentMethod: "card" })}
                      className={`p-4 bg-white border cursor-pointer transition-all flex items-start gap-4 ${
                        formData.paymentMethod === "card"
                          ? "border-[#243329] ring-2 ring-[#243329]/20 shadow-sm"
                          : "border-[#c3c8c2]/50 hover:border-[#1c1c19]/60"
                      }`}
                    >
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        checked={formData.paymentMethod === "card"}
                        onChange={() => setFormData({ ...formData, paymentMethod: "card" })}
                        className="mt-1 h-4 w-4 text-[#243329]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#755a21]" />
                          <label htmlFor="card" className="font-serif text-base text-[#1c1c19] font-medium cursor-pointer">
                            Credit / Debit Card (Visa, Mastercard, Amex)
                          </label>
                        </div>
                        <p className="text-xs text-[#737873] mt-1 leading-relaxed">
                          Bank-grade 256-bit SSL encrypted card authorization.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#fcf9f4] border border-[#c3c8c2]/40 text-xs text-[#5a605b] flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#755a21] shrink-0" />
                    <span>Your order is protected under OOTFY's 7-Day Handloom Exchange Guarantee.</span>
                  </div>

                  <div className="pt-6 border-t border-[#c3c8c2]/30 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-3 border border-[#c3c8c2]/60 text-[#434844] hover:text-[#1c1c19] text-xs uppercase tracking-widest font-medium flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handlePlaceOrder}
                      className="px-8 py-3.5 bg-[#243329] hover:bg-[#1a261e] text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-sm disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Confirming Dispatch...</span>
                      ) : (
                        <>
                          <span>Confirm Order · {formatPriceBDT(grandTotal)}</span>
                          <CheckCircle2 className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Order Summary (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-[#f6f3ee] p-6 sm:p-8 border border-[#c3c8c2]/40 shadow-sm sticky top-28 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#c3c8c2]/30">
                  <h3 className="font-serif text-xl text-[#1c1c19]">Order Summary</h3>
                  <span className="text-xs uppercase tracking-wider text-[#755a21] font-semibold">
                    {items.length} Atelier {items.length === 1 ? "Piece" : "Pieces"}
                  </span>
                </div>

                {/* Items Mini List */}
                <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                  {items.map((item) => {
                    const itemImg =
                      PRODUCT_IMAGE_MAP[item.product.id] ||
                      item.product.images?.hero_flatlay ||
                      "/assets/products/jamdani-saree-clean.jpg";

                    return (
                      <div key={`${item.id}-${item.size}`} className="flex gap-3 text-xs">
                        <div className="relative w-14 h-16 bg-white border border-[#c3c8c2]/40 shrink-0 overflow-hidden">
                          <Image
                            src={itemImg}
                            alt={item.product.name}
                            fill
                            unoptimized
                            className="object-cover object-center"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <p className="font-medium text-[#1c1c19] line-clamp-1">
                              {item.product.name}
                            </p>
                            <p className="text-[11px] text-[#737873] uppercase tracking-wider mt-0.5">
                              Size: {item.size} · Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold text-[#1c1c19]">
                            {formatPriceBDT(item.product.price_bdt * item.quantity)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Financial Totals */}
                <div className="pt-4 border-t border-[#c3c8c2]/30 space-y-2 text-xs text-[#434844]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#1c1c19]">{formatPriceBDT(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Courier Delivery</span>
                    <span className="font-medium text-[#1c1c19]">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-700 font-semibold uppercase text-[11px]">
                          Complimentary
                        </span>
                      ) : (
                        formatPriceBDT(shippingFee)
                      )}
                    </span>
                  </div>
                  {formData.giftWrap && (
                    <div className="flex justify-between text-[#755a21]">
                      <span>Gold-Embossed Gift Box</span>
                      <span className="font-medium">{formatPriceBDT(giftWrapFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-[#c3c8c2]/30 text-base font-serif font-semibold text-[#1c1c19]">
                    <span>Total Amount</span>
                    <span className="text-xl">{formatPriceBDT(grandTotal)}</span>
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#c3c8c2]/40 text-[11px] text-[#5a605b] space-y-1">
                  <div className="flex items-center gap-1.5 text-[#243329] font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>White-Glove Atelier Assurance</span>
                  </div>
                  <p className="leading-relaxed">
                    Direct handoff to registered courier with SMS tracking updates sent to your phone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
