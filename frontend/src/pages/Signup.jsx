import { data } from 'autoprefixer'
import {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Signup() {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const handleOnChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  console.log(formData);

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    try {
      const res= await fetch('http://localhost:3000/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    navigate('/signin') 
    } catch (error) {
      console.log(error); 
    }
    
  }
  return (
    <div className=' rounded-xl bg-slate-200 p-4 max-w-[400px] mx-auto m-4 flex flex-col gap-4'>
      <div className=' text-center flex flex-col gap-3'>
          <h1 className='text-4xl font-bold'>Sign Up</h1>
          <p className='text-slate-600'>Enter your information to <br /> create an account</p>
      </div>
      <form onSubmit={handleOnSubmit} className='flex flex-col  gap-4' >
          <div className='flex flex-col gap-2'>
              <label htmlFor="name" className='text-xl'>Name</label>
              <input onChange={handleOnChange} className='p-2  rounded-lg outline-none border-2 border-slate-300' type="text" id="name" placeholder="Enter name" required />
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor="name" className='text-xl'>Email</label>
              <input onChange={handleOnChange}  className='p-2  rounded-lg outline-none border-2 border-slate-300' type="text" id="email" placeholder="Enter email" required />
          </div>

          <div className='flex flex-col gap-2'>
              <label htmlFor="name" className='text-xl'>Password</label>
              <input onChange={handleOnChange}  className='p-2  rounded-lg outline-none border-2 border-slate-300' type="password" id="password" placeholder="Enter passoword" required />
          </div>
         
          <div>
              <button className=' bg-slate-950 text-white rounded-lg w-full p-2 font-bold tex' type="submit">Sign Up</button>
          </div>
          <div>
              <label />
              <div className='text-slate-500'>
                  Already have an account?{' '}
                  <Link className="text-slate-950" to="/signin">Sign In</Link>
              </div>
          </div>
      </form>
      </div>
  )
}

export default Signup