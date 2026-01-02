// app/not-found.tsx
import Link from "next/link";
import FloatingBag from "./components/FloatingBag";

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
            {/* Background gradient */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-black to-black" /> */}
            {/* Content */}

            <FloatingBag src="/img/shoppingbagred.webp" />
            <FloatingBag src="/img/shoppingbagyellow.webp" />
            <FloatingBag src="/img/shoppingbaggreen.webp" />
            <FloatingBag src="/img/shoppingbagblue.webp" />

            <div className="relative z-10 max-w-xl text-center px-6">
                <h2 className="text-3xl md:text-4xl font-semibold">
                    You&apos;ve wandered off the product aisle
                </h2>

                <p className="mt-4 text-sm md:text-base text-foreground/65">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Let&apos;s get you back to shopping in no time.
                </p>

                <Link href="/" className="mt-6 commonLink flex justify-center">
                    Back to homepage
                </Link>
            </div>
            <h1
                aria-hidden
                className="absolute select-none text-[40vw] font-extrabold text-foreground/10">
                404
            </h1>
        </main>
    );
}
