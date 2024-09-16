import Overview from "@/view/doctorProfile/overview";
import DetailCard from "@/view/doctorProfile/detailCard";
import { doctorIcon, hospitalIcon, patientIcon, stethoscopeIcon } from "../../../public/icons";
import DoctorDetail from "@/view/doctorProfile/doctorDetail";
import Education from "@/view/doctorProfile/education";
import Insurance from "@/view/doctorProfile/insurance";



const DoctorProfile = () => {
  return (
    <div className="mx-5">
      <DoctorDetail
        name="Dr. Victor Katz"
        specialties={["Sports Medicine", "Orthopedic Surgery"]}
        rating={4.0}
        totalRatings={57}
        practiceName="Gotto Medical Care Pc"
        address="2523 Kings Hwy Ste 1D, Brooklyn, NY, 11229"
        otherLocations={9}
        phoneNumber="(718) 336 - 2258"
        imageUrl="images/home/DrVictorKatz.webp"
      />

      <Overview description="Dr. Victor Katz is an orthopedic surgeon in Mineola, New York and is affiliated with multiple hospitals in the area, including Mercy Medical Center and NYU Winthrop Hospital. He received his medical degree from Stony Brook University School of Medicine and has been in practice for more than 20 years. He is one of 103 doctors at Mercy Medical Center and one of 57 at NYU Winthrop Hospital who specialize in Orthopedic Surgery." />
      
      <DetailCard iconSrc={patientIcon} 
                  heading="CONDITIONS TREATED" 
                  description={["Fractures, Dislocations, Derangement, and Sprains",
                                "Internal Derangement of Knee Cartilage",
                                "Osteoarthritis",
                                "Intervertebral Disc Degeneration",
                                "Spinal Stenosis"]}
      />
      <DetailCard iconSrc={doctorIcon}
                  heading="PROCEDURES PERFORMED"
                  description={["Arthroscopic Shoulder Surgery",
                                "Knee Arthroscopy",
                                "Neurological Testing",
                                "Spinal Fusion",
                                "Spinal Cord Surgery"]}
      />
      <DetailCard iconSrc={stethoscopeIcon}
                  heading="SPECIALTIES"
                  description={["Sports Medicine","Orthopedic Surgery"]}
      />
      <Education schoolName="School Of Medicine At Stony Brook University Medical Center"
                  graduationYear="1991"
                  residency="Li Jewish Medical Center"/>
      <Insurance description={["Emblem HIP Select PPO",
                               "Oscar Insurance NY",
                               "NYS Provider & Health Oscar EPO NY",
                               "Oscar EPO NY",
                               "Oscar Circle",
                               "Oscar NJ Exchange" ]}
      />
      <DetailCard iconSrc={hospitalIcon}
                  heading="HOSPITAL AFFILIATED"
                  description={["Maimonides Midwood Community Hospital"]}
      />
    </div>
  );
};


export default DoctorProfile;
