import { Box } from "@chakra-ui/react";
import ImageCarousel from "../Components/ImageCarousel/ImageCarousel";
import './Home.css';
import { section1, section2, appliances } from "../data/homeData";
import GridOnLarge from "../Components/GridOnLarge";
import ProductsContainer from "../Components/ProductsContainer";

export default function Main() {

  const cards=[section1,section2,appliances];

  const bannerImage = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Shreyansh/BAU/Unrexc/D70978891_INWLD_BAU_Unrec_Uber_PC_Hero_3000x1200._CB594707876_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/wearables/BAU_GW/Tall_Hero_3000X1200_BAU._CB596910925_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Baby/cnnjpp1/Baby/D92807365-_1_Tallhero_2xx._CB598669664_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/Biss_2023/BISS_GW/GWNEW/GWNEW2/DIYpc._CB596634554_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Beauty/GW/Makeup-Herofader-PChh._CB596261885_.jpg",
  ]


  return (
    <div className="mainContainer">
      <ImageCarousel images={bannerImage}/>
     {/* <Box position="relative"> */}
      {/* position="sticky" top={{ base: "8rem", sm: "10rem", md: "12rem", lg: "14rem" }} */}
        <Box width="100vw" mt="-20rem" >
          <GridOnLarge cards={cards} />
          <ProductsContainer cards={cards} />
        </Box>
     {/* </Box> */}
    </div>
  )
}
