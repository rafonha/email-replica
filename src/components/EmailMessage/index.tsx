import { EmailItem, ReplyItem } from "../EmailList/EmailItems";
import starFilled from "../../assets/icon-star-filled-yellow.webp";
import starEmpty from "../../assets/icon-star.webp";
import Image from "next/image";

interface EmailMessageProps {
  email: EmailItem | ReplyItem;
  isMinimized: boolean;
  onToggleMinimization: () => void;
  onToggleStar?: () => void;
  showStarButton?: boolean;
  isReply?: boolean;
  getTimeDifference?: (date: Date) => string;
}

export default function EmailMessage({
  email,
  isMinimized,
  onToggleMinimization,
  onToggleStar,
  showStarButton = false,
  isReply = false,
  getTimeDifference,
}: EmailMessageProps) {
  const avatarSize = isReply ? "w-8 h-8" : "w-10 h-10";
  const avatarBgColor = isReply ? "bg-green-500" : "bg-blue-500";
  const containerMargin = isReply ? "" : "mb-4";

  const formatDate = (date: Date) => {
    if (getTimeDifference) {
      return getTimeDifference(date);
    }
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name: string) => {
    if (isReply) {
      return name[0].toUpperCase();
    }
    return name
      .split(" ")
      .map((name) => name[0].toUpperCase())
      .slice(0, 2)
      .join("");
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
              <p className="truncate text-sm font-semibold">{email.from}</p>
              {!isMinimized && (
                <p className="truncate text-xs text-gray-500">
                  &lt;{email.sender}&gt;
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
          {email.content}
        </p>
      </div>
    </div>
  );
}
