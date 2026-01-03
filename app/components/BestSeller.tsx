import CommonHeading from "./CommonHeading";
import CommonProductCard from "./CommonProductCard";

export default function BestSeller() {
  const PRODUCTS = [
    {
      id: "69562cc62c9e2fba8807ad29", // Updated mock IDs to real MongoDB ObjectIDs
      title: "Glossy Heart Stud",
      price: "Rs. 799.00",
      image: "/img/bracelet-img.webp",
    },
    {
      id: "69562cc62c9e2fba8807ad28", // Updated mock IDs to real MongoDB ObjectIDs
      title: "Interlocking Hoop Earring",
      price: "Rs. 1,299.00",
      image: "/img/bracelets.webp",
    },
    {
      id: "69562cc62c9e2fba8807ad27", // Updated mock IDs to real MongoDB ObjectIDs
      title: "Interlocking Hoop Earring",
      price: "Rs. 1,299.00",
      image: "/img/jewelrySet.webp",
    },
    {
      id: "69562cc62c9e2fba8807ad1e", // Updated mock IDs to real MongoDB ObjectIDs
      title: "Interlocking Hoop Earring",
      price: "Rs. 1,299.00",
      image: "/img/pendant_old.webp",
    },
    {
      id: "69562cc62c9e2fba8807ad21", // Updated mock IDs to real MongoDB ObjectIDs
      title: "Interlocking Hoop Earring",
      price: "Rs. 1,299.00",
      image: "/img/necklace.webp",
    },
  ];
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
            productId={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
}
