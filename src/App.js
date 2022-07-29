import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './routes/home/home.component'
import Nav from './routes/navigation/nav.component'
import SignIn from './routes/sign-in/sign-in.component'
import Shop from './routes/shop/shop.component'
import './App.styles.scss'


const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Nav />} >
            <Route index element={<Home />} />
            <Route  path='shop' element={<Shop />} />
            <Route  path='signin' element={<SignIn />} />  
        </Route>
    </Routes>
  )
};

export default App
