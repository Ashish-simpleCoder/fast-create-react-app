import { useState } from "react"
import "./style/index.scss"
import Car from './asset/car.jpg'


function App(){
    const [c, setC] = useState(0)

    return(
        <div>
            <h1>Fast CRA</h1>
            <h3>counter - {c}</h3>
            <button onClick={() => setC(v => v+1)}>increment</button>
            <img src={Car} alt="" />
        </div>
    )
}
export default App