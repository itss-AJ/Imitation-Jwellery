import Image from "next/image";

type FloatingBagProps = {
  src: string;
  size?: number;
};

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function FloatingBag({
  src,
  size = 100,
}: FloatingBagProps) {
  const style = {
    left: `${random(5, 85)}%`,
    top: `${random(5, 85)}%`,
    animationDuration: `${random(8, 16)}s`,
    animationDelay: `${random(0, 4)}s`,
    transform: `rotate(${random(-15, 15)}deg) scale(${random(
      0.8,
      1.1
    )})`,
  };

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute animate-float-shoppingBag"
      style={style}
    >
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        className="select-none drop-shadow-2xl"
        priority={false}
        unoptimized
      />
    </div>
  );
}
