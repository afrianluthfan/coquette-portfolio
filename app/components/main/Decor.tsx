"use client";

import React, { FC } from "react";
import localFont from "next/font/local";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const against = localFont({
  src: "./fonts/against.ttf",
});

const Decor: FC = () => {
  useGSAP(() => {
    const asteriskTl = gsap.timeline();

    let asteriskLoop = gsap.fromTo(
      ".loopthis",
      { rotate: 0 },
      { rotate: 360, repeat: -1, duration: 9, ease: "none", paused: true }
    );
    asteriskTl
      .fromTo(
        ".asterisk1",
        {
          scale: 0,
        },
        {
          ease: "bounce.out",
          delay: 1,
          duration: 0.5,
          scale: 1,
          onComplete: () => {
            asteriskLoop.play();
          },
        }
      )
      .fromTo(
        ".asterisk2",
        {
          scale: 0,
        },
        {
          ease: "bounce.out",
          duration: 0.5,
          scale: 1,
          onComplete: () => {
            asteriskLoop.play();
          },
        }
      )
      .fromTo(
        ".asterisk3",
        {
          scale: 0,
        },
        {
          ease: "bounce.out",
          duration: 0.5,
          scale: 1,
          onComplete: () => {
            asteriskLoop.play();
          },
        }
      );
  });

  return (
    <div className="w-full h-full relative">
      <div
        className={`${against.className} asterisk1 loopthis top-52 right-64 flex justify-center text-center absolute text-9xl h-[90px]`}
      >
        *
      </div>
      <div
        className={`${against.className} asterisk2 loopthis top-64 right-96 flex justify-center text-center absolute text-9xl h-[90px]`}
      >
        *
      </div>
      <div
        className={`${against.className} asterisk3 loopthis bottom-52 right-48 flex justify-center text-center absolute text-9xl h-[90px]`}
      >
        *
      </div>
    </div>
  );
};

export default Decor;
