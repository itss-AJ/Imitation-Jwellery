"use client";
import Link from "next/link";
import CommonButton from "./button/CommonButton";
import CommonInput from "./input/CommonInput";
import { useState } from "react";
import SearchDrawer from "./SearchDrawer";

export default function Footer() {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <>
      <footer className="text-foreground">
        <div className="mx-auto px-3 md:px-8 lg:px-10 py-7 md:py-12 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-10 md:gap-6 lg:gap-14 max-w-[1560px] mx-auto">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-times mb-4">Privora</h2>
              <p className="text-sm font-normal text-foreground mb-6">
                At Privora, contemporary elegance blends seamlessly with
                affordability. Our jewelry is thoughtfully designed to resonate
                with the modern Indian woman.
              </p>

              <div className="text-sm text-gray-700 space-y-3">
                <p className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  Contact: +91 1234567890
                </p>
                <p className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                  Email: support@privora.in
                </p>
              </div>
            </div>

            {/* OUR COMPANY */}
            <div className="md:text-end">
              <h4 className="text-sm font-semibold mb-6 uppercase">
                OUR COMPANY
              </h4>
              <ul className="space-y-3 text-sm text-foreground">
                <li>
                  <Link href="#" onClick={() => setOpenSearch(true)}>
                    Search
                  </Link>
                </li>
                <li>
                  <Link href="/">Home page</Link>
                </li>
                <li>
                  <Link href="/product-list">All products</Link>
                </li>
                <li>
                  <Link href="/about-us">About Us</Link>
                </li>
                <li>
                  <Link href="/contact-us">Contact Us</Link>
                </li>
                <li>
                  <Link href="/wishlist">Wishlist</Link>
                </li>
              </ul>
            </div>

            {/* CUSTOMER SERVICE */}
            <div className="md:text-end">
              <h4 className="text-sm font-semibold mb-6 uppercase">
                CUSTOMER SERVICE
              </h4>
              <ul className="space-y-3 text-sm text-foreground">
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/refund-policy">Refund Policy</Link>
                </li>
                <li>
                  <Link href="/shipping-policy">Shipping Policy</Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/contact-info">Contact Information</Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold mb-6 uppercase">REACH US</h4>
              <p className="text-sm text-foreground leading-relaxed mb-6">
                Join Privora today and become part of our inner circle. Enjoy
                exclusive access to new collections, special offers, and early
                updates on our latest arrivals.
              </p>

              <form className="relative">
                {/* <input
                type="email"
                placeholder="Your email"
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#A97142]"
              /> */}
                <CommonInput
                  placeholder="Your email"
                  name="email"
                  className="!rounded-full pr-[105px]"
                />
                <CommonButton
                  variant="primaryBtn"
                  className="h-10 max-w-fit !text-xs absolute right-1 top-1/2 -translate-y-1/2 !px-4"
                >
                  Subscribe
                </CommonButton>
              </form>

              {/* <div className="flex gap-4 mt-6 text-xl">
              <Link href="#" aria-label="Facebook">ⓕ</Link>
              <Link href="#" aria-label="Instagram">ⓘ</Link>
            </div> */}
            </div>
          </div>
        </div>
        <div className="text-center py-3 bg-brand text-background text-xs md:text-sm font-normal">
          © 2026 Privora. All rights reserved. Secure shopping experience.
        </div>
      </footer>
      <SearchDrawer open={openSearch} onClose={() => setOpenSearch(false)} />
    </>
  );
}
