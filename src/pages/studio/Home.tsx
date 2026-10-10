import React, { useState } from "react";
import { Loader } from "../../components/Loader";
import { InteractiveBackground } from "../../components/InteractiveBackground";
import { ScrollProgress } from "../../components/ScrollProgress";
import { Nav } from "../../components/Nav";
import { Hero } from "../../components/Hero";
import { Manifesto } from "../../components/Manifesto";
import { StoryChapters } from "../../components/StoryChapters";
import { ProjectsSection } from "../../components/work/ProjectsSection";
import { ThoughtsSection } from "../../components/thoughts/ThoughtsSection";
import { StackExplorer } from "../../components/StackExplorer";
import { Experience } from "../../components/Experience";
import { Contact } from "../../components/Contact";
import { Footer } from "../../components/Footer";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";

interface HomeProps {
  accentRgb: string;
  showLoader: boolean;
}

let introPlayed = false;

export function Home({ accentRgb, showLoader }: HomeProps) {
  const playIntro = showLoader && !introPlayed;
  const [loading, setLoading] = useState(playIntro);
  const [ready, setReady] = useState(!playIntro);
  useSmoothScroll();

  return (
    <div className="relative">
      {loading && (
        <Loader
          onReveal={() => setReady(true)}
          onDone={() => {
            introPlayed = true;
            setLoading(false);
          }}
        />
      )}
      <InteractiveBackground accent={accentRgb} />
      <ScrollProgress />
      <Nav ready={ready} />
      <main className="relative z-10">
        <Hero ready={ready} />
        <Manifesto />
        <StoryChapters />
        <ProjectsSection />
        {/* <ThoughtsSection /> */}
        <StackExplorer />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
