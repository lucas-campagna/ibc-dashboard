import { JSX, useEffect, useState } from "react";

type MenuProps = {
  children: JSX.Element;
};

const Menu = ({ children }: MenuProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let clock: number;
    const handleMouseMove = (event: any) => {
      const screenWidth = window.innerWidth;
      const mouseX = event.clientX;
      const threshold = screenWidth * 0.3;

      clearTimeout(clock);
      if (mouseX <= threshold) {
        setIsVisible(true);
      } else {
        clock = setTimeout(() => setIsVisible(false), 1000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(clock);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`fixed top-30 left-4 bg-gray-100 p-4 rounded-lg shadow-md transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default Menu;
