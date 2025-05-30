
import { toast } from "sonner";

export interface PriceResult {
  id: string;
  store: "dmart" | "swiggy" | "amazon" | "jiomart" | "blinkit" | "zepto";
  storeName: string;
  storeIcon: string;
  productName: string;
  price: number;
  url: string;
  image: string;
  available: boolean;
  deliveryStatus: string;
}

export interface SearchParams {
  query: string;
  pincode: string;
}

export class EcommerceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EcommerceError";
  }
}

export const searchProducts = async (params: SearchParams): Promise<PriceResult[]> => {
  const { query, pincode } = params;
  
  // Validate inputs
  if (!query.trim()) {
    throw new EcommerceError("Please enter a product name");
  }
  
  if (!pincode.trim()) {
    throw new EcommerceError("Please enter a delivery pincode");
  }
  
  if (!/^\d{6}$/.test(pincode)) {
    throw new EcommerceError("Pincode must be a 6-digit number");
  }
  
  try {
    // Call the real API endpoint
    const apiUrl = `https://pricewise-jfjv.onrender.com/search_all?query=${encodeURIComponent(query)}&pincode=${pincode}`;
    
    console.log(`Making API request to: ${apiUrl}`);
    
    let response;
    try {
      response = await fetch(apiUrl, {
        mode: 'cors',  // Explicitly request CORS
        headers: {
          'Accept': 'application/json',
        },
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers.entries()]);
      
    } catch (fetchError) {
      console.error('Fetch error details:', fetchError);
      // Try to determine if it's a CORS issue
      const errorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
      if (errorMessage.includes('CORS') || errorMessage.includes('cross-origin')) {
        throw new EcommerceError("CORS error: The API doesn't allow requests from this origin. Try using a CORS proxy or enabling CORS on the server.");
      } else {
        throw new EcommerceError(`Network error: ${errorMessage}`);
      }
    }
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Could not read error response');
      console.error('API error response:', errorText);
      throw new EcommerceError(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('API response data received:', Object.keys(data));
    
    // Process and transform the API response to match our PriceResult interface
    const results: PriceResult[] = [];
    
    // Process Blinkit products
    if (data.blinkit_products && Array.isArray(data.blinkit_products)) {
      console.log(`Processing ${data.blinkit_products.length} Blinkit products`);
      data.blinkit_products.forEach((item: any, index: number) => {
        if (item.name && (item.selling_price || item.mrp)) {
          results.push({
            id: `blinkit-${index}`,
            store: "blinkit",
            storeName: "Blinkit",
            storeIcon: "🥬",
            productName: `${item.name}${item.variant ? ` ${item.variant}` : ''}`,
            price: item.selling_price || item.mrp,
            url: item.deeplink || "https://blinkit.com/",
            image: item.image || "/placeholder.svg",
            available: true,
            deliveryStatus: "10-15 min delivery"
          });
        }
      });
    }
    
    // Process DMart products
    if (data.dmart_products && Array.isArray(data.dmart_products)) {
      console.log(`Processing ${data.dmart_products.length} DMart products`);
      data.dmart_products.forEach((item: any, index: number) => {
        if (item.name && (item.selling_price || item.mrp)) {
          results.push({
            id: `dmart-${item.barcode || index}`,
            store: "dmart",
            storeName: "DMart",
            storeIcon: "🛒",
            productName: `${item.name}${item.variant ? ` ${item.variant}` : ''}`,
            price: item.selling_price || item.mrp,
            url: item.deeplink || "https://www.dmart.in/",
            image: item.image || "/placeholder.svg",
            available: true,
            deliveryStatus: "Available for delivery"
          });
        }
      });
    }
    
    // Process Swiggy Instamart products
    if (data.instamart_products && Array.isArray(data.instamart_products)) {
      console.log(`Processing ${data.instamart_products.length} Instamart products`);
      data.instamart_products.forEach((item: any, index: number) => {
        if (item.name && (item.selling_price || item.mrp)) {
          results.push({
            id: `swiggy-${index}`,
            store: "swiggy",
            storeName: "Swiggy Instamart",
            storeIcon: "🛵",
            productName: `${item.name}${item.variant ? ` ${item.variant}` : ''}`,
            price: item.selling_price || item.mrp,
            url: item.deeplink || "https://www.swiggy.com/instamart",
            image: item.image || "/placeholder.svg",
            available: true,
            deliveryStatus: "30-45 min delivery"
          });
        }
      });
    }
    
    // Process JioMart products
    if (data.jiomart_products && Array.isArray(data.jiomart_products)) {
      console.log(`Processing ${data.jiomart_products.length} JioMart products`);
      data.jiomart_products.forEach((item: any, index: number) => {
        if (item.name && (item.selling_price || item.mrp)) {
          results.push({
            id: `jiomart-${item.barcode || index}`,
            store: "jiomart",
            storeName: "JioMart",
            storeIcon: "🔵",
            productName: `${item.name}${item.variant ? ` ${item.variant}` : ''}`,
            price: item.selling_price || item.mrp,
            url: item.deeplink || "https://www.jiomart.com/",
            image: item.image || "/placeholder.svg",
            available: true,
            deliveryStatus: "Delivery in 2-3 hours"
          });
        }
      });
    }
    
    // Process Zepto products
    if (data.zepto_products && Array.isArray(data.zepto_products)) {
      console.log(`Processing ${data.zepto_products.length} Zepto products`);
      data.zepto_products.forEach((item: any, index: number) => {
        if (item.name && (item.selling_price || item.mrp)) {
          results.push({
            id: `zepto-${index}`,
            store: "zepto",
            storeName: "Zepto",
            storeIcon: "⚡",
            productName: `${item.name}${item.variant ? ` ${item.variant}` : ''}`,
            price: item.selling_price || item.mrp,
            url: item.deeplink || "https://www.zeptonow.com/",
            image: item.image || "/placeholder.svg",
            available: true,
            deliveryStatus: "10 min delivery"
          });
        }
      });
    }
    
    // If no results found
    console.log(`Total processed products: ${results.length}`);
    if (results.length === 0) {
      return [];
    }
    
    // Sort by price (lowest to highest)
    return results.sort((a, b) => a.price - b.price);
    
  } catch (error) {
    console.error("Error searching products:", error);
    
    if (error instanceof EcommerceError) {
      throw error; // Re-throw our custom error
    }
    
    // For any other errors
    throw new EcommerceError("Failed to search products. Please try again later.");
  }
};
