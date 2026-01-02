import React from "react";
import Link from "next/link";

type ButtonVariant =
  | "primaryBtn"
  | "secondaryBtn"
  | "disableBtn"
  | "iconBtn";

type CommonButtonProps = {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  href?: string;
};

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primaryBtn: `
    bg-[var(--brand)]
    text-[var(--background)]
    tracking-[0.4px]
    px-6 py-3
    rounded-[30px]
    text-center
    uppercase
    hover:opacity-90
    cursor-pointer
    w-full
  `,
  secondaryBtn: `
    bg-[var(--background)]
    text-[var(--brand)]
    border border-[var(--brand)]
    px-6 py-3
    rounded-[30px]
    uppercase
    hover:bg-[var(--brand)]
    hover:text-white
    cursor-pointer
    w-full
  `,
  disableBtn: `
    bg-gray-300
    text-gray-500
    px-6 py-3
    rounded-[30px]
    uppercase
    cursor-not-allowed
    w-full
  `,
  iconBtn: `
    bg-[var(--background)]
    border border-[var(--brand)]
    text-[var(--brand)]
    w-9 h-9
    rounded-full
    flex items-center justify-center
    hover:bg-[var(--brand)]
    hover:text-white
    transition
    cursor-pointer
  `,
};

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  variant = "primaryBtn",
  type = "button",
  onClick,
  disabled = false,
  className = "",
  href,
}) => {
  const isDisabled = disabled || variant === "disableBtn";

  const commonClasses = `
    inline-flex items-center justify-center
    transition-all duration-200 font-semibold
    focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40

    /* Responsive font size */
    text-sm md:text-base

    ${VARIANT_STYLES[variant]}
    ${isDisabled ? "pointer-events-none" : ""}
    ${className}
  `;

  if (href && !isDisabled) {
    return (
      <Link href={href} className={commonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={commonClasses}
    >
      {children}
    </button>
  );
};

export default CommonButton;
