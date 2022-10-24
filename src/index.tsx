import {createRoot} from 'react-dom/client'
import App from './App'

const root = createRoot(document.getElementById('root'))


if(process.env.NODE_ENV == 'development'){
   const {StrictMode} = require('react')
   root.render(<StrictMode><App /></StrictMode>)
}else{
   root.render(<App />)
}