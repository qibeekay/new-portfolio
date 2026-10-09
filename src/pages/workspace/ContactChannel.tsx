import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckIcon,
  GiftIcon,
  LinkIcon,
  LoaderIcon,
  MailIcon,
} from "lucide-react";
import { Message } from "../../components/workspace/Message";
import { AttachmentCard } from "../../components/workspace/AttachmentCard";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactChannel() {
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
    window.setTimeout(() => setStatus("sent"), 1000);
  };

  const field =
    "w-full rounded-md border border-work-line px-3 py-2 text-[15px] text-work-ink outline-none transition-colors duration-150 ease-pulp placeholder:text-work-muted/70 focus:border-work-blue";

  return (
    <>
      <Message time="4:15 pm" pinned reactions={[{ emoji: "📬", count: 9 }]}>
        <p>
          Hiring, collaborating, or want to argue about render budgets? Send a
          note — I answer everything within a working day.
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "alex@qibeekay.dev", icon: MailIcon },
            { label: "github.com/qibeekay", icon: GiftIcon },
            { label: "linkedin.com/in/qibeekay", icon: LinkIcon },
          ].map((link) => (
            <a
              key={link.label}
              href="#"
              className="inline-flex items-center gap-1.5 rounded-md border border-work-line px-2.5 py-1.5 text-[13px] font-semibold text-work-blue hover:bg-work-blue/5"
            >
              <link.icon className="h-3.5 w-3.5" aria-hidden="true" />
              {link.label}
            </a>
          ))}
        </div>
      </Message>

      <Message
        time="4:16 pm"
        author="Northwind Bot"
        badge="App"
        initials="NB"
        avatarColor="#2eb67d"
      >
        <AttachmentCard
          accent="#1264a3"
          eyebrow="Form"
          title="Send Alex a message"
        >
          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              role="status"
              className="flex items-start gap-3 rounded-md bg-work-green/10 p-3"
            >
              <CheckIcon
                className="mt-0.5 h-4 w-4 shrink-0 text-work-green"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold text-work-ink">Message delivered</p>
                <p className="text-work-muted">
                  Thanks, {name.split(" ")[0] || "friend"} — a reply lands in
                  your inbox within a working day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setName("");
                    setEmail("");
                    setMessage("");
                  }}
                  className="mt-2 rounded border border-work-line bg-white px-2.5 py-1 text-[13px] font-semibold text-work-ink hover:bg-work-hover"
                >
                  Send another
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="work-name"
                    className="mb-1 block text-[12px] font-semibold text-work-muted"
                  >
                    Your name
                  </label>
                  <input
                    id="work-name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    className={field}
                    placeholder="Jane Kirby"
                  />
                </div>
                <div>
                  <label
                    htmlFor="work-email"
                    className="mb-1 block text-[12px] font-semibold text-work-muted"
                  >
                    Reply-to
                  </label>
                  <input
                    id="work-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    className={field}
                    placeholder="jane@studio.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="work-message"
                  className="mb-1 block text-[12px] font-semibold text-work-muted"
                >
                  What are you building?
                </label>
                <textarea
                  id="work-message"
                  rows={4}
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  className={`${field} resize-none`}
                  placeholder="One paragraph on the problem, one on why it matters."
                />
              </div>

              {status === "error" ? (
                <p
                  role="alert"
                  className="rounded-md bg-work-red/10 px-3 py-2 text-[13px] font-semibold text-work-red"
                >
                  Add your name, a valid email, and a line or two about the
                  work.
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-md bg-work-green px-4 py-2 text-[14px] font-bold text-white transition-colors duration-150 ease-pulp hover:bg-work-green/85 disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <LoaderIcon
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />{" "}
                    Sending
                  </>
                ) : (
                  "Send message"
                )}
              </button>
            </form>
          )}
        </AttachmentCard>
      </Message>
    </>
  );
}
