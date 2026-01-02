import CommonButton from "@/app/components/button/CommonButton";
import { Truck, MoreVertical, XCircle, RotateCcw, Headset } from "lucide-react";
import OrderedProduct from "./OrderedProduct";
import OrderTracking from "./OrderTracking";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";

export default function OrderStatusCard({
  onCancel,
  onReturn,
}: {
  onCancel: () => void;
  onReturn: () => void;
}) {
  return (
    <div className="bg-background border border-foreground/20 rounded-2xl p-4 md:p-6 space-y-6">
      
      {/* STATUS */}
      <div className="flex flex-row items-center justify-between gap-4">
        
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 min-w-12 rounded-full bg-brand/10 flex items-center justify-center">
            <Truck className="text-brand" />
          </div>
          <div>
            <p className="font-medium text-base md:text-lg">Active Order</p>
            <p className="text-sm text-foreground/70">
              Expected Delivery Date: <strong>25 Dec 2025</strong>
            </p>
          </div>
        </div>

        {/* ACTION MENU */}
        <Menu as="div" className="relative">
          <MenuButton
            className="
              h-10 w-10 rounded-full
              border border-foreground/20
              flex items-center justify-center
              hover:bg-foreground/10
              transition
            "
            aria-label="Order actions"
          >
            <MoreVertical size={18} />
          </MenuButton>

          <MenuItems
            anchor="bottom end"
            className="
              mt-2 w-52 rounded-xl
              border border-foreground/20
              bg-background
              shadow-lg
              p-1
              z-50
              focus:outline-none
            "
          >
            {/* Cancel Order */}
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={onCancel}
                  className={`
                    flex w-full items-center gap-2
                    rounded-lg px-3 py-2 text-sm
                    ${active ? "bg-foreground/10" : ""}
                  `}
                >
                  <XCircle size={16} className="text-red-500" />
                  Cancel Order
                </button>
              )}
            </MenuItem>

            {/* Return Order */}
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={onReturn}
                  className={`
                    flex w-full items-center gap-2
                    rounded-lg px-3 py-2 text-sm
                    ${active ? "bg-foreground/10" : ""}
                  `}
                >
                  <RotateCcw size={16} />
                  Return Order
                </button>
              )}
            </MenuItem>

            <div className="my-1 h-px bg-foreground/20" />

            {/* Support */}
            <MenuItem>
              {({ active }) => (
                <Link
                  href="/contact-info"
                  className={`
                    flex items-center gap-2
                    rounded-lg px-3 py-2 text-sm
                    ${active ? "bg-foreground/10" : ""}
                  `}
                >
                  <Headset size={16} />
                  Support & Help
                </Link>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      <OrderedProduct />
      <OrderTracking />
    </div>
  );
}
