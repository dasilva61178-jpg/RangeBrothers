import { phones } from "../../../data/phones";
import ClientProductPage from "./ClientProductPage";

export default async function ProductPage({ params }) {
  const { id } = await params;  // <-- FIX: unwrap params

  const product = phones.find((p) => p.id === id);

  if (!product) {
    return <div style={{ padding: "40px", color: "white" }}>Product not found.</div>;
  }

  return <ClientProductPage product={product} />;
}
