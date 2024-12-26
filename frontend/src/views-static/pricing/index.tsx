import { Container } from "@/components";
import { AppRoutes } from "@/enum";
import { Button } from "@/ui";
import { Check } from "lucide-react";

const FeatureList = ({ features }: { features: string[] }) => {
  return (
    <ul className="mt-4 text-sm text-slate-800 space-y-2 list-disc">
      {features.map((feature, index) => (
        <li
          className="flex items-start gap-1"
          key={index}
        >
          <Check className="text-primary" />
          {feature}
        </li>
      ))}
    </ul>
  );
};
const IndividualPricing = () => {
  return (
    <div className="p-5 shadow-sm border rounded-3xl h-full w-[500px] flex-shrink-0">
      <div>
        <h3 className="text-lg text-black">Pay-As-You-Go</h3>
        <div className="text-xs text-slate-500 mt-2">Ideal for Individuals</div>
        <div className="mt-4 text-sm text-slate-800 h-[100px]">
          Perfect for those who need occasional, trusted healthcare information. Access answers anytime, anywhere, and only pay for what you
          use.
        </div>
        <div className="text-center font-semibold text-2xl text-black mt-4">$0.10 / Response </div>
        <FeatureList
          features={[
            "Flexible: No commitment, pay only when you ask a question.",
            "Instant Answers: Get personalized, reliable healthcare information powered by AI.",
            "Trusted Sources: We use only evidence-based data to provide accurate healthcare responses.",
          ]}
        />

        <div className="text-center font-semibold text-lg text-black mt-4 cursor-pointer hover:underline">
          Start Using Rejoy Health Now!
        </div>

        <Button
          href={AppRoutes.REGISTER}
          fullWidth
          className="mt-4"
        >
          Sign Up Now
        </Button>
      </div>
    </div>
  );
};

const EnterprisePricing = () => {
  return (
    <div className="p-5 shadow-sm border rounded-3xl h-full w-[500px] flex-shrink-0">
      <h3 className="text-lg text-black">Enterprise</h3>
      <div className="text-xs text-slate-500 mt-2">Ideal for Healthcare Systems & Large Group Clinics</div>
      <div className="mt-4 text-sm text-slate-800 h-[100px]">
        Designed for large-scale organizations that require high-quality, secure healthcare solutions at scale. Rejoy Health Enterprise
        comes with premium features, bulk discounts, and dedicated support to meet your organization's needs.
      </div>
      <div className="text-center font-semibold text-2xl text-black mt-4">Custom Pricing</div>
      <FeatureList
        features={[
          "Bulk Discounts: Pricing scales with usage. The more you use, the more you save.",
          "Enterprise-Grade Quality & SLA: Service Level Agreement with guaranteed uptime and reliability for mission-critical operations.",
          "FREE Integration: Seamlessly integrate with your existing healthcare systems, EHRs, or other solutions.",
          "Customization: Tailored to your business requirements, including custom workflows, specialized healthcare data sources, and more.",
          "Security: Enterprise-grade security features, including integrations with top security solutions, ensuring HIPAA compliance and data privacy.",
          "Dedicated Support: Get live, 24/7 support from our AI experts who understand your needs.",
        ]}
      />

      <div className="text-center font-semibold text-lg text-black mt-4 cursor-pointer hover:underline">Request a Demo & Custom Quote</div>

      <Button
        href="https://calendar.app.google/bhYPxSDGtRNWRN1V8"
        target="_blank"
        fullWidth
        className="mt-4"
      >
        Request a Demo
      </Button>
    </div>
  );
};

const Pricing = () => {
  return (
    <div>
      <Container>
        <div className="max-sm:py-6 max-md:py-[100px] md:min-h-[300px] flex justify-center items-center">
          <div>
            <h1 className="text-center text-black max-w-screen-md mx-auto">Pricing</h1>
          </div>
        </div>
      </Container>
      <div className="flex max-md:flex-col max-md:items-center justify-center gap-5 items-stretch">
        <IndividualPricing />
        <EnterprisePricing />
      </div>
    </div>
  );
};

export default Pricing;
