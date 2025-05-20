import TeacherDetails from "@/components/modules/Teacher/TeacherDetails";
import Container from "@/components/shared/Container";
import { getSingleTeacher } from "@/services/TeacherServices";

const teacherDetailsPage = async ({
  params,
}: {
  params: Promise<{ teacherId: string }>;
}) => {
  const { teacherId } = await params;
  const { data: teacher } = await getSingleTeacher(teacherId);
  return (
    <Container>
      <TeacherDetails teacher={teacher} />
    </Container>
  );
};

export default teacherDetailsPage;
