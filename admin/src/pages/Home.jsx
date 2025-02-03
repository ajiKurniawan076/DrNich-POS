import { HomeAdmin } from "./HomeAdmin"
import { useContext, useEffect } from "react"

export const Home = (props) => {
  return (<>
  {props.isAdmin?<HomeAdmin/>:<HomeAdmin/>}
    </>
  )
}

