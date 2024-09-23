"use client";
import React from "react";
import { Button } from "@/components/ui/button";

type ActionButtonProps = {
  title: string;
  action: React.MouseEventHandler<HTMLDivElement>;
  icon: React.ReactNode;
};

const ActionButton: React.FC<ActionButtonProps> = ({ title, action, icon }) => {
  return (
    <div onClick={action} className="cursor-pointer hover:text-primary">
      {icon}
    </div>
  );
};

export default ActionButton;
