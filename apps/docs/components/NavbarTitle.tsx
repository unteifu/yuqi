import Image from "next/image";

export default function NavbarTitle() {
  return (
    <Image
      src="/yuqi.webp"
      alt="YuqiJS"
      width={60}
      height={100}
      priority
      unoptimized
    />
  );
}
