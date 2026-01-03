"use client";

import { Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CommonInput from "./input/CommonInput";

type SearchPopupProps = {
  open: boolean;
  onClose: () => void;
};

type Product = {
  id: string;
  title: string;
  price: string;
  image: string;
};

const SEARCH_PRODUCTS: Product[] = [
  {
    id: "69562cc62c9e2fba8807ad1b",
    title: "Gold Plated Large Oval Shape Hoop Earring",
    price: "₹199",
    image: "/img/bracelet-img.webp",
  },
  {
    id: "69562cc62c9e2fba8807ad18",
    title: "Korean Pearl Drop Earring",
    price: "₹399",
    image: "/img/earring.webp",
  },
  {
    id: "69562cc62c9e2fba8807ad22",
    title: "Big Golden Rectangular Pendant",
    price: "₹499",
    image: "/img/pendant_old.webp",
  },
  {
    id: "69562cc62c9e2fba8807ad23",
    title: "Diamond Studded Bell Shape Pendant",
    price: "₹499",
    image: "/img/jewelrySet.webp",
  },
];

export default function SearchPopup({ open, onClose }: SearchPopupProps) {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return SEARCH_PRODUCTS;
    return SEARCH_PRODUCTS.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* BACKDROP */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        {/* CONTAINER */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="flex h-full items-end sm:items-center justify-center">
            {/* PANEL */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-full sm:translate-y-6 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-full sm:translate-y-6 sm:scale-95"
            >
              <Dialog.Panel className="w-full sm:max-w-lg bg-background rounded-t-2xl sm:rounded-2xl p-3 md:p-6 relative">
                {/* CLOSE */}
                <button
                  onClick={onClose}
                  aria-label="Close search popup"
                  className="absolute right-4 top-4 p-2 rounded-full hover:bg-foreground/10"
                >
                  <X size={18} />
                </button>

                {/* DRAG INDICATOR (Mobile) */}
                <div className="sm:hidden w-12 h-1 rounded-full mx-auto mb-4" />

                {/* TITLE */}
                <Dialog.Title className="text-lg font-medium mb-4">
                  Search Products
                </Dialog.Title>

                {/* SEARCH INPUT */}
                <div className="relative mb-6">
                  <Link href="/product-list" onClick={onClose}>
                    <Search
                      size={18}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 cursor-pointer z-1"
                    />
                  </Link>
                  <CommonInput
                    placeholder="Search for jewellery..."
                    value={query}
                    name="Search"
                    onChange={(e) => setQuery(e.target.value)}
                    noMargin
                  />
                </div>

                {/* RESULTS */}
                <div className="space-y-4 max-h-[50vh] overflow-y-auto">
                  {filteredProducts.length === 0 ? (
                    <p className="text-sm text-foreground/60">
                      No products found
                    </p>
                  ) : (
                    filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product-details/${product.id}`}
                        onClick={onClose}
                        className="flex gap-4 items-center"
                      >
                        <div className="relative w-14 h-14 rounded-md overflow-hidden bg-foreground/10">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div>
                          <p className="text-sm font-times font-medium">
                            {product.title}
                          </p>
                          <p className="text-sm text-foreground/70">
                            {product.price}
                          </p>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
