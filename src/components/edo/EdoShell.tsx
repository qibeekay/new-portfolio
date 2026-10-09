import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { SumiBackground } from "./SumiBackground";
import { BrushCursor } from "./BrushCursor";
import { EdoScene } from "./EdoScene";
import { Prologue } from "../../pages/edo/Prologue";
import { Origin } from "../../pages/edo/Origin";
import { Craft } from "../../pages/edo/Craft";
import { Scrolls } from "../../pages/edo/Scrolls";
import { Annals } from "../../pages/edo/Annals";
import { Letter } from "../../pages/edo/Letter";

interface SceneDef {
  kanji: string;
  title: string;
  path: string;
  render: () => React.ReactNode;
}

const scenes: SceneDef[] = [
  { kanji: "序", title: "Prologue", path: "/", render: () => <Prologue /> },
  { kanji: "起", title: "Origin", path: "/origin", render: () => <Origin /> },
  { kanji: "技", title: "Craft", path: "/powers", render: () => <Craft /> },
  {
    kanji: "巻",
    title: "The Scrolls",
    path: "/case-files",
    render: () => <Scrolls />,
  },
  {
    kanji: "年",
    title: "The Annals",
    path: "/chronicles",
    render: () => <Annals />,
  },
  {
    kanji: "文",
    title: "The Letter",
    path: "/signal",
    render: () => <Letter />,
  },
];

/**
 * The handscroll: one continuous ribbon of panels unrolled sideways, with a
 * vertical title rail instead of the comic's issue rack.
 */
export function EdoShell() {
  const track = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const scrollToScene = useCallback(
    (next: number, behavior: ScrollBehavior = "smooth") => {
      const element = track.current;
      if (!element) return;
      const clamped = Math.max(0, Math.min(scenes.length - 1, next));
      const panel = element.children[clamped] as HTMLElement | undefined;
      if (panel) element.scrollTo({ left: panel.offsetLeft, behavior });
    },
    [],
  );

  // Enter the scroll at whichever chapter the reader was on in the comic.
  useEffect(() => {
    const initial = scenes.findIndex(
      (scene) => scene.path === location.pathname,
    );
    if (initial > 0) scrollToScene(initial, "auto");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScroll = () => {
    const element = track.current;
    if (!element) return;
    const max = element.scrollWidth - element.clientWidth;
    setProgress(max > 0 ? element.scrollLeft / max : 0);
    const panels = Array.from(element.children) as HTMLElement[];
    const nearest = panels.reduce(
      (best, panel, panelIndex) =>
        Math.abs(panel.offsetLeft - element.scrollLeft) < best.distance
          ? {
              distance: Math.abs(panel.offsetLeft - element.scrollLeft),
              panelIndex,
            }
          : best,
      { distance: Number.POSITIVE_INFINITY, panelIndex: 0 },
    );
    setIndex(nearest.panelIndex);
  };

  // Vertical wheel unrolls the scroll sideways, unless the panel itself still
  // has content to scroll in that direction.
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      const inner = (event.target as HTMLElement | null)?.closest(
        "[data-scene-scroll]",
      ) as HTMLElement | null;
      if (inner) {
        const atTop = inner.scrollTop <= 0;
        const atBottom =
          inner.scrollTop + inner.clientHeight >= inner.scrollHeight - 1;
        const scrollable = inner.scrollHeight > inner.clientHeight + 2;
        if (
          scrollable &&
          ((event.deltaY < 0 && !atTop) || (event.deltaY > 0 && !atBottom))
        )
          return;
      }
      event.preventDefault();
      element.scrollLeft += event.deltaY * 1.1;
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, []);

  const goTo = (next: number) => {
    scrollToScene(next);
    const scene = scenes[Math.max(0, Math.min(scenes.length - 1, next))];
    if (scene && scene.path !== location.pathname) navigate(scene.path);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-washi text-sumi">
      <SumiBackground />
      <BrushCursor />

      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-4 border-b border-sumi/20 bg-washi/80 px-5 py-3 backdrop-blur-[2px] sm:px-8">
        <div>
          <p className="font-edo text-base font-semibold tracking-[0.2em] text-sumi">
            Anugo Mokwe
          </p>
          <p className="font-edo text-[10px] tracking-[0.32em] text-sumi-wash">
            絵巻 · ENGINEER’S HANDSCROLL
          </p>
        </div>
        <p className="hidden font-edo text-[11px] tracking-[0.28em] text-sumi-wash sm:block">
          {scenes[index]?.kanji} · {scenes[index]?.title}
        </p>
      </header>

      <div
        ref={track}
        onScroll={onScroll}
        className="edo-scroll flex h-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden pb-24 pt-[76px]"
      >
        {scenes.map((scene, sceneIndex) => (
          <EdoScene
            key={scene.path}
            kanji={scene.kanji}
            title={scene.title}
            index={sceneIndex + 1}
            total={scenes.length}
          >
            {scene.render()}
          </EdoScene>
        ))}
      </div>

      <nav
        aria-label="Scroll chapters"
        className="absolute bottom-0 left-0 right-0 z-30 flex items-center gap-4 border-t border-sumi/20 bg-washi/85 px-5 py-3 backdrop-blur-[2px] sm:px-8"
      >
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous chapter"
            className="focus-sumi grid h-8 w-8 place-items-center border border-sumi/40 text-sumi transition-colors duration-200 ease-pulp hover:bg-sumi hover:text-washi-light disabled:opacity-30"
          >
            <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === scenes.length - 1}
            aria-label="Next chapter"
            className="focus-sumi grid h-8 w-8 place-items-center border border-sumi/40 text-sumi transition-colors duration-200 ease-pulp hover:bg-sumi hover:text-washi-light disabled:opacity-30"
          >
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <ul className="flex flex-1 items-center gap-1 overflow-x-auto sm:gap-2">
          {scenes.map((scene, sceneIndex) => {
            const active = sceneIndex === index;
            return (
              <li key={scene.path}>
                <button
                  type="button"
                  onClick={() => goTo(sceneIndex)}
                  aria-current={active ? "true" : undefined}
                  className={`focus-sumi flex items-center gap-2 px-2 py-1 font-edo text-[12px] tracking-[0.18em] transition-colors duration-200 ease-pulp ${
                    active
                      ? "text-edo-vermilion"
                      : "text-sumi-wash hover:text-sumi"
                  }`}
                >
                  <span className="font-edo-accent text-base">
                    {scene.kanji}
                  </span>
                  <span className="hidden whitespace-nowrap sm:inline">
                    {scene.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div
          className="hidden h-px w-40 shrink-0 bg-sumi/25 md:block"
          aria-hidden="true"
        >
          <div
            className="relative -top-[3px] h-[7px] w-[7px] rounded-full bg-edo-vermilion transition-transform duration-200 ease-pulp"
            style={{ transform: `translateX(${progress * 153}px)` }}
          />
        </div>
      </nav>
    </div>
  );
}
