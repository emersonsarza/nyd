import Code from "@/components/code";
import { cn } from "@/lib/utils";

const bg =
  "bg-[url('https://firebasestorage.googleapis.com/v0/b/nyday-20705.appspot.com/o/images%2Fbackground%2Fhappynewyear2.png?alt=media&token=364bbd01-14ef-41c0-a471-f0fc4d34c5f8')]";

export default async function Home() {
  return (
    <main
      className={cn(
        "relative bg-center bg-no-repeat bg-cover min-h-screen",
        bg
      )}
    >
      <div className="absolute top-0 right-0 h-full w-full" />
      <div
        className={cn("bg-center bg-no-repeat bg-fit min-h-screen", bg)}
      ></div>
      <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
        <Code />
      </div>
    </main>
  );
}
