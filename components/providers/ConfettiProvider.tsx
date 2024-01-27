"use client";

import { FC } from "react";
import ReactConfetti from "react-confetti";
import { useConfettiStore } from "@/hooks/useConfettiStore";

type ConfettiProviderProps = {};

const ConfettiProvider: FC<ConfettiProviderProps> = ({}) => {
  const confetti = useConfettiStore();

  if (!confetti.isOpen) return null;

  return (
    <ReactConfetti
      className="pointer-events-none w-full z-[100]"
      numberOfPieces={600}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose();
      }}
    />
  );
};

export default ConfettiProvider;
