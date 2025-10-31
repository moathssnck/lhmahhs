"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const images = ["/dsa.png", "/2.png", "/3.png", "/4.png"];
export function HeroSection() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex items-center justify-between z-10 relative">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
        <div>
          <img src="/logo.png" alt="logo" width={150} />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Carousel */}
      <div className="relative w-full h-[400px] md:h-[550px] overflow-hidden">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`slide-${index}`}
            fill
            className={`object-cover transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            priority={index === current}
          />
        ))}

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
        >
          ›
        </button>

        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center md:items-end text-center md:text-right px-8 space-y-6">
        
          <p className="text-lg md:text-xl text-gray-100">
          عرض خاص على الخروف النعيمي — خصم ٥٠٪؜! السعر الآن فقط ٣٧ د.ك بدلاً من ٧٥ د.ك.
          </p>
          <div className="flex gap-4 justify-center md:justify-end">
        <Link href="/products">
            <Button size="lg" className="bg-red-800 hover:bg-red-800/90 text-gray-100">
              اطلب الآن
            </Button></Link>
         
          </div>
        </div>
      </div>
    </section>
  );
}
