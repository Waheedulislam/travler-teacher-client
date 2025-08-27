"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/shared/Container";
import Title from "@/components/shared/Title";
import NMDateComponents from "@/components/ui/core/NMDateComponents/NMDateComponents";
import TeacherCard from "./teacherCard";
import { getAllTeachers } from "@/services/TeacherServices";
import { ITeacher } from "@/types";
import { Input } from "@/components/ui/input";
import { FiSearch, FiX } from "react-icons/fi";

const AllTeachers = () => {
  const searchParams = useSearchParams();

  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<ITeacher[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [searchBudget, setSearchBudget] = useState("any");

  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await getAllTeachers();
      const data: ITeacher[] = response?.data?.result || [];
      setTeachers(data);

      // URL params থেকে value নাও
      setSearchName(searchParams.get("name") || "");
      setSearchCountry(searchParams.get("country") || "");
      setSearchBudget(searchParams.get("budget") || "any");
    };

    fetchTeachers();
  }, [searchParams]);

  const applyFilters = (
    data: ITeacher[],
    name: string,
    country: string,
    budget: string
  ) => {
    return data.filter((teacher) => {
      const nameMatch = name
        ? teacher.name.toLowerCase().includes(name.toLowerCase())
        : true;

      const countryMatch = country
        ? teacher.country.toLowerCase().includes(country.toLowerCase())
        : true;

      let budgetMatch = true;
      if (budget !== "any") {
        const priceMatch = teacher.description.match(/\d+/);
        const price = priceMatch ? parseInt(priceMatch[0], 10) : 0;

        if (budget === "5-25") budgetMatch = price >= 5 && price <= 25;
        else if (budget === "25-50") budgetMatch = price > 25 && price <= 50;
        else if (budget === "over-50") budgetMatch = price > 50;
      }

      return nameMatch && countryMatch && budgetMatch;
    });
  };

  useEffect(() => {
    const filtered = applyFilters(
      teachers,
      searchName,
      searchCountry,
      searchBudget
    );
    setFilteredTeachers(filtered);
  }, [teachers, searchName, searchCountry, searchBudget]);

  return (
    <Container className="bg-gray-50 min-h-screen pb-20 px-4 sm:px-6 lg:px-12 xl:px-20">
      <div className="mt-8 text-center">
        <Title title="All Teachers" />
        <h1 className="italic text-xl sm:text-2xl font-normal mt-4 text-gray-700 max-w-3xl mx-auto">
          Join us — invite friends or find new knowledge
        </h1>
      </div>

      <div className="mt-8 max-w-4xl mx-auto">
        <NMDateComponents />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
        {/* Name */}
        <div className="w-full">
          <label className="block font-semibold text-gray-700 mb-2">
            Search by name
          </label>
          <div className="relative w-full">
            <Input
              placeholder="Enter name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="pl-10 pr-10 h-12"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            {searchName && (
              <button
                type="button"
                onClick={() => setSearchName("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Country */}
        <div className="w-full">
          <label className="block font-semibold text-gray-700 mb-2">
            Search by country
          </label>
          <div className="relative w-full">
            <Input
              placeholder="Enter country"
              value={searchCountry}
              onChange={(e) => setSearchCountry(e.target.value)}
              className="pl-10 pr-10 h-12"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            {searchCountry && (
              <button
                type="button"
                onClick={() => setSearchCountry("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Budget */}
        <div className="w-full">
          <label className="block font-semibold text-gray-700 mb-2">
            Budget
          </label>
          <select
            value={searchBudget}
            onChange={(e) => setSearchBudget(e.target.value)}
            className="w-full border rounded-lg p-3 h-12"
          >
            <option value="any">Any Budget</option>
            <option value="5-25">$5 – $25</option>
            <option value="25-50">$25 – $50</option>
          </select>
        </div>
      </div>

      {/* Teacher Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 mt-14 max-w-8xl mx-auto">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher, index) => (
            <TeacherCard key={index} teacher={teacher} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg mt-16">
            No teachers found for this combination. <br />
            Try searching with another{" "}
            <span className="text-red-700">name, country, or budget.</span>
          </p>
        )}
      </div>
    </Container>
  );
};

export default AllTeachers;
