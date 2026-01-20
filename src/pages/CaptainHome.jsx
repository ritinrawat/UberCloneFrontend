import React, { useEffect, useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUpRef from '../components/ConfirmRidePopUpRef'
import { CaptainDataContext } from '../context/CaptainContext'
import { SocketContext } from '../context/SocketContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTraking'

function CaptainHome() {
  const [ridePop, setRidePop] = useState(false)
  const ridePopUpRef = useRef(null)
  const [confirmRidePop, setConfirmRidePop] = useState(false)
  const confirmRidePopUpRef = useRef(null)
  const [ride, SetRide] = useState(null)
  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    if (captain && captain.captain) {
      socket.emit('join', { userId: captain.captain._id, userType: 'captain' })

      const updateLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              socket.emit('update-location-captain', {
                userId: captain.captain._id,
                location: {
                  ltd: position.coords.latitude,
                  lng: position.coords.longitude,
                },
              });
            },
            (error) => {
              console.error('Error getting location:', error);
            }
          );
        }
      };

      const locationInterval = setInterval(updateLocation, 10000);
      updateLocation(); // Initial call

      return () => clearInterval(locationInterval);
    }
  }, [captain, socket])

  useEffect(() => {
    socket.on('new-ride', (data) => {
      console.log(data)
      SetRide(data)
      setRidePop(true)
    })

    return () => {
      socket.off('new-ride');
    }
  }, [socket])

  const confirmRide = async () => {
    try {
      const token = localStorage.getItem('captaintoken')
      await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
        rideId: ride._id,
        captainId: captain._id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setRidePop(false)
      setConfirmRidePop(true)
    } catch (err) {
      console.log(err)
    }
  }

  useGSAP(function () {
    if (ridePop) {
      gsap.to(ridePopUpRef.current, { transform: 'translateY(0)' })
    } else {
      gsap.to(ridePopUpRef.current, { transform: 'translateY(100%)' })
    }
  }, [ridePop])

  useGSAP(function () {
    if (confirmRidePop) {
      gsap.to(confirmRidePopUpRef.current, { transform: 'translateY(0)' })
    } else {
      gsap.to(confirmRidePopUpRef.current, { transform: 'translateY(100%)' })
    }
  }, [confirmRidePop])

  return (
    <div className='h-screen max-w-md mx-auto relative overflow-hidden bg-white shadow-2xl'>
      <div className='z-50'>
        <img className='w-16 absolute left-5 top-5 pointer-events-none' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="Uber" />
        <Link to='/captains/captain-logout' className='absolute h-10 w-10 top-4 right-4 bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center rounded-full shadow-lg active:scale-90 transition-all'>
          <i className='text-xl font-bold ri-logout-box-r-line'></i>
        </Link>
      </div>

      <div className='h-3/5 w-full'>
        <LiveTracking />
      </div>

      <div className='h-2/5 p-6 bg-white rounded-t-3xl shadow-[0_-10px_20px_rgba(0,0,0,0.1)] relative z-10 -mt-6 flex flex-col'>
        <div className='w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6 shrink-0'></div>
        <div className='flex-grow overflow-y-auto no-scrollbar'>
          <CaptainDetails />
        </div>
      </div>

      <div ref={ridePopUpRef} className='fixed max-w-md w-full z-50 bg-white bottom-0 px-3 py-10 rounded-t-3xl shadow-2xl translate-y-full'>
        <RidePopUp ride={ride} setRidePop={setRidePop} setConfirmRidePop={setConfirmRidePop} confirmRide={confirmRide} />
      </div>

      <div ref={confirmRidePopUpRef} className='h-screen fixed max-w-md w-full z-50 bg-white bottom-0 px-3 py-10 translate-y-full'>
        <ConfirmRidePopUpRef ride={ride} setConfirmRidePop={setConfirmRidePop} setRidePop={setRidePop} />
      </div>
    </div>
  )
}

export default CaptainHome
