import React from "react";
import ReactDOM from "react-dom";

export const Modal = ({ isOpen }) => {
  return ReactDOM.createPortal(
    <>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 grid justify-center items-center bg-transparent"
        
      >
        <div
          className="p-6 bg-red-300 rounded-lg inline-block min-h-80 m-4 relative min-w-80
        shadow-lg justify-center"
        >
          This Modal Is Created By Using Portals. (ReactDOM)
          <hr />
          <button onClick={() => isOpen()}>Close</button>
        </div>
      </div>
    </>,
    document.getElementById("portal-root")
  );
};
