const Card = ({ title, description, icon }) => {
  return (
    <div className="py-2 px-4 my-[40px] block rounded-xl bg-[#dbe7ff]">
      <h3 className="font-poppins font-semibold">{title}</h3>
      <p className="font-poppins pr-2 text-sm">{description}</p>
    </div>
  );
};

const Section1 = () => {
  return (
    <div className="py-[120px]">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold ">
          <span className="text-primary">Personalized And Proven</span> Digital
          Health
        </h2>
        <p className="text-center text-[#1f222c] text-lg mt-4">
          Integrated solution for chronic conditions
        </p>

        <div className="flex">
          <div className="w-4/12">
            <Card
              title="Digital Physical Therapy"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non."
              icon=""
            />
            <Card
              title="On Call"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non."
              icon=""
            />
            <Card
              title="Precision Motion Technology"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non."
              icon=""
            />
          </div>
          <div className="w-4/12"></div>
          <div className="w-4/12">
            <Card
              title="Move"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non."
              icon=""
            />
            <Card
              title="House Calls"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non."
              icon=""
            />
            <Card
              title="Musculoskeletal Health"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non."
              icon=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
