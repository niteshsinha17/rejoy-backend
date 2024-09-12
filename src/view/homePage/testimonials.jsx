import { Container, Section } from "@/components";
import Image from 'next/image';

const Testimonials = () => {
  return(
    <Section noBottomPadding={true}>
      <Container>
        <h2 className="heading-2 text-center">
          <span className="text-primary">See What Our Users Say</span>
        </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-1 mt-4">
            <Testimonial 
              message="Rejoy Health is awesome. It keeps me updated about all new development in healthcare."
              imgSrc="images/home/DrVictorKatz.webp"
              name="Dr. Victor Katz"
              about="NYU Langone"
            />
            <Testimonial 
              imgSrc="images/home/DrTaylor.jpeg" 
              name="Taylor B Sewell" 
              about="Columbia Medical" 
              message="I use Rejoy Health app to know the latest in medical field.                                   "
            />
          </div>
      </Container>
    </Section>   
  )
}

const Testimonial = ({message,imgSrc,name,about}) => {
  return (
    <div className="max-w-md mx-auto mt-1 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <p className="body-1 mb-4 text-base">
          {message}
        </p>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Image
              src={imgSrc}
              alt="Avatar"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
          <div className="ml-3">
            <p className="font-medium text-primary">{name}</p>
            <p className="text-sm body-1">{about}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;