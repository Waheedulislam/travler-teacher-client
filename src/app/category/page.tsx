"use client";

import { useEffect, useState, useRef } from "react";
import Container from "@/components/shared/Container";
import Title from "@/components/shared/Title";
import NMDateComponents from "@/components/ui/core/NMDateComponents/NMDateComponents";
import CategoryCard from "./categoryCard";
import { getAllCategory } from "@/services/CategoryServices";
import { ICategory } from "@/types/category";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch, FiX } from "react-icons/fi";

const PopularCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategory();
      const data: ICategory[] = response?.data?.result || [];
      setCategories(data);
      setFilteredCategories(data);
    };
    fetchCategories();
  }, []);

  // ✅ Debounce search term (250ms delay)
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearch(searchTitle.trim().toLowerCase());
    }, 250);
    return () => clearTimeout(delay);
  }, [searchTitle]);

  // ✅ Filter categories on debounced input
  useEffect(() => {
    if (!debouncedSearch) {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter((category) =>
        category.title.toLowerCase().includes(debouncedSearch)
      );
      setFilteredCategories(filtered);
    }
  }, [debouncedSearch, categories]);

  // ✅ Manual search (also triggers debounce logic)
  const handleManualSearch = () => {
    setDebouncedSearch(searchTitle.trim().toLowerCase());
  };

  return (
    <Container className="bg-gray-50 min-h-screen pb-20 px-4 sm:px-6 lg:px-12 xl:px-20">
      {/* Title */}
      <div className="mt-8 text-center">
        <Title title="All Countries" />
        <h1 className="italic text-xl sm:text-2xl font-normal mt-4 text-gray-700 max-w-3xl mx-auto">
          Join us — invite friends or find new knowledge
        </h1>
      </div>

      {/* Date Component */}
      <div className="mt-8 max-w-4xl mx-auto">
        <NMDateComponents />
      </div>

      {/* Search Section */}
      <div className="flex flex-col lg:flex-row items-end justify-between max-w-6xl mx-auto gap-4 mt-12">
        {/* Search Input */}
        <div className="relative flex-grow w-full max-w-lg">
          <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
            Search by Name
          </label>
          <div className="relative w-full">
            <Input
              ref={inputRef}
              placeholder="Enter country name"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-400 w-full h-12 text-base sm:text-lg pl-10 pr-10"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            {searchTitle && (
              <button
                type="button"
                onClick={() => {
                  setSearchTitle("");
                  inputRef.current?.focus();
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                aria-label="Clear country search"
              >
                <FiX size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-start lg:justify-end w-full lg:w-auto">
          <Button
            onClick={handleManualSearch}
            className="w-full sm:w-auto bg-gradient-to-r from-orange-400 to-yellow-400
                       text-white font-semibold px-12 py-3 lg:px-12 lg:py-6 rounded-md
                       shadow-md hover:brightness-110 transition text-base sm:text-lg"
          >
            Search Country
          </Button>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 mt-14 max-w-8xl mx-auto">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg mt-16">
            No categories found.
          </p>
        )}
      </div>
    </Container>
  );
};

export default PopularCategories;
