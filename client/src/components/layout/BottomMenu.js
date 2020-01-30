import React from "react";
import { Link } from "react-router-dom";

export default function BottomMenu(props) {
  return (
    <div className="md:hidden flex justify-around text-center items-end fixed bottom-0 bg-gray-100 w-full h-16 p-1">
      <Link to="/app" className="flex-1 focus:outline-none">
        <div className="flex justify-center items-end">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            // x="1px"
            // y="0px"
            width="30px"
            viewBox="0 0 73.5 64.9"
          >
            <path
              d="M60.1,63.6c1.3,0,2.3-1,2.3-2.3V36.8h6h0c2.2,0,4-1.8,4-4c0-1.3-0.6-2.4-1.5-3.1L63.2,23V11.8
        c0-1.3-1.1-2.4-2.4-2.4h-4.9c-1.3,0-2.4,1.1-2.4,2.4v2.8l-13.8-12c-1.5-1.3-3.7-1.3-5.2,0L3,29.9c-1.3,1.1-1.7,2.8-1.1,4.4
        c0.6,1.6,2.1,2.6,3.7,2.6h6v24.5c0,1.3,1,2.3,2.3,2.3h13.5V45.8c0-2.5,2-4.6,4.6-4.6h10c2.5,0,4.6,2,4.6,4.6v17.8H60.1z"
            />
          </svg>
        </div>
        {props.page === "app" ? (
          <span className="font-bold">Home</span>
        ) : (
          "Home"
        )}
      </Link>
      <Link to="/activity" className="flex-1 focus:outline-none">
        <div className="flex justify-center items-end">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 129 129"
            width="28px"
          >
            <g>
              <g>
                <path d="M90-4H40.9c-2.3,0-4.1,1.8-4.1,4.1v5.7H18.7c-2.3,0-4.1,1.8-4.1,4.1v108c0,2.3,1.8,4.1,4.1,4.1h91.6    c2.3,0,4.1-1.8,4.1-4.1V9.9c0-2.3-1.8-4.1-4.1-4.1H94.1V0.1C94.1-2.2,92.3-4,90-4z M45,9.9V4.2h40.9v5.7v7.2H45V9.9z M106.2,14    v99.8H22.8V14h14v7.2c0,2.3,1.8,4.1,4.1,4.1H90c2.3,0,4.1-1.8,4.1-4.1V14H106.2z" />
                <path d="M95,67H35.9c-2.3,0-4.1,1.8-4.1,4.1c0,2.3,1.8,4.1,4.1,4.1H95c2.3,0,4.1-1.8,4.1-4.1C99.1,68.8,97.3,67,95,67z" />
                <path d="m65.5,86.8h-29.6c-2.3,0-4.1,1.8-4.1,4.1s1.8,4.1 4.1,4.1h29.5c2.3,0 4.1-1.8 4.1-4.1s-1.8-4.1-4-4.1z" />
                <path d="m31.8,51.2c0,2.3 1.8,4.1 4.1,4.1h59.1c2.3,0 4.1-1.8 4.1-4.1s-1.8-4.1-4.1-4.1h-59.1c-2.3,0-4.1,1.9-4.1,4.1z" />
              </g>
            </g>
          </svg>
        </div>
        {props.page === "activity" ? (
          <span className="font-bold">Activity</span>
        ) : (
          "Activity"
        )}
      </Link>
    </div>
  );
}
