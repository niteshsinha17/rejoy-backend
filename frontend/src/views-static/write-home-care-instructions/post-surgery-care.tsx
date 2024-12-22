import { Container, Section } from "@/components";

const hangouts = [
  {
    title: "Aftercare for Minor Skin Surgery: Wound Care, Signs of Infection, and Suture Removal",
    description:
      "This handout will guide patients through proper wound care, how to clean the incision site, and when they can shower. We’ll highlight signs of infection (such as increased redness, swelling, or drainage) and explain the importance of timely suture removal. Clear instructions on how to care for the wound site will help prevent complications and speed up recovery.",
  },
  {
    title: "Post-Laparoscopic Surgery Care: Managing Pain, Incisions, and Activity Restrictions",
    description:
      "For patients recovering from minimally invasive surgeries like laparoscopy, we’ll provide detailed guidance on managing small incisions, handling post-operative discomfort, and knowing when it's safe to resume normal activities.",
  },
  {
    title: "Aftercare for Tonsillectomy: Pain Management and Post-Surgical Care",
    description:
      "Tonsillectomy recovery often involves managing pain, preventing bleeding, and avoiding irritating foods. We'll guide patients on what to expect, how to manage discomfort, and how to recognize signs of complications that would require immediate medical attention.",
  },
];

const PostSurgeryCare = () => {
  return (
    <div className="bg-slate-100">
      <Section>
        <Container>
          <h2 className="text-black text-center">Post-Surgery Aftercare</h2>

          <p className="text-center body-1 mt-2 max-w-2xl text-textSecondary mx-auto">
            Patients often require specific care after surgical procedures to ensure proper healing and avoid complications like infection
            or scarring. Rejoy Health can help you write comprehensive, step-by-step home care instructions for a variety of surgical
            recoveries:
          </p>
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            {hangouts.map((hangout, index) => (
              <div
                key={index}
                className="p-4 border border-slate-300 rounded-2xl"
              >
                <div>
                  <h3 className="text-sm font-semibold text-primary">{hangout.title}</h3>
                  <p className="text-sm mt-2">{hangout.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default PostSurgeryCare;
