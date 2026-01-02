import React from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type CommonHeadingProps = {
  level?: HeadingLevel;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  descriptionClassName?: string;
  noMargin?: boolean;
};

const BASE_STYLES =
  "font-times text-foreground text-center tracking-tight";

/**
 * Responsive heading sizes
 * Mobile first → md+
 */
const LEVEL_STYLES: Record<HeadingLevel, string> = {
  1: "text-[24px] md:text-4xl mb-4",
  2: "text-xl md:text-3xl mb-3",
  3: "text-lg md:text-2xl mb-3",
  4: "text-base md:text-xl mb-2",
  5: "text-sm md:text-lg mb-2",
  6: "text-sm md:text-base mb-1",
};

const DESCRIPTION_STYLES =
  "text-foreground text-sm max-w-4xl font-normal mx-auto text-center tracking-wide";

const CommonHeading: React.FC<CommonHeadingProps> = ({
  level = 1,
  title,
  description,
  children,
  className = "",
  descriptionClassName = "",
  noMargin = false,
}) => {
  const Tag: React.ElementType = `h${level}`;
  const headingContent = title ?? children;

  return (
    <div className={noMargin ? "" : "mb-8 md:mb-12"}>
      <Tag className={`${BASE_STYLES} ${LEVEL_STYLES[level]} ${className}`}>
        {headingContent}
      </Tag>

      {description && (
        <p
          className={`${DESCRIPTION_STYLES} ${descriptionClassName}`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default CommonHeading;
