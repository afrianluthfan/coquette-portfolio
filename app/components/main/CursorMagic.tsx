"use client";

import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import localFont from "next/font/local";

const against = localFont({
  src: "./fonts/against.ttf",
});

const CursorMagic: FC = () => {
  //length is 19
  const symbolsList = useMemo(
    () => [
      "!",
      "?",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "+",
      "=",
      "{",
      "}",
      "[",
      "]",
      "<",
      ">",
      "/",
      "~",
    ],
    [],
  );

  const ref = useRef(null);

  const [symbolsIndex, setSymbolsIndex] = useState(0);

  const [mouseSpeed, setMouseSpeed] = useState(0);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      `.cursor${symbolsIndex}`,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, ease: "bounce", duration: 0.3 },
    );
    tl.fromTo(
      `.cursor${symbolsIndex}`,
      { rotate: 0 },
      { rotate: 270, ease: "bounce", duration: 0.3 },
    );
    tl.fromTo(
      `.cursor${symbolsIndex}`,
      { y: 0, opacity: 1 },
      { y: 1000, opacity: 0, duration: 1.5 },
    );
  }, [symbolsIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSymbolsIndex((prevIndex) => (prevIndex + 1) % symbolsList.length);
    }, 2000); // Change symbol every 500ms

    return () => {
      clearInterval(intervalId); // Clean up on component unmount
    };
  }, [symbolsList]);

  const positionRef = useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  });

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;

      const mouseX = clientX;
      const mouseY = clientY;

      const dx = lastMousePosition.current.x - mouseX;
      const dy = lastMousePosition.current.y - mouseY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      setMouseSpeed(speed);

      lastMousePosition.current = { x: mouseX, y: mouseY };

      if (ref.current) {
        (ref.current as HTMLElement).style.transform = `translate3d(${
          mouseX - (ref.current as HTMLElement).clientWidth / 2
        }px, ${mouseY - (ref.current as HTMLElement).clientHeight / 2}px, 0)`;
      }
    });
  }, []);

  useEffect(() => {
    const followMouse = () => {
      positionRef.current.key = requestAnimationFrame(followMouse);

      const {
        mouseX,
        mouseY,
        destinationX,
        destinationY,
        distanceX,
        distanceY,
      } = positionRef.current;

      if (!destinationX || !destinationY) {
        positionRef.current.destinationX = mouseX;
        positionRef.current.destinationY = mouseY;
      } else {
        positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
        positionRef.current.distanceY = (mouseY - destinationY) * 0.1;

        if (
          Math.abs(positionRef.current.distanceX) +
            Math.abs(positionRef.current.distanceY) <
          0.1
        ) {
          positionRef.current.destinationX = mouseX;
          positionRef.current.destinationY = mouseY;
        } else {
          positionRef.current.destinationX += distanceX;
          positionRef.current.destinationY += distanceY;
        }
      }
    };
    followMouse();
  });

  return (
    <div
      className="absolute hidden h-screen w-[calc(100vw/8)] items-center justify-center overflow-hidden bg-none lg:flex"
      ref={ref}
    >
      <p
        key={symbolsIndex}
        className={`${against.className} cursor${symbolsIndex} text-4xl opacity-0`}
      >
        {symbolsList[symbolsIndex]}
      </p>
    </div>
  );
};

export default CursorMagic;
