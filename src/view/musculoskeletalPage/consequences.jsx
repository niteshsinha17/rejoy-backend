import { Container, Section } from "@/components";

const CardItem = (props) => {
  return <div className="border border-[#ccc] py-6 px-4">{props.children}</div>;
};

const Consequences = () => {
  return (
    <Section noBottomPadding>
      <Container>
        <h2 className="heading-2 text-center">
          Understanding Musculoskeletal{" "}
          <span className="text-primary">Consequences</span>
        </h2>
        <p className="body-1 text-center mt-4 max-w-2xl mx-auto">
          Musculoskeletal conditions have far-reaching consequences, impacting
          individuals&apos; daily lives and overall well-being. From chronic
          pain and limited mobility to functional limitations and decreased
          quality of life, these conditions affect millions of people.
          Additionally, they impose a significant burden on productivity and
          healthcare costs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6">
          <CardItem>
            <h5 className="heading-5 font-medium text-base font-manrope">
              $874 Billion Economic Burden
            </h5>
            <p className="body-2 mt-4">
              Musculoskeletal conditions pose a significant economic burden,
              costing the United States an estimated{" "}
              <strong> $874 billion</strong> each year in healthcare expenses,
              lost wages, and reduced productivity.
            </p>
          </CardItem>
          <CardItem>
            <h5 className="heading-5 font-medium text-base font-manrope">
              Leading Cause of Disability Worldwide
            </h5>
            <p className="body-2 mt-4">
              Musculoskeletal conditions are the leading cause of disability
              globally, affecting more than <strong>1.7 billion</strong> people
              and accounting for over <strong>50%</strong>
              of all reported disability cases.
            </p>
          </CardItem>
          <CardItem>
            <h5 className="heading-5 font-medium text-base font-manrope">
              126 Million Ambulatory Care Visits
            </h5>
            <p className="body-2 mt-4">
              Musculoskeletal conditions result in approximately{" "}
              <strong>126 million</strong> ambulatory care visits annually,
              indicating the high demand for medical services, including
              consultations, examinations, and treatments.
            </p>
          </CardItem>
          <CardItem>
            <h5 className="heading-5 font-medium text-base font-manrope">
              Chronic Pain Affects 20% of Adults
            </h5>
            <p className="body-2 mt-4">
              Chronic pain related to musculoskeletal conditions affects
              approximately <strong>20% of adults</strong>, causing persistent
              discomfort and impairing daily activities and quality of life.
            </p>
          </CardItem>
          <CardItem>
            <h5 className="heading-5 font-medium text-base font-manrope">
              High Rates of Mental Health Disorders{" "}
            </h5>
            <p className="body-2 mt-4">
              Individuals with musculoskeletal conditions have higher rates of
              mental health disorders, such as depression and anxiety, with
              studies indicating a two-fold increased risk compared to the
              general population.
            </p>
          </CardItem>
          <CardItem>
            <h5 className="heading-5 font-medium text-base font-manrope">
              19% of Nursing Home Residents{" "}
            </h5>
            <p className="body-2 mt-4">
              Musculoskeletal conditions contribute to the need for long-term
              care, with approximately 19% of nursing home residents
              experiencing these conditions, requiring specialized support and
              assistance.
            </p>
          </CardItem>
        </div>
      </Container>
    </Section>
  );
};

export default Consequences;
