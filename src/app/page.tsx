"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EmailList from "../components/EmailList";
import { useState } from "react";
import { emailItems, EmailItem } from "@/components/EmailList/EmailItems";

const initialEmails = emailItems.filter((email) => email.box === "inbox");

export default function Home() {
  const [emails, setEmails] = useState<EmailItem[]>(initialEmails);
  const [selectedMailbox, setSelectedMailbox] = useState<string>("inbox");
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);

  const handleSelectMailbox = (mailbox: string) => {
    setSelectedMailbox(mailbox);
    setEmails(emailItems.filter((email) => email.box === mailbox));
  };

  return (
    <div className="flex h-screen">
      <div className="w-[68px] shrink-0 bg-[rgb(233,238,246)]" />
      <div className="flex min-h-screen min-w-[500px] grow flex-col bg-[rgb(248,250,253)]">
        <Header />
        <div className="flex flex-1">
          <Sidebar
            selectedMailbox={selectedMailbox}
            setSelectedMailbox={handleSelectMailbox}
          />
          <main className="mr-[56px] mb-4 flex min-w-[500px] grow flex-col rounded-2xl bg-white">
            <EmailList mailbox={selectedMailbox} emails={emails} />
          </main>
        </div>
      </div>
    </div>
  );
}
