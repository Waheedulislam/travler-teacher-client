import Container from "@/components/shared/Container";
import Title from "@/components/shared/Title";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

const OurAdvantages = () => {
  return (
    <Container>
      <div>
        <Title title="Our Advantages" />
      </div>
      <section className="py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, idx) => (
            <Card
              key={idx}
              className={cn(
                "rounded-2xl shadow-md transition-all duration-300 group",
                item.bg,
                // Apply hover effect only to cards after the first one
                idx !== 1 && "hover:bg-white"
              )}
            >
              <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                <Image
                  src={item.image}
                  height={90}
                  width={90}
                  alt={item.title}
                  className="my-10"
                />
                <h3
                  className={cn(
                    "font-semibold text-2xl transition-colors duration-300",
                    idx === 1
                      ? "text-orange-600"
                      : "text-white group-hover:text-orange-600"
                  )}
                >
                  {item.title}
                </h3>
                <p className="text-lg font-normal text-[#5E6282]">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </Container>
  );
};

const advantages = [
  {
    title: "Knowledge and Experience",
    description: "Teachers often have strong education and deep knowledge.",
    image: "/assets/group-image/Group 48.png",
    bg: "bg-yellow-300",
  },
  {
    title: "History Lessons",
    description: "Teachers help travelers learn more about the local region.",
    image: "/assets/group-image/Group 51.png",
    bg: "bg-white",
  },
  {
    title: "Communication Skills",
    description: "Teachers are always fluent in the local language.",
    image: "/assets/group-image/Group 50.png",
    bg: "bg-yellow-300",
  },
  {
    title: "Local Region Insights",
    description: "Brief lessons about local culture, history, and customs.",
    image: "/assets/group-image/Group 49.png",
    bg: "bg-yellow-300",
  },
];

export default OurAdvantages;
