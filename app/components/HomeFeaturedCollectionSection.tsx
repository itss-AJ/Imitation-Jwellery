import Image from "next/image";
import CommonHeading from "./CommonHeading";
import CommonButton from "./button/CommonButton";
import CommonProductCard from "./CommonProductCard";

// type Product = {
//     id: number;
//     title: string;
//     price: string;
//     image: string;
// };

const PRODUCTS = [
    {
        id: 1,
        title: "Glossy Heart Stud",
        price: "Rs. 799.00",
        image: "/img/earring.webp",
    },
    {
        id: 2,
        title: "Interlocking Hoop Earring",
        price: "Rs. 1,299.00",
        image: "/img/bracelets.webp",
    },
];
const PRODUCTS2 = [
    {
        id: 1,
        title: "Glossy Heart Stud",
        price: "Rs. 799.00",
        image: "/img/bracelet-img.webp",
    },
    {
        id: 2,
        title: "Interlocking Hoop Earring",
        price: "Rs. 1,299.00",
        image: "/img/jewelrySet.webp",
    },
];

export default function HomeFeaturedCollectionSection() {
    return (
        <section className="px-3 md:px-8 lg:px-10 py-7 md:py-12 lg:py-20">
            <CommonHeading
                level={1}
                title="Featured Collection"
                description="Step into the world of refined elegance with our Featured Collection
                    at White Bunny."
            />

            <div className="flex flex-col gap-10 max-w-[1560px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-10 items-start">
                    <div className="lg:col-span-1">
                        <div className="relative h-[280px] md:h-[480px] rounded-2xl overflow-hidden">
                            <video src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/Privora-main/public/video/jewelryWoman-m24bVaMAWeZGiHjLN2xCyE384vWef4.mp4" autoPlay playsInline loop muted className="object-cover absolute top-0 left-0 w-full h-full"></video>
                            <div className="absolute inset-0 bg-black/30" />
                            <div className="absolute bottom-3 md:bottom-8 left-3 md:left-8 text-background max-w-5/6 md:max-w-xs">
                                <h3 className="text-lg md:text-3xl font-times mb-1 md:mb-2 uppercase">
                                    Trending Now
                                </h3>
                                <p className="mb-3 md:mb-6 text-sm">
                                    Jewelry That Reflects Your Inner Sparkle
                                </p>
                                <CommonButton
                                    variant="secondaryBtn"
                                    className="bg-background text-foreground"
                                >
                                    Discover Now
                                </CommonButton>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PRODUCTS */}
                    <div className="commonProductGrid grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-10">
                        {PRODUCTS.map((product) => (
                            <CommonProductCard
                                key={product.id}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                            />
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-10 items-start">
                    <div className="commonProductGrid grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-10">
                        {PRODUCTS2.map((product) => (
                            <CommonProductCard
                                key={product.id}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                            />
                        ))}
                    </div>
                    <div className="lg:col-span-1 featuredCollectionBestSellerVdo">
                        <div className="relative h-[280px] md:h-[480px] rounded-2xl overflow-hidden">
                            <video src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/Privora-main/public/video/jewelryWoman2-HXwX6JvjcVWwfrJKuyJOjHYL3pjL6c.mp4" autoPlay playsInline loop muted className="object-cover absolute top-0 left-0 w-full h-full"></video>
                            <div className="absolute inset-0 bg-black/30" />
                            <div className="absolute bottom-3 md:bottom-8 left-3 md:left-[unset] md:right-8 text-left md:text-right text-background max-w-5/6 md:max-w-xs">
                                <h3 className="text-3xl font-times mb-2 uppercase">
                                    Best Sellers
                                </h3>
                                <p className="mb-3 md:mb-6 text-sm">
                                    Glow with Privora
                                </p>
                                <CommonButton
                                    variant="secondaryBtn"
                                    className="bg-background text-foreground"
                                >
                                    Discover Now
                                </CommonButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
