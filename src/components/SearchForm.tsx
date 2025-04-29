
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SearchIcon } from "lucide-react";
import { SearchParams } from "@/services/ecommerceService";

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isSearching: boolean;
}

const SearchForm = ({ onSearch, isSearching }: SearchFormProps) => {
  const [query, setQuery] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query, pincode });
  };

  return (
    <Card className="p-6 bg-hawk-card shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="query" className="text-sm font-medium">
            Product Name
          </label>
          <Input
            id="query"
            type="text"
            placeholder="Search for products (e.g. milk, rice, bread)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
            disabled={isSearching}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="pincode" className="text-sm font-medium">
            Delivery Pincode
          </label>
          <Input
            id="pincode"
            type="text"
            placeholder="Enter 6-digit pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full"
            maxLength={6}
            disabled={isSearching}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-hawk-primary hover:bg-hawk-primary/90" 
          disabled={isSearching}
        >
          {isSearching ? (
            <span className="flex items-center">
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></span>
              Searching...
            </span>
          ) : (
            <span className="flex items-center">
              <SearchIcon className="mr-2 h-4 w-4" />
              Search Products
            </span>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default SearchForm;
