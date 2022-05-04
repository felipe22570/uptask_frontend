import React from "react";
import styled from "styled-components";

const MainStyled = styled.main`
   :root {
      --hue: 223;
      --bg: hsl(var(--hue), 10%, 90%);
      --fg: hsl(var(--hue), 10%, 10%);
      --themeTrans: 0.3s;
      font-size: calc(16px + (24 - 16) * (100vw - 320px) / (1280 - 320));
   }

   position: absolute;
   top: 0%;
   bottom: 0%;
   left: 0%;
   right: 0%;
   backdrop-filter: blur(3px);
   background-color: rgba(255, 255, 255, 0.5);
   z-index: 9;
   display: flex;
   justify-content: center;
   align-items: center;

   .pl {
      /* position: absolute;
      top: 15%; */
      width: 10em;
      height: 9em;
   }
   .pl__ring,
   .pl__worm1,
   .pl__worm2,
   .pl__worm3 {
      animation-duration: 4s;
      animation-iteration-count: infinite;
   }
   .pl__ring {
      stroke: hsla(var(--hue), 10%, 10%, 0.1);
      transition: stroke var(--themeTrans);
   }
   .pl__worm1 {
      animation-name: worm1;
   }
   .pl__worm2 {
      animation-name: worm2;
      transform-origin: 32px 88px;
   }
   .pl__worm3 {
      animation-name: worm3;
      transform-origin: 144px 88px;
   }

   /* Dark theme */
   @media (prefers-color-scheme: dark) {
      :root {
         --bg: hsl(var(--hue), 10%, 10%);
         --fg: hsl(var(--hue), 10%, 90%);
      }
      .pl__ring {
         stroke: hsla(var(--hue), 10%, 90%, 0.1);
      }
   }

   /* Animations */
   @keyframes worm1 {
      from {
         animation-timing-function: ease-out;
         stroke-dashoffset: 43.98;
      }
      12.5% {
         animation-timing-function: ease-in-out;
         stroke-dashoffset: -131.95;
      }
      25% {
         animation-timing-function: ease-in;
         stroke-dashoffset: 0;
      }
      37.5%,
      50% {
         animation-timing-function: ease-out;
         stroke-dashoffset: -175.93;
      }
      62.5% {
         animation-timing-function: ease-in-out;
         stroke-dashoffset: 0;
      }
      75% {
         animation-timing-function: ease-in;
         stroke-dashoffset: -131.95;
      }
      87.5%,
      to {
         stroke-dashoffset: 43.98;
      }
   }
   @keyframes worm2 {
      from,
      35.5% {
         animation-timing-function: linear;
         stroke-dasharray: 0 40 0 44;
         visibility: hidden;
         transform: translate(0, 0) rotate(0);
      }
      37.5% {
         animation-timing-function: ease-out;
         stroke-dasharray: 0 40 44 0;
         visibility: visible;
         transform: translate(0, 0) rotate(0);
      }
      47.5% {
         animation-timing-function: ease-in;
         stroke-dasharray: 0 4 40 40;
         visibility: visible;
         transform: translate(0, -80px) rotate(360deg);
      }
      50% {
         animation-timing-function: linear;
         stroke-dasharray: 0 4 40 40;
         visibility: visible;
         transform: translate(0, -36px) rotate(360deg);
      }
      52.5%,
      to {
         stroke-dasharray: 0 42 0 42;
         visibility: hidden;
         transform: translate(0, 12px) rotate(360deg);
      }
   }
   @keyframes worm3 {
      from {
         animation-timing-function: linear;
         stroke-dasharray: 0 4 40 40;
         visibility: visible;
         transform: translate(0, -36px) rotate(0);
      }
      2.5% {
         animation-timing-function: linear;
         stroke-dasharray: 0 42 0 42;
         visibility: hidden;
         transform: translate(0, 12px) rotate(0);
      }
      85.5% {
         animation-timing-function: linear;
         stroke-dasharray: 0 40 0 44;
         visibility: hidden;
         transform: translate(0, 0) rotate(0);
      }
      87.5% {
         animation-timing-function: ease-out;
         stroke-dasharray: 0 40 44 0;
         visibility: visible;
         transform: translate(0, 0) rotate(0);
      }
      97.5% {
         animation-timing-function: ease-in;
         stroke-dasharray: 0 4 40 40;
         visibility: visible;
         transform: translate(0, -80px) rotate(-360deg);
      }
      to {
         stroke-dasharray: 0 4 40 40;
         visibility: visible;
         transform: translate(0, -36px) rotate(-360deg);
      }
   }
`;

const Spinner = () => {
   return (
      <MainStyled>
         <svg
            className="pl"
            viewBox="0 0 176 160"
            width="176px"
            height="160px"
            xmlns="http://www.w3.org/2000/svg"
         >
            <defs>
               <linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(2, 132, 199)" />
                  <stop offset="30%" stopColor="rgb(2, 132, 199)" />
                  <stop offset="100%" stopColor="rgb(2, 132, 199)" />
               </linearGradient>
            </defs>
            <g fill="none" strokeWidth="16" strokeLinecap="round">
               <circle className="pl__ring" r="56" cx="88" cy="96" stroke="hsla(0,10%,10%,0.1)" />
               <path
                  className="pl__worm1"
                  d="M144,96A56,56,0,0,1,32,96"
                  stroke="url(#pl-grad)"
                  strokeDasharray="43.98 307.87"
               />
               <path
                  className="pl__worm2"
                  d="M32,136V96s-.275-25.725,14-40"
                  stroke="rgb(2, 132, 199)"
                  strokeDasharray="0 40 0 44"
                  strokeDashoffset="0.001"
                  visibility="hidden"
               />
               <path
                  className="pl__worm3"
                  d="M144,136V96s.275-25.725-14-40"
                  stroke="rgb(2, 132, 199)"
                  strokeDasharray="0 40 0 44"
                  strokeDashoffset="0.001"
                  visibility="hidden"
               />
            </g>
         </svg>
      </MainStyled>
   );
};

export default Spinner;
