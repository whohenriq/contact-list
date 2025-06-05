import { NavBar } from "@/components/navbar";

export default function LayoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar isHome />
      {children}
    </>
  );
}
