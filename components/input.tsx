import * as React from "react";
import { Input as ShadcnInput } from "@/components/ui/input";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <ShadcnInput
        ref={ref}
        {...props}
        className={cn(
          "w-7 bg-white/70 p-0 pl-2 border-2 opacity-70 focus:opacity-90",
          className
        )}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
