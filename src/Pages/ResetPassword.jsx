import { Link, useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../Layout/HomeLayout"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { resetPassword } from "../Redux/Slices/AuthSlice";
import { useParams } from "react-router-dom";
function ResetPassword(){
    // console.log('ResetPaasword page',url);
      const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
    const t=4
      const [loading, setLoading] = useState(false);
    const state=useLocation()
    const { token } = useParams();
    // const url= useSelector((state)=>state?.auth?.resetPasswordUrl)
    const [passwordw ,setPasswordw]=useState({
        password:"",
        // confirmPassword:"",
        url:token
    })
    
   
    const navigate=useNavigate()
    const dispatch=useDispatch()
    

    function handleUserInput(e){
        const {name,value}=e.target;
        
        setPassword({
            ...passwordw,
            [name]:value
        })
        // console.log('password',password);
    }


    // let resetPasswordUrl ;

    async function onReset(e){
        e.preventDefault()
        console.log('try');
        //  const toastId = toast.loading("Resetting Password...");
        
        // if(!resetPasswordUrl) navigate('/')
        if(!password || !confirmPassword){
            toast.error('All Fields are required');
            return
        }

         if(!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)){
            toast.error('Password should contain at least 8 character 1 digit 1 lower case 1 uppercase')
            return
        }

        if(password!==confirmPassword){
             toast.error("Password and Confirm Password didn't match");
            return
        }
         const payloadData = {
        password: password,
        url: token,
    };
        setLoading(true);
        try{
            const res=await dispatch(resetPassword(payloadData))
            console.log('response from resetppassword',res);
            if(res?.payload?.success){
              //  setLoading(false);
                navigate('/login')
            }
          }
          catch (error) {
            console.error("Reset password failed", error);
            } finally {
            setLoading(false);
          }
            

        
        



    }

    
    return(
        <HomeLayout>
          
    <div className="min-h-screen flex items-center justify-center bg-[#0d111] text-white px-4">
      <div className="bg-[#161b22] p-8 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-4">Reset your password</h2>
        <p className="text-gray-400 text-center mb-6">
          Enter your new password. After confirming, you will be asked to log in again.
          <br/><br/>
       
        </p>

        <div className="space-y-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            className="w-full p-3 rounded-md bg-[#0d1117] border border-gray-600 focus:outline-none focus:border-cyan-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm new password"
              className="w-full p-3 rounded-md bg-[#0d1117] border border-gray-600 focus:outline-none focus:border-cyan-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        <div className="relative">
  <button
    type="submit"
    disabled={loading}
    onClick={onReset}
    className={`bg-cyan-400 hover:bg-cyan-300 text-black transition-all duration-300 w-full font-bold rounded-bl-lg rounded-br-lg py-2
      ${loading && "opacity-50 cursor-not-allowed"}`}
  >
    {loading ? "Resetting Password..." : "Reset Password"}
  </button>
</div>

    
        </div>

        <p className="text-center mt-4 text-gray-400">
          Never mind! <span className="underline cursor-pointer" onClick={()=> navigate('/login')}>Take me back to login</span>
        </p>
      </div>
    </div>
  
        </HomeLayout>
    )
}
export default ResetPassword