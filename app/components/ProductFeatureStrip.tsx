const FEATURES = [
  "Light Weight",
  "Tarnish-Free",
  "Waterproof",
];

export default function ProductFeatureStrip() {
  return (
    <section className="bg-[#faf7f3] overflow-hidden py-4 md:py-6">
      <div className="group overflow-hidden">
        <div className="flex w-max gap-16 px-8 whitespace-nowrap animate-marquee">
          {[...Array(8)].map((_, repeatIndex) => (
            <div key={repeatIndex} className="flex gap-16">
              {FEATURES.map((feature, index) => (
                <div
                  key={`${repeatIndex}-${index}`}
                  className="flex items-center gap-3 whitespace-nowrap"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand)]" />
                  <span className="uppercase text-sm font-medium tracking-wide text-foreground">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
