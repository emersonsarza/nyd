import { CountdownTimer } from "@/components/countdown";
import { CarouselDemo } from "@/components/custom-carousel";
import { Story, getUser } from "@/lib/firebase";

export default async function Home({ params }: { params: { id: string } }) {
  const targetDate = new Date("2024-01-01T00:00:00").getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;
  const { name, stories } = (await getUser(params.id)) || {};

  if (difference > 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <CountdownTimer name={name} />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <CarouselDemo stories={stories as (Story & { items: Story[] })[]} />
    </main>
  );
}
