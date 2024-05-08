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

interface TemperatureSelectorProps {
  defaultValue: SliderProps['defaultValue'];
  onChangeCallback: (value: number) => void;
}

export function TemperatureSelector({
  defaultValue,
  onChangeCallback,
}: TemperatureSelectorProps) {
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
              <Label htmlFor="temperature">Grade Level</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="grade-level"
              max={12}
              defaultValue={value}
              step={1}
              onValueChange={handleChange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Temperature"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Controls grade level: lowering results in easier questions, raising in
          harder questions.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
