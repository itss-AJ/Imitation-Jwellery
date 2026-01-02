import CommonButton from "@/app/components/button/CommonButton";
import CommonHeading from "@/app/components/CommonHeading";
import CommonInput from "@/app/components/input/CommonInput";
import CommonTextarea from "@/app/components/input/CommonTextArea";

export default function ContactPage() {
    return (
        <div className="contactUsPage gradientBg">
            <section className="px-3 md:px-8 lg:px-10 py-8 md:py-16 lg:py-24">
                <div className="max-w-lg mx-auto">
                    {/* Heading */}
                    <CommonHeading
                        level={1}
                        title="GOT ANY QUESTIONS?"
                        description="Use the form below to get in touch with the sales team"
                    />

                    {/* Form */}
                    <form className="mt-12">
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                            <CommonInput name="Name" label="Name" placeholder="Enter Your Name" />
                            <CommonInput name="Name" label="Email" placeholder="Enter Your Email" />
                        </div>

                        <CommonInput name="tel" type="tel" label="Number" placeholder="Enter Your number" />

                        <CommonTextarea
                            name="message"
                            label="Message"
                            placeholder="Enter your message"
                        />

                        {/* Submit */}
                        <div className="flex justify-center md:pt-6">
                            <CommonButton variant="primaryBtn">
                                Send Question
                            </CommonButton>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
