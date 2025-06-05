import { Content } from "./content";

export default function EditContactPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;

  return <Content contactId={id} />;
}
