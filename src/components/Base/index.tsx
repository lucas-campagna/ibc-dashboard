import { JSX } from "react";
import Nav from "../Nav";

const Base = ({ children }: {children: JSX.Element}) => (
  <>
    <Nav />
    <main className="container mx-auto px-4 py-4 mt-8 max-w-4xl w-full">
      {children}
    </main>
  </>
);

export default Base;
