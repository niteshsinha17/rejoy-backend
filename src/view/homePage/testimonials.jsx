import { Container, Section } from "@/components";

export default function Testimonials(){
  return(
    <>
    <Section noBottomPadding={true}>
      <Container>
        <h2 className="heading-2 text-center">
          <span className="text-primary">See What Our Users Say</span>
        </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 ">
          <Card src="images/home/DrVictorKatz.webp" name="Dr. Victor Katz" about="NYU Langone" message="Rejoy health is awesome. It keeps me updated about all new development in healthcare."/>
          <Card src="images/home/DrTaylor.jpeg" name="Taylor B Sewell" about="Columbia Medical" message="I use Rejoy Health app to know the latest in medical field.                                   "/>
          </div>
      </Container>
    </Section>
    </>
  )
}


function Card( {src, name, about, message}){
  return (
    <div className="mt-5">
          <div className="flex justify-center">
            <img src={src} className=" border border-primary rounded-full shadow-xl" width={200}/>
          </div>
          
          <div className=" text-center">
            
              <p className=" text-primary mt-3">
                {name}
              </p >
              
          
            <p className="body-1 text-sm pb-3 ">
              {about}
              </p>
            <div className="">
              <QuoteIcon>
                <span>
                  <p className="">
                    {message}
                  </p>
                </span>
              </QuoteIcon>
              <p className="">
              {message}
              </p>

            </div>
            
                           
          </div>
    </div>
  )
}

function QuoteIcon(){
  return (
    <>
    <div className="pl-5">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-quote" viewBox="0 0 16 16">
          <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z"/>
      </svg>
    </div>
      
    </>
  )
}