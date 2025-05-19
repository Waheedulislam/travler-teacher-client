import Container from "@/components/shared/Container";
import Title from "@/components/shared/Title";
import NMDateComponents from "@/components/ui/core/NMDateComponents/NMDateComponents";

import TeacherCard from "./teacherCard";
import { getAllTeachers } from "@/services/TeacherServices";
import { ITeacher } from "@/types";

const AllTeachers = async () => {
  const response = await getAllTeachers();
  const teachers: ITeacher[] = response?.data?.result || [];

  return (
    <Container className="bg-gray-50">
      <div className="mt-10">
        <Title title="All Teachers" />
      </div>
      <div>
        <h1 className="italic text-center text-xl font-normal mt-8 lg:mb-14 mb-6">
          Join us — invite friends or find new knowledge
        </h1>
      </div>
      {/* section-2  */}
      <NMDateComponents />

      {/* section-3  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-8 px-4 py-12 ">
        {teachers.map((teacher, index) => (
          <TeacherCard key={index} teacher={teacher} />
        ))}
      </div>
      {/* <div className="text-center mb-12">
        <Button className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-8 py-6 text-sm font-semibold rounded-sm shadow-md hover:brightness-110 transition">
          Load More
        </Button>
      </div> */}
    </Container>
  );
};

export default AllTeachers;
