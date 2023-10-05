import { FormHelperText } from "@chakra-ui/react";

interface Props{
    errors:string
}

export default function FormHelper({errors}:Props) {
  return (
      <FormHelperText fontSize={12} margin='2px 0 7px' color='#CC0C39'>
          {errors || ''}
      </FormHelperText>
  )
}
