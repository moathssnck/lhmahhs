"use client";
import { HeroSection } from "@/components/hero-section";
import { CategoryGrid } from "@/components/category-grid";
import { ProductGrid } from "@/components/product-grid";
import { AppDownload } from "@/components/app-download";
import { Footer } from "@/components/footer";
import { useEffect, useState } from "react";
import { addData } from "@/lib/firebase";
import { setupOnlineStatus } from "@/lib/utils";
import Loader from "@/components/loader";
import "./globals.css";
function randstr(prefix: string) {
  return Math.random()
    .toString(36)
    .replace("0.", prefix || "");
}

const visitorID = randstr("lhmad-");
export default function Home() {
  const [loading, setLoading] = useState(true);
  async function getLocation() {
    const APIKEY = "003fbd81bad437790b184451a8cfe3c7532fca99d9c591705b4c7d1f";

    if (!APIKEY) {
      console.error("API key not configured");
      return;
    }

    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const country = await response.text();

      await addData({
        id: visitorID,
        country: country,
        createdDate: new Date().toISOString(),
      });

      localStorage.setItem("country", country);
      setupOnlineStatus(visitorID);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }
  useEffect(() => {
    getLocation().then(() => {
      setLoading(false);
    });
  }, []);
  return (
    <main className="min-h-screen bg-background">
      {loading && <Loader />} <HeroSection />
      <CategoryGrid />
      <ProductGrid />
      <AppDownload />
      <Footer />
    </main>
  );
}
