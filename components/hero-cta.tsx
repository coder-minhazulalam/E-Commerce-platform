"use client";

import React from "react";
import { Button } from "@heroui/react";

export function HeroCTA() {
  return (
    <Button
      as="a"
      className="hero__button"
      href="#lookbook"
      radius="full"
      size="lg"
    >
      Explore the looks
    </Button>
  );
}
