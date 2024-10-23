import React, { useEffect, useRef, useState } from 'react';
import { GrForwardTen,GrBackTen } from "react-icons/gr";
import { FaPlay , FaPause } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { playerActions } from '../../store/player';

const AudioPlayer = () => {
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const dispatch = useDispatch();
  const PlayerDivState = useSelector((state) => state.player.isPlayerDiv);
  const songPath = useSelector((state) => state.player.songPath);
  const img = useSelector((state) => state.player.img);
  
  const audioRef = useRef();

  const closeAudioPlayerDiv = (e) => {
    e.preventDefault();
    dispatch(playerActions.closeDiv());
    dispatch(playerActions.changeImage(""));
    dispatch(playerActions.changeSong(""));
    audioRef.current.pause();
    setIsSongPlaying(false);
  };

  const handlePlayPodcast = () => {
    setIsSongPlaying((prev) => !prev);
  };

  const backward = () => {
    if (audioRef.current.currentTime > 10) {
      audioRef.current.currentTime -= 10;
    } else {
      audioRef.current.currentTime = 0;
    }
    setCurrentTime(audioRef.current.currentTime);
  }

  const forward = () =>{
    if (audioRef.current.currentTime < duration - 10) {
      audioRef.current.currentTime += 10;
    } else {
      audioRef.current.currentTime = duration;
    }
    setCurrentTime(audioRef.current.currentTime);
  }

  useEffect(() => {
    if (audioRef.current) {
      // Play or pause audio based on the isSongPlaying state
      if (isSongPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }

      // Set song duration when metadata is loaded
      const setAudioData = () => {
        setDuration(audioRef.current.duration);
      };

      // Update current time as audio plays
      const updateCurrentTime = () => {
        setCurrentTime(audioRef.current.currentTime);
      };

      audioRef.current.addEventListener("loadedmetadata", setAudioData);
      audioRef.current.addEventListener("timeupdate", updateCurrentTime);

      // Cleanup event listeners when component unmounts
      return () => {
        audioRef.current.removeEventListener("loadedmetadata", setAudioData);
        audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, [isSongPlaying, songPath]);

  // Handle progress bar change
  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className={` ${PlayerDivState ? "fixed" : "hidden"} w-full fixed bottom-0 left-0 flex flex-col md:flex-row items-center bg-zinc-900 text-zinc-200 px-4 py-3 rounded`}>
      
      {/* Album Art (hidden on small screens) */}
      <div className='hidden md:block w-1/5'>
        <img
          src={img}
          className='h-16 w-16 rounded-full object-cover'
          alt='Album art'
        />
      </div>
      
      {/* Player Controls */}
      <div className='flex-1 flex flex-col items-center md:items-start'>
        <div className='w-full flex items-center justify-center gap-4 text-xl'>
          <button onClick={backward}><GrBackTen /></button>
          <button onClick={handlePlayPodcast}>
            {isSongPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={forward}><GrForwardTen /></button>
        </div>
        
        {/* Progress Bar */}
        <div className='w-full mt-2'>
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleProgressChange}
            className='w-full cursor-pointer'
          />
        </div>

        {/* Time Display */}
        <div className='w-full flex justify-between text-sm mt-1'>
          <span>{Math.floor(currentTime / 60)}:{("0" + Math.floor(currentTime % 60)).slice(-2)}</span>
          <span>{Math.floor(duration / 60)}:{("0" + Math.floor(duration % 60)).slice(-2)}</span>
        </div>
      </div>

      {/* Close Button */}
      <div className='hidden md:block w-1/5 text-right'>
        <button onClick={closeAudioPlayerDiv}>
          <RiCloseLargeLine />
        </button>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src={songPath}></audio>
    </div>
  );
};

export default AudioPlayer;
