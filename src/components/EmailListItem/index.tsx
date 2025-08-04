import { EmailItem } from "../EmailList/EmailItems";
import starFilled from "../../assets/icon-star-filled-yellow.webp";
import starEmpty from "../../assets/icon-star.webp";
import Image from "next/image";
import React from "react";

export default function EmailListItem({
  email,
  setSelectedEmail,
  updateEmail,
  selectedBox,
  searchQuery,
}: {
  email: EmailItem;
  setSelectedEmail: (email: EmailItem) => void;
  updateEmail: (emailId: number, updates: Partial<EmailItem>) => void;
  selectedBox: string;
  searchQuery: string;
}) {
  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateEmail(email.id, { isStarred: !email.isStarred });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getSenderDisplay = () => {
    if (email.reply.length > 0) {
      const participants = email.reply.length + 1;
      return `${email.from} (${participants})`;
    }
    return email.from;
  };

  const getPreviewText = () => {
    if (email.reply.length > 0) {
      return email.reply[email.reply.length - 1].content;
    }
    return email.content;
  };

  const handleSelectedEmail = () => {
    updateEmail(email.id, { isRead: true });
    setSelectedEmail(email);
  };

  const isSearchMatch = (text: string) => {
    return text.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery.length > 0;
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

  return (
    <div
      onClick={handleSelectedEmail}
      className={`relative flex h-[40px] cursor-pointer items-center gap-3 border-b border-gray-200 px-4 text-sm hover:z-10 hover:shadow-md ${
        email.isRead ? "bg-gray-50" : "bg-white"
      }`}
    >
      {email.box !== "trash" && selectedBox !== "trash" && (
        <div className="flex-shrink-0 mr-3">
          <button
            onClick={handleStarClick}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <Image
              src={email.isStarred ? starFilled : starEmpty}
              alt="Star"
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </button>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mt-1">
              <span
                className={`w-[200px]  text-gray-900 truncate shrink-0 ${
                  email.isRead ? "font-normal" : "font-semibold"
                }`}
              >
                {isSearchMatch(getSenderDisplay()) ? (
                  highlightSearchQuery(getSenderDisplay())
                ) : (
                  getSenderDisplay()
                )}
              </span>
              <span
                className={`text-gray-900  shrink-0 ${
                  email.isRead ? "font-normal" : "font-semibold"
                }`}
              >
                {isSearchMatch(email.title) ? (
                  highlightSearchQuery(email.title)
                ) : (
                  email.title
                )}
              </span>
              <span
                className={`text-gray-500 ${
                  email.isRead ? "font-normal" : "font-semibold"
                }`}
              >
                -
              </span>
              <span
                className={`text-gray-500 truncate ${
                  email.isRead ? "font-normal" : "font-semibold"
                }`}
              >
                {isSearchMatch(getPreviewText()) ? (
                  highlightSearchQuery(getPreviewText())
                ) : (
                  getPreviewText()
                )}
              </span>
            </div>
          </div>

          <div className="flex-shrink-0 ml-4">
            <span className="text-sm text-gray-500  shrink-0">
              {formatDate(email.date)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
