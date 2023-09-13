import {Box, Card,Image, CardBody, Heading, VStack, Text } from '@chakra-ui/react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { products } from '../data/products';

interface Props{
    cards:any[]
}
// interface Product{
//     id:string|number;
//     title:string;
//     description:string;
//     thumbnail:string;
//     image_url:string[];
//     price:{mrp:number;cost:number,discount:string};
//     features:string[];
//     productDetails:[{key:string,value:string}];

// }

export default function ProductsContainer({cards}:Props) {
    const settings = {
        infinite: false,
        speed: 300,
        arrows:true,
        variableWidth: true,
        slidesToShow: 5,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    arrows: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows:false
                }
            }
        ]
    };
  return (
      <VStack  py={{ base: 4, md: 6 }} gap="2rem" width="100%" overflowX="hidden" zIndex={50}>
          {cards.map((_item:any,index:number) =>
              <Card key={index}  width="100vw"  bg="white"  color="black"  variant='outline' borderRadius={0}>
                  <CardBody padding={{ base: 1, sm: 4 }}>
                      {index === 0 && <Heading size="md" py='4'>Revamp your home in style</Heading>}
                      {index === 1 && <Heading size="md" py='4'>Up to 60% off | Styles for men</Heading>}
                      {index === 2 && <Heading size="md" py='4'>Appliances | Up to 55% off</Heading>}
                      <Slider {...settings}  className='productStack' >
                          {products.map((product) =>
                              <Box key={product.id} mx="1" width="12rem" >
                                  <Image src={product.thumbnail} alt={product.title} height="9rem" width="12rem"  />
                                  <Text noOfLines={3} style={{ fontSize: "clamp(10px, 4vw, 14px)" }}>{product.title}</Text>
                              </Box>
                          )}
                          
                      </Slider>
                  </CardBody>
              </Card>
          )}
      </VStack>
  )
}
