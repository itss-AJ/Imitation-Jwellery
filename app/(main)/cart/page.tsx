"use client"
import CommonButton from "@/app/components/button/CommonButton"
import CommonHeading from "@/app/components/CommonHeading"
import CommonProductCard from "@/app/components/CommonProductCard"
import EmptyStateSection from "@/app/components/EmptyStateSection"
import CommonTextarea from "@/app/components/input/CommonTextArea"
import LoginToContinueModal from "@/app/components/LoginToContinue"
import { useState } from "react"
import { useCart, useUpdateCartQuantity, useRemoveFromCart } from "@/hooks/use-cart"

const PRODUCTS = [
  {
    id: 1,
    title: "Glossy Heart Stud",
    price: "Rs. 799.00",
    oldPrice: "Rs. 849.00",
    image: "/img/bracelet-img.webp",
  },
  {
    id: 2,
    title: "Interlocking Hoop Earring",
    price: "Rs. 1,299.00",
    oldPrice: "Rs. 1,349.00",
    image: "/img/bracelets.webp",
  },
  {
    id: 3,
    title: "Interlocking Hoop Earring",
    price: "Rs. 1,299.00",
    oldPrice: "Rs. 1,349.00",
    image: "/img/jewelrySet.webp",
  },
  {
    id: 4,
    title: "Interlocking Hoop Earring",
    price: "Rs. 1,299.00",
    oldPrice: "Rs. 1,349.00",
    image: "/img/pendant_old.webp",
  },
  {
    id: 5,
    title: "Interlocking Hoop Earring",
    price: "Rs. 1,299.00",
    oldPrice: "Rs. 1,349.00",
    image: "/img/necklace.webp",
  },
]

export default function CartPage() {
  const [openLogin, setOpenLogin] = useState(false)

  const { data: cartItems = [] } = useCart()
  const updateQuantity = useUpdateCartQuantity()
  const removeFromCart = useRemoveFromCart()

  const subtotal =
    Array.isArray(cartItems) && cartItems.length > 0
      ? cartItems.reduce((sum, item) => {
          // Guard against missing price property
          const itemPrice = typeof item.price === "number" ? item.price : 0
          const itemQty = typeof item.quantity === "number" ? item.quantity : 1
          return sum + itemPrice * itemQty
        }, 0)
      : 0

  const shipping = 0
  const total = subtotal + shipping

  const isEmpty = !Array.isArray(cartItems) || cartItems.length === 0

  return (
    <>
      <div className="cartPage gradientBg">
        <section className="px-3 md:px-6 lg:px-10 py-7 md:py-12 lg:py-10 gradientBg">
          <div className="max-w-[1560px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* ================= CART ITEMS ================= */}
              <div className="lg:col-span-2">
                <CommonHeading level={1} title="Your Cart" className="text-left" />

                {/* DESKTOP HEADER */}
                {!isEmpty && (
                  <div className="hidden lg:grid gap-6 grid-cols-[1fr_200px_150px] border-b border-foreground/20 pb-4 mb-8 text-sm font-medium">
                    <span>Product</span>
                    <span className="text-center">Quantity</span>
                    <span className="text-right">Total</span>
                  </div>
                )}

                {/* ITEMS */}
                {!isEmpty ? (
                  <div className="space-y-6 md:space-y-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="
                      flex flex-col lg:grid
                      lg:grid-cols-[1fr_200px_150px]
                      gap-6 border-b border-foreground/20 pb-6 md:pb-6"
                      >
                        {/* PRODUCT */}
                        <div className="flex gap-6">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 min-w-16 md:w-28 md:h-28 md:min-w-28 object-cover rounded-md"
                          />

                          <div>
                            <h2 className="text-base md:text-lg font-medium font-times uppercase tracking-wide">
                              {item.name}
                            </h2>

                            {/* MOBILE PRICE */}
                            <p className="lg:hidden mt-2 text-sm">Rs. {item.price.toFixed(2)}</p>

                            {/* MOBILE QUANTITY */}
                            <div className="lg:hidden mt-4">
                              <QuantityControl
                                quantity={item.quantity}
                                onIncrease={() =>
                                  updateQuantity.mutate({ cartItemId: item.id, quantity: item.quantity + 1 })
                                }
                                onDecrease={() =>
                                  updateQuantity.mutate({
                                    cartItemId: item.id,
                                    quantity: Math.max(1, item.quantity - 1),
                                  })
                                }
                              />
                            </div>

                            <button
                              onClick={() => removeFromCart.mutate(item.id)}
                              className="mt-2 md:mt-0 text-sm cursor-pointer underline-offset-2 text-foreground/70 underline hover:text-foreground w-fit"
                              disabled={removeFromCart.isPending}
                            >
                              {removeFromCart.isPending ? "Removing..." : "Remove"}
                            </button>
                          </div>
                        </div>

                        {/* DESKTOP QUANTITY */}
                        <div className="hidden lg:flex justify-center items-center">
                          <QuantityControl
                            quantity={item.quantity}
                            onIncrease={() =>
                              updateQuantity.mutate({ cartItemId: item.id, quantity: item.quantity + 1 })
                            }
                            onDecrease={() =>
                              updateQuantity.mutate({ cartItemId: item.id, quantity: Math.max(1, item.quantity - 1) })
                            }
                          />
                        </div>

                        {/* DESKTOP TOTAL */}
                        <div className="hidden lg:flex justify-end items-center font-medium">
                          Rs. {(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* ================= SUMMARY ================= */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="border border-foreground/20 rounded-md p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

                  <CommonTextarea
                    label="Special instructions for seller"
                    name="special Instruction"
                    placeholder="Write any special requests here..."
                    rows={4}
                  />

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>Rs. {subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `Rs. ${shipping}`}</span>
                    </div>

                    <div className="border-t border-foreground/20 pt-4 flex justify-between font-medium">
                      <span>Total</span>
                      <span>Rs. {total.toFixed(2)}</span>
                    </div>
                  </div>

                  <CommonButton
                    variant="primaryBtn"
                    onClick={() => setOpenLogin(true)}
                    className="mt-5"
                    disabled={isEmpty}
                  >
                    Proceed to Checkout
                  </CommonButton>
                </div>
              </div>
            </div>

            {isEmpty && (
              <EmptyStateSection
                image="/img/cart.webp"
                title="Your cart is empty"
                description="Looks like you haven't added anything to your cart yet. Explore our collection and find something you'll love."
                buttonText="Shop Now"
                buttonHref="/product-list"
              />
            )}
          </div>
        </section>

        {!isEmpty && (
          <section className="px-3 md:px-8 lg:px-10 py-7 md:py-12 lg:py-12">
            <CommonHeading level={1} title="You May Also Like" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-10 max-w-[1560px] mx-auto">
              {PRODUCTS.map((product) => (
                <CommonProductCard
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  oldPrice={product.oldPrice}
                />
              ))}
            </div>
          </section>
        )}
      </div>
      <LoginToContinueModal open={openLogin} onClose={() => setOpenLogin(false)} />
    </>
  )
}

/* ================= Quantity Control ================= */

function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
}: {
  quantity: number
  onIncrease?: () => void
  onDecrease?: () => void
}) {
  return (
    <div className="flex items-center border border-foreground/20 w-fit">
      <button onClick={onDecrease} className="px-2 md:px-4 py-1 md:py-2 text-lg">
        −
      </button>
      <span className="px-4 md:px-6">{quantity}</span>
      <button onClick={onIncrease} className="px-2 md:px-4 py-1 md:py-2 text-lg">
        +
      </button>
    </div>
  )
}
