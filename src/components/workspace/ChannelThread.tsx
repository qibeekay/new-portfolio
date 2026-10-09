import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SendIcon } from "lucide-react";
import { Message } from "./Message";

interface Sent {
  id: number;
  body: string;
  time: string;
}

interface ChannelThreadProps {
  channelName: string;
  children: React.ReactNode;
}

const now = () =>
  new Date()
    .toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    .toLowerCase();

/**
 * Wraps a channel's posted messages with a working composer — visitors can
 * actually post, and Alex answers a beat later.
 */
export function ChannelThread({ channelName, children }: ChannelThreadProps) {
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<Sent[]>([]);
  const [typing, setTyping] = useState(false);
  const [replied, setReplied] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = draft.trim();
    if (!body) return;
    setSent((current) => [...current, { id: Date.now(), body, time: now() }]);
    setDraft("");
    if (!replied) {
      setTyping(true);
      window.setTimeout(() => {
        setTyping(false);
        setReplied(true);
      }, 1400);
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl divide-y divide-work-line/60 py-4">
          {children}

          {sent.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <Message
                author="You"
                badge="Visitor"
                initials="YO"
                avatarColor="#1264a3"
                time={message.time}
              >
                <p>{message.body}</p>
              </Message>
            </motion.div>
          ))}

          <AnimatePresence>
            {typing ? (
              <motion.p
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-2 px-4 py-3 text-[13px] italic text-work-muted sm:px-6"
              >
                <span className="flex gap-1" aria-hidden="true">
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={dot}
                      className="h-1.5 w-1.5 rounded-full bg-work-muted"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        delay: dot * 0.15,
                        ease: "linear",
                      }}
                    />
                  ))}
                </span>
                Anugo Mokwe is typing…
              </motion.p>
            ) : null}
          </AnimatePresence>

          {replied ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            >
              <Message time={now()} reactions={[{ emoji: "👋", count: 1 }]}>
                <p>
                  Thanks for writing in{" "}
                  <span className="font-semibold">#{channelName}</span> — this
                  workspace is a demo, so drop your email in{" "}
                  <span className="font-semibold text-work-blue">#contact</span>{" "}
                  and I’ll reply properly within a working day.
                </p>
              </Message>
            </motion.div>
          ) : null}
        </div>
      </div>

      <form
        onSubmit={submit}
        className="border-t border-work-line bg-white px-4 py-3 sm:px-6"
      >
        <div className="mx-auto flex max-w-4xl items-end gap-2 rounded-lg border border-work-line px-3 py-2 focus-within:border-work-muted/60">
          <label htmlFor="composer" className="sr-only">
            Message #{channelName}
          </label>
          <input
            id="composer"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={`Message #${channelName}`}
            className="min-w-0 flex-1 bg-transparent py-1 text-[15px] text-work-ink outline-none placeholder:text-work-muted/70"
          />

          <button
            type="submit"
            disabled={!draft.trim()}
            className="rounded bg-work-green p-1.5 text-white transition-colors duration-150 ease-pulp hover:bg-work-green/85 disabled:bg-work-line disabled:text-work-muted"
            aria-label="Send message"
          >
            <SendIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </form>
    </>
  );
}
