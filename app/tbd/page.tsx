"use client";

import React, { FC, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HeroSection: FC = () => {
  const ppp = useRef(null);

  useGSAP(
    () => {
      gsap.to(".bulet", {
        x: 100,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.5,
      });
    },
    { scope: ppp }
  );

  return (
    <div ref={ppp} className="flex flex-col">
      <h1>Afrian Luthfan</h1>
    </div>
  );
};

export default HeroSection;
