"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CommonInput from "./input/CommonInput";

type SearchDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const SEARCH_PRODUCTS = [
  {
    id: "69562cc62c9e2fba8807ad1f", // Updated mock IDs to real MongoDB ObjectIDs
    title: "Gold Plated Large Oval Shape Hoop Earring",
    price: "Rs. 199.00",
    oldPrice: "Rs. 249.00",
    image: "/img/bracelet-img.webp",
  },
  {
    id: "69562cc62c9e2fba8807ad24", // Updated mock IDs to real MongoDB ObjectIDs
    title: "Korean Pearl Drop Earring",
    price: "Rs. 399.00",
    image: "/img/earring.webp",
  },
  {
    id: "69562cc62c9e2fba8807ad19", // Updated mock IDs to real MongoDB ObjectIDs
    title: "Big Golden Rectangular Pendant",
    price: "Rs. 499.00",
    image: "/img/pendant_old.webp",
  },
  {
    id: "69562cc62c9e2fba8807ad17", // Updated mock IDs to real MongoDB ObjectIDs
    title: "Diamond Studded Bell Shape Pendant",
    price: "Rs. 499.00",
    image: "/img/jewelrySet.webp",
  },
];

export default function SearchDrawer({ open, onClose }: SearchDrawerProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={onClose}>
        {/* OVERLAY */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        {/* DRAWER */}
        <div className="fixed inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative h-full w-full max-w-sm bg-[#fce9ca] p-3 md:p-6 overflow-y-auto">
              {/* HEADER */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs tracking-widest uppercase text-foreground">
                  Find your perfect pick
                </p>
                <button
                  onClick={onClose}
                  aria-label="Close search drawer"
                  className="p-2 rounded-full hover:bg-foreground/10"
                >
                  <X size={18} />
                </button>
              </div>

              {/* SEARCH INPUT */}
              <div className="relative mb-6">
                <Search
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60"
                />
                <CommonInput
                  name="search"
                  type="text"
                  iconInput
                  noMargin
                  placeholder="Search Products..."
                />
              </div>

              {/* PRODUCTS */}
              <div>
                <p className="mb-4 text-xs tracking-widest uppercase text-foreground/60">
                  Products
                </p>

                <div className="space-y-5">
                  {SEARCH_PRODUCTS.map((product) => (
                    <Link
                      href={`/product-details/${product.id}`}
                      key={product.id}
                      onClick={onClose}
                      className="flex gap-4 items-start"
                    >
                      <div className="relative w-16 min-w-16 h-16 rounded-md overflow-hidden bg-foreground/10">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-times font-medium leading-snug mb-1">
                          {product.title}
                        </p>

                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-sm">
                            {product.price}
                          </span>
                          {product.oldPrice && (
                            <span className="text-foreground/50 line-through">
                              {product.oldPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
