import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Intro({ onFinish }) {
  useEffect(() => {
    // Auto-end intro after 45 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 45000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Music */}
      <audio autoPlay>
        <source src="/03-Quiet-Storm-Instrumental.mp3" type="audio/mpeg" />
      </audio>

      {/* Flash effect */}
      <div className="text-4xl font-bold animate-pulse">
      
      </div>
    </div>
  );
}

export default Intro;