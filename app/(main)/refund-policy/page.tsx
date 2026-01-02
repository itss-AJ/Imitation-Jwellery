import CommonHeading from "@/app/components/CommonHeading";

export default function RefundPolicyPage() {
  return (
    <div className="cmsPage gradientBg">
      <section>
        <div className="px-3 md:px-8 lg:px-10 py-8 md:py-20 lg:py-20">
          <div className="max-w-3xl md:max-w-4xl mx-auto">
            <CommonHeading
              level={1}
              title="Privora Refund Policy"
              noMargin
            />

            <p className="mt-5 md:mt-6 text-center text-[14px] md:text-base text-foreground/80 leading-relaxed">
              At Privora, customer satisfaction is important to us. Please read
              our refund policy carefully to understand your rights.
            </p>

            <div className="mt-14 md:mt-20 space-y-12 md:space-y-16">
              <Section
                title="Eligibility for Refunds"
                text="Refunds are applicable only for products that are damaged, defective, or incorrect upon delivery."
              />

              <Section
                title="Refund Request Process"
                text="To request a refund, please contact our support team within the specified return period along with order details and images."
              />

              <Section
                title="Refund Approval"
                text="Once your request is reviewed and approved, refunds will be initiated to the original payment method."
              />

              <Section
                title="Processing Time"
                text="Approved refunds are typically processed within 5–7 business days, depending on your payment provider."
              />

              <Section
                title="Non-Refundable Items"
                text="Products damaged due to misuse, normal wear and tear, or returned without original packaging may not be eligible for a refund."
              />

              <Section
                title="Changes to This Policy"
                text="Privora reserves the right to update or modify this Refund Policy at any time."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Section({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="font-times text-[20px] md:text-2xl mb-3 md:mb-4">
        {title}
      </h2>
      <p className="text-[14px] md:text-base text-foreground/80 leading-relaxed">
        {text}
      </p>
    </div>
  );
}
