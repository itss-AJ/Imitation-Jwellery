import CommonHeading from './CommonHeading'
import CommonProductCard from './CommonProductCard'

export default function BestSeller() {
    const PRODUCTS = [
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
        image: "/img/bracelets.webp",
    },
    {
        id: 3,
        title: "Interlocking Hoop Earring",
        price: "Rs. 1,299.00",
        image: "/img/jewelrySet.webp",
    },
    {
        id: 4,
        title: "Interlocking Hoop Earring",
        price: "Rs. 1,299.00",
        image: "/img/pendant_old.webp",
    },
    {
        id: 5,
        title: "Interlocking Hoop Earring",
        price: "Rs. 1,299.00",
        image: "/img/necklace.webp",
    }]
    return (
        <section className="px-3 md:px-8 lg:px-10 py-7 md:py-12 lg:py-20">
            <CommonHeading
                level={1}
                title="Best Seller"
                description="Proudly Supporting Ethical Sourcing - Every Gemstone Has a Story."
            />
            <div className="commonProductGrid productGrid max-w-[1560px] mx-auto">
                {PRODUCTS.map((product) => (
                    <CommonProductCard
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        image={product.image}
                    />
                ))}
            </div>
        </section>
    )
}
