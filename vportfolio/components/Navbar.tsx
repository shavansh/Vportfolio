"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = ["about", "skills", "projects", "contact"];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="mx-auto max-w-6xl px-6">
        <div className="mt-4 flex h-14 items-center justify-between rounded-2xl border bg-white/70 backdrop-blur-md shadow-sm px-5">

          {/* Logo */}
          <a href="#" className="text-lg font-semibold">
            Vansh<span className="text-blue-500">.</span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            {links.map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className="capitalize text-gray-600 hover:text-blue-500 transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1"
            aria-label="Toggle menu"
          >
            <span className="w-5 h-[2px] bg-black"></span>
            <span className="w-5 h-[2px] bg-black"></span>
            <span className="w-5 h-[2px] bg-black"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-2 rounded-2xl border bg-white/90 backdrop-blur-md shadow-sm">
            <ul className="flex flex-col divide-y">
              {links.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    onClick={() => setOpen(false)}
                    className="block px-6 py-4 capitalize text-gray-700 hover:bg-gray-50 transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
