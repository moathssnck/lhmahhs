import { ProductCard } from "@/components/product-card";
const products = [
  {
    id: "1",
    name: "نصف خروف نعيمي (≈ 10–12 كغ)",
    price: 60,
    image: "/half.jpg.jpg",
  },
  {
    id: "2",

    name: "خروف نعيمي محلي (عقيقة)",
    price: 105,
    image: "/104_thumbnail.jpg",
  },
  {
    id: "3",

    name: "خروف نعيمي كويتي كامل",
    price: 110, // يختلف من 60 إلى 150 د.ك حسب الوزن
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

export function ProductGrid() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">المنتجات المميزة</h2>
        <button className="text-red-800 hover:underline font-medium">
          عرض الكل
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.name} product={product as any} />
        ))}
      </div>
    </section>
  );
}
