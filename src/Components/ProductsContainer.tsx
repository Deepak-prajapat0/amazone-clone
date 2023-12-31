import { Card, CardBody, Heading, VStack } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../features/store';
import { getAllProducts } from '../features/product/productSlice';
import ProductCard from './ProductCard';

interface Props {
    cards:any
}

const settings = {
    infinite: false,
    speed: 300,
    arrows: true,
    variableWidth: true,
    slidesToShow: 5,
    slidesToScroll: 4,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                // infinite: true,
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
                slidesToScroll: 2,
                arrows: false
            }
        }
    ]
};

export default function ProductsContainer({ cards }: Props) {
    const [products,setProducts]= useState([])
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(getAllProducts())
        .then((res:any)=>{
            if(res.payload){
                setProducts(res.payload.products)
            }
        })
            .catch((error) => {
                console.error('Error fetching cart:', error);
            });
    },[])

  

    return (
        <VStack py={{ base: 4, md: 6 }} gap="2rem" width="100%" overflowX="hidden" zIndex={50}>
            {cards.map((_item: any, index: number) =>
                <Card key={index} width="100vw" bg="white" color="black" variant='outline' borderRadius={0}>
                    <CardBody padding={{ base: 1, sm: 4 }}>
                        {index === 0 && <Heading size="md" py='4'>Revamp your home in style</Heading>}
                        {index === 1 && <Heading size="md" py='4'>Up to 60% off | Styles for men</Heading>}
                        {index === 2 && <Heading size="md" py='4'>Appliances | Up to 55% off</Heading>}
                        <Slider {...settings} className='productStack' >
                            {products.map((product:any, index: number) =>
                               <ProductCard key={index} product={product}/>
                            )}
                            
                        </Slider>
                        {/* {JSON.stringify(products)} */}
                    </CardBody>
                </Card>
            )}
        </VStack>
    )
}
