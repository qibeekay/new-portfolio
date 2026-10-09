import React, { useState } from "react";
import { motion } from "framer-motion";
import { GiftIcon, LinkIcon } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

/** Contact as a letter laid on the desk, sealed with a vermilion stamp. */
export function Letter() {
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
    "focus-sumi w-full border-b border-sumi/40 bg-transparent px-1 py-2 font-edo text-[15px] text-sumi placeholder:text-sumi-wash/70";

  return (
    <div className="flex h-full flex-col justify-center">
      <p className="font-edo text-[11px] tracking-[0.42em] text-edo-vermilion">
        文 · THE LETTER
      </p>
      <h3 className="mt-3 font-edo text-3xl font-semibold text-sumi">
        Send word
      </h3>

      <div className="mt-7 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border border-sumi/30 bg-washi-light/80 p-6 sm:p-8">
          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
              role="status"
            >
              <span className="grid h-16 w-16 place-items-center bg-edo-vermilion font-edo-accent text-xl text-washi-light seal-stamp">
                受
              </span>
              <p className="mt-4 font-edo text-2xl font-semibold text-sumi">
                The letter is received.
              </p>
              <p className="mt-2 font-edo text-[15px] leading-loose text-sumi-soft">
                Thank you, {name.split(" ")[0] || "friend"}. A reply follows
                within one working day.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setName("");
                  setEmail("");
                  setMessage("");
                }}
                className="focus-sumi mt-6 border border-sumi/50 px-4 py-2 font-edo text-xs tracking-[0.24em] text-sumi transition-colors duration-200 ease-pulp hover:bg-sumi hover:text-washi-light"
              >
                WRITE ANOTHER
              </button>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="edo-name"
                    className="font-edo text-[10px] tracking-[0.3em] text-sumi-wash"
                  >
                    姓名 · NAME
                  </label>
                  <input
                    id="edo-name"
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
                    htmlFor="edo-email"
                    className="font-edo text-[10px] tracking-[0.3em] text-sumi-wash"
                  >
                    返信先 · REPLY TO
                  </label>
                  <input
                    id="edo-email"
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
                  htmlFor="edo-message"
                  className="font-edo text-[10px] tracking-[0.3em] text-sumi-wash"
                >
                  用件 · THE MATTER
                </label>
                <textarea
                  id="edo-message"
                  rows={4}
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  className={`${field} resize-none`}
                  placeholder="What are you building, and where does it hurt?"
                />
              </div>

              {status === "error" ? (
                <p
                  role="alert"
                  className="font-edo text-[13px] tracking-[0.08em] text-edo-vermilion"
                >
                  A name, a valid address, and a line or two on the matter are
                  required.
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "sending"}
                className="focus-sumi inline-flex items-center gap-3 bg-sumi px-6 py-3 font-edo text-xs tracking-[0.3em] text-washi-light transition-colors duration-200 ease-pulp hover:bg-edo-indigo disabled:opacity-70"
              >
                {status === "sending"
                  ? "送信中 · SENDING"
                  : "封をする · SEAL & SEND"}
              </button>
            </form>
          )}
        </div>

        <div>
          <p className="font-edo text-[15px] leading-loose text-sumi-soft">
            Best first letter: one paragraph on the problem, one on why it
            matters. I bring the questions.
          </p>
          <ul className="mt-6 space-y-4">
            {[
              { label: "GitHub", handle: "@qibeekay", icon: GiftIcon },
              {
                label: "LinkedIn",
                handle: "/in/qibeekay",
                icon: LinkIcon,
              },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href="#"
                  className="focus-sumi group flex items-center gap-3 border-b border-sumi/25 pb-3 text-sumi transition-colors duration-200 ease-pulp hover:text-edo-vermilion"
                >
                  <link.icon className="h-4 w-4" aria-hidden="true" />
                  <span className="font-edo text-base">{link.label}</span>
                  <span className="ml-auto font-edo text-[12px] tracking-[0.16em] text-sumi-wash">
                    {link.handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-edo text-[11px] tracking-[0.28em] text-sumi-wash">
            里斯本 · Ibadan· OPEN TO STAFF & LEAD ROLES
          </p>
        </div>
      </div>
    </div>
  );
}
