import Image from "next/image";
import CommonHeading from "./CommonHeading";

type Review = {
  id: number;
  name: string;
  text: string;
  image: string;
};

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Simran K.",
    text: "Sleek, minimal, and beautifully bold. My new favorite necklace.",
    image: "/img/pendant_old.webp",
  },
  {
    id: 2,
    name: "Neha V.",
    text: "Absolutely gorgeous with delicate, eye-catching details.",
    image: "/img/pendant.webp",
  },
  {
    id: 3,
    name: "Priya R.",
    text: "Delicate, feminine, and perfect for everyday wear.",
    image: "/img/pendant_old.webp",
  },
  {
    id: 4,
    name: "Ananya T.",
    text: "Elegant, minimal, and effortlessly versatile.",
    image: "/img/bracelet-img.webp",
  },
  {
    id: 5,
    name: "Riya S.",
    text: "Sleek design that pairs perfectly with every outfit.",
    image: "/img/earring.webp",
  },
  {
    id: 6,
    name: "Ishita M.",
    text: "Beautiful craftsmanship and a truly premium feel.",
    image: "/img/pendant.webp",
  },
];

export default function HomeCustomerFeedback() {
  return (
    <section className="py-7 md:py-12 lg:py-20 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-12">
        <CommonHeading
          level={1}
          title="Our customers love us"
          description="5.0 star based on all customer reviews"
        />
      </div>

      {/* Marquee Wrapper */}
      <div className="group relative">
        <div className="flex w-max gap-8 animate-marquee-left">
          {[...Array(2)].map((_, loopIndex) => (
            <div key={loopIndex} className="flex gap-8">
              {REVIEWS.map((review) => (
                <div
                  key={`${loopIndex}-${review.id}`}
                  className="customerReviewCard min-w-[380px] max-w-[380px] bg-white rounded-full px-6 py-4 flex items-start gap-4 shadow-sm"
                >
                  {/* Avatar */}
                  <div className="relative h-14 w-14 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{review.name}</p>
                      <div className="flex text-orange-400 text-sm">
                        ★★★★★
                      </div>
                    </div>
                    <p className="text-sm text-foreground/70 leading-snug">
                      {review.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
