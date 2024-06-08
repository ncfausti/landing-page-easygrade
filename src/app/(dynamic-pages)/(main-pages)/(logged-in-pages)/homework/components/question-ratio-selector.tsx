'use client';

import * as React from 'react';
import { SliderProps } from '@radix-ui/react-slider';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface QuestionRatioSelectorProps {
  defaultValue: SliderProps['defaultValue'];
  maxValue: number;
  title: string;
  onChangeCallback: (value: number) => void;
}

export function QuestionRatioSelector({
  defaultValue,
  maxValue = 10,
  title,
  onChangeCallback,
}: QuestionRatioSelectorProps) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (value: number[]) => {
    setValue(value);
    onChangeCallback(value[0]);
  };

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="maxlength">{title}</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="maxlength"
              max={maxValue}
              defaultValue={value}
              step={1}
              onValueChange={handleChange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 cursor-pointer"
              aria-label="Difficulty"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Controls number of multiple choice questions vs subjective
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
