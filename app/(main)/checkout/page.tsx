"use client";

import Image from "next/image";
import CommonHeading from "@/app/components/CommonHeading";
import CommonInput from "@/app/components/input/CommonInput";
import CommonButton from "@/app/components/button/CommonButton";
import { CheckCircle, Plus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useAddresses } from "@/hooks/use-address";
import { useUserProfile } from "@/hooks/use-auth";
import { useCreateOrder, useApplyCoupon } from "@/hooks/use-checkout";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: cart } = useCart();
  const { data: user } = useUserProfile();
  const { data: addresses = [], isLoading: addressesLoading } = useAddresses();
  const createOrder = useCreateOrder();
  const applyCouponMutation = useApplyCoupon();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [useSameAsBilling, setUseSameAsBilling] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [notes, setNotes] = useState("");

  const cartItems = cart?.items || [];
  const subtotal = cart?.total || 0;
  const shipping = 0;
  const discount = appliedDiscount;
  const total = Math.max(0, subtotal + shipping - discount);

  const isLoggedIn = !!user && !!user._id && user._id !== "guest";

  const defaultAddress = useMemo(() => {
    return addresses.find((a) => a.isDefault) || addresses[0] || null;
  }, [addresses]);

  const currentSelectedAddress = useMemo(() => {
    if (selectedAddressId) {
      return addresses.find((a) => a._id === selectedAddressId) || null;
    }
    return defaultAddress;
  }, [selectedAddressId, addresses, defaultAddress]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      const result = await applyCouponMutation.mutateAsync(couponCode);
      setAppliedDiscount(result.discount);
      toast.success(result.message || "Coupon applied!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to apply coupon"
      );
    }
  };

  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      toast.error("Please sign in to place an order");
      router.push("/sign-in");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const addressId = currentSelectedAddress?._id;
    if (!addressId) {
      toast.error("Please select a shipping address");
      return;
    }

    try {
      await createOrder.mutateAsync({
        shippingAddressId: addressId,
        billingAddressId: useSameAsBilling ? addressId : undefined,
        couponCode: couponCode || undefined,
        notes: notes || undefined,
      });
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to place order"
      );
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="checkoutPage gradientBg">
        <section className="px-3 md:px-8 lg:px-10 py-8 md:py-12">
          <div className="max-w-2xl mx-auto text-center">
            <CommonHeading level={1} title="Checkout" noMargin />
            <p className="text-foreground/70 mb-6">
              Please sign in to continue with checkout
            </p>
            <CommonButton href="/sign-in">Sign In</CommonButton>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="checkoutPage gradientBg">
      <section className="px-3 md:px-8 lg:px-10 py-8 md:py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            <CommonHeading level={1} title="Checkout" noMargin className="text-left" />

            {/* SHIPPING ADDRESS */}
            <div className="border border-foreground/20 rounded-2xl p-3 md:p-6">
              <p className="font-medium mb-4">Ship to</p>

              <div className="space-y-4">
                {addressesLoading ? (
                  <p className="text-sm text-foreground/60">Loading addresses...</p>
                ) : addresses.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-sm text-foreground/60 mb-4">
                      No addresses found. Please add a shipping address.
                    </p>
                    <CommonButton
                      variant="secondaryBtn"
                      href="/account"
                      className="max-w-fit"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Address
                    </CommonButton>
                  </div>
                ) : (
                  addresses.map((address) => (
                    <AddressRadio
                      key={address._id}
                      checked={
                        selectedAddressId
                          ? selectedAddressId === address._id
                          : address.isDefault || address._id === addresses[0]?._id
                      }
                      title={address.fullName}
                      address={`${address.line1}${address.line2 ? `, ${address.line2}` : ""}`}
                      meta={`${address.pincode}, ${address.state}, ${address.country || "India"}`}
                      onChange={() => setSelectedAddressId(address._id)}
                    />
                  ))
                )}

                {addresses.length > 0 && (
                  <Link
                    href="/account"
                    className="text-sm text-brand underline inline-block"
                  >
                    + Manage addresses
                  </Link>
                )}
              </div>
            </div>

            {/* SHIPPING METHOD */}
            <div className="border border-foreground/20 rounded-2xl p-3 md:p-6">
              <p className="font-medium mb-4">Shipping Method</p>

              <div className="flex items-center justify-between bg-foreground/5 px-4 py-3 rounded-xl">
                <span className="text-sm">Standard Delivery</span>
                <span className="text-sm font-medium">FREE</span>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="border border-foreground/20 rounded-2xl p-3 md:p-6">
              <p className="font-medium mb-1">Payment</p>
              <p className="text-xs text-foreground/60 mb-4">
                All transactions are secure and encrypted.
              </p>

              <div className="border border-brand rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    PhonePe Payment Gateway (UPI, Cards & NetBanking)
                  </p>
                  <CheckCircle className="text-brand" size={18} />
                </div>

                <div className="bg-foreground/5 rounded-lg h-32 flex items-center justify-center text-sm text-foreground/60">
                  You will be redirected to PhonePe to complete payment securely.
                </div>
              </div>
            </div>

            {/* BILLING ADDRESS */}
            <div className="border border-foreground/20 rounded-2xl p-3 md:p-6">
              <p className="font-medium mb-4">Billing Address</p>

              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    checked={useSameAsBilling}
                    onChange={() => setUseSameAsBilling(true)}
                    className="accent-brand"
                  />
                  Same as shipping address
                </label>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    checked={!useSameAsBilling}
                    onChange={() => setUseSameAsBilling(false)}
                    className="accent-brand"
                  />
                  Use a different billing address
                </label>
              </div>
            </div>

            {/* ORDER NOTES */}
            <div className="border border-foreground/20 rounded-2xl p-3 md:p-6">
              <p className="font-medium mb-4">Order Notes (Optional)</p>
              <CommonInput
                name="notes"
                placeholder="Any special instructions for your order..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <CommonButton
                className="w-full max-w-fit mx-auto"
                onClick={handlePlaceOrder}
                disabled={createOrder.isPending || cartItems.length === 0}
              >
                {createOrder.isPending ? "Processing..." : "Pay Now"}
              </CommonButton>
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 border border-foreground/20 rounded-2xl p-3 md:p-6 space-y-6">
              {/* CART ITEMS */}
              <div className="space-y-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      title={item.name}
                      price={item.price}
                      image={item.image}
                      quantity={item.quantity}
                    />
                  ))
                ) : (
                  <p className="text-sm text-foreground/60">Your cart is empty</p>
                )}
              </div>

              {/* DISCOUNT */}
              <div className="flex gap-2">
                <CommonInput
                  placeholder="Discount code"
                  name="discount"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <CommonButton
                  variant="secondaryBtn"
                  className="w-fit max-w-fit h-fit"
                  onClick={handleApplyCoupon}
                  disabled={applyCouponMutation.isPending}
                >
                  {applyCouponMutation.isPending ? "..." : "Apply"}
                </CommonButton>
              </div>

              {appliedDiscount > 0 && (
                <p className="text-sm text-green-600">
                  Discount applied: -₹{appliedDiscount.toFixed(2)}
                </p>
              )}

              {/* TOTAL */}
              <div className="space-y-2 text-sm">
                <Row
                  label={`Subtotal · ${cartItems.length} item${cartItems.length !== 1 ? "s" : ""}`}
                  value={`₹${subtotal.toFixed(2)}`}
                />
                <Row label="Shipping" value={shipping === 0 ? "FREE" : `₹${shipping}`} />
                {discount > 0 && (
                  <Row label="Discount" value={`-₹${discount.toFixed(2)}`} />
                )}
                <div className="border-t pt-3 flex justify-between font-medium text-base">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* SUB COMPONENTS */

function AddressRadio({
  title,
  address,
  meta,
  checked,
  onChange,
}: {
  title: string;
  address: string;
  meta: string;
  checked?: boolean;
  onChange?: () => void;
}) {
  return (
    <label
      className={`block border rounded-xl p-4 cursor-pointer ${
        checked ? "border-brand bg-brand/5" : "border-foreground/20"
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="radio"
          checked={checked}
          onChange={onChange}
          className="w-3.5 h-3.5 accent-brand mt-1"
        />
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-sm text-foreground/70">{address}</p>
          <p className="text-xs text-foreground/60">{meta}</p>
        </div>
      </div>
    </label>
  );
}

function CartItem({
  title,
  price,
  image,
  quantity,
}: {
  title: string;
  price: number;
  image: string;
  quantity: number;
}) {
  return (
    <div className="flex gap-4">
      <div className="relative w-14 h-14 bg-foreground/10">
        <Image src={image} alt={title} fill className="object-cover rounded-lg" />
        <span className="w-5 h-5 flex items-center justify-center bg-brand text-xs text-background p-2 rounded-full absolute -top-1.5 -right-1.5">
          {quantity}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-sm">{title}</p>
        <p className="text-sm text-foreground/70">₹{price.toFixed(2)}</p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
