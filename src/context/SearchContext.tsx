"use client";
import React, { createContext, useContext, useState } from "react";
import { SearchContextType } from "../types";

// Create a context for search with default values
export const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  setSearchQuery: () => {},
});

// Custom hook to use search context
export const useSearch = () => useContext(SearchContext);

// Provider component for search context
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
