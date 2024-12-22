import { Container, Section } from "@/components";

const hangouts = [
  {
    title: "Preventing Falls in Older Adults: Tips for Staying Safe at Home",
    description:
      "This handout offers practical advice for older adults on how to prevent falls—such as improving home safety, maintaining balance through exercise, and wearing the right footwear.",
  },
  {
    title: "Breast Cancer Screening: What You Need to Know About Mammograms",
    description:
      "For women, understanding the importance of regular mammograms is vital for early detection of breast cancer. We’ll provide a clear, informative guide that explains the procedure, when to start screenings, and how often to schedule mammograms.",
  },
  {
    title: "Healthy Eating: A Guide to Heart-Healthy Foods",
    description:
      "This handout focuses on making heart-healthy dietary choices to reduce the risk of heart disease, including tips on cutting down on saturated fats, eating more fruits and vegetables, and choosing whole grains.",
  },
];

const PreventiveCare = () => {
  return (
    <div className="text-center">
      <Section>
        <Container>
          <h2 className="text-black max-md:text-center">Preventive Care and Healthy Living</h2>

          <p className="body-1 mt-2 max-w-2xl text-textSecondary mx-auto">
            Preventive care is essential for maintaining long-term health. Rejoy Health can help you write detailed handouts that guide
            patients through the key aspects of preventive care:
          </p>
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            {hangouts.map((hangout, index) => (
              <div
                key={index}
                className="p-4 border rounded-2xl"
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

export default PreventiveCare;
