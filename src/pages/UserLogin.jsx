import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

function UserLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setUser } = useContext(UserDataContext)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

        if (response.status === 200) {
            const data = response.data
            setUser(data.user)
            localStorage.setItem('usertoken', data.token)
            navigate('/Start')
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
                    <div className='relative group'>
                        <input
                            className='bg-[#f3f3f3] w-full border border-transparent focus:border-black focus:bg-white outline-none mb-6 rounded-xl px-4 py-4 text-lg placeholder:text-gray-400 transition-all duration-300'
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='email@example.com'
                        />
                    </div>

                    <h3 className='text-2xl font-bold mb-6 text-black tracking-tight'>Enter Password</h3>
                    <div className='relative group'>
                        <input
                            className='bg-[#f3f3f3] border border-transparent focus:border-black focus:bg-white outline-none mb-8 rounded-xl px-4 py-4 w-full text-lg placeholder:text-gray-400 transition-all duration-300'
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='password'
                        />
                    </div>

                    <button className='bg-black text-white w-full rounded-xl px-4 py-4 text-xl font-bold hover:bg-gray-900 transition-all active:scale-95 shadow-lg shadow-black/10'>
                        Login
                    </button>

                    <p className='text-center mt-6 text-gray-500 font-medium'>
                        New here? <Link to='/signup' className='text-blue-500 hover:text-blue-600 transition-colors font-bold'>Create new Account</Link>
                    </p>
                </form>
            </div>

            <div className='mb-6'>
                <Link
                    to='/captain-login'
                    className='bg-[#10b461] flex items-center justify-center font-bold text-white w-full rounded-xl px-4 py-4 text-xl hover:bg-[#0e9e54] transition-all active:scale-95 shadow-lg shadow-green-500/10'
                >
                    Sign in as Captain
                </Link>
            </div>
        </div>
    )
}

export default UserLogin
