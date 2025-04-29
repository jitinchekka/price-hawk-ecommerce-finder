
import { Card } from "@/components/ui/card";
import { PriceResult } from "@/services/ecommerceService";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  result: PriceResult;
  isLowestPrice: boolean;
}

const ResultCard = ({ result, isLowestPrice }: ResultCardProps) => {
  return (
    <Card className={cn(
      "p-4 transition-all hover:shadow-md flex flex-col sm:flex-row sm:items-center gap-4 overflow-hidden relative",
      isLowestPrice && "border-hawk-accent border-2",
      !result.available && "opacity-70"
    )}>
      {isLowestPrice && (
        <div className="absolute top-0 right-0 bg-hawk-accent text-white text-xs px-2 py-1 rounded-bl-md">
          Best Price
        </div>
      )}
      
      <div className="flex items-center">
        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-xl">
          {result.storeIcon}
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="font-medium">{result.productName}</h3>
        <p className="text-sm text-muted-foreground">{result.storeName}</p>
        <p className={cn(
          "text-sm mt-1", 
          result.available ? "text-green-600" : "text-red-500"
        )}>
          {result.deliveryStatus}
        </p>
      </div>
      
      <div className="flex flex-col sm:items-end gap-2">
        <span className={cn(
          "text-lg font-bold",
          isLowestPrice && "text-hawk-accent"
        )}>
          ₹{result.price}
        </span>
        
        <a 
          href={result.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-hawk-primary hover:text-hawk-primary/80 flex items-center text-sm"
        >
          Visit Store <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </div>
    </Card>
  );
};

export default ResultCard;
