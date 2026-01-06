"use client";

import { useMutation } from "@tanstack/react-query";
import { submitContactForm, type ContactFormData } from "@/services/contact-service";

export const useContactForm = () => {
  return useMutation({
    mutationFn: (data: ContactFormData) => submitContactForm(data),
  });
};
