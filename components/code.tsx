"use client";

import { Input } from "@/components/input";
import { getUser } from "@/lib/firebase";
import { useRef, useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";

interface InputRef {
  current: HTMLInputElement | null;
}

const classNames = [
  "origin-center -rotate-12",
  "origin-top-left rotate-10",
  "origin-bottom -rotate-12",
  "origin-bottom-left rotate-12",
];

export default function Code() {
  const router = useRouter();
  const [_, toggleState] = useReducer((v) => !v, false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inputsRefs: InputRef[] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    const val = inputsRefs.map((c) => c?.current?.value).join("");
    if (val.length === 4) {
      const checkUser = async () => {
        const user = await getUser(val);
        if (user) {
          //redirect
          router.push(`/stories/${val}`);
        } else {
          console.log("error");
          inputsRefs.forEach((ref) => {
            if (ref.current) {
              ref.current.value = "";
            }
          });
        }
      };
      checkUser();
    }
  }, [inputsRefs]);

  const handleInput =
    (index: number) => (event: React.FormEvent<HTMLInputElement>) => {
      const input = event.currentTarget;
      const value = input.value;
      if (value.length === 1) {
        // Move to the next input if the current one is filled
        const nextIndex = index + 1;
        if (nextIndex < inputsRefs.length) {
          inputsRefs[nextIndex].current?.focus();
        }
      } else if (value.length === 0) {
        // Move to the previous input if the current one is empty
        const prevIndex = index - 1;
        if (prevIndex >= 0) {
          inputsRefs[prevIndex].current?.focus();
        }
      }
      toggleState();
    };

  useEffect(() => {
    // Focus on the first input when the component loads
    if (inputsRefs.length > 0 && inputsRefs[0].current) {
      inputsRefs[0].current.focus();
    }
  }, []);

  return (
    <div className="flex space-x-3">
      {inputsRefs.map((ref, index) => (
        <Input
          className={classNames[index]}
          key={index}
          ref={ref}
          maxLength={1}
          onChange={handleInput(index)}
        />
      ))}
    </div>
  );
}
