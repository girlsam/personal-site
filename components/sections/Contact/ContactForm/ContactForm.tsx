"use client";

import { useState } from "react";

import { contact } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Accessible contact form that AJAX-POSTs to Formspree (no email exposed in
 * markup). Honeypot for spam, aria-live status, disabled-while-submitting.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    try {
      const res = await fetch(contact.formAction, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        role="status"
        className="rounded-xl border border-accent/40 bg-surface/50 p-4 text-foreground"
      >
        {contact.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* honeypot: real visitors leave this empty */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="rounded-lg border border-border bg-background px-3 py-2 text-foreground"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="rounded-lg border border-border bg-background px-3 py-2 text-foreground"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="resize-y rounded-lg border border-border bg-background px-3 py-2 text-foreground"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="self-start rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send"}
      </button>

      <p role="status" aria-live="polite" className="min-h-5 text-sm text-muted">
        {status === "error" && contact.error}
      </p>
    </form>
  );
}
