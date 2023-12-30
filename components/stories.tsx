"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Story } from "@/lib/firebase";

export function Stories({ items }: { items: Story[] }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    // Get the X-coordinate of the click relative to the document
    const clickX = e.clientX;

    // Get the width of the window
    const windowWidth = window.innerWidth;

    // Check if the click happened on the right side (you can adjust the threshold as needed)
    if (clickX > windowWidth / 2) {
      // The click happened on the right side
      setSelectedIndex((i) => (i + 1 < items.length ? i + 1 : i));
      // Add your custom logic here
    } else {
      setSelectedIndex((i) => (i - 1 < 0 ? i : i - 1));
    }
  };
  const styles = items[selectedIndex].bg.startsWith("https")
    ? { backgroundImage: `url("${items[selectedIndex].bg}")` }
    : { backgroundColor: items[selectedIndex].bg };
  return (
    <div className="relative w-full h-screen" onClick={handleClick}>
      <div
        className="absolute top-3 z-20 h-[3px] w-full grid px-2 gap-1"
        style={{
          gridTemplateColumns: `repeat(${items.length}, minmax(0,1fr))`,
        }}
      >
        {items.map((_, i) => (
          <div
            key={i}
            className={cn(
              "grid h-full bg-white",
              i != selectedIndex ? "opacity-50" : ""
            )}
          ></div>
        ))}
      </div>
      <div className="h-full rounded-xl">
        <Card
          style={styles}
          className={cn(
            "relative  rounded-xl h-full flex items-center justify-center",
            `bg-center bg-no-repeat bg-cover`
          )}
        >
          <div className="absolute rounded-xl top-0 right-0 h-full w-full backdrop-blur-2xl" />
          <CardContent
            style={styles}
            className={cn(
              "absolute rounded flex aspect-[3/4] w-[90%] items-center justify-center p-6 shadow-md",
              `bg-center bg-no-repeat bg-cover`
            )}
          >
            {items[selectedIndex].caption}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
