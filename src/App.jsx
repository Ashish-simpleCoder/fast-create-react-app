import { useState } from "react"
import "style/index.scss"
import Car from 'asset/car.jpg'
import Header from "@comp/Header"


function App(){
    const [c, setC] = useState(0)

    return(
        <div>
            <Header />
            <h1>Fast CRA</h1>
            <h3>counter - {c}</h3>
            <button onClick={() => setC(v => v+1)}>increment</button>
            <img src={Car} alt="" />
            {process.env.test}
        </div>
    )
}
export default App