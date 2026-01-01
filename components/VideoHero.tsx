"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { getYouTubeEmbedUrl } from "@/lib/utils";

interface VideoHeroProps {
  videoUrl?: string;
  videoEmbed?: string;
  title?: string;
  subtitle?: string;
  overlay?: boolean;
}

export default function VideoHero({
  videoUrl,
  videoEmbed,
  title = "Masbate Today News",
  subtitle = "Your trusted source for local news, events, and updates from Masbate, Philippines",
  overlay = true,
}: VideoHeroProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => {
        // Autoplay may be blocked, handle gracefully
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // Handle YouTube embed
  if (videoEmbed) {
    const embedUrl = getYouTubeEmbedUrl(videoEmbed) || videoEmbed;
    const autoplayParam = isPlaying ? "&autoplay=1" : "";
    const muteParam = isMuted ? "&mute=1" : "";

    return (
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[600px] md:h-[700px] overflow-hidden rounded-lg shadow-2xl"
      >
        <div className="absolute inset-0">
          <iframe
            src={`${embedUrl}?controls=0&loop=1&playlist=${embedUrl.split('/').pop()}${autoplayParam}${muteParam}&modestbranding=1&rel=0`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: "none" }}
          />
        </div>

        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white z-10"
        >
          <div className="container mx-auto max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-lg md:text-xl mb-6 max-w-2xl"
            >
              {subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex items-center space-x-4"
            >
              <button
                onClick={togglePlay}
                className="flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg transition-colors"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-5 w-5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    <span>Play</span>
                  </>
                )}
              </button>
              <button
                onClick={toggleMute}
                className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors"
                aria-label="Fullscreen"
              >
                <Maximize className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Handle direct video file
  if (videoUrl) {
    return (
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[600px] md:h-[700px] overflow-hidden rounded-lg shadow-2xl"
      >
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
        />

        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white z-10"
        >
          <div className="container mx-auto max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-lg md:text-xl mb-6 max-w-2xl"
            >
              {subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex items-center space-x-4"
            >
              <button
                onClick={togglePlay}
                className="flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg transition-colors"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-5 w-5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    <span>Play</span>
                  </>
                )}
              </button>
              <button
                onClick={toggleMute}
                className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors"
                aria-label="Fullscreen"
              >
                <Maximize className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Fallback if no video provided
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-[600px] md:h-[700px] overflow-hidden rounded-lg shadow-2xl bg-gradient-to-br from-primary to-secondary"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white z-10"
      >
        <div className="container mx-auto max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg md:text-xl mb-6 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

