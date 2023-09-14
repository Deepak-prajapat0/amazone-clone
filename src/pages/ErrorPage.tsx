import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import Header from '../Components/Header/Header'

export default function ErrorPage() {
    const error = useRouteError()
  return (
    <>
    <Header/>
          <div>{isRouteErrorResponse(error) && "something wrong"}</div>
    </>
  )
}
