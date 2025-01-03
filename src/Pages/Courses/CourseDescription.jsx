import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {useSelector , useDispatch } from 'react-redux'
import HomeLayout from '../../Layout/HomeLayout';
// import deleteCourseById from './Redux/Slices/CourseSlice.js'
import { toast } from "react-hot-toast";
import { deleteCourseById } from '../../Redux/Slices/CourseSlice';
function CourserDescription(){
    const {state} = useLocation()
    const navigate=useNavigate()
    const {role , data} = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    async function deleteCourse(state){
        // console.log("s"+state?._id);
        // alert.arguments
        window.alert('Sure You want to delete the Course')
       
        const res=await dispatch(deleteCourseById(state?._id))
        console.log("resss",res);
        if(res?.payload?.success)   navigate('/courses')

    }
     
    return(
        <HomeLayout>
            <div className='min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white'>
                <div className='grid grid-cols-2 gap-10 py-10 relative '>
                    <div className='space-y-5'>

                        <img src={state?.thumbnail?.secure_url} alt='thumbnail' className='w-full h-64'/>
                        <div className='space-y-4'>
                            <div  className='flex flex-col items-center justify-between text-xl'>

                                <p className='font-semibold'>
                                    <span className='text-yellow-500 font-bold'>
                                        Total Lecture : {" "}
                                    </span>
                                    {state?.numberOfLecture}
                                </p>

                                <p className='font-semibold'>
                                    <span className='text-yellow-500 font-bold'>
                                        Instructor : {" "}
                                    </span>
                                    {state?.createdBy}
                                </p>
                            </div>
                            {
                                role==='ADMIN' || data?.subscription?.status==='Active'? ( 
                                    <button onClick={()=>navigate('/course/displaylecture',{state:{...state}})} className='bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300'>
                                        Watch Lectures
                                    </button>
                                ) : (
                                   <button onClick={()=>navigate('/checkout')}className='bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300'>
                                    Subscribe
                                   </button>
                            
                                )
                            }
                            {
                                role==='ADMIN' && 
                                <button className='btn bg-red-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-red-800 transition-all ease-in-out duration-300 '
                                        onClick={()=>deleteCourse(state)}
                                        // onClick={showToast}
                                >
                                    
                                    Delete Course
                                </button>
                            }

                        </div>

                    </div>

                    <div className='space-y-2 text-xl'>
                        <h1 className='text-3xl font-bold text-yellow-500 mb-4 text-center'>
                            {state?.title}
                        </h1>
                        <p className='text-yellow-500'>Course Description:</p>
                        <p>{state?.description}</p>

                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}
export default CourserDescription