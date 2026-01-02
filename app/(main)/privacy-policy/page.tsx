import CommonHeading from "@/app/components/CommonHeading";

export default function PrivacyPolicyPage() {
  return (
    <div className="cmsPage gradientBg">
      <section>
        <div className="px-3 md:px-8 lg:px-10 py-8 md:py-20 lg:py-20">
          <div className="max-w-3xl md:max-w-4xl mx-auto">
            <CommonHeading
              level={1}
              title="Privora Privacy Policy"
              noMargin
            />

            <p className="mt-5 md:mt-6 text-center text-[14px] md:text-base text-foreground/80 leading-relaxed">
              This Privacy Policy explains how Privora collects, uses, and
              protects your personal information when you use our website and
              services.
            </p>

            <div className="mt-14 md:mt-20 space-y-12 md:space-y-16">
              <Section
                title="Information We Collect"
                text="We may collect personal information such as your name, email address, phone number, shipping address, and payment details when you place an order or contact us."
              />

              <Section
                title="How We Use Your Information"
                text="Your information is used to process orders, provide customer support, improve our services, and communicate updates or promotions."
              />

              <Section
                title="Data Protection"
                text="We implement appropriate security measures to protect your personal data from unauthorized access, disclosure, or misuse."
              />

              <Section
                title="Sharing of Information"
                text="Privora does not sell or rent your personal information. Data may only be shared with trusted partners for order fulfillment and payment processing."
              />

              <Section
                title="Cookies"
                text="Our website uses cookies to enhance your browsing experience and analyze site traffic. You can manage cookie preferences through your browser settings."
              />

              <Section
                title="Your Rights"
                text="You have the right to access, update, or request deletion of your personal information by contacting our support team."
              />

              <Section
                title="Changes to This Policy"
                text="Privora may update this Privacy Policy from time to time. Changes will be posted on this page."
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
