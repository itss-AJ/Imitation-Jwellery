"use client";

import { useState } from "react";
import OrderHeader from "./OrderHeader";
import OrderStatusCard from "./OrderStatusCard";
import AddressDetails from "./AddressDetails";
import PaymentDetails from "./PaymentDetails";
import CancelOrderModal from "./CancelOrderModal";
import ReturnOrderModal from "./ReturnOrderModal";

export default function OrderDetailsPage() {
  const [openCancel, setOpenCancel] = useState(false);
  const [openReturn, setOpenReturn] = useState(false);

  return (
    <>
      <section className="px-3 md:px-8 lg:px-10 py-8 md:py-12">
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">

          <OrderHeader />

          <OrderStatusCard onCancel={() => setOpenCancel(true)}
            onReturn={() => setOpenReturn(true)} />

          {/* ADDRESS + PAYMENT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AddressDetails />
            <PaymentDetails />
          </div>
        </div>
      </section>

      <CancelOrderModal
        open={openCancel}
        onClose={() => setOpenCancel(false)}
      />
      <ReturnOrderModal
        open={openReturn}
        onClose={() => setOpenReturn(false)}
      />
    </>
  );
}
