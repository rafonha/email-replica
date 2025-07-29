"use client";

import { useState } from "react";
import navItems from "./NavItems";
import { EmailItem } from "../EmailList/EmailItems";

export default function Sidebar({
  selectedMailbox,
  setSelectedMailbox,
  emailCountByBox,
  setSelectedEmail,
}: {
  selectedMailbox: string;
  setSelectedMailbox: (mailbox: string) => void;
  emailCountByBox: Record<string, number>;
  setSelectedEmail: (email: EmailItem | null) => void;
}) {
  const [activeItem, setActiveItem] = useState(selectedMailbox);

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    setSelectedMailbox(id);
    setSelectedEmail(null);
  };

  return (
    <div className="w-[256px] h-full px-3 shrink-0">
      <div className="mb-4 h-[56px] w-[138px] rounded-2xl bg-[rgb(194,231,255)] opacity-50" />
      <nav className="">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`w-full flex items-center justify-between gap-4 pr-3 py-1.5 pl-4 rounded-3xl transition-colors duration-200 ${
              activeItem === item.id
                ? "bg-[rgb(211,227,253)]"
                : "text-gray-100 hover:bg-[oklch(0.928_0.006_264.531)]"
            }`}
          >
            <div className="flex items-center">
              <img
                src={item.iconSrc}
                alt={item.label}
                className="w-5 h-5 mr-3"
              />
              <span
                className={`text-sm text-[rgb(32,33,36)] flex-1 ${
                  activeItem === item.id ? "font-semibold" : "font-normal"
                }`}
              >
                {item.label || "No title"}
              </span>
            </div>
            {["inbox", "spam"].includes(item.id) &&
              emailCountByBox[item.id] > 0 && (
                <span className="text-xs font-normal text-[rgb(32,33,36)]">
                  {emailCountByBox[item.id]}
                </span>
              )}
          </button>
        ))}
      </nav>
    </div>
  );
}
