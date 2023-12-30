"use client";

import React, { useState, useEffect } from "react";

const isMultiple = (num: number) => (num > 1 ? "S" : "");

const CountdownTimer = ({ name }: { name?: string }) => {
  const targetDate = new Date("2024-01-01T00:00:00").getTime();
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [targetDate]);

  return (
    <div className="relative min-h-screen w-full bg-cover bg bg-[url('https://firebasestorage.googleapis.com/v0/b/nyday-20705.appspot.com/o/images%2Fbackground%2FPZBB3716.JPG?alt=media&token=065af8da-f994-4595-8fa9-e54b41c20f11')]">
      <div className="flex flex-col items-center justify-center w-full h-screen bg-pink-black/20">
        <div className="text-3xl text-white font-black tracking-[5px]">
          HAPPY
        </div>
        <div className="font-black text-white tracking-[5px] uppercase">
          new year
        </div>{" "}
        <div className="text-3xl text-white font-black tracking-[14px] ml-2 mb-5">
          2024
        </div>
        <div className="grid grid-cols-2 gap-2 bg-white/70 p-4 shadow rounded w-[143px]">
          <div className="text-right text-xl font-black">
            {timeRemaining.days}{" "}
          </div>
          <div className="text-[10px] tracking-wider flex items-center">
            {`DAY${isMultiple(timeRemaining.days)}`}
          </div>
          <div className="text-right text-xl font-black">
            {timeRemaining.hours}{" "}
          </div>
          <div className="text-[10px] tracking-wider flex items-center">
            {`HOUR${isMultiple(timeRemaining.hours)}`}
          </div>
          <div className="text-right text-xl font-black">
            {timeRemaining.minutes}{" "}
          </div>
          <div className="text-[10px] tracking-wider flex items-center">
            {`MINUTE${isMultiple(timeRemaining.minutes)}`}
          </div>
          <div className="text-right text-xl font-black">
            {timeRemaining.seconds}{" "}
          </div>
          <div className="text-[10px] tracking-wider flex items-center">
            {`SECOND${isMultiple(timeRemaining.seconds)}`}
          </div>
        </div>
        <div className="text-white text-xl font-black text-center tracking-widest mt-5 inline-flex py-1 px-3 rounded bg-black/20">
          Hi!{" "}
          <span className="capitalize ml-1 border-b-2 h-[26px]">{name}</span>
        </div>
        <div className="text-white text-xs text-center tracking-wide mt-5 inline-flex p-1 rounded bg-black/60">
          🎉 Welcome to the countdown to a new beginning! 🎉
        </div>
        <div className="mt-3 text-white text-xs text-center tracking-wide italic space-y-[1px]">
          <div className="inline-flex px-1 rounded bg-black/40">
            Come back here when the timer
          </div>
          <div className="inline-flex px-1 rounded bg-black/40">
            hits zero to reveal a special New Year
          </div>
          <div className="inline-flex px-1 rounded bg-black/40">
            message just for you! Wishing you a{" "}
          </div>
          <div className="inline-flex px-1 rounded bg-black/40">
            fantastic and joyous start to 2024!
          </div>
        </div>
      </div>
    </div>
  );
};

export { CountdownTimer };
