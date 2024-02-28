"use client";

import React, { FC, useRef } from "react";
import localFont from "next/font/local";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const against = localFont({
  src: "./fonts/against.ttf",
});

const tagline = "Continuously growing, continually learning.";
const spreadTagline = tagline.split("");

const Name: FC = () => {
  const elementRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // initial tagline animation
    let taglineAnimation = gsap.fromTo(
      ".tagline",
      {
        delay: 1,
        y: -10,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "sine.out",
        paused: true,
        onComplete: () => {
          gsap.utils.toArray(".tagline").forEach((span) => {
            // let animateThis = para.querySelector(".tagline");

            let hoverAnimation = gsap.to(span as HTMLElement, {
              y: -10,
              duration: 1,
              paused: true,
            });

            (span as HTMLElement).addEventListener("mouseenter", () => {
              hoverAnimation.timeScale(20).play();
            });
            (span as HTMLElement).addEventListener("mouseleave", () => {
              hoverAnimation.timeScale(1).reverse();
            });
          });
        },
      },
    );

    // looping "Afrian" animation
    let afrianLoop = gsap.to(".afrian", {
      x: "15%",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      repeatDelay: 0.5,
      paused: true,
      duration: 20,
    });

    // initial "Afrian" animation
    gsap.fromTo(
      ".afrian",
      { x: "50%", opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 2,
        onComplete: () => {
          afrianLoop.play();
        },
      },
    );

    // looping "Luthfan" animation
    let luthfanLoop = gsap.to(".luthfan", {
      delay: 0.3,
      x: "5",
      repeat: -1,
      yoyo: true,
      ease: "power3.out",
      repeatDelay: 0.75,
      paused: true,
      duration: 20,
    });

    // initial "Luthfan" animation
    gsap.fromTo(
      ".luthfan",
      { x: "-100%", opacity: 0 },
      {
        x: 20,
        opacity: 1,
        duration: 2,
        delay: 0.5,
        onStart: () => {
          taglineAnimation.play();
        },
        onComplete: () => {
          luthfanLoop.play();
        },
      },
    );
  });

  return (
    <div className="z-10 flex flex-col text-3xl md:ml-10 md:text-6xl lg:gap-10 lg:text-9xl">
      <h1 className={`${against.className} afrian opacity-0`}>Afrian</h1>
      <h1 className={`${against.className} luthfan opacity-0`}>Luthfan</h1>
      <p className="para ml-7 flex text-[10px] md:mt-10 md:text-xl lg:text-lg">
        {spreadTagline.map((letter, index) => {
          return (
            <span
              className={`${against.className} tagline min-w-[5px] opacity-0`}
              key={index}
              ref={elementRef}
            >
              {letter}
            </span>
          );
        })}
      </p>
    </div>
  );
};

export default Name;
