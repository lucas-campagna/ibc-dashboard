import React, { ReactNode } from 'react';

interface HorizontalSplitProps {
  children: ReactNode[] | ReactNode;
  sizes?: number[];
  gap?: string;
  className?: string;
}

const HorizontalSplit: React.FC<HorizontalSplitProps> = ({
  children,
  sizes,
  gap = 'gap-4',
  className = '',
}) => {
  const childrenArray = React.Children.toArray(children);

  if (!childrenArray.length) {
    return null;
  }

  const gridTemplateColumns = sizes
    ? sizes.map(n => `${n}fr`).join(' ')
    : `repeat(${childrenArray.length}, 1fr)`;

  return (
    <div
      className={`w-full grid ${gap} ${className}`} // Tailwind grid classes
      style={{ gridTemplateColumns }}
    >
      {childrenArray.map((child, index) => (
        <div key={index} className="min-w-0">
          {child}
        </div>
      ))}
    </div>
  );
};

export default HorizontalSplit;