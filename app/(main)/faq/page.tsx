"use client";

import CommonHeading from "@/app/components/CommonHeading";
import { Disclosure } from "@headlessui/react";
import { Plus, X } from "lucide-react";

const faqs = [
    {
        question: "Are Privora products authentic?",
        answer:
            "Yes. All Privora products are thoughtfully designed and crafted using high-quality materials, ensuring authenticity, durability, and timeless appeal.",
    },
    {
        question: "Is your jewelry safe for sensitive skin?",
        answer:
            "Absolutely. Our jewelry is hypoallergenic and carefully finished to be gentle on the skin, making it suitable for everyday wear.",
    },
    {
        question: "How long does shipping take?",
        answer:
            "Orders are usually processed within 24-48 hours and delivered within 3-7 business days, depending on your location.",
    },
    {
        question: "Do you offer Cash on Delivery (COD)?",
        answer:
            "Yes, we offer Cash on Delivery on eligible orders for your convenience.",
    },
    {
        question: "How can I track my order?",
        answer:
            "Once your order is shipped, you'll receive a tracking link via email or SMS to monitor your delivery in real time.",
    },
    {
        question: "What is your return or exchange policy?",
        answer:
            "We offer easy returns or exchanges within a specified period, provided the product is unused and in its original packaging.",
    },
    {
        question: "How should I care for my jewelry?",
        answer:
            "To maintain its shine, store your jewelry in a dry place, avoid contact with water or chemicals, and gently wipe it with a soft cloth after use.",
    },
    {
        question: "How can I contact Privora support?",
        answer:
            "You can reach our support team through the Contact Us page or email us directly. We’re always happy to help.",
    },
];

export default function FaqSection() {
    return (
        <div className="faqPage">
            <section className="px-3 md:px-8 lg:px-10 py-7 md:py-10 lg:py-10">
                <div className="mx-auto rounded-2xl md:p-10 max-w-full">
                    <div className="grid grid-cols-1 gap-4 md:gap-10 max-w-4xl mx-auto">
                        {/* ================= LEFT CONTENT (STICKY) ================= */}
                        <div className="">
                            <CommonHeading
                                level={1}
                                title="Frequently Asked Questions"
                                noMargin
                                className="text-left"
                            />
                            <p className="text-sm text-foreground leading-relaxed">
                                Have questions? You're not alone. Here are some of the most common things people ask us, answered clearly to help you get started with confidence.
                            </p>
                        </div>

                        {/* ================= RIGHT ACCORDIONS ================= */}
                        <div className="space-y-3">
                            {faqs.map((faq, index) => (
                                <Disclosure key={index}>
                                    {({ open }) => (
                                        <div className="border border-foreground/20 rounded-xl px-3 py-3 md:px-5 md:py-4">
                                            <Disclosure.Button className="flex w-full items-center justify-between text-left">
                                                <span className="font-medium text-sm md:text-base text-foreground">
                                                    {faq.question}
                                                </span>
                                                {open ? (
                                                    <X size={18} />
                                                ) : (
                                                    <Plus size={18} />
                                                )}
                                            </Disclosure.Button>

                                            <Disclosure.Panel className="mt-3 text-sm text-foreground/80 leading-relaxed">
                                                {faq.answer}
                                            </Disclosure.Panel>
                                        </div>
                                    )}
                                </Disclosure>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
