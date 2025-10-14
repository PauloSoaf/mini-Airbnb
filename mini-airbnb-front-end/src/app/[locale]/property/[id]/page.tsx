import PropertyDetails from "@/components/PropertyDetails/PropertyDetails";

export default function PropertyPage({ params }: { params: { id: string } }) {
  return <PropertyDetails id={params.id} />;
}
