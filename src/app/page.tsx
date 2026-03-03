import Hero from "@/components/home/Hero";
import Calendar from "@/components/home/Calendar";
import News from "@/components/home/News";
import PhotoSeries from "@/components/home/PhotoSeries";
import Stats from "@/components/home/Stats";
import TeamsPreview from "@/components/home/TeamsPreview";
import Partners from "@/components/home/Partners";

export default function Home() {
  return (
    <>
      <Hero />
      <Calendar />
      <News />
      <PhotoSeries />
      <Stats />
      <TeamsPreview />
      <Partners />
    </>
  );
}
