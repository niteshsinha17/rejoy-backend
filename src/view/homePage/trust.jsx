import { Container, Section } from "@/components";

export default function Trust(){
  return(
    <Section noBottomPadding={true}>
      <Container>
      <div>
        <h2 className="heading-2 text-center">
          <span className="text-primary">Trusted by Healthcare Professionals of Top Heath Systems</span>
        </h2>
        <div className="grid grid-cols-1 items-center sm:grid-cols-2  mt-6 pt-6" >
          <img src="/images/home/JohnsHopkinsMedicine.jpg" width={400} height={50}></img>
          <img src="/images/home/NLU.png" width={400} height={50}></img>
          <img src="/images/home/columbia.png" width={500} height={50}></img>
          <img src="/images/home/stanford.png" width={500} height={50}></img>
        </div>
      </div>
      </Container>
    </Section>
    
  )
}