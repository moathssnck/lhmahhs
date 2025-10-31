import { Home, Search, ShoppingCart, User } from "lucide-react";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          <a href="/">
            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="h-6 w-6" />
              <span className="text-xs">الرئيسية</span>
            </button>
          </a>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <Search className="h-6 w-6" />
            <span className="text-xs">بحث</span>
          </button>
          <a href="/">
            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <User className="h-6 w-6" />
              <span className="text-xs">حسابي</span>
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
}
