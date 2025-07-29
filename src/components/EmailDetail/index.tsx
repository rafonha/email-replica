import { EmailItem } from "../EmailList/EmailItems";
import arrowLeft from "../../assets/icon-left-chevron.png";
import starFilled from "../../assets/icon-star-filled-yellow.webp";
import starEmpty from "../../assets/icon-star.webp";
import trash from "../../assets/icon-trash.webp";
import spam from "../../assets/icon-spam.webp";
import Image from "next/image";

export default function EmailDetail({
  email,
  setSelectedEmail,
  updateEmail,
}: {
  email: EmailItem;
  setSelectedEmail: (email: EmailItem | null) => void;
  updateEmail: (emailId: number, updates: Partial<EmailItem>) => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <header className="px-4 pt-2 pb-0">
        <div className="flex items-center justify-start h-[48px] gap-2">
          <button
            onClick={() => {
              setSelectedEmail(null);
            }}
            className="mr-2 -ml-2 cursor-pointer rounded-full p-2 hover:bg-gray-100"
          >
            <Image
              src={arrowLeft}
              alt="Back to email list"
              width={20}
              height={20}
            />
          </button>
          {email.box !== "trash" && email.box !== "spam" && (
            <>
              <button
                onClick={() => {
                  updateEmail(email.id, { box: "spam" });
                }}
                className="cursor-pointer rounded-full p-2 hover:bg-gray-100"
              >
                <Image
                  src={spam}
                  alt="Send email to spam"
                  width={20}
                  height={20}
                />
              </button>
              <button
                onClick={() => {
                  updateEmail(email.id, { box: "trash" });
                  setSelectedEmail(null);
                }}
                className="cursor-pointer rounded-full p-2 hover:bg-gray-100"
              >
                <Image
                  src={trash}
                  alt="Send email to trash"
                  width={20}
                  height={20}
                />
              </button>
            </>
          )}
          {email.box === "spam" && (
            <button
              onClick={() => {
                updateEmail(email.id, { box: "inbox" });
              }}
              className="cursor-pointer rounded-full p-2 hover:bg-gray-100"
            >
              <p className="cursor-pointer rounded px-3 py-1.5 text-sm hover:bg-gray-100">
                Not spam
              </p>
            </button>
          )}
          {email.box === "trash" && (
            <button
              onClick={() => {
                updateEmail(email.id, { box: "inbox" });
              }}
              className="cursor-pointer rounded-full p-2 hover:bg-gray-100"
            >
              <p className="cursor-pointer rounded px-3 py-1.5 text-sm hover:bg-gray-100">
                Move to inbox
              </p>
            </button>
          )}
        </div>
        <div className="mt-6">
          <h1 className="ml-[52px] text-[22px] font-normal">{email.title}</h1>
        </div>
      </header>
      <main className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <p className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {email.from
              .split(" ")
              .map((name) => name[0].toUpperCase())
              .slice(0, 2)
              .join("")}
          </p>
          <div className="flex flex-row justify-between gap-1 w-full">
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <p className="truncate text-sm font-semibold">{email.from}</p>
                <p className="truncate text-xs text-gray-500">
                  &lt;{email.sender}&gt;
                </p>
              </div>
              <p className="truncate text-xs text-gray-500">
                to {email.receiver}
              </p>
            </div>
            <div className="flex gap-2 justify-baseline">
              <p className="truncate text-xs whitespace-nowrap text-gray-500">
                {email.date.toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              {email.box !== "trash" && (
                <button
                  style={{ background: "none", border: "none" }}
                  onClick={() => {
                    updateEmail(email.id, { isStarred: !email.isStarred });
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
        </div>
        <p className="mt-1 ml-[52px] text-[13px] whitespace-pre-wrap">
          {email.content}
        </p>
        {email.reply.map((reply, index) => (
          <div key={index} className="mt-8 border-t border-gray-200 pt-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                {reply.from[0].toUpperCase()}
              </div>
              <div>
                <div className="font-semibold">{reply.from}</div>
                <div className="text-sm text-gray-500">
                  {reply.date.toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
            <div className="whitespace-pre-wrap">{reply.content}</div>
          </div>
        ))}
      </main>
    </div>
  );
}
