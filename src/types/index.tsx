// Common types used across the application

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface SearchContextType {
    searchQuery: string;
    setSearchQuery: ( query: string ) => void;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
} 