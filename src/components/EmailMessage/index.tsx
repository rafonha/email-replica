import { EmailItem } from "../EmailList/EmailItems";
import starFilled from "../../assets/icon-star-filled-yellow.webp";
import starEmpty from "../../assets/icon-star.webp";
import Image from "next/image";
import React from "react";

interface EmailMessageProps {
  email: EmailItem;
  isMinimized: boolean;
  onToggleMinimization: () => void;
  onToggleStar?: () => void;
  showStarButton?: boolean;
  getTimeDifference?: (date: Date) => string;
  searchQuery?: string;
}

export default function EmailMessage({
  email,
  isMinimized,
  onToggleMinimization,
  onToggleStar,
  showStarButton = true,
  getTimeDifference,
  searchQuery = "",
}: EmailMessageProps) {
  const avatarSize = "w-10 h-10";
  const avatarBgColor = "bg-blue-500";
  const containerMargin = "mb-4";

  const formatDate = (date: Date) => {
    if (getTimeDifference) {
      return getTimeDifference(date);
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((name) => name[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const highlightSearchQuery = (text: string) => {
    if (!searchQuery.trim()) {
      return text;
    }
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {regex.test(part) ? (
          <span className="bg-yellow-200">{part}</span>
        ) : (
          part
        )}
      </React.Fragment>
    ));
  };

  const isSearchMatch = (text: string) => {
    return text.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery.length > 0;
  };

  return (
    <div className={`flex items-start gap-4 ${containerMargin}`}>
      <div
        className={`${avatarSize} rounded-full ${avatarBgColor} flex items-center justify-center text-white`}
      >
        {getInitials(email.from)}
      </div>
      <div className="w-0 flex-1 grow">
        <div
          className="flex items-start justify-between gap-2 cursor-pointer"
          onClick={onToggleMinimization}
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <p className="truncate text-sm font-semibold">
                {isSearchMatch(email.from) ? highlightSearchQuery(email.from) : email.from}
              </p>
              {!isMinimized && (
                <p className="truncate text-xs text-gray-500">
                  &lt;{isSearchMatch(email.sender) ? highlightSearchQuery(email.sender) : email.sender}&gt;
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2 justify-baseline">
            <p className="truncate text-xs whitespace-nowrap text-gray-500">
              {formatDate(email.date)}
            </p>
            {showStarButton && onToggleStar && (
                <button
                  style={{ background: "none", border: "none" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStar();
                  }}
                >
                  <Image
                    src={email.isStarred ? starFilled : starEmpty}
                    alt="Star"
                    width={20}
                    height={20}
                  />
                </button>
            )}
          </div>
        </div>
        {!isMinimized && (
          <p className="truncate text-xs text-gray-500">to {email.receiver}</p>
        )}
        <p
          className={
            isMinimized
              ? "truncate text-[13px] text-gray-600"
              : "mt-1 text-[13px] whitespace-pre-wrap"
          }
        >
          {isSearchMatch(email.content) ? highlightSearchQuery(email.content) : email.content}
        </p>
      </div>
    </div>
  );
}