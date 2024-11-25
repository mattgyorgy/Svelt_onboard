import React from 'react';

type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="space-y-1.5 md:space-y-2">
      <div className="flex justify-between text-xs md:text-sm text-[#A6A6A6]">
        <span>Question {current} of {total}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-1.5 md:h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#D4FB5D] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}