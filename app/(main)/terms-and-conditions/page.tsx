import CommonHeading from "@/app/components/CommonHeading";

export default function TermsAndConditionsPage() {
    return (
        <div className="cmsPage gradientBg">
            <section className="">
                <div className="px-3 md:px-8 lg:px-10 py-8 md:py-20 lg:py-20">
                    <div className="max-w-3xl md:max-w-4xl mx-auto">
                        <CommonHeading
                            level={1}
                            title="Privora Terms & Conditions"
                            noMargin
                        />

                        <p className="mt-5 md:mt-6 text-center text-[14px] md:text-base text-foreground/80 leading-relaxed">
                            These Terms & Conditions (“Terms”) govern your access to and use of
                            Privora's website, products, and services. By accessing or using any
                            part of our website, you agree to be bound by these Terms. If you do
                            not agree with any part of these Terms, please do not use our
                            services.
                        </p>

                        <div className="mt-14 md:mt-20 space-y-12 md:space-y-16">
                            <Section
                                title="Acceptance and Binding Effect"
                                text="Your access to or use of Privora's services constitutes acceptance of these Terms and forms a legally binding agreement between you and Privora, whether or not you create an account or complete a purchase."
                            />

                            <Section
                                title="User Obligations"
                                text="You agree to provide accurate, current, and complete information when placing orders or creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
                            />

                            <Section
                                title="Prohibited Use"
                                text="You may not use Privora's website or services for any unlawful purpose, to violate applicable laws, to infringe upon the rights of others, or to interfere with the security or functionality of the website."
                            />

                            <Section
                                title="Orders and Payments"
                                text="All orders placed through Privora are subject to acceptance and availability. Prices are displayed in local currency and are subject to change without prior notice. We reserve the right to refuse or cancel any order at our discretion."
                            />

                            <Section
                                title="Shipping and Delivery"
                                text="Shipping timelines provided are estimates only. Privora is not responsible for delays caused by courier partners, weather conditions, or other unforeseen circumstances."
                            />

                            <Section
                                title="Returns and Exchanges"
                                text="Returns or exchanges are accepted in accordance with Privora's return policy. Products must be unused and returned in their original packaging within the specified return period."
                            />

                            <Section
                                title="Limitation of Liability"
                                text="Privora shall not be liable for any indirect, incidental, or consequential damages arising from your use of our products or services, to the fullest extent permitted by law."
                            />

                            <Section
                                title="Changes to These Terms"
                                text="Privora reserves the right to update or modify these Terms at any time. Changes will be effective immediately upon posting on this page."
                            />

                            <Section
                                title="Contact Information"
                                text="If you have any questions about these Terms & Conditions, please contact us through the Contact Us page. Our team will be happy to assist you."
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}


function Section({
    title,
    text,
}: {
    title: string;
    text: string;
}) {
    return (
        <div>
            <h2 className="font-times text-[20px] md:text-2xl mb-3 md:mb-4 text-foreground">
                {title}
            </h2>
            <p className="text-[14px] md:text-base text-foreground/80 leading-relaxed">
                {text}
            </p>
        </div>
    );
}
