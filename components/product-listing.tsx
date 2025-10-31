import { ProductCard } from "@/components/product-card";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  
  {
    id: "0",
    name: "عرض خاص على الخروف النعيمي — خصم ٥٠٪؜! السعر الآن فقط ٣٧ د.ك بدلاً من ٧٥ د.ك",
    price: 37,
    image: "/dsa.png",
  },
  {
    id: "1",
    name: "نصف خروف نعيمي (≈ 10–12 كغ)",
    price: 20,
    image: "/half.jpg.jpg",
  },
  {
    id: "2",
    name: "خروف نعيمي محلي (عقيقة)",
    price: 37,
    image: "/104_thumbnail.jpg",
  },
  {
    id: "3",
    name: "خروف نعيمي كويتي كامل",
    price: 50, // يختلف من 60 إلى 150 د.ك حسب الوزن
    image: "/namikw.jpg.jpg",
  },
  {
    id: "4",
    name: "كتف خروف نعيمي (≈ 3 كغ)",
    price: 11,
    image: "/ktf.jpg.jpg",
  },
  {
    id: "5",
    name: "فخذ خروف نعيمي (≈ 3.5 كغ)",
    price: 15,
    image: "/fkd.jpg.jpg",
  },
];

export function ProductListing() {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <button className="hover:text-foreground">الرئيسية</button>
        <ChevronLeft className="h-4 w-4 rotate-180" />
        <span className="text-foreground">لحوم حمراء</span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product as any} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          1
        </Button>
        <Button
          variant="default"
          size="icon"
          className="rounded-full bg-primary text-primary-foreground"
        >
          2
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          3
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <ChevronLeft className="h-5 w-5 rotate-180" />
        </Button>
      </div>
    </div>
  );
}
