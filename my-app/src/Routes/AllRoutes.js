import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from '../Components/PrivateRoute'
import Accepted from '../Pages/Accepted'
import CreateEvent from '../Pages/CreateEvent'
import EventDetail from '../Pages/EventDetail'
import EventDetail2 from '../Pages/EventDetail2'
import Events from '../Pages/Events'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import MyEvents from '../Pages/MyEvents'
import NotFound from '../Pages/NotFound'
import Pending from '../Pages/Pending'
import Signup from '../Pages/Signup'
import EventDetail3 from '../Pages/EventDetail3'
import EventDetail4 from '../Pages/EventDetails4'

const AllRoutes = () => {
  return (
   <Routes>
        <Route path="/" element={<Home/>} />\
        <Route path='/events' element={<PrivateRoute><Events/></PrivateRoute>} />
        <Route path='/myevents' element={<PrivateRoute><MyEvents/></PrivateRoute>} />
        <Route path='/create' element={<PrivateRoute><CreateEvent/></PrivateRoute>} />
        <Route path='/events/accepted' element={<PrivateRoute><Accepted/></PrivateRoute>} />
        <Route path='/events/pending' element={<PrivateRoute><Pending/></PrivateRoute>} />
        <Route path='/event/:id' element={<PrivateRoute><EventDetail/></PrivateRoute>} />
        <Route path='/event2/:id' element={<PrivateRoute><EventDetail2/></PrivateRoute>} />
        <Route path='/event3/:id' element={<PrivateRoute><EventDetail3/></PrivateRoute>} />
        <Route path='/event4/:id' element={<PrivateRoute><EventDetail4/></PrivateRoute>} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='*' element={<NotFound />} />
   </Routes>
  )
}

export default AllRoutes