import { Container, Section } from "@/components";

const SolutionForAll = () => {
  return (
    <div className="bg-[#eaf4f7]">
      <Section>
        <Container>
          <div>
            <h2 className="heading-2 mb-4 text-center">
              Scalable Solutions For
              <span className="text-primary"> All Of Our Partners</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="py-[40px] px-[20px] md:px-[80px]">
                <div className="mb-2 mx-auto text-base bg-primary text-white inline-block p-1 px-4 rounded-full">
                  For Providers
                </div>

                <div className="my-[50px]">
                  <h3 className="heading-5">
                    Help everyone you serve achieve better health outcomes
                  </h3>

                  <p className="body-2 mt-2">
                    Our empathic technology and growing suite of digital
                    solutions make us the trusted ally for hospital networks,
                    clinics, and other health service providers that want to
                    support patients through life&apos;s ups and downs more
                    effectively.
                  </p>
                </div>
              </div>
              <div className="border-l-primaryBoder border-l-2 py-[40px] px-[20px] md:px-[80px]">
                <div>
                  <div className="mb-2 mx-auto text-base bg-primary text-white inline-block p-1 px-4 rounded-full">
                    For Employers and Health Plans
                  </div>
                  <div className="my-[50px]">
                    <h3 className="heading-5">
                      Deliver comprehensive and cost-effective support to all
                      members
                    </h3>

                    <p className="body-2 mt-2">
                      Our tech-based solutions scale up and down to meet the
                      shifting needs of your member base. We offer clinically
                      validated solutions that can help adults and teens through
                      many different health chapters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default SolutionForAll;
