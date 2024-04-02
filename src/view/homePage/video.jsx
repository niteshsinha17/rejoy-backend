import { Container, Section } from "@/components";

const Video = () => {
  return (
    <Section>
      <Container>
        <h2 className="text-center heading-2 text-textPrimary mb-4">
          See it in action
        </h2>
        <div className="pb-[56.25%] relative overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/Y4HHGzZ08JE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </Container>
    </Section>
  );
};

export default Video;
