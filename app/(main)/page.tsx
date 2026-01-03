import BestSeller from "../components/BestSeller";
import CommonHeading from "../components/CommonHeading";
import CommonProductCard from "../components/CommonProductCard";
import HomeCategoriesSection from "../components/HomeCategoriesSection";
import HomeCustomerFeedback from "../components/HomeCustomerFeedback";
import HomeFeaturedCollectionSection from "../components/HomeFeaturedCollectionSection";
import HomeFollowOnSocialSection from "../components/HomeFollowOnSocialSection";
import HomeHeroSection from "../components/HomeHeroSec";
import HomeStoreFeature from "../components/HomeStoreFeature";
import ProductFeatureStrip from "../components/ProductFeatureStrip";

export default function Home() {
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
    },
];
  return (
    <>
      <div className="homepageWrap gradientBg">
        <HomeHeroSection />

        <ProductFeatureStrip />

        {/* <h1 className="font-times uppercase text-8xl">WELCOME</h1> */}

        {/* <section className="px-5 md:px-8 lg:px-10">
          <CommonHeading
            level={1}
            title="Welcome to Privora"
            description="Welcome to White Bunny, where elegance meets simplicity. We are a contemporary jewelry brand crafted for the modern Indian woman who values minimalism, affordability, and self-expression. Our jewelry is designed to be more than just an accessory—it's a reflection of your personality, confidence, and unique style."
            noMargin
          />
        </section> */}
        {/* Categories Section */}
        <HomeCategoriesSection />


        <BestSeller />


        <HomeCustomerFeedback />

        <section className="px-3 md:px-8 lg:px-10 py-7 md:py-12 lg:py-20">
          <CommonHeading
            level={1}
            title="New Arrival"
            description="Jewelry crafted with care, guided by responsibility."
          />
          <div className="commonProductGrid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-10 max-w-[1560px] mx-auto">
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

        <HomeFeaturedCollectionSection />

        <HomeFollowOnSocialSection />

        <HomeStoreFeature />

        {/* <HomeHeroSection />
        <HomeHeroSection /> */}
      </div>
    </>
  );
}