import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPost() {
  return (
    <main className="flex relative min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-600 to-gray-900">
      <Skeleton className="w-[90%] aspect-[3/4] flex items-center justify-center rounded bg-white/60">
        <div className="text-xl font-black tracking-widest">LOADING...</div>
      </Skeleton>
    </main>
  );
}
