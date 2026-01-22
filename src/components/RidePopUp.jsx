
import React from 'react'

function RidePopUp(props) {
  return (
    <div className='p-1'>
      <div className='flex items-center justify-between mb-6'>
        <h3 className='text-2xl font-bold text-gray-800'>New Ride Available</h3>
        <div className='bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider'>
          High Priority
        </div>
      </div>

      <div className='bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex justify-between items-center p-5 shadow-lg shadow-yellow-100 mb-6'>
        <div className='flex justify-start items-center gap-4'>
          <div className='relative'>
            <img
              className='w-12 h-12 object-cover rounded-full border-2 border-white shadow-sm'
              src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
              alt="User Profile"
            />
            <div className='absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center'>
              <i className="ri-star-fill text-[10px] text-yellow-600"></i>
            </div>
          </div>
          <div>
            <h4 className='text-lg font-bold text-gray-900 leading-tight'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h4>
            <p className='text-xs font-medium text-yellow-900 opacity-80 uppercase tracking-widest'>Customer</p>
          </div>
        </div>
        <div className='text-right'>
          <h4 className='text-xl font-bold text-gray-900 leading-tight'>{props.ride?.distance}</h4>
          <p className='text-[10px] font-bold text-yellow-900 opacity-70 uppercase tracking-widest'>{props.ride?.duration}</p>
        </div>
      </div>

      <div className='space-y-4 mb-8'>
        <div className='flex items-start gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100'>
          <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0'>
            <i className='ri-map-pin-fill text-blue-600'></i>
          </div>
          <div>
            <h3 className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-1'>Pickup Point</h3>
            <p className='text-sm font-semibold text-gray-700 leading-snug'>{props.ride?.pickup}</p>
          </div>
        </div>

        <div className='flex items-start gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100'>
          <div className='w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0'>
            <i className="ri-square-fill text-orange-600"></i>
          </div>
          <div>
            <h3 className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-1'>Drop Destination</h3>
            <p className='text-sm font-semibold text-gray-700 leading-snug'>{props.ride?.destination}</p>
          </div>
        </div>

        <div className='flex items-start gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100'>
          <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0'>
            <i className="ri-bank-card-fill text-green-600"></i>
          </div>
          <div>
            <h3 className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-1'>Estimated Fare</h3>
            <div className='flex items-center gap-2'>
              <p className='text-lg font-bold text-gray-800'>₹{props.ride?.fare}</p>
              <span className='text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase'>Cash</span>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <button
          onClick={() => props.setRidePop(false)}
          className='w-full text-lg font-bold py-3 text-gray-500 bg-gray-100 rounded-xl active:scale-95 transition-all shadow-sm shadow-gray-100'
        >
          Ignore
        </button>
        <button
          onClick={() => {
            props.setConfirmRidePop(true)
            props.confirmRide()
          }}
          className='w-full text-lg font-bold py-3 text-white bg-green-600 rounded-xl active:scale-95 transition-all shadow-lg shadow-green-100'
        >
          Accept
        </button>
      </div>
    </div>
  )
}

export default RidePopUp
