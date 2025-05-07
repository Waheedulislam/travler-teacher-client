// src/app/teacher/[id]/page.tsx
interface Props {
  params: {
    id: string;
  };
}

export default function TeacherProfilePage({ params }: Props) {
  return (
    <div>
      <h1>Teacher ID: {params.id}</h1>
      <p>This is the dynamic teacher profile page.</p>
    </div>
  );
}
