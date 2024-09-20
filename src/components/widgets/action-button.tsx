"use client";
import React from "react";
import { Button } from "@/components/ui/button";

type ActionButtonProps = {
  title: string;
  action: () => void;
  icon: React.ReactNode;
};

const ActionButton: React.FC<ActionButtonProps> = ({ title, action, icon }) => {
  return (
    <Button
      variant={"ghost"}
      size="icon"
      className="z-50 w-4"
      title={title}
      onClick={($e) => {
        $e.preventDefault();
        action();
      }}
    >
      {icon}
    </Button>
  );
};

export default ActionButton;
