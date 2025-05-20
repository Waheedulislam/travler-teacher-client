"use client";

import { useEffect, useState } from "react";
import Container from "@/components/shared/Container";
import Title from "@/components/shared/Title";
import NMDateComponents from "@/components/ui/core/NMDateComponents/NMDateComponents";
import TeacherCard from "./teacherCard";
import { getAllTeachers } from "@/services/TeacherServices";
import { ITeacher } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch, FiX } from "react-icons/fi";

const AllTeachers = () => {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<ITeacher[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await getAllTeachers();
      const data: ITeacher[] = response?.data?.result || [];
      setTeachers(data);
      setFilteredTeachers(data);
    };
    fetchTeachers();
  }, []);

  const handleSearch = () => {
    const filtered = teachers.filter((teacher) => {
      const nameMatch = teacher.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const countryMatch = teacher.country
        .toLowerCase()
        .includes(searchCountry.toLowerCase());
      return nameMatch && countryMatch;
    });
    setFilteredTeachers(filtered);
  };

  return (
    <Container className="bg-gray-50 min-h-screen pb-20 px-4 sm:px-6 lg:px-12 xl:px-20">
      {/* Title */}
      <div className="mt-8 text-center">
        <Title title="All Teachers" />
        <h1 className="italic text-xl sm:text-2xl font-normal mt-4 text-gray-700 max-w-3xl mx-auto">
          Join us — invite friends or find new knowledge
        </h1>
      </div>

      {/* Date Component */}
      <div className="mt-8 max-w-4xl mx-auto">
        <NMDateComponents />
      </div>

      {/* Search Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
        {/* Search by name with icon and clear button */}
        <div className="w-full">
          <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
            Search by name
          </label>
          <div className="relative w-full">
            <Input
              placeholder="Enter name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-400 w-full
                         h-12 text-base sm:text-lg pl-10 pr-10"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            {searchName && (
              <button
                type="button"
                onClick={() => setSearchName("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                aria-label="Clear name search"
              >
                <FiX size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Search by country with icon and clear button */}
        <div className="w-full">
          <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
            Search by country
          </label>
          <div className="relative w-full">
            <Input
              placeholder="Enter country"
              value={searchCountry}
              onChange={(e) => setSearchCountry(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-400 w-full
                         h-12 text-base sm:text-lg pl-10 pr-10"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            {searchCountry && (
              <button
                type="button"
                onClick={() => setSearchCountry("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                aria-label="Clear country search"
              >
                <FiX size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end justify-start sm:justify-end">
          <Button
            onClick={handleSearch}
            className="w-full sm:w-auto bg-gradient-to-r from-orange-400 to-yellow-400
                       text-white font-semibold px-12 py-6 rounded-md
                       shadow-lg hover:brightness-110 transition text-lg sm:text-xl"
          >
            Search Teacher
          </Button>
        </div>
      </div>

      {/* Teachers List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 mt-14 max-w-8xl mx-auto">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher, index) => (
            <TeacherCard key={index} teacher={teacher} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg mt-16">
            No teachers found.
          </p>
        )}
      </div>
    </Container>
  );
};

export default AllTeachers;
