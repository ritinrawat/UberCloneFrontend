import React, { useState, useRef, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationPanel from "../components/LocationPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WhatingForDriver from "../components/WhatingForDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTraking";

function Start() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelopen, setPanelOpen] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);

  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const mainPanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingDriver, setWaitingDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestion] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [vehicleImage, setVehicleImage] = useState(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user._id) {
      socket.emit("join", { userType: "user", userId: user._id });
    }
  }, [user, socket]);

  useEffect(() => {
    socket.on("ride-confirmed", (ride) => {
      setRide(ride);
      setVehicleFound(false);
      setWaitingDriver(true);
    });

    socket.on("ride-started", (ride) => {
      setWaitingDriver(false);
      navigate("/riding", { state: { ride } });
    });

    return () => {
      socket.off("ride-confirmed");
      socket.off("ride-started");
    };
  }, [socket, navigate]);

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
      setActiveField("pickup");
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
        }
      );
      setDestinationSuggestion(response.data);
      setActiveField("destination");
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelopen) {
        gsap.to(mainPanelRef.current, {
          height: "85%",
          duration: 0.6,
          ease: "power2.inOut"
        });
        gsap.to(panelRef.current, { height: "auto", opacity: 1, duration: 0.6 });
        gsap.to(panelCloseRef.current, { opacity: 1, duration: 0.3 });
      } else {
        gsap.to(mainPanelRef.current, {
          height: "28%", // Reduced from 32% or auto
          duration: 0.6,
          ease: "power2.inOut"
        });
        gsap.to(panelRef.current, { height: 0, opacity: 0, duration: 0.4 });
        gsap.to(panelCloseRef.current, { opacity: 0, duration: 0.3 });
      }
    },
    [panelopen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, { transform: "translateY(0)" });
      } else {
        gsap.to(vehiclePanelRef.current, { transform: "translateY(110%)" });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRide) {
        gsap.to(confirmRidePanelRef.current, { transform: "translateY(0)" });
      } else {
        gsap.to(confirmRidePanelRef.current, { transform: "translateY(110%)" });
      }
    },
    [confirmRide]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(lookingForDriverRef.current, { transform: "translateY(0)" });
      } else {
        gsap.to(lookingForDriverRef.current, { transform: "translateY(110%)" });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingDriver) {
        gsap.to(waitingForDriverRef.current, { transform: "translateY(0)" });
      } else {
        gsap.to(waitingForDriverRef.current, { transform: "translateY(110%)" });
      }
    },
    [waitingDriver]
  );

  async function findtrip() {
    if (!pickup || !destination) return;
    setPanelOpen(false);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
        }
      );
      setFare(response.data.fare);
      setVehiclePanel(true);
    } catch (error) {
      console.error("Error fetching fare:", error.message);
    }
  }

  async function createRide() {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup, destination, vehicleType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error creating ride:", error.message);
    }
  }

  return (
    <div className="h-screen max-w-md mx-auto relative overflow-hidden bg-white shadow-2xl">
      <img
        className="w-16 absolute left-5 top-5 z-[60] pointer-events-none"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt="Uber"
      />

      <div className="w-full h-full absolute inset-0 z-0">
        <LiveTracking ride={ride} />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full pointer-events-none  z-20">
        <div
          ref={mainPanelRef}
          className="bg-white  p-1 relative pointer-events-auto rounded-t-[32px] shadow-[0_-15px_30px_rgba(0,0,0,0.15)] flex flex-col h-[35%]"
        >
          <div className="w-12 h-1 bg-gray-100 rounded-full mx-auto mb-4 shrink-0"></div>

          <div className="flex justify-between items-center mb-4 shrink-0">
            <h4 className="text-xl font-black text-gray-900 tracking-tight">Find a trip</h4>
            <h5
              ref={panelCloseRef}
              onClick={() => setPanelOpen(false)}
              className="text-2xl text-gray-400 hover:text-black cursor-pointer opacity-0 transition-colors"
            >
              <i className="ri-arrow-down-s-line"></i>
            </h5>
          </div>

          <form onSubmit={submitHandle} className="relative space-y-3 shrink-0 ">
            <div className="absolute left-[20px] top-1/2 -translate-y-1/2 w-0.5 h-[40px] bg-gray-200 pointer-events-none z-0"></div>

            <div className="relative z-10">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black border-2 border-white"></div>
              <input
                onClick={() => setPanelOpen(true)}
                value={pickup}
                onChange={handlePickupChange}
                className="bg-[#f0f0f0] pl-10 pr-4 py-3 text-sm font-bold w-full rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-400 placeholder:font-medium shadow-sm"
                type="text"
                placeholder="Where to pick you up?"
              />
            </div>

            <div className="relative z-10">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-black border-2 border-white"></div>
              <input
                onClick={() => setPanelOpen(true)}
                value={destination}
                onChange={handleDestinationChange}
                className="bg-[#f0f0f0] pl-10 pr-4 py-3 text-sm font-bold w-full rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-400 placeholder:font-medium shadow-sm"
                type="text"
                placeholder="Where are you going?"
              />
            </div>
          </form>

          <div ref={panelRef} className="flex-grow overflow-y-auto no-scrollbar mt-4 opacity-0 h-0">
            <LocationPanel
              suggestions={activeField === "pickup" ? pickupSuggestions : destinationSuggestions}
              setPickup={setPickup}
              setDestination={setDestination}
              setPanelOpen={setPanelOpen}
              activeField={activeField}
              setVehiclePanel={setVehiclePanel}
            />
          </div>

          <div className="pt-4 shrink-0">
            <button
              onClick={findtrip}
              className="bg-black text-white px-4 py-3 rounded-2xl w-full font-black text-base active:scale-95 transition-all shadow-xl shadow-black/10 hover:bg-gray-900"
            >
              Search Rides
            </button>
          </div>
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed max-w-md w-full translate-y-[110%] z-[70] bg-white bottom-0 px-3 py-10 rounded-t-[32px] shadow-[0_-20px_40px_rgba(0,0,0,0.2)]"
      >
        <VehiclePanel
          fare={fare}
          ride={ride}
          setVehicleImage={setVehicleImage}
          setVehicleType={setVehicleType}
          setConfirmRide={setConfirmRide}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed max-w-md w-full translate-y-[110%] z-[80] bg-white bottom-0 px-3 py-10 rounded-t-[32px] shadow-[0_-20px_40px_rgba(0,0,0,0.2)]"
      >
        <ConfirmRide
          fare={fare}
          vehicleImage={vehicleImage}
          createRide={createRide}
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          setVehicleFound={setVehicleFound}
          setVehiclePanel={setVehiclePanel}
          setConfirmRide={setConfirmRide}
        />
      </div>

      <div
        ref={lookingForDriverRef}
        className="fixed max-w-md w-full translate-y-[110%] z-[90] bg-white bottom-0 px-3 py-10 rounded-t-[32px] shadow-[0_-20px_40px_rgba(0,0,0,0.2)]"
      >
        <LookingForDriver
          fare={fare}
          vehicleImage={vehicleImage}
          createRide={createRide}
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          setWaitingDriver={setWaitingDriver}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed max-w-md w-full translate-y-[110%] z-[100] bg-white bottom-0 px-3 py-10 rounded-t-[32px] shadow-[0_-20px_40px_rgba(0,0,0,0.2)]"
      >
        <WhatingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingDriver={setWaitingDriver}
        />
      </div>
    </div>
  );
}

export default Start;
