"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CommonHeading from "@/app/components/CommonHeading";
import CommonButton from "@/app/components/button/CommonButton";
import { useOrderDetails, useCancelOrder } from "@/hooks/use-orders";
import {
  Truck,
  MoreVertical,
  XCircle,
  RotateCcw,
  Headset,
  Package,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { toast } from "sonner";

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = typeof params.orderId === "string" ? params.orderId : "";

  const { data: order, isLoading, isError } = useOrderDetails(orderId);
  const cancelOrderMutation = useCancelOrder();

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleCancelOrder = async () => {
    try {
      await cancelOrderMutation.mutateAsync(orderId);
      toast.success("Order cancelled successfully");
      setShowCancelConfirm(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to cancel order"
      );
    }
  };

  if (isLoading) {
    return (
      <section className="px-3 md:px-8 lg:px-10 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-foreground/60">Loading order details...</p>
        </div>
      </section>
    );
  }

  if (isError || !order) {
    return (
      <section className="px-3 md:px-8 lg:px-10 py-8 md:py-12">
        <div className="max-w-6xl mx-auto text-center">
          <CommonHeading level={1} title="Order Not Found" />
          <p className="text-foreground/60 mb-6">
            We couldn&apos;t find this order. It may have been removed or the link is incorrect.
          </p>
          <CommonButton href="/account">Go to My Orders</CommonButton>
        </div>
      </section>
    );
  }

  const statusConfig = {
    Processing: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
    Shipped: { icon: Truck, color: "text-blue-600", bg: "bg-blue-100" },
    Delivered: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
    Cancelled: { icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
  };

  const StatusIcon = statusConfig[order.status].icon;

  return (
    <section className="px-3 md:px-8 lg:px-10 py-8 md:py-12">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CommonHeading level={1} title="Order Details" noMargin className="text-left" />
          <Link href="/account" className="commonLink text-sm">
            Go to My Orders
          </Link>
        </div>

        {/* ORDER INFO BAR */}
        <div className="bg-foreground/5 rounded-xl p-4 flex flex-wrap gap-4 justify-between items-center">
          <div>
            <p className="text-sm text-foreground/60">Order Number</p>
            <p className="font-medium">{order.orderNumber}</p>
          </div>
          <div>
            <p className="text-sm text-foreground/60">Order Date</p>
            <p className="font-medium">{order.date}</p>
          </div>
          <div>
            <p className="text-sm text-foreground/60">Total</p>
            <p className="font-medium">₹{order.total.toFixed(2)}</p>
          </div>
          <div>
            <span
              className={`px-3 py-1 text-sm rounded-full ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}
            >
              {order.status}
            </span>
          </div>
        </div>

        {/* STATUS CARD */}
        <div className="bg-background border border-foreground/20 rounded-2xl p-4 md:p-6 space-y-6">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`h-12 w-12 min-w-12 rounded-full ${statusConfig[order.status].bg} flex items-center justify-center`}
              >
                <StatusIcon className={statusConfig[order.status].color} />
              </div>
              <div>
                <p className="font-medium text-base md:text-lg">{order.status} Order</p>
                {order.expectedDelivery && order.status !== "Delivered" && order.status !== "Cancelled" && (
                  <p className="text-sm text-foreground/70">
                    Expected Delivery: <strong>{order.expectedDelivery}</strong>
                  </p>
                )}
              </div>
            </div>

            {order.status !== "Delivered" && order.status !== "Cancelled" && (
              <Menu as="div" className="relative">
                <MenuButton
                  className="h-10 w-10 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/10 transition"
                  aria-label="Order actions"
                >
                  <MoreVertical size={18} />
                </MenuButton>

                <MenuItems className="mt-2 w-52 rounded-xl border border-foreground/20 bg-background shadow-lg p-1 z-50 focus:outline-none absolute right-0">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => setShowCancelConfirm(true)}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm ${active ? "bg-foreground/10" : ""}`}
                      >
                        <XCircle size={16} className="text-red-500" />
                        Cancel Order
                      </button>
                    )}
                  </MenuItem>

                  <MenuItem>
                    {({ active }) => (
                      <button
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm ${active ? "bg-foreground/10" : ""}`}
                      >
                        <RotateCcw size={16} />
                        Return Order
                      </button>
                    )}
                  </MenuItem>

                  <div className="my-1 h-px bg-foreground/20" />

                  <MenuItem>
                    {({ active }) => (
                      <Link
                        href="/contact-info"
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${active ? "bg-foreground/10" : ""}`}
                      >
                        <Headset size={16} />
                        Support & Help
                      </Link>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>

          {/* ORDER ITEMS */}
          <div className="space-y-4">
            <p className="font-medium">Items ({order.items.length})</p>
            {order.items.map((item, index) => (
              <div
                key={`${item.productId}-${index}`}
                className="flex gap-4 p-3 border border-foreground/10 rounded-xl"
              >
                <div className="relative w-16 h-16 bg-foreground/5 rounded-lg overflow-hidden">
                  <Image
                    src={item.thumbnail}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-foreground/60">
                    Qty: {item.quantity} × ₹{item.unitPrice.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{item.totalPrice.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADDRESS + PAYMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SHIPPING ADDRESS */}
          <div className="lg:col-span-2 border border-foreground/20 rounded-2xl p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package size={20} />
              <p className="font-medium">Shipping Address</p>
            </div>
            {order.shippingAddress ? (
              <div className="text-sm text-foreground/80 space-y-1">
                <p className="font-medium text-foreground">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.line1}</p>
                {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.pincode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            ) : (
              <p className="text-sm text-foreground/60">No shipping address available</p>
            )}
          </div>

          {/* PAYMENT DETAILS */}
          <div className="border border-foreground/20 rounded-2xl p-4 md:p-6">
            <p className="font-medium mb-4">Payment Summary</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? "FREE" : `₹${order.shipping.toFixed(2)}`}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-medium">
                <span>Total</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-foreground/60">Payment Method</p>
              <p className="font-medium">{order.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* CANCEL CONFIRMATION MODAL */}
        {showCancelConfirm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-background rounded-2xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-medium mb-4">Cancel Order?</h3>
              <p className="text-sm text-foreground/70 mb-6">
                Are you sure you want to cancel this order? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <CommonButton
                  variant="secondaryBtn"
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1"
                >
                  Keep Order
                </CommonButton>
                <CommonButton
                  onClick={handleCancelOrder}
                  disabled={cancelOrderMutation.isPending}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  {cancelOrderMutation.isPending ? "Cancelling..." : "Cancel Order"}
                </CommonButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
