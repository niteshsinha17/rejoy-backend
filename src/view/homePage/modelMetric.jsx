import { Container, Section } from "@/components"


export default function ModelMetric() {


  return (
    <Section>
      <Container>
      <h2 className="heading-2 text-center">
          <span className="text-primary">The Best Health Care AI built by</span>
        </h2>
      <div className="flex flex-auto justify-center">
        <div className="mx-6 my-3 w-full">  
            <Bar label="Rejoy Health AI modal" percentage="92.80%" color="bg-[rgb(16,67,159)]"/>
            <Bar label="Meta LLAM" percentage="90.00%" color="bg-[rgb(135,76,204)]"/>  
            <Bar label="Google Med-Palm 2" percentage="88.01%" color="bg-[rgb(198,91,207)]"/>
            <Bar label="ChatGPT 4" percentage="87.08%" color="bg-[rgb(242,123,189)]"/>
                     
        </div>
      </div>
      <p className="body-1 mt-4 text-center">
        Accuracy of models on the popular MedQA(USMLE) benchmark. MedQA is a dataset designed to evaluate question-answering system in medical domain, particularly focusing on question similar to USMLE
        </p>

      </Container>
    </Section>

    
    
  )
}

function Bar({label, percentage,color}){
  return (
    <div>
      <div className="flex items-center space-x-4">
          <div className={` h-6 my-2 flex-grow ${label==="Rejoy Health AI modal"?'shadow-xl':'shadow-none'} overflow-hidden relative bg-[rgb(234,244,247)]  rounded-full `}>
                <div className={`h-6 ${color}  flex items-center rounded-full` } style={{ width: `${percentage}` }}>
                <span className="text-white font-semibold text-sm ml-4 absolute left-0">
                        {label}
                      </span>
                </div>
          </div>
          <span className="text-sm font-bold text-[rgb(59,129,246)] w-20 text-right">{percentage}</span>

        </div>
      
    </div>
  )
}
