import { Container } from "@/components";
import Link from "next/link";
import { DownloadButtons, TopBanner } from "../../_components";

interface IQuestion {
  slug: string;
  question: string;
  answer: string;
}

const questions: IQuestion[] = [
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
  {
    question: "Health hazards of smoking",
    slug: "health-hazards-of-smoking",
    answer: `Tobacco smoke is incredibly harmful to health. Replacing cigarettes with cigar, pipe or hookah won't reduce health risks posed by smoking. According to American lung association, cigarettes contain about 600 ingredients, many of which are also in cigars and hookah. When they burn, they generate more than 7,000 chemicals many of which are toxic. At least 69 of them are carcinogenic, or known to cause cancer. The centers for disease control and prevention reports more than 4,80,000 deaths per year and note that smoking is most common preventable cause of death in the United States. (https://www.healthline.com/health/smoking/effects-on-body#overall-health) `,
  },
  {
    question: "What are the effects of smoking on respiratory system?",
    slug: "what-are-the-effects-of-smoking-on-respiratory-system",
    answer: `Smoking is a crucial factor in causation and worsening of several respiratory illnesses. The major respiratory illnesses associated with smoking includes bronchial asthma, chronic obstructive pulmonary disease, emphysema, interstitial lung disease, lung fibrosis and lung cancer. Almost all types of pneumonias get worsened and are affected by smoking. 

A large study done in 2021 (https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8224924/) investigated association between long-term smoking and exercise capacity, gas exchange in lungs, lung volumes and flow rates. The arterial oxygen pressure and alveolar oxygen tension are shown reduce with increased smoking. The alveolar-arterial carbon dioxide gradient increased with >30 pack years smoking. The arterial oxygen saturation at rest and at maximum exercise declined as cigarette smoke exposure increased. The primary adverse effects of long-term cigarette exposure on pulmonary physiology are small airway narrowing and impairment in the alveolar gas diffusion capacity. An overall reduction in oxygen carrying capacity at cellular results in impaired metabolism, dysfunction and disease. `,
  },
  {
    question: `How does smoking affect \n cardiovascular system?`,
    slug: "how-does-smoking-affect-cardiovascular-system",
    answer: `Smoking is the leading cause of cardiovascular disease worldwide and also a preventable cause of mortality in individuals with an existing cardiovascular condition. Abstinence from smoking is largely recommended proceeding a cardiovascular event with various studies supporting the benefits to heart health post-cessation.

The physiological changes that are known to precipitate into a cardiovascular event are
Atherosclerosis – arteries become narrow and less flexible. It occurs when fat, cholesterol and other harmful substances in blood form plaque and build up in arterial walls narrowing arterial lumen. Chemicals in cigarette smoke cause the blood to thicken and form clots in heart arteries and veins. Blockage from a clot can lead to cardiac arrest and sudden death.
Peripheral arterial disease – occur when blood vessels become narrower limiting the supply to arms, legs, hands and feet. In extreme cases reduced peripheral blood flow may lead to infection and/or gangrene.
Stroke – Smoking impacts blood flow to the brain leading to permanent damage of neurons. Death from stroke is more likely among smokers than among former smokers or those who have never smoked.
Abdominal aortic aneurysm – is a bulge or a weakness in the wall of abdominal aorta. The aorta is the main branch of the artery emerging from the heart carrying oxygenated blood to the whole body. Smoking is a known cause of damage to abdominal aorta.
(https://www.cdc.gov/tobacco/sgr/50th-anniversary/pdfs/fs_smoking_cvd_508.pdf) `,
  },
  {
    question: "How does smoking affect eyes?",
    slug: "how-does-smoking-affect-eyes",
    answer: `Long-term smoking can affect vision and optic nerve leading to the following conditions –
Glaucoma – intra-orbital pressure increases, leading to pressure on optic nerve which may lead to loss of vision.
Cataract – may lead to cloudy vision.
Age related macular degeneration – which causes damage to a spot in the center of the retina and loss of central vision. `,
  },
  {
    question: "What are the risks of smoking on pregnancy?",
    slug: "what-are-the-risks-of-smoking-on-pregnancy",
    answer: `Smoking reduces fertility, thereby chances of pregnancy.  In men, sperm damage is caused by high levels of carcinogens and mutagenic substances in cigarette. Heavy metals like lead and cadmium are known to damage sperms. Studies have also shown that smoking leads to DNA damage in sperms which results in reduced male fertility and increase in miscarriages.
Smoking has also been associated with erectile dysfunction that contributes to difficulty in conceiving. In chain smokers, the sperm count, concentration, motility and shape are adversely affected (https://health.clevelandclinic.org/how-stopping-smoking-boosts-your-fertility-naturally.
In females, toxic levels of smoke carcinogens are known to harm eggs and premature aging of ovaries. Few studies have found evidence of tube blockage and increased risk of ectopic pregnancy. There is increased risk of miscarriage due to damaged eggs, damage to developing fetus, or unfavorable changes to the uterus lining making healthy implantation less likely.
Smoking during pregnancy is known to increase the risks of birth defects such as those of cardiovascular system, limbs (arms/legs fail to grow fully or missing completely), cleft palate, skull malformations, facial and eye deformations, gastrointestinal or anal defects, undescended testes and other congenital defects. (https://www.verywellfamily.com/family-fertility-and-smoking-1960254). 
Several issues during and after labor are also associated with smoking such as early delivery, low birth weight, still birth and sudden infant death syndrome. `,
  },
  {
    question: "Smoking and Diabetes",
    slug: "smoking-and-diabetes",
    answer: `A smoker is 30-40% more likely to get type 2 diabetes compared with a non-smoker. If a diabetic person starts smoking, sugar control becomes more difficult with increased risk of having more adverse effects on health.`,
  },
  {
    question: "How can smoking lead to diabetes?",
    slug: "how-can-smoking-lead-to-diabetes",
    answer: `Insulin resistance – Presence of nicotine increases insulin resistance, hence makes it harder for the body to use sugar. As a result, blood sugar levels are increased.
Inflammation – Several toxic chemicals and heavy metals present in smoke are pro-inflammatory making it difficult for the body to heal wounds or fight infections.
Increased midsection fat – smoking may lead to increased belly fat, making the individual more prone to having type 2 diabetes.
Few studies show that smoking can raise triglycerides which also may contribute to increased risks of atherosclerosis and small blood vessel damage.`,
  },
  {
    question: "How does smoking make diabetes worse?",
    slug: "how-does-smoking-make-diabetes-worse",
    answer: `The combination of diabetes and smoking has direct and significant implications on the circulatory system. Increase in insulin resistance, blood sugar concentration with added toxins from smoking leads to plaques and clot formation and blockage of small and large blood vessels. These pathophysiological changes can occur in various blood vessels of body and can result in :
1. Cardiovascular disease
2. Eye problems
3. Stroke
4. Kidney failure
5. Nerve damage/neuropathy
6. Erectile dysfunction`,
  },
  {
    question: "How can one quit smoking?",
    slug: "how-can-one-quit-smoking",
    answer: `If quitting on your own is difficult, seeking help from healthcare team can offer various options. A few maybe –
1. Counseling
2. Nicotine patches/replacement therapy
3. Mindfulness training for smoking cessation
4. Antidepressants
5. Try exercising when there is an urge
6. Learn relaxation techniques that work for you
7. Chew on sugar-free candy or gummies`,
  },
  {
    question: "What is the definition of \n “life expectancy”?",
    slug: "what-is-the-definition-of-life-expectancy",
    answer: `The World health Organization defines “life expectancy” as the average number of years that a newborn could expect to live if he/she was to pass through life exposed to the sex-specific and age-specific death rates prevailing at the time of his/her birth for a specific year, in a given country, territory or a geographic area (https://www.who.int/data/gho/indicator-metadata-registry/imr-details/65). Life expectancy at birth reflects the overall mortality level of a population. It summarizes the mortality pattern that prevails across all age groups. `,
  },
  {
    question: "What are the determinants of life expectancy?",
    slug: "what-are-the-determinants-of-life-expectancy",
    answer: `Life expectancy at birth, broadly depends on two main determinants according to Adler and Newman, 2002 (https://pubmed.ncbi.nlm.nih.gov/11900187/). Firstly, chance of surviving early years and secondly, the type of behavior engaged in and the external support system that people have access to. One of the main external support systems in most developed countries is the healthcare system. Importantly, healthcare outcomes in association with behavioral, social and other factors could influence life expectancy (Braveman and Gottlieb 2014, Dahlgren and Whitehead 1991).
Review of literature led to identification of seven potential determinants of life expectancy (https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9650666/) such as 1) health care expenditures 2) health financing policies 3) elements of medical care 4) health habits and population health 5) social determinants 6) social spending and 7) other external factors. 
This article has two key aspects to explore of which one is “what are the top causes of mortality? The second aspect is how does exercise or active lifestyle impact mortality, thus life expectancy?
    `,
  },
  {
    question: "What is the correlation of life expectancy and mortality? ",
    slug: "what-is-the-correlation-of-life-expectancy-and-mortality",
    answer: `The most commonly used indicator for analyzing mortality is life expectancy at birth, i.e. the mean number of years that a person can expect to live at birth subjected to current mortality conditions throughout the rest of their lives. Life expectancy originates from demography but is an often-used summary measure of mortality also in epidemiology and public health in general. (https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Mortality_and_life_expectancy_statistics) `,
  },
  {
    question:
      "What are the top causes of mortality and reduced life expectancy?",
    slug: "what-are-the-top-causes-of-mortality-and-reduced-life-expectancy",
    answer: `The top global causes of death, in order of total number of lives lost are associated with three broad topics: cardiovascular (ischemic heart disease, stroke), respiratory (chronic obstructive pulmonary disease, lower respiratory infections) and neonatal conditions which includes birth asphyxia, birth trauma, neonatal sepsis and preterm birth complications. 
The world's biggest killer is ischemic heart disease, responsible for 16% of the world's total deaths. This is followed by stroke which accounts for 11% and chronic obstructive pulmonary disease which accounts for 6% of total deaths (https://www.who.int/news-room/fact-sheets/detail/the-top-10-causes-of-death). It is important to know why people die to improve how people live. Measuring annual mortality helps to assess the effectiveness of our health systems and direct resources to where they are needed the most. While there are preventable measures to reduce mortality rates, we will focus on the role of exercise or physical activity in lowering mortality. `,
  },
  {
    question:
      "How does exercise or active lifestyle impact mortality, thus life expectancy?",
    slug: "how-does-exercise-or-active-lifestyle-impact-mortality-thus-life-expectancy",
    answer: `Regular physical activity reduces many major mortality risk factors including arterial hypertension, diabetes mellitus type 2, dyslipidemia, coronary heart disease, stroke and cancer (https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1402378/). The relative risk of death is approximately 20% to 35% lower in physically active and fit persons compared to that in inactive and unfit persons. Physical inactivity represents a major independent risk factor for mortality accounting for up to 10% of all deaths in the European region (https://pubmed.ncbi.nlm.nih.gov/21181084/). Hence, because a 40% lower mortality rate corresponds to an approximately 5-year higher life expectancy one would expect an approximately 3.5-4.0-year higher life expectancy in physically active persons compared to that in inactive persons. (https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3395188/#:~:text=All%20studies%20reported%20a%20higher,%3A%203.9%20%C2%B1%201.8%20years)
Exercise makes your muscles work and burn calories. Exercises are activities designed to improve physical fitness, enhance health and prepare the body to meet the demands of life. Physical activities like running, swimming, walking, jogging and dancing are often used synonymously with exercise. 
    `,
  },
  {
    question: "How does exercise improve physical health?",
    slug: "how-does-exercise-improve-physical-health",
    answer: `1. Helps control weight – which in turn can help manage body mass index (BMI).
2. Strengthens muscles and bones – which helps reduce mortality causes due to trauma, prevention of osteoporosis and risks of fractures.
3. Helps manage cholesterol and atherosclerosis related conditions in the body – reduces the risks of cardio-vascular events and stroke. 
4. Helps control sugar and manage diabetes.`,
  },
  {
    question: "How does exercise improve mental health?",
    slug: "how-does-exercise-improve-mental-health",
    answer: `1. Exercise makes you feel happier – Exercising peoples brain release chemicals such as serotonin and endorphin which helps sleeping better and feel happier. 
2. Improves learning, thinking and judgement capabilities as you age – with exercise, the brain structure and function changes due to neuroplasticity which helps delay age-related mental decline.
3. Helps fight anxiety and depression – exercise acts in a way similar to anti-depressant medication, lowering inflammation, promotes nerve cell growth and blood flow in the brain.
    `,
  },
  {
    question: "How much exercise is recommended?",
    slug: "how-much-exercise-is-recommended",
    answer: `The WHO guidelines (2020) recommend at least 150-300 minutes of moderate to vigorous exercise each week for adults aged between 18-64 years.

This may be achieved by walking either 90 minutes 3 days/week or 30 minutes for 5 days/week. it is also recommended to engage in strength training at least twice a week. 

A July 2022 study shows that exercise and a healthy diet can individually reduce overall risk of mortality, but the largest risk reduction comes from doing both. The results published in the British Journal of sports medicine, show that those who frequently exercise and ate healthy had the lowest risk of mortality. The study authors also note that high levels of physical activity do not counteract the negative health effects of a poor diet and a healthy diet does not counteract health effects of a sedentary life (https://www.healthline.com/health-news/diet-and-exercise-alone-wont-help-you-live-longer-you-have-to-do-both). 

According to the researchers, the findings highlight the importance of both – healthy diet and regular physical activity emphasizing its importance on reducing the risk of mortality from all causes. `,
  },
];

const slugs = [
  "what-is-inflammation",
  "what-are-the-top-inflammatory-foods-one-should-avoid",
  "can-cooking-methods-make-a-difference",
  "what-are-the-other-adjuncts-to-support-immune-system",
  "health-hazards-of-smoking",
  "what-are-the-effects-of-smoking-on-respiratory-system",
  "how-does-smoking-affect-cardiovascular-system",
  "how-does-smoking-affect-eyes",
  "what-are-the-risks-of-smoking-on-pregnancy",
  "smoking-and-diabetes",
  "how-can-smoking-lead-to-diabetes",
  "how-does-smoking-make-diabetes-worse",
  "how-does-exercise-or-active-lifestyle-impact-mortality-thus-life-expectancy",
  "what-are-the-determinants-of-life-expectancy",
  "what-is-the-correlation-of-life-expectancy-and-mortality",
  "what-are-the-top-causes-of-mortality-and-reduced-life-expectancy",
  "how-does-exercise-improve-physical-health",
  "how-does-exercise-improve-mental-health",
  "how-can-one-quit-smoking",
  "what-is-the-definition-of-life-expectancy",
  "how-does-smoking-affect-eyes",
  "what-are-the-top-causes-of-mortality-and-reduced-life-expectancy",
  "what-are-the-determinants-of-life-expectancy",
  "what-is-the-correlation-of-life-expectancy-and-mortality",
  "what-are-the-risks-of-smoking-on-pregnancy",
  "smoking-and-diabetes",
  "how-can-smoking-lead-to-diabetes",
  "how-does-smoking-make-diabetes-worse",
  "how-can-one-quit-smoking",
  "what-is-the-definition-of-life-expectancy",
  "how-does-exercise-or-active-lifestyle-impact-mortality-thus-life-expectancy",
  "how-does-exercise-improve-physical-health",
  "how-does-exercise-improve-mental-health",
  "how-much-exercise-is-recommended",
];

function generateRandomNumbers(min: number, max: number) {
  if (max - min + 1 < 3) {
    throw new Error("Range is too small to generate 3 unique numbers.");
  }

  var result: number[] = [];

  while (result.length < 3) {
    var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!result.includes(randomNum)) {
      result.push(randomNum);
    }
  }

  return result;
}

const getRandomThreeItemList = () => {
  let randomList: IQuestion[] = [];

  const randomNumbers = generateRandomNumbers(0, questions.length - 1);

  randomNumbers.forEach((num) => {
    randomList.push(questions[num]);
  });

  return randomList;
};

export default async function QuestionPage({ params }: any) {
  const question = questions.find((q) => q.slug === params.slug);

  const suggestions = getRandomThreeItemList();

  return (
    <TopBanner>
      <Container>
        <h1 className="text-center heading-1 text-textPrimary">
          <span className="text-primary whitespace-pre-wrap">
            {question?.question || "Question not found"}
          </span>
        </h1>
        <p className="max-w-screen-md mx-auto body-1 mt-4 whitespace-pre-wrap">
          {question && question.answer}
          {!question && "The answer is not available at the moment"}
        </p>
        <div className="pt-6">
          <p className="text-center heading-2">
            To get more personalized answers, <br /> download now
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <DownloadButtons />
          </div>
        </div>
        <div className="mt-6 text-center heading-4 ">
          Explore Related Articles for Deeper Insights
        </div>
        <div className="grid mt-4 md:grid-cols-3 gap-4">
          {suggestions.map((item, index) => (
            <div key={index}>
              <div className="md:h-[250px] max-w-[600px] mx-auto flex flex-col gap-3 justify-between border rounded-md border-primaryBoder p-4">
                <div className="space-y-2">
                  <div className="text-lg font-semibold">{item.question}</div>
                  <div className="text-sm text-textSecondary">
                    {item.answer.substring(0, 100)}...
                  </div>
                </div>
                <Link
                  className="text-sm text-primary"
                  href={`/ask/${item.slug}`}
                >
                  View{" "}
                </Link>
              </div>
            </div>
          ))}
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
