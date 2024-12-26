import { Container, Section } from "@/components";

const Video = () => {
  return (
    <Section>
      <Container>
        <h2 className="text-center text-black mb-6">See it in action</h2>
        <div className="relative overflow-hidden aspect-video border-[8px] border-gray-700 bg-gray-700 rounded-2xl">
          <iframe
            className="top-0 left-0 w-full h-full rounded-2xl"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/l8dNmadilS4?si=5kE7HJxUkAarpuDW"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </Container>
    </Section>
  );
};

export default Video;
