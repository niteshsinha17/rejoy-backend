import { Container, Section } from "@/components";
import Image from "next/image";
import chatBot from "../../../public/images/academy/chatbot.svg";

const Support = () => {
  return (
    <div className="bg-primary">
      <Section>
        <Container>
          <div className="flex justify-center items-center gap-2 flex-col">
            <Image
              src={chatBot}
              alt="chatBot"
            />

            <h2 className="text-center heading-2 text-white">24/7 Support with our Bot</h2>

            <p className="text-center max-w-3xl mx-auto body-1 mt-4 text-white">
              We understand that questions and doubts may arise during your journey. That's why we've integrated a dedicated bot into our
              platform to provide round-the-clock support. Our bot is always ready to assist you with recommendations, answer your queries,
              address concerns, and engage in friendly conversations.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Support;
