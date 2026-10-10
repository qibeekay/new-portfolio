import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckIcon,
  GiftIcon,
  LinkIcon,
  LoaderIcon,
  MailIcon,
  MessageSquareIcon,
  PhoneIcon,
  SendIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Panel } from "../components/Panel";
import { CaptionBox } from "../components/CaptionBox";
import { SpeechBubble } from "../components/SpeechBubble";
import { IssueHeader } from "../components/IssueHeader";
import { IssueFooterNav } from "../components/IssueFooterNav";
import { issues } from "../data/issues";

const issue = issues[5];

type Status = "idle" | "sending" | "sent" | "error";

const links = [
  { label: "Email", handle: "mokwechibuike7@gmail.com", icon: MailIcon, href: "mailto:mokwechibuike7@gmail.com", external: false },
  { label: "WhatsApp", handle: "09073216155", icon: MessageSquareIcon, href: "https://wa.me/2349073216155", external: true },
  { label: "Call", handle: "09150427993", icon: PhoneIcon, href: "tel:+2349150427993", external: false },
  { label: "GitHub", handle: "@qibeekay", icon: GiftIcon, href: "https://github.com/qibeekay", external: true },
  { label: "LinkedIn", handle: "/in/anugomokwe", icon: LinkIcon, href: "https://www.linkedin.com/in/anugomokwe/", external: true },
  { label: "X", handle: "@qibeekay", icon: LinkIcon, href: "https://x.com/qibeekay", external: true },
  { label: "Instagram", handle: "@qi_beekay", icon: LinkIcon, href: "https://www.instagram.com/qi_beekay/", external: true },
];

export function Signal() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.includes("@") || message.trim().length < 8) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1100);
  };

  const fieldClass =
    "focus-ink w-full border-[3px] border-ink bg-paper px-3 py-2 font-body text-base text-ink placeholder:text-ink-soft/60";

  return (
    <div>
      <IssueHeader issue={issue} />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Panel color="yellow" className="p-6 sm:p-8">
          <CaptionBox className="mb-6 max-w-lg -rotate-1">
            Hiring, collaborating, or just want to argue about render budgets?
            Light the signal.
          </CaptionBox>

          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
              className="border-[3px] border-ink bg-pulp-teal p-6 text-paper-light shadow-panel-sm"
              role="status"
            >
              <CheckIcon className="h-8 w-8" aria-hidden="true" />
              <p className="ink-stroke-thin mt-2 font-display text-4xl uppercase tracking-wide">
                Signal received!
              </p>
              <p className="mt-2 font-body text-base">
                Thanks, {name.split(" ")[0] || "friend"} — I answer everything
                within a working day.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setName("");
                  setEmail("");
                  setMessage("");
                }}
                className="focus-ink mt-5 border-[3px] border-ink bg-paper-light px-4 py-2 font-display text-lg uppercase tracking-wide text-ink transition-transform duration-150 ease-pulp hover:-translate-y-1"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block font-caption text-[11px] uppercase tracking-[0.18em]"
                  >
                    Your name
                  </label>
                  <input
                    id="name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    className={fieldClass}
                    placeholder="Jane Kirby"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block font-caption text-[11px] uppercase tracking-[0.18em]"
                  >
                    Reply-to
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    className={fieldClass}
                    placeholder="jane@studio.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block font-caption text-[11px] uppercase tracking-[0.18em]"
                >
                  The brief
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  className={`${fieldClass} resize-none`}
                  placeholder="What are you building, and where does it hurt?"
                />
              </div>

              {status === "error" ? (
                <p
                  role="alert"
                  className="flex items-center gap-2 border-[3px] border-ink bg-pulp-red px-3 py-2 font-body text-sm font-bold text-paper-light"
                >
                  <TriangleAlertIcon
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  Add your name, a valid email, and a line or two about the
                  brief.
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "sending"}
                className="focus-ink inline-flex items-center gap-2 border-[3px] border-ink bg-ink px-5 py-3 font-display text-2xl uppercase tracking-wide text-paper-light shadow-panel transition-transform duration-150 ease-pulp hover:-translate-y-1 disabled:translate-y-0 disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <LoaderIcon
                      className="h-5 w-5 animate-spin"
                      aria-hidden="true"
                    />{" "}
                    Transmitting
                  </>
                ) : (
                  <>
                    <SendIcon className="h-5 w-5" aria-hidden="true" /> Fire the
                    signal
                  </>
                )}
              </button>
            </form>
          )}
        </Panel>

        <div className="flex flex-col gap-6">
          <SpeechBubble speaker="Anugo Mokwe" className="rotate-1">
            “Best first message: one paragraph on the problem, one on why it
            matters. I’ll bring the questions.”
          </SpeechBubble>

          <Panel color="blue" className="p-6">
            <h2 className="font-display text-3xl uppercase tracking-wide">
              Other frequencies
            </h2>
            <ul className="mt-4 space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="focus-ink flex items-center gap-3 border-[3px] border-ink bg-paper px-4 py-3 shadow-panel-sm transition-transform duration-150 ease-pulp hover:-translate-y-1"
                  >
                    <link.icon
                      className="h-5 w-5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block font-display text-xl uppercase leading-none tracking-wide">
                        {link.label}
                      </span>
                      <span className="block font-caption text-[11px] text-ink-soft">
                        {link.handle}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t-[3px] border-dashed border-ink pt-4 font-caption text-[12px] uppercase tracking-[0.16em] text-ink-soft">
              Ibadan· CET · Open to staff & lead roles
            </p>
          </Panel>
        </div>
      </div>

      <IssueFooterNav currentSlug={issue.slug} />
    </div>
  );
}
