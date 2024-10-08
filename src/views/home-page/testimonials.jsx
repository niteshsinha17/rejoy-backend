import DrTaylorImg from "@/../public/images/home/DrTaylor.jpeg";
import DrVictorKatzImg from "@/../public/images/home/DrVictorKatz.webp";
import { Container, Section } from "@/components";
import { Rating } from "@mui/material";
import Image from "next/image";

const Testimonials = () => {
  return (
    <Section>
      <Container>
        <h2 className="text-center text-black">See What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
          <Testimonial
            rating={5}
            message="Rejoy Health is incredible! The AI chatbot makes healthcare information so easy to access, and I feel confident knowing I’m always up-to-date with the latest advancements."
            imgSrc={DrVictorKatzImg}
            name="Dr. Victor Katz"
            about="NYU Langone"
          />
          <Testimonial
            rating={4}
            imgSrc={DrTaylorImg}
            name="Taylor B Sewell"
            about="Columbia Medical"
            message="I love Rejoy Health! It provides timely updates on healthcare developments and answers all my health-related queries quickly and accurately.                                  "
          />
        </div>
      </Container>
    </Section>
  );
};

const Testimonial = ({ message, imgSrc, name, about, rating }) => {
  return (
    <div className="w-[500px] mx-auto rounded-3xl shadow-xl border p-4 py-6 border-slate-100">
      <Rating
        name="read-only"
        value={rating}
        readOnly
        size="small"
        className="mb-2"
      />
      <p className="mb-4">{message}</p>
      <div className="flex items-center">
        <Image
          src={imgSrc}
          alt="Avatar"
          width={60}
          height={60}
          className="rounded-full border-[3px] border-yellow-500 p-[2px]"
        />
        <div className="ml-3">
          <p className="font-medium text-black">{name}</p>
          <p className="text-sm text-slate-500">{about}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
