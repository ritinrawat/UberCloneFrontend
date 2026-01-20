import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTraking'

function Riding() {
  const location = useLocation()
  const { ride } = location.state || {}
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()

  useEffect(() => {
    socket.on("ride-ended", (ride) => {
      console.log(ride)
      navigate('/start')
    })

    return () => {
      socket.off("ride-ended")
    }
  }, [socket, navigate])

  return (
    <div className='h-screen max-w-md mx-auto relative overflow-hidden bg-white shadow-2xl'>
      <Link
        to='/start'
        className='absolute z-50 h-10 w-10 top-4 right-4 bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center rounded-full shadow-lg active:scale-90 transition-all'
      >
        <i className='text-xl font-bold ri-home-5-line'></i>
      </Link>

      <div className='h-1/2 w-full'>
        <LiveTracking ride={ride} />
      </div>

      <div className='h-1/2 p-6 flex flex-col justify-between pt-8'>
        <div className='w-full'>
          <div className='flex items-center justify-between mb-8 px-2'>
            <div className='flex items-center gap-4'>
              <div className='relative'>
                <img
                  className='h-16 w-16 rounded-full object-cover border-2 border-white shadow-md'
                  src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                  alt="Captain"
                />
                <div className='absolute -bottom-1 -right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-white'></div>
              </div>
              <div className='text-left'>
                <h2 className='text-lg font-bold capitalize text-gray-900 leading-tight'>
                  {ride?.captain.fullname.firstname} {ride?.captain.fullname.lastname}
                </h2>
                <div className='flex items-center gap-2 mt-1'>
                  <span className='text-[10px] font-black bg-gray-900 text-white px-2 py-0.5 rounded uppercase tracking-wider'>
                    {ride?.captain.vehicle.plate}
                  </span>
                  <p className='text-xs text-gray-500 font-bold capitalize'>
                    {ride?.captain.vehicle.color} • {ride?.captain.vehicle.vehicleType}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100'>
              <div className='bg-black h-10 w-10 rounded-full flex items-center justify-center shrink-0 mt-0.5'>
                <i className="ri-map-pin-2-fill text-white text-lg"></i>
              </div>
              <div>
                <h3 className='text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1'>Destination</h3>
                <p className='text-base font-bold text-gray-900 leading-snug'>{ride?.destination}</p>
              </div>
            </div>

            <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100'>
              <div className='bg-black h-10 w-10 rounded-full flex items-center justify-center shrink-0'>
                <i className="ri-bank-card-2-fill text-white text-lg"></i>
              </div>
              <div className='flex-grow flex items-center justify-between'>
                <div>
                  <h3 className='text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1'>Ride Fare</h3>
                  <p className='text-xl font-black text-gray-900'>₹{ride?.fare}</p>
                </div>
                <span className='text-[10px] font-black bg-green-100 text-green-700 px-3 py-1.5 rounded-full uppercase tracking-wider'>Cash Only</span>
              </div>
            </div>
          </div>
        </div>

        <button className='w-full bg-black text-white py-4 rounded-2xl text-xl font-bold active:scale-95 transition-all shadow-xl shadow-black/10 h-16 mt-4'>
          Make a Payment
        </button>
      </div>
    </div>
  )
}

export default Riding
