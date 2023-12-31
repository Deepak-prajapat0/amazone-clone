import { Box, Image } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props{
    images:string[]
}

const ImageCarousel = ({ images }:Props) => {
    const settings = {
        infinite: true,
        arrows: true,
        // variableWidth: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    
    };

    return (
       <Box width="100vw" height="20rem">
            <Slider {...settings} className='banner'>
                {images.map((img,index) =>
                    <Image key={index} src={img} alt={`Image`} width="100%" height="100%" />
                )}
            </Slider>
       </Box>
    );
};

export default ImageCarousel;
