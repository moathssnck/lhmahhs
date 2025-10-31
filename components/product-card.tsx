"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    qantity?: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
    });
    router.push("/cart");
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Button
            size="icon"
            className="absolute bottom-2 left-2 bg-red-600 hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg"
            onClick={handleAddToCart}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-medium text-sm md:text-base line-clamp-2">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-primary">
            {product.price.toFixed(3)} د.ك
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
