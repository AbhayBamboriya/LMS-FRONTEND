import { useState } from 'react'
import './App.css'
import Footer from './Component/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
       {/* <Routes>

       </Routes> */}
       <Footer/>
   </>
  )
}

export default App
