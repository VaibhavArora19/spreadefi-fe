import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center text-sm py-4 px-8 border-b-[0.5px] border-[#272727] fixed w-full bg-[#090909]">
      <ul className="flex items-center gap-8">
        <p>Logo</p>
        <Link href={"/"}>lend</Link>
        <Link href={"/"}>borrow</Link>
        <Link href={"/"}>portfolio</Link>
      </ul>

      <ul className="flex items-center gap-4">
        <p>network</p>
        <p>Connect</p>
      </ul>
    </nav>
  );
};

export default Navbar;
