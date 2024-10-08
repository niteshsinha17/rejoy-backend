import { Container, Section } from "@/components";

const Video = () => {
  return (
    <Section>
      <Container>
        <h2 className="text-center text-black mb-6">See it in action</h2>
        <div className="relative overflow-hidden aspect-video border-[8px] border-gray-700 bg-gray-700 rounded-2xl">
          <iframe
            className="top-0 left-0 w-full h-full rounded-2xl"
            src="https://www.youtube.com/embed/pCo5vtkRhL0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Container>
    </Section>
  );
};

export default Video;
