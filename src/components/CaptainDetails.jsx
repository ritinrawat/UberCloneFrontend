
import React, { useContext, useEffect, useRef } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import gsap from 'gsap'

function CaptainDetails() {
  const { captain } = useContext(CaptainDataContext)
  const statsRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(statsRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    )
  }, [])

  return (
    <div className='p-2'>
      {/* Header / Earnings Card */}
      <div className='bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-6 shadow-lg shadow-yellow-100 mb-6'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <div className='relative'>
              <img
                className='w-14 h-14 object-cover rounded-full border-2 border-white shadow-sm'
                src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                alt="Captain Profile"
              />
              <div className='absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full'></div>
            </div>
            <div>
              <h4 className='text-lg font-bold text-gray-900 capitalize leading-tight'>
                {captain?.captain?.fullname?.firstname} {captain?.captain?.fullname?.lastname}
              </h4>
              <p className='text-xs font-medium text-yellow-900 opacity-80 uppercase tracking-wider'>Gold Partner</p>
            </div>
          </div>
          <div className='text-right'>
            <h4 className='text-2xl font-bold text-gray-900'>₹295.20</h4>
            <p className='text-[10px] font-bold text-yellow-900 opacity-70 uppercase tracking-widest'>Today's Earnings</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div ref={statsRef} className='grid grid-cols-3 gap-3'>
        <div className='bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300'>
          <div className='w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-2'>
            <i className="text-xl ri-timer-2-line text-blue-600"></i>
          </div>
          <h5 className='text-base font-bold text-gray-800'>10.2</h5>
          <p className='text-[10px] font-medium text-gray-500 uppercase text-center whitespace-nowrap'>Hours Online</p>
        </div>

        <div className='bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300'>
          <div className='w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mb-2'>
            <i className="text-xl ri-speed-up-line text-green-600"></i>
          </div>
          <h5 className='text-base font-bold text-gray-800'>45.8</h5>
          <p className='text-[10px] font-medium text-gray-500 uppercase text-center whitespace-nowrap'>Total KM</p>
        </div>

        <div className='bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300'>
          <div className='w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mb-2'>
            <i className="text-xl ri-book-read-line text-orange-600"></i>
          </div>
          <h5 className='text-base font-bold text-gray-800'>12</h5>
          <p className='text-[10px] font-medium text-gray-500 uppercase text-center whitespace-nowrap'>Total Rides</p>
        </div>
      </div>

      {/* Quick Actions / Activity Indicator */}
      <div className='mt-6 bg-gray-50 rounded-2xl p-4 border border-dashed border-gray-200'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
            <span className='text-xs font-bold text-gray-600 uppercase tracking-wide'>Live Activity</span>
          </div>
          <div className='flex gap-1'>
            <div className='w-1 h-3 bg-gray-300 rounded-full'></div>
            <div className='w-1 h-5 bg-gray-300 rounded-full'></div>
            <div className='w-1 h-2 bg-gray-300 rounded-full'></div>
            <div className='w-1 h-4 bg-yellow-400 rounded-full'></div>
            <div className='w-1 h-6 bg-yellow-500 rounded-full'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails
