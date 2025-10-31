import { Button } from "@/components/ui/button"
import { Apple, Smartphone } from "lucide-react"

export function AppDownload() {
  return (
    <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">حمل التطبيق الآن</h2>
          <p className="text-lg text-muted-foreground">
            احصل على أفضل تجربة تسوق من خلال تطبيقنا المتاح على iOS و Android
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-black hover:bg-black/90 text-white gap-2 min-w-[200px]">
              <Apple className="h-6 w-6" />
              <div className="text-right">
                <div className="text-xs">متوفر على</div>
                <div className="text-base font-semibold">App Store</div>
              </div>
            </Button>
            <Button size="lg" className="bg-black hover:bg-black/90 text-white gap-2 min-w-[200px]">
              <Smartphone className="h-6 w-6" />
              <div className="text-right">
                <div className="text-xs">متوفر على</div>
                <div className="text-base font-semibold">Google Play</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
