import { Container } from "@/components";
import { DownloadButtons, TopBanner } from "../../_components";

const questions = [
  {
    slug: "what-is-inflammation",
    question: "What is inflammation?",
    answer:
      "Inflammation is a normal reaction of the body which occurs when body releases chemicals to defend itself against infection or injury. Once the infection or injury is healed, the inflammation process ideally ends. If the inflammation persists or occurs in the absence of infection or injury, it can be likely abnormal and can result in damaging healthy cells, tissues and organs. Chronic inflammatory states can often lead to cancer, heart diseases, diabetes, asthma, arthritis, fibromyalgia and other auto-immune conditions ",
  },
  {
    slug: "what-are-the-top-inflammatory-foods-one-should-avoid",
    question: "What are the top inflammatory foods one should avoid?",
    answer:
      "According to Hopkins Medicine and Harvard health, the following are the inflammation causing foods - \n\n1. Red meat (burgers, steak) and processed meat (hot dogs, sausages) \n2. Commercial baked foods such as cakes, pies, brownies and cookies. \n3. Refined carbs such as white bread, pastries and pasta.\n4. Sugar-sweetened beverages such as soda, bottled or canned drinks, candies, jelly and syrups.\n5. Deep fried foods such as French fries or fried chicken.\n6. Trans fats found in margarine, lard, microwave popcorn (https://www.hopkinsmedicine.org/health/wellness-and-prevention/anti-inflammatory-diet)",
  },
  {
    slug: "can-cooking-methods-make-a-difference",
    question: "Can cooking methods make a difference?",
    answer:
      "Yes! Hopkins Medicine recommends steaming, boiling, stewing or stir frying over grilling or deep frying. Avoiding ultra processed sauces, ready to go gravies and dressings is the key to cut chemical, sugar overload and sodium in foods that typically are known to enhance food shelf life.",
  },
  {
    slug: "what-are-the-other-adjuncts-to-support-immune-system",
    question: "What are the other adjuncts to support immune system?",
    answer: `Achieving consistency in the pattern of dietary intake to help with anti-inflammation is one aspect of lifestyle modification. Other than dietary modifications hydration, regular exercise, sleep and stress management are all key towards adding to the benefits of nutritional intake. Smoking, alcohol and substance abuse cessation are paramount towards minimizing the risk of inflammation triggering processes in the body. 

Hydration – The Arthritis foundation suggests that drinking water can help flush toxins out of the body and keep joints lubricated which can aid in anti-inflammatory muscle and joint conditions. Mayo clinic recommends daily intake of about 3.7 liters of fluid for men and 2.7 liters for women (https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/)

Regular exercises – A systematic review done in 2019 by Cerqueira et al (https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6962351) shows that high intensity exercises are detrimental to controlling inflammation, in contrast to moderate intensity exercises with adequate rest which is known to promote anti-inflammatory effects. Your physical therapist can help to design a tailor-made exercise program based on the history of symptoms and functional impairments. 

Sleep – Certain proteins called cytokines are released during sleep. Cytokines levels increase during infection, inflammation and stress as means to protect the body. Mayo clinic suggests sleep deprivation causes reduction in the level of cytokine production which results in individuals being more prone to sickness from exposure to pathogens. Time to recovery from the sickness is also affected due to lack of sleep. The national institute of health state “experts recommend that adults sleep between 7 to 9 hours a night”. 
`,
  },
];

export default function QuestionPage({ params }: any) {
  const question = questions.find((q) => q.slug === params.slug);
  return (
    <TopBanner>
      <Container>
        <h1 className="text-center heading-1 text-textPrimary">
          <span className="text-primary">
            {question ? question.question : "Question not found"}
          </span>
        </h1>
        <p className="max-w-screen-md mx-auto body-1 mt-4 whitespace-pre-wrap">
          {question
            ? question.answer
            : "The answer is not available at the moment"}
        </p>
        <div className="pt-6">
          <p className="text-center heading-2">
            To get more personalized answers, <br /> download now
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <DownloadButtons />
          </div>
        </div>
      </Container>
    </TopBanner>
  );
}

export async function generateStaticParams() {
  return questions.map(({ slug }) => ({
    slug,
  }));
}
