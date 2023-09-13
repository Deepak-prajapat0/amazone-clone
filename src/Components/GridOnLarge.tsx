import { Box,Image ,SimpleGrid, Card, CardBody, Heading } from '@chakra-ui/react'


interface Props{
    cards:any[]
}

export default function ({cards}:Props) {
  return (
      <SimpleGrid minChildWidth={{lg:"10rem"}} width="100%" columns={{base:1,lg:3}} spacing={10} p={{base:0,md:6}} minHeight="21em" overflowY="hidden" zIndex={50}>
          {cards.map((item, index) =>
              <Card key={index} bg="white" color="black" variant='outline' borderRadius={0}>
                  <CardBody padding={{base:1,sm:4}}>
                      {index === 0 && <Heading size="md" py='4'>Revamp your home in style</Heading>}
                      {index === 1 && <Heading size="md" py='4'>Up to 60% off | Styles for men</Heading>}
                      {index === 2 && <Heading size="md" py='4'>Appliances | Up to 55% off</Heading>}
                      <SimpleGrid columns={{base:2,sm:4 ,lg:2}}  spacing={{base:"1rem",md:5}} width="100%" overflowX="auto">
                          {item.map((product:any, index:number) =>
                              <Box key={index}  >
                                  <Image src={product.img} alt={product.name} />
                                  <span style={{ fontSize: "calc(12px 1vw)" }}>{product.name}</span>
                              </Box>
                          )}
                      </SimpleGrid>
                  </CardBody>
              </Card>
          )}
      </SimpleGrid>
  )
}
