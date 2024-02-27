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
        y: -10,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "sine.out",
        paused: true,
      }
    );

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

    // looping "Afrian" animation
    let afrianLoop = gsap.to(".afrian", {
      x: 100,
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
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 2,
        onComplete: () => {
          afrianLoop.play();
        },
      }
    );

    // looping "Luthfan" animation
    let luthfanLoop = gsap.to(".luthfan", {
      delay: 1,
      x: 50,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      repeatDelay: 0.5,
      paused: true,
      duration: 20,
    });

    // initial "Luthfan" animation
    gsap.fromTo(
      ".luthfan",
      { x: -100, opacity: 0 },
      {
        x: 100,
        opacity: 1,
        duration: 2,
        delay: 0.5,
        onStart: () => {
          taglineAnimation.play();
        },
        onComplete: () => {
          luthfanLoop.play();
        },
      }
    );
  });

  return (
    <div className="flex flex-col gap-10 text-9xl z-10">
      <h1 className={`${against.className} afrian opacity-0`}>Afrian</h1>
      <h1 className={`${against.className} luthfan opacity-0`}>Luthfan</h1>
      <p className="flex para text-lg">
        {spreadTagline.map((letter, index) => {
          return (
            <span
              className={`${against.className} tagline opacity-0 min-w-[5px]`}
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
