"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { X } from "lucide-react";
import CommonButton from "@/app/components/button/CommonButton";

const RETURN_REASONS = [
  "Received wrong item",
  "Product damaged",
  "Quality not as expected",
  "Item no longer needed",
  "Other",
];

export default function ReturnOrderModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [reason, setReason] = useState("");

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
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        {/* MODAL */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-10">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md rounded-2xl bg-background p-6">
                
                {/* HEADER */}
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-lg font-medium">
                    Return Order
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-foreground/10"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className="text-sm text-foreground/70 mb-4">
                  Please select a reason for returning this order.
                </p>

                {/* REASONS */}
                <div className="space-y-3 mb-6">
                  {RETURN_REASONS.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 cursor-pointer text-sm"
                    >
                      <input
                        type="radio"
                        name="returnReason"
                        value={item}
                        checked={reason === item}
                        onChange={() => setReason(item)}
                        className="accent-brand"
                      />
                      {item}
                    </label>
                  ))}
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3">
                  <CommonButton
                    variant="secondaryBtn"
                    onClick={onClose}
                    className="max-w-fit">
                    Cancel
                  </CommonButton>

                  <CommonButton
                    disabled={!reason}
                    onClick={() => {
                      onClose();
                      // API call later
                    }}
                    className="max-w-fit"
                  >
                    Submit Return
                  </CommonButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
