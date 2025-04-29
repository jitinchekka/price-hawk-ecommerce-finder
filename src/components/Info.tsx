
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Info = () => {
  return (
    <Card className="p-6 bg-hawk-card shadow-sm">
      <h2 className="text-lg font-medium mb-2">Supported Stores</h2>
      <p className="text-muted-foreground text-sm mb-4">
        PriceHawk searches these popular online stores to find the best deals
      </p>
      
      <div className="space-y-3">
        {stores.map((store, index) => (
          <div key={store.name}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-xl">
                {store.icon}
              </div>
              <div>
                <h3 className="font-medium">{store.name}</h3>
                <p className="text-xs text-muted-foreground">{store.description}</p>
              </div>
            </div>
            {index < stores.length - 1 && <Separator className="my-3" />}
          </div>
        ))}
      </div>
    </Card>
  );
};

const stores = [
  {
    name: "DMart",
    icon: "🛒",
    description: "Grocery and household items at competitive prices",
  },
  {
    name: "Swiggy Instamart",
    icon: "🛵",
    description: "Quick grocery delivery in 15-30 minutes",
  },
  {
    name: "Amazon",
    icon: "📦",
    description: "Wide selection across multiple categories",
  },
  {
    name: "JioMart",
    icon: "🔵",
    description: "Groceries and daily essentials with fast delivery",
  },
];

export default Info;
