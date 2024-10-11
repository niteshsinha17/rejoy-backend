"use client";
import { nconf } from "@/conf";
import { IChildrenProps } from "@/models/common";
import axios from "axios";
import { createContext, useContext, useRef, useState } from "react";

const SpeechContext = createContext({
  speak: (text: string, textId: string) => {},
  stop: () => {},
  textId: null as string | null,
  isPlaying: false,
});

export const TextToSpeechProvider = ({ children }: IChildrenProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [textId, setTextId] = useState<string | null>(null);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const cache = useRef<{ [key: string]: string }>({});

  const getAudioUrl = async (text: string) => {
    const response = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/9HScfV4OyqRPUhpIMXoY/stream",
      {
        text: text,
        model_id: "eleven_monolingual_v1",
        voice_settings: { stability: 0.5, similarity_boost: 0.5 },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": nconf.get("ELEVENLABS_API_KEY"),
        },
        responseType: "arraybuffer",
      }
    );
    const blob = new Blob([response.data], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);
    return url;
  };
  const speak = async (text: string, textId: string) => {
    setTextId(textId);
    setPlaying(true);
    try {
      const url = cache.current[text] || (await getAudioUrl(text));
      audioRef.current!.src = url;
      audioRef.current!.play();
      cache.current[text] = url;
    } catch (err) {
      setTextId(null);
    }
  };

  return (
    <SpeechContext.Provider
      value={{
        speak,
        stop: () => {
          audioRef.current!.pause();
          setTextId(null);
        },
        textId: textId,
        isPlaying: isPlaying,
      }}
    >
      <audio
        ref={audioRef}
        className="hidden"
        controls
        onPlaying={() => {
          setPlaying(true);
        }}
        onPause={() => {
          setPlaying(false);
        }}
      >
        <source type="audio/mpeg" />
      </audio>
      {children}
    </SpeechContext.Provider>
  );
};

export const useTextToSpeech = () => {
  return useContext(SpeechContext);
};
