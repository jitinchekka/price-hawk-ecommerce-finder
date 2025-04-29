
import { useState } from "react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import ResultsList from "@/components/ResultsList";
import Info from "@/components/Info";
import { searchProducts, PriceResult, SearchParams, EcommerceError } from "@/services/ecommerceService";
import { toast } from "sonner";

const Index = () => {
  const [results, setResults] = useState<PriceResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (params: SearchParams) => {
    setIsSearching(true);
    
    try {
      const searchResults = await searchProducts(params);
      setResults(searchResults);
      setHasSearched(true);
      
      if (searchResults.length === 0) {
        toast.info("No products found for your search.");
      } else {
        toast.success(`Found ${searchResults.length} products!`);
      }
    } catch (error) {
      if (error instanceof EcommerceError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
        console.error(error);
      }
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Compare Prices Across Stores</h1>
            <p className="text-lg text-muted-foreground">
              Find the best deals on your favorite products from multiple e-commerce platforms
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
              <SearchForm onSearch={handleSearch} isSearching={isSearching} />
              
              <div className="hidden md:block">
                <Info />
              </div>
            </div>
            
            <div className="md:col-span-2">
              {isSearching ? (
                <div className="py-12 flex flex-col items-center justify-center animate-pulse-light">
                  <div className="mb-4">
                    <div className="w-12 h-12 border-4 border-hawk-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-lg font-medium">Searching across stores...</p>
                  <p className="text-muted-foreground text-sm mt-2">Finding the best prices for you</p>
                </div>
              ) : hasSearched ? (
                <ResultsList results={results} />
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="mb-4 text-5xl">🔍</div>
                  <h2 className="text-xl font-medium mb-2">Ready to find the best prices</h2>
                  <p className="text-muted-foreground">
                    Enter a product name and delivery pincode to start comparing
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:hidden mt-6">
            <Info />
          </div>
        </div>
      </main>
      
      <footer className="py-6 px-4 bg-hawk-card mt-12">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Price Hawk - Compare prices from multiple e-commerce platforms</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
