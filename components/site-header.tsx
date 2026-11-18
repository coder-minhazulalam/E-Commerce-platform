"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-header__brand" href="/" aria-label="Home">
        <Image
          className="site-header__logo"
          src="/brand/brand-logo.png"
          alt="Brand logo"
          width={427}
          height={175}
          priority
        />
      </Link>

      <nav className="site-header__nav" aria-label="Primary navigation">
        <Link href="/shop">The edit</Link>
        <Link href="/#approach">Our approach</Link>
      </nav>

      <div className="site-header__aside">
        <Button
          as="a"
          className="site-header__cta"
          href="/shop"
          radius="full"
          size="sm"
          variant="bordered"
        >
          Shop the edit
        </Button>
      </div>
    </header>
  );
}
