"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EmailList from "../components/EmailList";
import { useEffect, useState } from "react";
import { emailItems, EmailItem } from "@/components/EmailList/EmailItems";
import EmailDetail from "@/components/EmailDetail";

const initialEmails = emailItems.filter((email) => email.box === "inbox");

export default function Home() {
  const [allEmails, setAllEmails] = useState<EmailItem[]>(emailItems);
  const [emails, setEmails] = useState<EmailItem[]>(initialEmails);
  const [selectedMailbox, setSelectedMailbox] = useState<string>("inbox");
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);
  const [emailCountByBox, setEmailCountByBox] = useState<
    Record<string, number>
  >(
    emailItems.reduce((acc, email) => {
      acc[email.box] = (acc[email.box] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  );

  const updateEmail = (emailId: number, updates: Partial<EmailItem>) => {
    setAllEmails((prevAllEmails) => {
      return prevAllEmails.map((email) =>
        email.id === emailId ? { ...email, ...updates } : email
      );
    });

    setEmails((prevEmails) => {
      if (
        updates.box &&
        updates.box !== selectedMailbox &&
        selectedMailbox !== "all-mail"
      ) {
        const filteredEmails = prevEmails.filter(
          (email) => email.id !== emailId
        );
        return filteredEmails;
      } else {
        const updatedEmails = prevEmails.map((email) =>
          email.id === emailId ? { ...email, ...updates } : email
        );

        return updatedEmails;
      }
    });

    const isOnlyStarringChange =
      Object.keys(updates).length === 1 && "isStarred" in updates;
    if (!isOnlyStarringChange) {
      setSelectedEmail(null);
    } else {
      setSelectedEmail((prev) =>
        prev && prev.id === emailId ? { ...prev, ...updates } : prev
      );
    }
  };

  const handleSelectMailbox = (mailbox: string) => {
    setSelectedMailbox(mailbox);
    if (mailbox === "all-mail") {
      setEmails(allEmails);
    } else if (mailbox === "starred") {
      setEmails(allEmails.filter((email) => email.isStarred));
    } else {
      setEmails(allEmails.filter((email) => email.box === mailbox));
    }
  };

  useEffect(() => {
    if (selectedMailbox === "all-mail") {
      setEmails(allEmails);
    } else if (selectedMailbox === "starred") {
      setEmails(allEmails.filter((email) => email.isStarred));
    } else {
      setEmails(allEmails.filter((email) => email.box === selectedMailbox));
    }
  }, [allEmails, selectedMailbox]);

  useEffect(() => {
    const newCounts = allEmails.reduce((acc, email) => {
      acc[email.box] = (acc[email.box] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    setEmailCountByBox(newCounts);
  }, [allEmails]);

  return (
    <div className="flex h-screen">
      <div className="w-[68px] shrink-0 bg-[rgb(233,238,246)]" />
      <div className="flex min-h-screen min-w-[500px] grow flex-col bg-[rgb(248,250,253)]">
        <Header />
        <div className="flex flex-1">
          <Sidebar
            selectedMailbox={selectedMailbox}
            setSelectedMailbox={handleSelectMailbox}
            emailCountByBox={emailCountByBox}
            setSelectedEmail={setSelectedEmail}
          />
          <main className="mr-[56px] mb-4 flex min-w-[500px] grow flex-col rounded-2xl bg-white">
            {selectedEmail ? (
              <EmailDetail
                email={selectedEmail}
                setSelectedEmail={setSelectedEmail}
                updateEmail={updateEmail}
              />
            ) : (
              <EmailList
                emails={emails}
                setSelectedEmail={setSelectedEmail}
                updateEmail={updateEmail}
                selectedBox={selectedMailbox}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
