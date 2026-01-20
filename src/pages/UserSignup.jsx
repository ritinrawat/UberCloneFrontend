import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

function UserSignup() {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('usertoken', data.token)
      navigate('/Start')
    }
    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between max-w-md mx-auto bg-white'>
      <div>
        <div className='mb-8'>
          <img
            className='w-16 mb-8 drop-shadow-sm'
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
            alt="Uber Logo"
          />
        </div>

        <form onSubmit={submitHandler}>
          <h3 className='text-2xl font-bold mb-6 text-black tracking-tight'>What's your name?</h3>
          <div className='flex gap-4 mb-4'>
            <input
              className='bg-[#f3f3f3] w-1/2 border border-transparent focus:border-black focus:bg-white outline-none rounded-xl px-4 py-4 text-lg placeholder:text-gray-400 transition-all duration-300'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              type="text"
              placeholder='Firstname'
            />
            <input
              className='bg-[#f3f3f3] w-1/2 border border-transparent focus:border-black focus:bg-white outline-none rounded-xl px-4 py-4 text-lg placeholder:text-gray-400 transition-all duration-300'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              type="text"
              placeholder='Lastname'
            />
          </div>

          <h3 className='text-2xl font-bold mb-6 text-black tracking-tight'>What's your email?</h3>
          <input
            className='bg-[#f3f3f3] w-full border border-transparent focus:border-black focus:bg-white outline-none mb-6 rounded-xl px-4 py-4 text-lg placeholder:text-gray-400 transition-all duration-300'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-2xl font-bold mb-6 text-black tracking-tight'>Enter Password</h3>
          <input
            className='bg-[#f3f3f3] border border-transparent focus:border-black focus:bg-white outline-none mb-8 rounded-xl px-4 py-4 w-full text-lg placeholder:text-gray-400 transition-all duration-300'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder='password'
          />

          <button className='bg-black text-white w-full rounded-xl px-4 py-4 text-xl font-bold hover:bg-gray-900 transition-all active:scale-95 shadow-lg shadow-black/10'>
            Create Account
          </button>

          <p className='text-center mt-6 text-gray-500 font-medium'>
            Already have an account? <Link to='/login' className='text-blue-500 hover:text-blue-600 transition-colors font-bold'>Login here</Link>
          </p>
        </form>
      </div>

      <div className='mt-10 mb-6'>
        <p className='text-[11px] leading-tight text-gray-400 text-center'>
          By proceeding, you agree to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
        </p>
      </div>
    </div>
  )
}

export default UserSignup
