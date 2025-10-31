import {
  Beef,
  Drumstick,
  Fish,
  Egg,
  Apple,
  IceCream,
  Coffee,
  Package,
} from "lucide-react";

const categories = [
  { name: "لحوم حمراء", icon: Beef },
  { name: "دواجن", icon: Drumstick },
  { name: "أسماك", icon: Fish },
  { name: "بيض", icon: Egg },
  { name: "خضروات", icon: Apple },
  { name: "مجمدات", icon: IceCream },
  { name: "مشروبات", icon: Coffee },
  { name: "منتجات أخرى", icon: Package },
];

export function CategoryGrid() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        تصفح حسب الفئة
      </h2>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.name}
              className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-muted transition-colors group"
            >
              <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <span className="text-xs md:text-sm font-medium text-center">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
