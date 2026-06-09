import { About } from "@/components/sections/About/About";
import { Contact } from "@/components/sections/Contact/Contact";
import { Experience } from "@/components/sections/Experience/Experience";
import { Hero } from "@/components/sections/Hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
