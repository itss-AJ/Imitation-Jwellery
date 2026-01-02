import CommonHeading from "@/app/components/CommonHeading";

export default function ShippingPolicyPage() {
  return (
    <div className="cmsPage gradientBg">
      <section>
        <div className="px-3 md:px-8 lg:px-10 py-8 md:py-20 lg:py-20">
          <div className="max-w-3xl md:max-w-4xl mx-auto">
            <CommonHeading
              level={1}
              title="Privora Shipping Policy"
              noMargin
            />

            <p className="mt-5 md:mt-6 text-center text-[14px] md:text-base text-foreground/80 leading-relaxed">
              This Shipping Policy outlines how and when your Privora orders are
              processed and delivered.
            </p>

            <div className="mt-14 md:mt-20 space-y-12 md:space-y-16">
              <Section
                title="Order Processing"
                text="Orders are typically processed within 24–48 hours after confirmation, excluding weekends and public holidays."
              />

              <Section
                title="Shipping Timeframes"
                text="Delivery timelines may vary based on your location. Most orders are delivered within 3–7 business days."
              />

              <Section
                title="Shipping Charges"
                text="Shipping charges, if applicable, will be displayed at checkout before order confirmation."
              />

              <Section
                title="Delayed or Lost Shipments"
                text="While we strive for timely delivery, delays may occur due to courier or external factors. Privora is not liable for such delays."
              />

              <Section
                title="Incorrect Address"
                text="Please ensure your shipping address is accurate. Privora is not responsible for orders delivered to incorrect addresses provided by customers."
              />

              <Section
                title="Contact Support"
                text="If you have questions regarding your shipment, please contact our support team for assistance."
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
