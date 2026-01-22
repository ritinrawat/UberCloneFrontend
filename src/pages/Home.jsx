import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className='h-screen max-w-md mx-auto relative overflow-hidden bg-black shadow-2xl flex flex-col'>
      {/* Hero Image Section */}
      <div className='relative flex-grow overflow-hidden'>
        <div
          className='absolute inset-0 bg-[url("https://ewscripps.brightspotcdn.com/dims4/default/d78cd1a/2147483647/strip/true/crop/6720x3528+0+566/resize/1200x630!/quality/90/?url=http%3A%2F%2Fewscripps-brightspot.s3.amazonaws.com%2F39%2F27%2Fd46df7c145e4a817388eb7621b28%2Fshutterstock-2416070631.jpg")] bg-center bg-cover transition-transform duration-[10s]'
          style={{ transform: loaded ? 'scale(1.1)' : 'scale(1)' }}
        ></div>
        <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/10 transition-opacity duration-1000' style={{ opacity: loaded ? 1 : 0 }}></div>

        {/* <div className={`p-8 absolute top-0 left-0 w-full transition-all duration-1000 delay-300 ${loaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <img
            className='w-20 filter drop-shadow-2xl'
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
            alt="Uber"
          />
        </div> */}
      </div>

      {/* Content Section */}
      <div className={`bg-white p-8 pb-12 rounded-t-[40px] -mt-10 relative z-10 transition-all duration-700 delay-500 ${loaded ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className='w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8'></div>

        <h2 className='text-[34px] font-black leading-tight text-gray-900 tracking-tight mb-4'>
          Move with Safety <br /> & Pure Comfort
        </h2>

        <p className='text-gray-500 text-lg font-medium leading-relaxed mb-10'>
          Reliable rides, anytime, anywhere. <br />
          The smartest way to get around.
        </p>

        <Link
          to='/login'
          className='flex items-center justify-center w-full bg-black text-white py-5 rounded-2xl text-xl font-black active:scale-95 transition-all shadow-xl shadow-black/20 group'
        >
          <span>Get Started</span>
          <i className="ri-arrow-right-line ml-3 text-2xl group-hover:translate-x-1 transition-transform"></i>
        </Link>

        <p className='text-center mt-8 text-xs font-bold text-gray-400 uppercase tracking-widest'>
          Trusted by millions worldwide
        </p>
      </div>
    </div>
  )
}

export default Home
