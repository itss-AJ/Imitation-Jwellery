"use client";

import type React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, AlertCircle } from "lucide-react";
import CommonInput from "@/app/components/input/CommonInput";
import CommonButton from "@/app/components/button/CommonButton";
import type { Address } from "@/services/address-service";

export type AddAddressPayload = {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

type ValidationErrors = Partial<AddAddressPayload>;

type AddAddressModalProps = {
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
  initialData?: Address | null;
  onSave?: (payload: AddAddressPayload) => void;
  isLoading?: boolean;
};

const getInitialFormData = (
  isEdit: boolean,
  initialData: Address | null | undefined
): AddAddressPayload => {
  if (isEdit && initialData) {
    return {
      country: initialData.country || "India",
      fullName: initialData.fullName || "",
      line1: initialData.line1 || "",
      line2: initialData.line2 || "",
      city: initialData.city || "",
      state: initialData.state || "",
      pincode: initialData.pincode || "",
    };
  }
  return {
    country: "India",
    fullName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  };
};

export default function AddAddressModal({
  open,
  onClose,
  isEdit = false,
  initialData,
  onSave,
  isLoading = false,
}: AddAddressModalProps) {
  // This avoids cascading setState calls in useEffect
  const [formData, setFormData] = useState<AddAddressPayload>(
    getInitialFormData(isEdit, initialData)
  );

  const [errors, setErrors] = useState<ValidationErrors>({});

  // Form resets automatically when modal closes/opens due to unmount/remount cycle

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.line1.trim()) {
      newErrors.line1 = "Address line 1 is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "PIN code must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ValidationErrors];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && onSave) {
      onSave(formData);
    }
  };

  return (
    <Transition
      appear
      show={open}
      as={Fragment}
      key={`${open}-${initialData?._id || "new"}`}
    >
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-xl rounded-2xl bg-background p-6">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-lg font-medium">
                    {isEdit ? "Edit address" : "Add new address"}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    title="Close"
                    className="p-2 rounded-full hover:bg-foreground/10"
                    disabled={isLoading}
                  >
                    <X size={18} />
                  </button>
                </div>

                {Object.keys(errors).length > 0 && (
                  <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <p className="text-sm text-red-700">
                      Please fix the errors below
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <CommonInput
                    label="Country/region"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                  />
                  <CommonInput
                    label="Full name"
                    name="fullName"
                    placeholder="Full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    error={errors.fullName}
                    required
                  />
                  <CommonInput
                    label="Address line 1"
                    name="line1"
                    placeholder="Street, area, landmark"
                    value={formData.line1}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    error={errors.line1}
                    required
                  />
                  <CommonInput
                    label="Address line 2 (optional)"
                    name="line2"
                    placeholder="Apartment, suite, etc"
                    value={formData.line2}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <CommonInput
                      label="City"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      error={errors.city}
                      required
                    />
                    <CommonInput
                      label="State"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      error={errors.state}
                      required
                    />
                    <CommonInput
                      label="PIN code"
                      name="pincode"
                      type="text"
                      inputMode="numeric"
                      placeholder="PIN code"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      error={errors.pincode}
                      required
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <CommonButton
                      type="button"
                      variant="secondaryBtn"
                      onClick={onClose}
                      className="w-fit px-6"
                      disabled={isLoading}
                    >
                      Cancel
                    </CommonButton>
                    <CommonButton
                      type="submit"
                      className="w-fit px-6"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save"}
                    </CommonButton>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
