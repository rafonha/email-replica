import EmailListItem from "../EmailListItem";
import { EmailItem } from "./EmailItems";

export default function EmailList({
  mailbox,
  emails,
}: {
  mailbox: string;
  emails: EmailItem[];
}) {
  return (
    <>
      <div className="flex h-[48px] items-center px-4" />
      {emails.length > 0 ? (
        emails.map((email) => <EmailListItem key={email.id} email={email} />)
      ) : (
        <div className="p-8 text-center text-gray-500">Empty</div>
      )}
    </>
  );
}
