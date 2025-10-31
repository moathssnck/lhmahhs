"use client";

import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { BottomNav } from "@/components/bottom-nav";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <header className="bg-card border-b border-border sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-bold">سلة التسوق</h1>
              <div className="w-10" />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">سلة التسوق فارغة</h2>
          <p className="text-muted-foreground mb-6">
            لم تقم بإضافة أي منتجات بعد
          </p>
          <Link href="/">
            <Button size="lg" className="gap-2">
              تصفح المنتجات
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">سلة التسوق ({totalItems})</h1>
            <div className="w-10" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-lg font-bold text-primary">
                    {(item.price * (item?.quantity as number)).toFixed(3)} د.ك
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() =>
                        updateQuantity(item.id, (item.quantity as number) - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() =>
                        updateQuantity(item.id, (item.quantity as number) + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-20 left-0 right-0 bg-card border-t border-border p-4 z-40">
        <div className="container mx-auto space-y-4">
          <div className="flex items-center justify-between text-lg font-bold">
            <span>المجموع الكلي</span>
            <span className="text-primary">{totalPrice.toFixed(3)} د.ك</span>
          </div>
          <Link href="/checkout">
            <Button size="lg" className="w-full gap-2 bg-red-600">
              إتمام الطلب
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
