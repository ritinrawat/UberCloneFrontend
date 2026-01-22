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
                    props.setVehicleImage('https://media.istockphoto.com/id/1150425295/photo/3d-illustration-of-generic-hatchback-car-perspective-view.jpg?s=612x612&w=0&k=20&c=vws8oDFjcfGpqNAybWPxsA9XROdcBh2MXW2PGEDgk-8=')
                }} className='flex border-[3px] border-transparent active:border-black hover:bg-gray-50 mb-2 rounded-2xl w-full p-4 items-center justify-between transition-all cursor-pointer group'>
                    <img className='h-[70px] group-hover:scale-110 transition-transform' src="https://media.istockphoto.com/id/1150425295/photo/3d-illustration-of-generic-hatchback-car-perspective-view.jpg?s=612x612&w=0&k=20&c=vws8oDFjcfGpqNAybWPxsA9XROdcBh2MXW2PGEDgk-8=" alt="UberGo" />
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
                    props.setVehicleImage('https://i0.wp.com/www.asphaltandrubber.com/wp-content/uploads/2015/11/2016-Suzuki-SV650-A-02.jpg?fit=2000%2C1333&ssl=1')
                }} className='flex border-[3px] border-transparent active:border-black hover:bg-gray-50 mb-2 rounded-2xl w-full p-4 items-center justify-between transition-all cursor-pointer group'>
                    <img className='h-[70px] group-hover:scale-110 transition-transform' src="https://i0.wp.com/www.asphaltandrubber.com/wp-content/uploads/2015/11/2016-Suzuki-SV650-A-02.jpg?fit=2000%2C1333&ssl=1" alt="Moto" />
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
                    props.setVehicleImage("https://thumbs.dreamstime.com/b/bright-yellow-three-wheeled-auto-rickshaw-black-canopy-isolated-white-background-vibrant-roof-presented-plain-411903034.jpg")
                }} className='flex border-[3px] border-transparent active:border-black hover:bg-gray-50 mb-2 rounded-2xl w-full p-4 items-center justify-between transition-all cursor-pointer group'>
                    <img className='h-[70px] group-hover:scale-110 transition-transform' src="https://thumbs.dreamstime.com/b/bright-yellow-three-wheeled-auto-rickshaw-black-canopy-isolated-white-background-vibrant-roof-presented-plain-411903034.jpg" alt="UberAuto" />
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
