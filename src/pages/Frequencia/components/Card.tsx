import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ title, children, className = '', style }) => {
  return (
    <div className={`bg-gray-100 rounded-xl shadow-md p-6 mb-5 ${className}`} style={style}>
      {title && <h3 className="uppercase text-lg font-semibold mb-4 text-gray-800">{title}</h3>}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;