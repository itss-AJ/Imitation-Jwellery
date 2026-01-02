import Image from "next/image";
import CommonButton from "@/app/components/button/CommonButton";
import { useState } from "react";
import OrderProductsModal from "./OrderProductsPopup";

export default function OrderedProduct() {
    const [openProducts, setOpenProducts] = useState(false);
  return (
    <>
      <div className="border border-foreground/20 rounded-xl p-4 md:p-5 flex flex-col sm:flex-row gap-4">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-foreground/10">
          <Image src="/img/bracelet-img.webp" alt="Product" fill className="object-cover" />
        </div>

        <div className="flex-1 space-y-1 text-sm">
          <p className="font-medium">Order: #PRV-10231</p>
          {/* <p className="font-medium">Gold Plated Jewelry Set</p> */}
          <p className="text-foreground/70">
            Items: 3
          </p>
          <p>
            Price: <strong>₹2,499</strong>
          </p>
          <p className="text-xs text-foreground/60">Seller: Privora</p>
        </div>

        <CommonButton variant="secondaryBtn" className="w-fit max-w-fit h-fit" onClick={() => setOpenProducts(true)}>
          All Products
        </CommonButton>
      </div>
      <OrderProductsModal
        open={openProducts}
        onClose={() => setOpenProducts(false)}
      />
    </>
  );
}
