"use client";

import { ShoppingCart } from "lucide-react";

export default function LoginBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient */}
      <div className="absolute inset-0 login-gradient" />

      {/* Floating carts */}
      <Cart left="8%" size={26} opacity={0.15} speed="cart-slow" />
      <Cart left="28%" size={20} opacity={0.12} speed="cart-medium" />
      <Cart left="52%" size={34} opacity={0.18} speed="cart-fast" />
      <Cart left="72%" size={22} opacity={0.1} speed="cart-medium" />
      <Cart left="88%" size={28} opacity={0.14} speed="cart-slow" />
    </div>
  );
}

type CartProps = {
  left: string;
  size: number;
  opacity: number;
  speed: string;
};

function Cart({ left, size, opacity, speed }: CartProps) {
  return (
    <div
      className={`cart-float ${speed}`}
      style={{ left, opacity }}
    >
      <ShoppingCart size={size} className="text-orange-300" />
    </div>
  );
}
