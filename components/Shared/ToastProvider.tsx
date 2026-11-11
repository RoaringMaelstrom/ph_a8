
"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#242424",
          color: "#FFFFFF",
          borderRadius: "12px",
          padding: "12px 16px",
        },
        success: {
          iconTheme: {
            primary: "#23865B",
            secondary: "#FFFFFF",
          },
        },
        error: {
          iconTheme: {
            primary: "#C94444",
            secondary: "#FFFFFF",
          },
        },
      }}
    />
  );
};

export default ToasterProvider;
