"use client";
import { useEffect, useState } from "react";
import { getProducts, type Product, type ProductSort } from "../lib/products";
import { ProductGrid } from "./product-card";

export function ShopCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<ProductSort>("featured");
  const [state, setState] = useState<"loading" | "error" | "ready">("loading");
  useEffect(() => {
    const controller = new AbortController();
    setState("loading");
    getProducts({ category: category || undefined, q: query.trim() || undefined, sort, page: 1, pageSize: 24 }, controller.signal)
      .then((data) => { setProducts(data.items); setCategories((old) => Array.from(new Set([...old, ...data.items.map((p) => p.category)])).sort()); setState("ready"); })
      .catch((error: unknown) => { if (!(error instanceof DOMException && error.name === "AbortError")) setState("error"); });
    return () => controller.abort();
  }, [category, query, sort]);
  return <>
    <div className="catalog-tools" aria-label="Product filters">
      <label className="catalog-search">Search pieces<input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try a name or detail" /></label>
      <label>Category<select value={category} onChange={(e) => setCategory(e.target.value)}><option value="">All categories</option>{categories.map((name) => <option key={name} value={name}>{name}</option>)}</select></label>
      <label>Sort by<select value={sort} onChange={(e) => setSort(e.target.value as ProductSort)}><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name-asc">Name: A to Z</option></select></label>
    </div>
    <ProductGrid products={products} state={state === "ready" ? undefined : state} />
  </>;
}
