"use client";

import Image from "next/image";
import CommonButton from "@/app/components/button/CommonButton";
import CommonHeading from "@/app/components/CommonHeading";
import Link from "next/link";

type EmptyStateSectionProps = {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
};

export default function EmptyStateSection({
  image,
  title,
  description,
  buttonText,
  buttonHref,
}: EmptyStateSectionProps) {
  return (
    <section className="flex flex-col items-center justify-center text-center px-4 py-12 sm:py-16 lg:py-20 max-w-3xl mx-auto">
      
      {/* IMAGE */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 mb-6 sm:mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* TEXT */}
      <CommonHeading
        level={2}
        title={title}
        description={description}
        noMargin
      />

      {/* ACTION */}
      <div className="mt-6 sm:mt-8">
        <Link href={buttonHref}>
          <CommonButton className="px-6 sm:px-8 py-3 text-sm sm:text-base">
            {buttonText}
          </CommonButton>
        </Link>
      </div>
    </section>
  );
}
