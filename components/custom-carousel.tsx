"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Stories } from "./stories";
import { Story } from "@/lib/firebase";

export function CarouselDemo({
  stories,
  name,
}: {
  stories: (Story & { items: Story[] })[];
  name: string;
}) {
  return (
    <Carousel className="relative w-full h-screen">
      <CarouselContent className="h-screen m-0">
        {stories.map((story, index) => (
          <CarouselItem className="relative h-full rounded-xl p-0" key={index}>
            <Stories items={story.items} index={index} name={name} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious className="fixed top-0 left-0 h-screen translate-y-0 bg-transparent rounded-none w-[30%] border-0 opacity-0 disabled:opacity-0 hover:opacity-0 focus-visible:opacity-0  focus:opacity-0" />
      <CarouselNext className="fixed top-0 right-0 h-screen translate-y-0 bg-transparent rounded-none w-[30%] border-0 opacity-0 disabled:opacity-0 hover:opacity-0 focus-visible:opacity-0 focus:opacity-0" /> */}
    </Carousel>
  );
}
