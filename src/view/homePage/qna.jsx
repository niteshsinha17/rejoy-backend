import { Container, Section } from "@/components";

const QNA = () => {
  return(
      <Section noBottomPadding={true}>
        <Container>
              <h2 className="heading-2 text-center">
                <span className="text-primary">Ask Questions From All Fields</span>
              </h2>
              <div className=" space-y-4 mt-4">
                <Question question="Q. What are health risks associated with GLP-1 receptor agonists like Ozempic and Mounjaro?"
                          answer="Glucagon-like peptide-1 receptor agonists (GLP-1 RAs) such as semaglutide (Ozempic) and tirzepatide (Mounjaro) are associated with several health risks. The most common adverse events are gastrointestinal (GI) in nature, including nausea, vomiting, diarrhea, and abdominal pain."
                />
                <Question question=" Q. What is the latest standard of care for high cholesterol?"
                          answer="The latest standard of care for high cholesterol, as outlined by the American College of Cardiology and the American Heart Association (ACC/AHA), includes the use of statins as the first-line therapy for lowering low-density lipoprotein cholesterol (LDL-C) according to an individual's atherosclerotic cardiovascular disease (ASCVD) risk and baseline LDL-C levels."
                />
                <Question question=" Q. What is the most evidence-based treatment for hypertension?"
                          answer="The most evidence-based treatment for hypertension involves both non-pharmacological and pharmacological strategies. Non-pharmacological interventions include lifestyle modifications such as weight loss, dietary changes including sodium reduction and potassium supplementation, increased physical activity, and limited alcohol consumption"
                />
                <Question question=" Q. Can osteoporosis be reversed?"
                          answer="Answer to be written"
                />
              </div>
              <div className="flex justify-center">
                <button className="bg-primary rounded-full px-4 text-white mt-3 py-1 hover:bg-[#235fce]">Ask Now</button>
              </div>
          </Container>       
      </Section>
  )
}

function Question({question,answer}){
  return(
    <div>
      <div className="text-lg">
        {question}
      </div>
      <p className="body-1 text-sm px-4 pt-3">
        {answer}
      </p>
    </div>
  )
}

export default QNA;