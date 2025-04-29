
import { PriceResult } from "@/services/ecommerceService";
import ResultCard from "./ResultCard";
import { ShoppingCart } from "lucide-react";

interface ResultsListProps {
  results: PriceResult[];
}

const ResultsList = ({ results }: ResultsListProps) => {
  if (results.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center">
        <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-medium mb-2">No results found</h2>
        <p className="text-muted-foreground">
          Try searching for a different product or check your pincode
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Results</h2>
        <p className="text-sm text-muted-foreground">
          Found {results.length} results
        </p>
      </div>
      
      <div className="space-y-3">
        {results.map((result, index) => (
          <ResultCard 
            key={result.id} 
            result={result}
            isLowestPrice={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultsList;
