import EmailListItem from "../EmailListItem";
import { EmailItem } from "./EmailItems";

export default function EmailList({
  emails,
  setSelectedEmail,
  updateEmail,
  selectedBox,  
  searchQuery,
}: {
  emails: EmailItem[];
  setSelectedEmail: (email: EmailItem) => void;
  updateEmail: (emailId: number, updates: Partial<EmailItem>) => void;
  selectedBox: string;
  searchQuery: string;
}) {
  return (
    <>
      <div className="flex h-[48px] items-center px-4" />
      {emails.length > 0 ? (
        emails.map((email) => (
          <EmailListItem
            key={email.id}
            email={email}
            setSelectedEmail={setSelectedEmail}
            updateEmail={updateEmail}
            selectedBox={selectedBox}
            searchQuery={searchQuery}
          />
        ))
      ) : (
        <div className="p-8 text-center text-gray-500">Empty</div>
      )}
    </>
  );
}
