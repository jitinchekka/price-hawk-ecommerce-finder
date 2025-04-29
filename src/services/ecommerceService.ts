
import { toast } from "sonner";

export interface PriceResult {
  id: string;
  store: "dmart" | "swiggy" | "amazon" | "jiomart";
  storeName: string;
  storeIcon: string;
  productName: string;
  price: number;
  url: string;
  image: string;
  available: boolean;
  deliveryStatus: string;
}

// Mock data for demonstration
const mockDataMap = {
  "milk": [
    { 
      id: "dm001",
      store: "dmart", 
      storeName: "DMart", 
      storeIcon: "🛒",
      productName: "Amul Toned Milk 500ml", 
      price: 26,
      url: "https://www.dmart.in/",
      image: "/placeholder.svg",
      available: true,
      deliveryStatus: "Available for delivery" 
    },
    { 
      id: "sw001",
      store: "swiggy", 
      storeName: "Swiggy Instamart", 
      storeIcon: "🛵",
      productName: "Amul Toned Milk 500ml", 
      price: 27,
      url: "https://www.swiggy.com/instamart",
      image: "/placeholder.svg",
      available: true,
      deliveryStatus: "30 min delivery" 
    },
    { 
      id: "am001",
      store: "amazon", 
      storeName: "Amazon", 
      storeIcon: "📦",
      productName: "Amul Toned Milk 500ml", 
      price: 28,
      url: "https://www.amazon.in/",
      image: "/placeholder.svg",
      available: true,
      deliveryStatus: "Delivery tomorrow" 
    },
    { 
      id: "jm001",
      store: "jiomart", 
      storeName: "JioMart", 
      storeIcon: "🔵",
      productName: "Amul Toned Milk 500ml", 
      price: 25,
      url: "https://www.jiomart.com/",
      image: "/placeholder.svg",
      available: true,
      deliveryStatus: "Delivery in 2 hours" 
    }
  ],
  "rice": [
    { 
      id: "dm002",
      store: "dmart", 
      storeName: "DMart", 
      storeIcon: "🛒",
      productName: "Basmati Rice Premium 1kg", 
      price: 95,
      url: "https://www.dmart.in/",
      image: "/placeholder.svg",
      available: true,
      deliveryStatus: "Available for delivery" 
    },
    { 
      id: "sw002",
      store: "swiggy", 
      storeName: "Swiggy Instamart", 
      storeIcon: "🛵",
      productName: "Basmati Rice Premium 1kg", 
      price: 110,
      url: "https://www.swiggy.com/instamart",
      image: "/placeholder.svg",
      available: true,
      deliveryStatus: "35 min delivery" 
    },
    { 
      id: "am002",
      store: "amazon", 
      storeName: "Amazon", 
      storeIcon: "📦",
      productName: "Basmati Rice Premium 1kg", 
      price: 99,
      url: "https://www.amazon.in/",
      image: "/placeholder.svg",
      available: true,
      deliveryStatus: "Delivery day after tomorrow" 
    },
    { 
      id: "jm002",
      store: "jiomart", 
      storeName: "JioMart", 
      storeIcon: "🔵",
      productName: "Basmati Rice Premium 1kg", 
      price: 89,
      url: "https://www.jiomart.com/",
      image: "/placeholder.svg",
      available: true,
      deliveryStatus: "Delivery tomorrow" 
    }
  ],
  "bread": [
    { 
      id: "dm003",
      store: "dmart", 
      storeName: "DMart", 
      storeIcon: "🛒",
      productName: "Brown Bread 400g", 
      price: 40,
      url: "https://www.dmart.in/",
      image: "/placeholder.svg",
      available: true,
      deliveryStatus: "Available for delivery" 
    },
    { 
      id: "sw003",
      store: "swiggy", 
      storeName: "Swiggy Instamart", 
      storeIcon: "🛵",
      productName: "Brown Bread 400g", 
      price: 45,
      url: "https://www.swiggy.com/instamart",
      image: "/placeholder.svg",
      available: true,
      deliveryStatus: "25 min delivery" 
    },
    { 
      id: "am003",
      store: "amazon", 
      storeName: "Amazon", 
      storeIcon: "📦",
      productName: "Brown Bread 400g", 
      price: 42,
      url: "https://www.amazon.in/",
      image: "/placeholder.svg",
      available: false,
      deliveryStatus: "Currently unavailable" 
    },
    { 
      id: "jm003",
      store: "jiomart", 
      storeName: "JioMart", 
      storeIcon: "🔵",
      productName: "Brown Bread 400g", 
      price: 38,
      url: "https://www.jiomart.com/",
      image: "/placeholder.svg",
      available: true,
      deliveryStatus: "Delivery today" 
    }
  ]
};

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
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get results based on mock data
    const normalizedQuery = query.toLowerCase().trim();
    const keywords = ["milk", "rice", "bread"];
    
    const matchedKeyword = keywords.find(keyword => normalizedQuery.includes(keyword));
    
    if (!matchedKeyword) {
      // If no specific match, return empty array
      // In a real implementation, this would call actual e-commerce APIs
      return [];
    }
    
    // Return mock data for the matched keyword, sorted by price
    const results = [...mockDataMap[matchedKeyword as keyof typeof mockDataMap]];
    
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
