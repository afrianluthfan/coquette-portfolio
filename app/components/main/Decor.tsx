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
      { rotate: 360, repeat: -1, duration: 9, ease: "none", paused: true },
    );
    let asteriskSymbol = document.querySelectorAll(".loopthis");
    asteriskSymbol.forEach((symbol) => {
      symbol.addEventListener("mouseenter", () => {
        asteriskLoop.timeScale(4).play();
      });
      symbol.addEventListener("mouseleave", () => {
        asteriskLoop.timeScale(1).play();
      });
    });

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
        },
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
        },
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
        },
      );
  });

  return (
    <div className="relative h-full w-full">
      <p
        className={`${against.className} asterisk1 loopthis absolute right-64 top-52 flex h-[40px] justify-center text-center text-6xl lg:h-[90px] lg:text-9xl`}
      >
        *
      </p>
      <p
        className={`${against.className} asterisk2 loopthis absolute left-80 top-64 flex h-[40px] justify-center text-center text-6xl lg:top-12 lg:h-[90px] lg:text-9xl`}
      >
        *
      </p>
      <p
        className={`${against.className} asterisk3 loopthis absolute bottom-52 right-48 flex h-[40px] justify-center text-center text-6xl lg:h-[90px] lg:text-9xl`}
      >
        *
      </p>
    </div>
  );
};

export default Decor;
