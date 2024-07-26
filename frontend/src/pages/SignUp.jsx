import {useState,} from 'react'
import {useNavigate} from 'react-router-dom';
import frontImage from '../../utils/front.png';
import {proxy} from '../../utils/proxy.js';
import logo from '../../utils/logo.svg';

import {
    FaFacebookF,
    FaGoogle
  } from 'react-icons/fa';


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormData = (e) => {
    console.log(formData);
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleCreateSession = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(formData.password){
      if(formData.password.length < 8 || formData.password.length > 20){
        setError('Password must be between 8 to 20 characters');
        setLoading(false);
        setTimeout(() => {
          setError(null);
        },2000);
        return;
      }
    }
    
    
    try{
      const response = await fetch(`${proxy}/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      navigate('/');
      setLoading(false);
    }catch(err){
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className='flex justify-center items-center h-[100vh] gap-5 p-3'>
        <div className=' hidden w-[50vw] h-[100vh] lg:flex justify-center items-center flex-1'>
            <img src={frontImage} alt='front' className='h-[70%] '/>
        </div>
        <div >

      <div className="min-h-screen flex flex-col items-center justify-center  h-[100%] w-[100%]">
      <div className="bg-white  rounded-lg px-2 py-2 w-full max-w-md sm:px-8 sm:py-8">
        <img src={logo} alt='logo' className='h-[50px] w-[50px] '/>
        <h1 className="text-2xl   mb-4 font-light ">Welcome to Vuexy!</h1>
        <p className="text-gray-700 r mb-8">
          Please sign-in to your account and start the adventure
        </p>
        {/* <div className='bg-[rgb(232,231,253)]  rounded-lg  my-4 text-xs p-3 text-purple-500 font-light sm:text-sm' >
            <p>Admin Email: <span className='font-semibold'>admin@demo.com</span> / Pass: <span className='font-semibold'>admin</span></p>
            <p>Client Email: <span className='font-semibold'>client@demo.com </span>/ Pass: <span className='font-semibold'>client</span></p>


        </div> */}
        <form onSubmit={(e)=> handleCreateSession(e)}>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name='email'
            autoComplete='off'
            onChange={(e)=> handleFormData(e)}
            className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:px-3 sm:py-2"
          />
        </div>

        <div className="mb-6">
        
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name='name'
            autoComplete='off'
            onChange={(e)=> handleFormData(e)}
            className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:px-3 sm:py-2"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name='password'
            autoComplete='off'
            onChange={(e)=> handleFormData(e)}
            className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:px-3 sm:py-2"
          />
        </div>


        <button type='submit' className={`w-full py-1.5 px-3 bg-[rgb(115,102,240)] hover:bg-[rgb(103,90,215)] text-white rounded-lg font-medium focus:outline-none  sm:px-4 ${loading ? 'cursor-not-allowed' : 'null'}`}>
          {loading ? <>Loading...</> : <>Sign Up</>} 
        </button>
        {error && <p className='text-red-500 text-sm mt-4'>{error}</p>}
        </form>
        <div className="flex items-center  mt-6">
          <p className="text-sm text-gray-700 mr-2">Already have a account ? </p>
          <span className="text-sm text-[rgb(115,102,240)] hover:underline font-semibold cursor-pointer" onClick={()=> { navigate ('/');}}>
            Sign In
          </span>
        </div>

        <p className="text-sm text-gray-700 mr-2 flex justify-center items-center gap-5 p-3"> <hr className='border border-grey-400 flex-1'/> <span>or</span> <hr className='border border-grey-500 flex-1'/></p>
        <div className="flex items-center justify-center mt-4">
        
           <a href="#" className="text-sm text-blue-500 hover:underline ml-2 p-3 bg-red-200 m-2 rounded-lg hover:bg-red-300 cursor-not-allowed">
            <FaGoogle className='text-red-400'/>
          </a>
          <a href="#" className="text-sm text-blue-500 hover:underline p-3 bg-blue-200 m-2 rounded-lg hover:bg-blue-300 cursor-not-allowed">
          <FaFacebookF/>
          </a>
          
        </div>
      </div>
    </div>
        </div>
        

    </div>
  )
}
