import { EmailItem } from "../EmailList/EmailItems";
import arrowLeft from "../../assets/icon-left-chevron.png";
import spam from "../../assets/icon-spam.webp";
import trash from "../../assets/icon-trash.webp";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import EmailMessage from "../EmailMessage";

export default function EmailDetail({
  email,
  setSelectedEmail,
  updateEmail,
  searchQuery,
}: {
  email: EmailItem;
  setSelectedEmail: (email: EmailItem | null) => void;
  updateEmail: (emailId: number, updates: Partial<EmailItem>) => void;
  searchQuery: string;
}) {
  const [minimizedEmails, setMinimizedEmails] = useState<Set<number>>(
    new Set()
  );
  
  useEffect(() => {
    if (email.reply.length > 0) {
      const emailsToMinimize = new Set<number>();
      
      emailsToMinimize.add(email.id);
      
      email.reply.forEach((reply, index) => {
        if (index < email.reply.length - 1) {
          emailsToMinimize.add(reply.id);
        }
      });
      
      setMinimizedEmails(emailsToMinimize);
    } else {
      setMinimizedEmails(new Set());
    }
  }, [email.id, email.reply.length, email.reply]);

  const toggleEmailMinimization = (emailId: number) => {
    setMinimizedEmails((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(emailId)) {
        newSet.delete(emailId);
      } else {
        newSet.add(emailId);
      }
      return newSet;
    });
  };

  const getTimeDifference = (date: Date) => {
    const targetDate = new Date("2025-03-14T15:14:00");
    const timeDiff = targetDate.getTime() - date.getTime();
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

    const formattedDate = date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${formattedDate} (${hoursDiff} hours ago)`;
  };

  const onToggleStar = () => {
    updateEmail(email.id, { isStarred: !email.isStarred });
  };

  const onToggleReplyStar = (replyId: number) => {
    const reply = email.reply.find(reply => reply.id === replyId);
    if (reply) {
      const updatedReply = { ...reply, isStarred: !reply.isStarred };
      const updatedReplies = email.reply.map(r => r.id === replyId ? updatedReply : r);
      updateEmail(email.id, { reply: updatedReplies });
    }
  };

  const filteredReplies = useMemo(() => {
    if (!searchQuery.trim()) {
      return email.reply;
    }
    const query = searchQuery.toLowerCase();
    return email.reply.filter((reply) => 
      (reply.title?.toLowerCase().includes(query) || false) ||
      (reply.from?.toLowerCase().includes(query) || false) ||
      (reply.content?.toLowerCase().includes(query) || false) ||
      (reply.sender?.toLowerCase().includes(query) || false)
    );
  }, [email.reply, searchQuery]);

  const shouldShowEmail = useMemo(() => {
    if (!searchQuery.trim()) {
      return true;
    }
    const query = searchQuery.toLowerCase();
    return email.title.toLowerCase().includes(query) ||
           email.from.toLowerCase().includes(query) ||
           email.content.toLowerCase().includes(query) ||
           email.sender.toLowerCase().includes(query) ||
           filteredReplies.length > 0;
  }, [email, searchQuery, filteredReplies]);

  if (!shouldShowEmail) {
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
          </div>
        </header>
        <main className="p-4">
          <div className="text-center text-gray-500 mt-8">
            No results found for &quot;{searchQuery}&quot;
          </div>
        </main>
      </div>
    );
  }

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
              <p className="rounded px-3 py-1.5 text-sm hover:bg-gray-100">
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
              <p className="rounded px-3 py-1.5 text-sm hover:bg-gray-100">
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
        <EmailMessage
          email={email}
          isMinimized={minimizedEmails.has(email.id)}
          onToggleMinimization={() => toggleEmailMinimization(email.id)}
          onToggleStar={onToggleStar}
          showStarButton={email.box !== "trash"}
          getTimeDifference={getTimeDifference}
          searchQuery={searchQuery}
        />
        {filteredReplies.map((reply, index) => (
          <div key={index} className="mt-8 border-t border-gray-200 pt-4">
            <EmailMessage
              email={reply}
              isMinimized={minimizedEmails.has(reply.id)}
              onToggleMinimization={() => toggleEmailMinimization(reply.id)}
              isReply={true}
              onToggleStar={() => onToggleReplyStar(reply.id)}
              showStarButton={email.box !== "trash"}
              getTimeDifference={getTimeDifference}
              searchQuery={searchQuery}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
