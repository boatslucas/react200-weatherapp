import { createContext, useRef, useEffect } from "react";

const MusicContext = createContext();

// eslint-disable-next-line react/prop-types
export const MusicProvider = ({ children }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      // Set the start time to 30 seconds after the metadata is loaded
      audio.currentTime = 30; 
      // Play the audio
      audio.play().catch((err) => console.log("Autoplay blocked or error:", err));
    };

    // Add the event listener for when metadata is loaded
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Play the audio immediately on user interaction
    const startAudio = () => {
      audio.play().catch((err) => console.log("Autoplay blocked or error:", err));
    };
    
    // Add event listener for user interaction to handle autoplay policies
    window.addEventListener("click", startAudio);

    return () => {
      // Clean up event listeners
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      window.removeEventListener("click", startAudio);
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="/03-Quiet-Storm-Instrumental.mp3"
        preload="auto"
        loop
      />
      <MusicContext.Provider value={{ audioRef }}>
        {children}
      </MusicContext.Provider>
    </>
  );
};

export default MusicContext;