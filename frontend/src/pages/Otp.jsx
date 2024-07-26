import {useEffect, useState,} from 'react'
import {useNavigate} from 'react-router-dom';
import frontImage from '../../utils/front.png';
import logo from '../../utils/logo.svg';
import { useDispatch } from 'react-redux';
import {proxy} from '../../utils/proxy.js';
import { setCurrentUser } from '../redux/reducer/userReducer.js';



export default function Otp() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    const [formData, setFormData] = useState({});
    const handleFormData = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    const handleOthAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const otp_access_token = new URLSearchParams(window.location.search).get('otp_access_token');
        try{
            const response = await fetch(`${proxy}/api/auth/verfity-otp/${otp_access_token}`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',    
            });
            const data = await response.json();
            if(!response.ok){
              console.log('asdf"0;')
              setError(data.message);
              setLoading(false);
              return;
            }
            console.log('asdfasdf');
            console.log("asdfasd", data);
            dispatch(setCurrentUser(data));
            navigate('/dashboard');
        }catch(err){
            setError(err.message);
            setLoading(false);
        }
    };



  return (
    <div className='flex justify-center items-center h-[100vh]  gap-5 p-3'>
        
        <div >

      <div className="min-h-screen flex flex-col items-center justify-center  h-[100%] w-[100%]">
      <div className="bg-white  rounded-lg px-2 py-2 w-full max-w-md sm:px-8 sm:py-8">
        <img src={logo} alt='logo' className='h-[50px] w-[50px] '/>
        <h1 className="text-2xl   mb-4 font-light ">Welcome to Vuexy!</h1>

        <form onSubmit={(e)=> handleOthAuth(e)}>
            <div className="mb-6">
            <input
            type="text"
            id="email"
            name='email'
            autoComplete='off'
            onChange={(e)=> handleFormData(e)}
            className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:px-3 sm:py-2"
          />

            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                OTP : 
            </label>
            <input
                type="text"
                id="otp"
                name='otp'
                autoComplete='off'
                onChange={(e)=> handleFormData(e)}
                className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:px-3 sm:py-2"
            />
            </div>

            
            <button type='submit' className={`w-full py-1.5 px-3 bg-[rgb(115,102,240)] hover:bg-[rgb(103,90,215)] text-white rounded-lg font-medium focus:outline-none  sm:px-4 ${loading ? 'cursor-not-allowed' : 'null'}`}>
            {loading ? (
            <>Loading ...</>
            ):
            (
            <>Sign In</>
            )}
            
            </button>

            {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        </form>

      </div>
    </div>
        </div>
        

    </div>
  )
}
