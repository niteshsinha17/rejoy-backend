import { Container } from "@/components";
import { cn } from "@/utils";

export default function ModelMetric() {
  return (
    <div className="py-6">
      <Container>
        <div className="text-center">
          <div className="max-w-screen-sm mx-auto">
            <h2 className="text-black">The Best Health Care AI</h2>
            <p className="mt-4 text-sm md:text-base">
              Accuracy of models on the popular MedQA(USMLE) benchmark. MedQA is a dataset designed to evaluate question-answering system in
              medical domain, particularly focusing on question similar to USMLE
            </p>
          </div>
          <div className="mt-4 space-y-3 max-w-screen-md mx-auto">
            <Bar
              label="Rejoy Health AI modal"
              percentage="92.80%"
              golden
            />
            <Bar
              label="Meta LLAM"
              percentage="90.00%"
            />
            <Bar
              label="Google Med-Palm 2"
              percentage="88.01%"
            />
            <Bar
              label="ChatGPT 4"
              percentage="87.08%"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

function Bar({ label, percentage, golden }) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="flex-1 overflow-hidden">
          <div className={`h-[36px] rounded-full bg-slate-200 flex-1`}>
            <div
              className={cn("h-full bg-slate-700 rounded-full flex items-center pl-3", {
                "bg-yellow-500": golden,
              })}
              style={{ width: `${percentage}` }}
            >
              <span className="text-white font-medium text-sm">{label}</span>
            </div>
          </div>
        </div>
        <span className="font-bold text-black">{percentage}</span>
      </div>
    </div>
  );
}
