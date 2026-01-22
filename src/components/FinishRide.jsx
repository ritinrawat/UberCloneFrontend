
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function FinishRide(props) {
  const navigate = useNavigate()

  const endRide = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
      rideId: props.ride._id,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("captaintoken")}`
      }
    })

    if (response.status === 200) {
      navigate('/captain-home')
    }
  }

  return (
    <div className='h-full flex flex-col'>
      {/* Header / Close Indicator */}
      <div className='relative pt-2 pb-6 flex flex-col items-center'>
        <div
          className='w-12 h-1.5 bg-gray-200 rounded-full mb-6 cursor-pointer overflow-hidden'
          onClick={() => props.setFinishRidePanel(false)}
        >
          <div className='w-full h-full bg-gray-300 transform -translate-x-full animate-progress-mini'></div>
        </div>
        <h3 className='text-2xl font-bold text-gray-800 p-3'>Finish this Ride</h3>
      </div>

      {/* Ride Info Card */}
      <div className='bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex justify-between items-center p-5 shadow-lg shadow-yellow-100 mb-8'>
        <div className='flex justify-start items-center gap-4'>
          <div className='relative'>
            <img
              className='w-12 h-12 object-cover rounded-full border-2 border-white shadow-sm'
              src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
              alt="User Profile"
            />
            <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm'>
              <i className="ri-checkbox-circle-fill text-green-500"></i>
            </div>
          </div>
          <div>
            <h4 className='text-lg font-bold text-gray-900 leading-tight capitalize'>{props.ride?.user.fullname.firstname}</h4>
            <p className='text-xs font-medium text-yellow-900 opacity-80 uppercase tracking-widest'>Customer</p>
          </div>
        </div>
        <div className='text-right'>
          <h4 className='text-xl font-bold text-gray-900 leading-tight'>{props.ride?.distance}</h4>
          <p className='text-[10px] font-bold text-yellow-900 opacity-70 uppercase tracking-widest'>Final Distance</p>
        </div>
      </div>

      {/* Details Section */}
      <div className='flex-grow overflow-y-auto px-1 space-y-4 mb-8'>
        <div className='flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100'>
          <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0'>
            <i className='ri-map-pin-fill text-blue-600 text-lg'></i>
          </div>
          <div>
            <h3 className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-1'>Pickup Point</h3>
            <p className='text-sm font-semibold text-gray-700 leading-snug'>{props.ride?.pickup}</p>
          </div>
        </div>

        <div className='flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100'>
          <div className='w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0'>
            <i className="ri-square-fill text-orange-600 text-lg"></i>
          </div>
          <div>
            <h3 className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-1'>Drop Destination</h3>
            <p className='text-sm font-semibold text-gray-700 leading-snug'>{props.ride?.destination}</p>
          </div>
        </div>

        <div className='flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm'>
          <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0 border border-green-200'>
            <i className="ri-bank-card-fill text-green-600 text-lg"></i>
          </div>
          <div className='flex-grow flex justify-between items-center'>
            <div>
              <h3 className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-1'>Final Amount</h3>
              <p className='text-base text-gray-500 font-medium'>Payment via Cash</p>
            </div>
            <h4 className='text-2xl font-black text-gray-800 tracking-tight'>₹{props.ride?.fare}</h4>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className='mt-auto pt-4'>
        <p className='text-xs text-center text-gray-400 font-medium mb-4 uppercase tracking-tighter italic'>
          * Please ensure you have received the cash payment before finishing
        </p>
        <button
          onClick={endRide}
          className='w-full text-xl font-bold text-white py-4 bg-green-600 rounded-2xl active:scale-[0.98] transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-3'
        >
          <i className="ri-check-double-line text-2xl"></i>
          Finish Ride
        </button>
      </div>
    </div>
  )
}

export default FinishRide
