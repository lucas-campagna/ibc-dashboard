import { JSX, useState } from "react";
import CloseButton from "../CloseButton";

type MenuProps = {
  children: JSX.Element;
};

const Menu = ({ children }: MenuProps) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <button
        onClick={() => setIsVisible(true)}
        className={`fixed top-32 left-0 bg-gray-100 p-4 rounded-r-lg focus:outline-none shadow-md transition-transform duration-500 ease-in-out ${
          !isVisible ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        {">"}
      </button>
      <div
        className={`fixed top-30 bg-gray-100 p-4 rounded-lg shadow-md transition-transform duration-500 ease-in-out ${
          isVisible ? "left-4 -translate-x-0" : "left-0 -translate-x-full"
        }`}
      >
        <CloseButton onClick={() => setIsVisible(false)} />
        {children}
      </div>
    </>
  );
};

export default Menu;
