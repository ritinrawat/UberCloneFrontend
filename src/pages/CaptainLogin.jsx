import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

function CaptainLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setCaptain } = useContext(CaptainDataContext)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        const captainData = {
            email,
            password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

        if (response.status === 200) {
            const data = response.data
            setCaptain(data.captain)
            localStorage.setItem("captaintoken", data.token)
            navigate('/captain-home')
        }
        setEmail('')
        setPassword('')
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between max-w-md mx-auto bg-white'>
            <div>
                <div className='mb-10'>
                    <img
                        className='w-16 mb-8 drop-shadow-sm'
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
                        alt="Uber Logo"
                    />
                </div>

                <form onSubmit={submitHandler}>
                    <h3 className='text-2xl font-bold mb-6 text-black tracking-tight'>What's your email?</h3>
                    <input
                        className='bg-[#f3f3f3] w-full border border-transparent focus:border-black focus:bg-white outline-none mb-6 rounded-xl px-4 py-4 text-lg placeholder:text-gray-400 transition-all duration-300'
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='email@example.com'
                    />

                    <h3 className='text-2xl font-bold mb-6 text-black tracking-tight'>Enter Password</h3>
                    <input
                        className='bg-[#f3f3f3] border border-transparent focus:border-black focus:bg-white outline-none mb-8 rounded-xl px-4 py-4 w-full text-lg placeholder:text-gray-400 transition-all duration-300'
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='password'
                    />

                    <button className='bg-black text-white w-full rounded-xl px-4 py-4 text-xl font-bold hover:bg-gray-900 transition-all active:scale-95 shadow-lg shadow-black/10'>
                        Login
                    </button>

                    <p className='text-center mt-6 text-gray-500 font-medium'>
                        Join a fleet? <Link to='/captain-signup' className='text-blue-500 hover:text-blue-600 transition-colors font-bold'>Register as a Captain</Link>
                    </p>
                </form>
            </div>

            <div className='mb-6'>
                <Link
                    to='/login'
                    className='bg-orange-500 flex items-center justify-center font-bold text-white w-full rounded-xl px-4 py-4 text-xl hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-orange-500/10'
                >
                    Sign in as User
                </Link>
            </div>
        </div>
    )
}

export default CaptainLogin
