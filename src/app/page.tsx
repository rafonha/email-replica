"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EmailList from "../components/EmailList";
import SearchField from "../components/SearchField";
import { useState, useMemo, useCallback } from "react";
import { emailItems, EmailItem } from "@/components/EmailList/EmailItems";
import EmailDetail from "@/components/EmailDetail";

export default function Home() {
  const [allEmails, setAllEmails] = useState<EmailItem[]>(emailItems);
  const [selectedMailbox, setSelectedMailbox] = useState<string>("inbox");
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const emails = useMemo(() => {
    let filteredEmails = allEmails;
    
    if (selectedMailbox === "all-mail") {
      filteredEmails = allEmails;
    } else if (selectedMailbox === "starred") {
      filteredEmails = allEmails.filter((email) => email.isStarred);
    } else {
      filteredEmails = allEmails.filter((email) => email.box === selectedMailbox);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredEmails = filteredEmails.filter((email) => 
        email.title.toLowerCase().includes(query) ||
        email.from.toLowerCase().includes(query) ||
        email.content.toLowerCase().includes(query) ||
        email.sender.toLowerCase().includes(query)
      );
    }
    
    return filteredEmails;
  }, [allEmails, selectedMailbox, searchQuery]);

  const emailCountByBox = useMemo(() => {
    return allEmails.reduce((acc, email) => {
      acc[email.box] = (acc[email.box] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [allEmails]);

  const updateEmail = useCallback(
    (emailId: number, updates: Partial<EmailItem>) => {
      setAllEmails((prevAllEmails) => {
        return prevAllEmails.map((email) =>
          email.id === emailId ? { ...email, ...updates } : email
        );
      });

      const isOnlyStarringChange =
        Object.keys(updates).length === 1 && "isStarred" in updates;
      const isOnlyReplyUpdate =
        Object.keys(updates).length === 1 && "reply" in updates;
      
      if (!isOnlyStarringChange && !isOnlyReplyUpdate) {
        setSelectedEmail(null);
      } else {
        setSelectedEmail((prev) =>
          prev && prev.id === emailId ? { ...prev, ...updates } : prev
        );
      }
    },
    []
  );

  const handleSelectMailbox = useCallback((mailbox: string) => {
    setSelectedMailbox(mailbox);
  }, []);

  const handleSetSelectedEmail = useCallback((email: EmailItem | null) => {
    setSelectedEmail(email);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

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
            setSelectedEmail={handleSetSelectedEmail}
          />
          <main className="mr-[56px] mb-4 flex min-w-[500px] grow flex-col rounded-2xl bg-white">
            <div className="p-4">
              <SearchField onSearch={handleSearch} />
            </div>
            {selectedEmail ? (
              <EmailDetail
                email={selectedEmail}
                setSelectedEmail={handleSetSelectedEmail}
                updateEmail={updateEmail}
                searchQuery={searchQuery}
              />
            ) : (
              <EmailList
                emails={emails}
                setSelectedEmail={handleSetSelectedEmail}
                updateEmail={updateEmail}
                selectedBox={selectedMailbox}
                searchQuery={searchQuery}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
