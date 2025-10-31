import { ProductListing } from "@/components/product-listing";
import { BottomNav } from "@/components/bottom-nav";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background pb-20">
      <ProductListing />
      <BottomNav />
    </main>
  );
}
