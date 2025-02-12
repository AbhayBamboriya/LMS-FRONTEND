import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import SignUp from './Pages/Signup'
import Login from './Pages/Login'
import CourseList from './Pages/Courses/CourseList'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import CourserDescription from './Pages/Courses/CourseDescription'
import RequireAuth from './Component/Auth/RequireAuth'
import CreateCourse from './Pages/Courses/CreateCourse'
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/User/EdiitProfile'
import DisplayLecture from './Pages/Dashboard/DisplayLecutre'
import Addlecture from './Pages/Dashboard/AddLecture'
import AdminDashboard from './Pages/Dashboard/AdminDashboard'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import Checkout from './Pages/Payment/Checkout'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'
import CheckoutFailure from './Pages/Payment/CheckoutFail'
import ChangePassword from './Pages/ChangePassword'
// import morgan from 'morgan'

function App() {
//   const [count, setCount] = useState(0)

  return (
   <>
       <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/about' element={<AboutUs/>}></Route>
          <Route path='/courses' element={<CourseList/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/course/description' element={<CourserDescription/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/denied' element={<Denied/>}></Route>
          <Route path='/forgot'  element={<ForgotPassword/>}/>
          {/* <Route path='/checkout/success' element={<CheckoutSuccess/>}/> */}
          {/* <Route path='/checkout/fail' element={<CheckoutFailure/>}/> */}
          <Route path='/resetPassword' element={<ResetPassword/>}/>
          <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
                <Route path='/course/create' element={<CreateCourse/>}></Route>
                <Route path='/course/addlecture' element={<Addlecture/>}></Route>
                <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
          </Route>
          {/* <Route path='/course/displaylecture' element={<DisplayLecture/>}/> */}
          <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]} />}>
                <Route path='/user/profile' element={<Profile/>}/>
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path='/checkout/success' element={<CheckoutSuccess/>}/>
                <Route path='/checkout/fail' element={<CheckoutFailure/>}/>
                <Route path='/changePassword' element={<ChangePassword/>}/>
                
                <Route path='/user/editprofile' element={<EditProfile/>}/>
                <Route path='/course/displaylecture' element={<DisplayLecture/>}/>

          </Route>
          <Route path='*' element={<NotFound/>}></Route>
       </Routes>
      
   </>
  )
}

export default App
