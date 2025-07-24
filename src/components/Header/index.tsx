import Image from "next/image";
import bmailLogo from "../../assets/bmail-logo.webp";

export default function Header() {
  return (
    <header className="h-16 px-4 py-2 flex items-center">
      <Image
        src={bmailLogo}
        alt="BMail Logo"
        loading="lazy"
        decoding="async"
        width={109}
        height={40}
        className="object-contain"
      />
    </header>
  );
}
