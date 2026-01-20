import React from 'react'

function VehiclePanel(props) {
    return (
        <div className='no-scrollbar overflow-y-auto'>
            <div className='w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-6 shrink-0'></div>
            <h3 className='text-2xl font-black mb-6 tracking-tight px-2'>Choose a Vehicle</h3>

            <div className='space-y-3 pb-4'>
                <div onClick={() => {
                    props.setConfirmRide(true)
                    props.setVehiclePanel(false)
                    props.setVehicleType('car')
                    props.setVehicleImage('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646931/assets/64/93c2a1-c3d2-4ee2-a4c6-bc472713371f/original/UberGo.png')
                }} className='flex border-[3px] border-transparent active:border-black hover:bg-gray-50 mb-2 rounded-2xl w-full p-4 items-center justify-between transition-all cursor-pointer group'>
                    <img className='h-[70px] group-hover:scale-110 transition-transform' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646931/assets/64/93c2a1-c3d2-4ee2-a4c6-bc472713371f/original/UberGo.png" alt="UberGo" />
                    <div className='ml-4 flex-grow'>
                        <h4 className='font-black text-lg text-gray-900'>UberGo <span className='text-xs bg-gray-100 px-2 py-0.5 rounded ml-2'><i className="ri-user-3-fill"></i> 4</span></h4>
                        <h5 className='font-bold text-sm text-gray-400 mt-0.5'>2 mins away • 11:24</h5>
                        <p className='font-medium text-[10px] text-gray-500 mt-1 uppercase tracking-wider'>Affordable, compact rides</p>
                    </div>
                    <h2 className='text-xl font-black text-gray-900'>₹{props.fare.car}</h2>
                </div>

                <div onClick={() => {
                    props.setConfirmRide(true)
                    props.setVehiclePanel(false)
                    props.setVehicleType('motorcycle')
                    props.setVehicleImage('https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/ad308f-c486-4539-90c3-c7993b4089ce/original/Uber_Moto_Orange_312x208_Pixels_Mobile.png')
                }} className='flex border-[3px] border-transparent active:border-black hover:bg-gray-50 mb-2 rounded-2xl w-full p-4 items-center justify-between transition-all cursor-pointer group'>
                    <img className='h-[70px] group-hover:scale-110 transition-transform' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/ad308f-c486-4539-90c3-c7993b4089ce/original/Uber_Moto_Orange_312x208_Pixels_Mobile.png" alt="Moto" />
                    <div className='ml-4 flex-grow'>
                        <h4 className='font-black text-lg text-gray-900'>Moto <span className='text-xs bg-gray-100 px-2 py-0.5 rounded ml-2'><i className="ri-user-3-fill"></i> 1</span></h4>
                        <h5 className='font-bold text-sm text-gray-400 mt-0.5'>3 mins away • 11:32</h5>
                        <p className='font-medium text-[10px] text-gray-500 mt-1 uppercase tracking-wider'>Fastest way to move</p>
                    </div>
                    <h2 className='text-xl font-black text-gray-900'>₹{props.fare.motorcycle}</h2>
                </div>

                <div onClick={() => {
                    props.setConfirmRide(true)
                    props.setVehiclePanel(false)
                    props.setVehicleType('auto')
                    props.setVehicleImage("https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/dbd140-585e-475a-b3d3-21b672a09575/original/Uber_Auto_552x368_Pixels_Desktop.png")
                }} className='flex border-[3px] border-transparent active:border-black hover:bg-gray-50 mb-2 rounded-2xl w-full p-4 items-center justify-between transition-all cursor-pointer group'>
                    <img className='h-[70px] group-hover:scale-110 transition-transform' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/dbd140-585e-475a-b3d3-21b672a09575/original/Uber_Auto_552x368_Pixels_Desktop.png" alt="UberAuto" />
                    <div className='ml-4 flex-grow'>
                        <h4 className='font-black text-lg text-gray-900'>UberAuto <span className='text-xs bg-gray-100 px-2 py-0.5 rounded ml-2'><i className="ri-user-3-fill"></i> 3</span></h4>
                        <h5 className='font-bold text-sm text-gray-400 mt-0.5'>3 mins away • 11:28</h5>
                        <p className='font-medium text-[10px] text-gray-500 mt-1 uppercase tracking-wider'>Affordable auto rides</p>
                    </div>
                    <h2 className='text-xl font-black text-gray-900'>₹{props.fare.auto}</h2>
                </div>
            </div>
        </div>
    )
}

export default VehiclePanel
