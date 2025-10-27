"use client";

import { useAuth } from "@/app/(general)/(protected)/_context/AuthContext";

import { ReactNode, useEffect } from "react";

function LoadingPage() {
  return (
    <div className="h-dvh w-dvw flex flex-col items-center justify-center bg-white text-gray-800">
      {/* Animated circle / logo pulse */}
      <div className="h-14 w-14 rounded-full bg-primary/80 animate-pulse mb-6" />

      {/* Loading text */}
      <div className="flex items-center space-x-1 text-lg font-medium">
        <span className="animate-pulse">Loading</span>
        <span className="animate-bounce">.</span>
        <span className="animate-bounce [animation-delay:0.2s]">.</span>
        <span className="animate-bounce [animation-delay:0.4s]">.</span>
      </div>

      {/* Shimmer bar */}
      <div className="mt-8 w-48 h-2 bg-gray-300 rounded-full overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-1/3 bg-primary/80 animate-[slide_1.2s_ease-in-out_infinite]" />
      </div>

      {/* Add custom keyframes for the shimmer */}
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </div>
  );
}

export function Protected({ children }: { children: ReactNode }) {
  const { loading, isAuthenticated, user, updateAuthState } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) updateAuthState();
  }, [isAuthenticated]);

  return loading ? <LoadingPage /> : isAuthenticated && children;
}
