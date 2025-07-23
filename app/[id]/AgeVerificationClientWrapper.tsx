"use client";
import { 
    AgeVerification,
    AgeVerificationProps
} from "@dukeofgaming/ab-ui";

import React, { useState } from "react";

export interface AgeVerificationClientWrapperProps extends AgeVerificationProps {
  brand?: string;
  children?: React.ReactNode;
}

export default function AgeVerificationClientWrapper({ brand, children, ...ageVerificationProps }: AgeVerificationClientWrapperProps) {
  const [verified, setVerified] = useState(false);

  return (
    <>
      {!verified && (
        <div style={{
          position: "fixed",
          zIndex: 1000,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.65)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 32px #0004", padding: 32, minWidth: 320 }}>
            {brand && (
              <div style={{ textAlign: "center", fontWeight: 700, fontSize: 20, marginBottom: 16 }}>{brand}</div>
            )}
            <AgeVerification {...ageVerificationProps} onPass={() => setVerified(true)} />
          </div>
        </div>
      )}
      {verified && children}
    </>
  );
}
