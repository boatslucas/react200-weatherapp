import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function Intro({ onFinish }) {
  const audioRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handleClick = () => {
    if (!hasStarted && audioRef.current) {
      audioRef.current.currentTime = 30; // start at 30s
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked, click required.");
      });
      setHasStarted(true);
    }
  };

  useEffect(() => {
    if (hasStarted) {
      const timer = setTimeout(() => {
        onFinish?.(); // finish intro after 15s
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [hasStarted, onFinish]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // Call the callback to hide the intro
    }, 15000); // 15 seconds

    return () => clearTimeout(timer); // Clean up the timer
  }, [onFinish]);

  return (
    <div
      className="relative w-full h-screen bg-gradient-to-b from-gray-800 via-gray-700 to-gray-300 flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={handleClick} // only starts music on click
    >
      {/* Music */}
      <audio ref={audioRef} src="/03-Quiet-Storm-Instrumental.mp3" loop preload="auto" />

      {/* Lightning flashes */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.2, repeat: 6, repeatDelay: 2 }}
      />

      {/* Logo / Title */}
      <motion.h1
        className="text-6xl font-bold text-white drop-shadow-lg z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        StormTracker
      </motion.h1>

      {/*Picture Time*/}
      <div className="absolute inset-0 z-5">
  {/* Photo 1 - Top Left */}
  <motion.img
    src="/tornado-pictures-abrfd5uxh1gm5xwn.jpg"
    alt="Tornado"
    className="absolute top-10 left-10 w-1/5 h-auto opacity-50 rounded-lg shadow-lg" // Increased size by 25% (from w-1/6 to w-1/5)
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 0.5, x: 0 }}
    transition={{ duration: 1, delay: 2 }}
  />

  {/* Photo 2 - Top Right */}
  <motion.img
    src="/istockphoto-1327617934-170667a.jpg"
    alt="Storm"
    className="absolute top-10 right-10 w-1/5 h-auto opacity-50 rounded-lg shadow-lg" // Increased size by 25%
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 0.5, x: 0 }}
    transition={{ duration: 1, delay: 4 }}
  />

  {/* Photo 3 - Bottom Center */}
  <motion.img
    src="/big-hurricane-view-from-space_717906-1639.jpg"
    alt="Hurricane"
    className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-1/5 h-auto opacity-50 rounded-lg shadow-lg" // Increased size by 25%
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 0.5, y: 0 }}
    transition={{ duration: 1, delay: 6 }}
  />

  {/* Photo 4 - Bottom Left */}
  <motion.img
    src="/IMG_7818.jpg"
    alt="Storm"
    className="absolute bottom-10 left-20 w-1/5 h-auto opacity-50 rounded-lg shadow-lg" // Increased size by 25%
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 0.5, y: 0 }}
    transition={{ duration: 1, delay: 8 }}
  />

  {/* Photo 5 - Bottom Right */}
  <motion.img
    src="/1000_F_273641763_lwsHFXx4rypxs8opKWCdK8vOmyx6Mx1x.jpg"
    alt="Storm"
    className="absolute bottom-10 right-20 w-1/5 h-auto opacity-50 rounded-lg shadow-lg" // Increased size by 25%
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 0.5, y: 0 }}
    transition={{ duration: 1, delay: 10 }}
  />

  {/* New Photo - Top Center */}
  <motion.img
    src="/100427326-56a9e2035f9b58b7d0ffaa75.jpg" // New photo
    alt="Top Center Storm"
    className="absolute top-10 left-1/2 transform -translate-x-1/2 w-1/5 h-auto opacity-50 rounded-lg shadow-lg" // Positioned at the top center
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 0.5, y: 0 }}
    transition={{ duration: 1, delay: 12 }}
  />
</div>
      {/* Fade out overlay */}
      <motion.div
        className="absolute inset-0 bg-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: 2, delay: 13 }}
      />
    </div>
  );
}
