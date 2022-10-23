import { useState } from "react"


function App(){
    const [c, setC] = useState(0)

    return(
        <div>
            <h1>Fast CRA</h1>
            <h3>counter - {c}</h3>
            <button onClick={() => setC(v => v+1)}>increment</button>
        </div>
    )
}
export default App