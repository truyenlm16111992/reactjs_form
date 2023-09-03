import { useRoutes } from "react-router"
import { router } from "./router"


function App() {
 
  return (
    <div>
      {useRoutes(router)}
    </div>
  )
}

export default App
