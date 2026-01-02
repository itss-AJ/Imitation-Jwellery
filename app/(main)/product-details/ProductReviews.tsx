import Image from "next/image";
import { Star } from "lucide-react";
import CommonButton from "@/app/components/button/CommonButton";
import CommonHeading from "@/app/components/CommonHeading";

/* ================= MAIN EXPORT ================= */

export default function ProductReviews() {
    return (
        <section className="mt-10 md:mt-14">
            <div className="mx-auto px-3 md:px-8 lg:px-10">
                {/* Top Section */}
                <div className="max-w-[1560px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-6 md:mb-16">
                    <RatingSummary />
                    {/* Reviews Grid */}
                    <ReviewsGrid />
                </div>
            </div>
        </section>
    );
}

/* ================= RATING SUMMARY ================= */

function RatingSummary() {
    return (
        <div className="h-fit lg:sticky lg:top-2/6">
            {/* Heading */}
            <CommonHeading level={1} className="mb-10 text-left">
                Reviews
            </CommonHeading>
            <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-semibold text-foreground">4.0</span>

                <div>
                    <StarRow rating={4} />
                    <p className="text-sm text-foreground/70">
                        Rated by 369+ users
                    </p>
                </div>
            </div>

            <div className="space-y-3 mb-8">
                <RatingBar label="5" value={80} />
                <RatingBar label="4" value={60} />
                <RatingBar label="3" value={30} />
                <RatingBar label="2" value={20} />
                <RatingBar label="1" value={10} />
            </div>

            <CommonButton variant="primaryBtn" className="w-fit max-w-fit">
                Add Your Rating
            </CommonButton>
        </div>
    );
}

/* ================= STAR ROW ================= */

function StarRow({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    size={18}
                    className={
                        i <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                    }
                />
            ))}
        </div>
    );
}

/* ================= RATING BAR ================= */

function RatingBar({
    label,
    value,
}: {
    label: string;
    value: number;
}) {
    return (
        <div className="flex items-center gap-3">
            <span className="w-4 text-sm">{label}</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-brand"
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

/* ================= REVIEWS GRID ================= */

function ReviewsGrid() {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                <ReviewCard
                    name="Sophia Collins"
                    rating={5}
                    review="Loved the craftsmanship! Looks amazing in person."
                    images={[
                        "/img/pendant.webp",
                        "/img/pendant.webp",
                        "/img/pendant.webp",
                    ]}
                />
                <ReviewCard
                    name="Sophia Collins"
                    rating={3}
                    review="The product is great overall, but the delivery took a little longer than expected. Still worth it."
                />
                <ReviewCard
                    name="Ethan Ward"
                    rating={5}
                    review="Absolutely loved it! The quality is excellent, the design is sleek, and it works flawlessly."
                />
                <ReviewCard
                    name="Aarav Mehta"
                    rating={4}
                    review="Very elegant and well-crafted. Looks great with both ethnic and modern outfits."
                />
                <ReviewCard
                    name="Aarav Mehta"
                    rating={4}
                    review="Very elegant and well-crafted. Looks great with both ethnic and modern outfits."
                />
                <ReviewCard
                    name="Aarav Mehta"
                    rating={4}
                    review="Very elegant and well-crafted. Looks great with both ethnic and modern outfits."
                />
                <ReviewCard
                    name="Aarav Mehta"
                    rating={4}
                    review="Very elegant and well-crafted. Looks great with both ethnic and modern outfits."
                />
            </div>
            <div className="mt-3 md:mt-5 text-center">
            <CommonButton href="#" variant="secondaryBtn" className="max-w-fit">View More</CommonButton>
            </div>
        </div>
    );
}

/* ================= REVIEW CARD ================= */

function ReviewCard({
    name,
    rating,
    review,
    images = [],
}: {
    name: string;
    rating: number;
    review: string;
    images?: string[];
}) {
    return (
        <div className="border border-foreground/20 rounded-2xl p-3.5 md:p-6 h-full flex flex-col">
            <p className="font-medium mb-1">{name}</p>
            <p className="text-xs text-foreground/70 mb-3">1 Week Ago</p>

            <StarRow rating={rating} />

            <p className="text-sm text-foreground mt-3 flex-1">{review}</p>


            {/* Review Images */}
            {images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="relative aspect-square rounded-md overflow-hidden border border-foreground/20"
                        >
                            <Image
                                src={img}
                                alt={`Review image ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
