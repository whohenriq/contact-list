import { ContactCardSkeleton } from "../contact-card/contact-card-skeleton";

export function ContactsLoadingState() {
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <ContactCardSkeleton key={i} />
      ))}
    </div>
  );
}
