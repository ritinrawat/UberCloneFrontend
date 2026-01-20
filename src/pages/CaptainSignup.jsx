import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

function CaptainSignup() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')

    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)

    const submitHandler = async (e) => {
        e.preventDefault()
        const captainData = {
            fullname: {
                firstname,
                lastname,
            },
            email,
            password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType
            }
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

        if (response.status === 201) {
            const data = response.data
            setCaptain(data.captain)
            localStorage.setItem('captaintoken', data.token)
            navigate("/captain-home")
        }
        setFirstname('')
        setLastname('')
        setEmail('')
        setPassword('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between max-w-md mx-auto bg-white'>
            <div className='overflow-y-auto no-scrollbar'>
                <div className='mb-8'>
                    <img
                        className='w-16 mb-8 drop-shadow-sm'
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
                        alt="Uber Logo"
                    />
                </div>

                <form onSubmit={submitHandler}>
                    <h3 className='text-2xl font-bold mb-6 text-black tracking-tight'>What's our Captain's name?</h3>
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

                    <h3 className='text-2xl font-bold mb-6 text-black tracking-tight'>What's our Captain's email?</h3>
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

                    <h3 className='text-2xl font-bold mb-6 text-black tracking-tight'>Vehicle Information</h3>
                    <div className='flex gap-4 mb-4'>
                        <input
                            className='bg-[#f3f3f3] w-1/2 border border-transparent focus:border-black focus:bg-white outline-none rounded-xl px-4 py-4 text-lg placeholder:text-gray-400 transition-all duration-300'
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                            required
                            type="text"
                            placeholder='Color'
                        />
                        <input
                            className='bg-[#f3f3f3] w-1/2 border border-transparent focus:border-black focus:bg-white outline-none rounded-xl px-4 py-4 text-lg placeholder:text-gray-400 transition-all duration-300'
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                            required
                            type="text"
                            placeholder='Plate'
                        />
                    </div>
                    <div className='flex gap-4 mb-8'>
                        <input
                            className='bg-[#f3f3f3] w-1/2 border border-transparent focus:border-black focus:bg-white outline-none rounded-xl px-4 py-4 text-lg placeholder:text-gray-400 transition-all duration-300'
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(e.target.value)}
                            required
                            type="number"
                            placeholder='Capacity'
                        />
                        <select
                            className='bg-[#f3f3f3] w-1/2 border border-transparent focus:border-black focus:bg-white outline-none rounded-xl px-4 py-4 text-lg transition-all duration-300 appearance-none'
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            required
                        >
                            <option value="" disabled>Type</option>
                            <option value="car">Car</option>
                            <option value="bike">Bike</option>
                            <option value="truck">Truck</option>
                            <option value="auto">Auto</option>
                        </select>
                    </div>

                    <button className='bg-black text-white w-full rounded-xl px-4 py-4 text-xl font-bold hover:bg-gray-900 transition-all active:scale-95 shadow-lg shadow-black/10'>
                        Create Account
                    </button>

                    <p className='text-center mt-6 text-gray-500 font-medium pb-8'>
                        Already have an account? <Link to='/captain-login' className='text-blue-500 hover:text-blue-600 transition-colors font-bold'>Login here</Link>
                    </p>
                </form>
            </div>

            <div className='mt-4 mb-6'>
                <p className='text-[10px] leading-tight text-gray-400 text-center'>
                    This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.
                </p>
            </div>
        </div>
    )
}

export default CaptainSignup
