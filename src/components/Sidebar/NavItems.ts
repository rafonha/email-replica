import inboxIcon from "../../assets/icon-inbox.webp";
import starredIcon from "../../assets/icon-star.webp";
import allMailIcon from "../../assets/icon-all-mail.webp";
import spamIcon from "../../assets/icon-spam.webp";
import trashIcon from "../../assets/icon-trash.webp";

interface NavItem {
  id: string;
  label: string;
  iconSrc: string;
  count: number;
  isActive: boolean;
}

const navItems: NavItem[] = [
  {
    id: "inbox",
    label: "Inbox",
    iconSrc: inboxIcon.src,
    count: 0,
    isActive: true,
  },
  {
    id: "starred",
    label: "Starred",
    iconSrc: starredIcon.src,
    count: 0,
    isActive: false,
  },
  {
    id: "all-mail",
    label: "All Mail",
    iconSrc: allMailIcon.src,
    count: 0,
    isActive: false,
  },
  {
    id: "spam",
    label: "Spam",
    iconSrc: spamIcon.src,
    count: 0,
    isActive: false,
  },
  {
    id: "trash",
    label: "Trash",
    iconSrc: trashIcon.src,
    count: 0,
    isActive: false,
  },
];

export default navItems;