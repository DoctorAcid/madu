"use client";

import React, { useEffect, useRef, useState } from "react";
import ArrowRightSvg from "@/public/assets/svg/ArrowRightSvg";

type FormData = {
  name: string;
  email: string;
  type: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const SERVICES = [
  { value: "ui-ux", label: "UI/UX Design" },
  { value: "development", label: "Frontend Development" },
  { value: "both", label: "Design + Development" },
  { value: "mobile", label: "Mobile App UI" },
  { value: "other", label: "Not sure yet — let's talk" },
];

const validate = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Please enter your name";
  if (!data.email.trim()) {
    errors.email = "Please enter a valid email address";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!data.type) errors.type = "Please select a service";
  if (!data.message.trim()) errors.message = "Please add a message";
  return errors;
};

const inputBase =
  "w-full bg-white border border-gray-1 rounded-lg px-6 py-3 focus:border-primary-1 outline-none py-3 text-black-2 placeholder:text-dark-gray-2 transition-colors duration-200";

const CustomSelect = ({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = SERVICES.find((s) => s.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between bg-white border rounded-lg px-6 py-3 text-left transition-colors duration-200 outline-none cursor-pointer ${
          open ? "border-primary-1" : error ? "border-red-400" : "border-gray-1"
        } ${selected ? "text-black-2" : "text-dark-gray-2"}`}
      >
        <span>{selected ? selected.label : "Select a service"}</span>
        <svg
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className={`shrink-0 transition-transform duration-200 text-dark-gray-2 ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-1 rounded-lg overflow-hidden shadow-md">
          {SERVICES.map((s) => (
            <li
              key={s.value}
              onClick={() => {
                onChange(s.value);
                setOpen(false);
              }}
              className={`px-6 py-3 cursor-pointer transition-colors duration-150 ${
                s.value === value
                  ? "bg-primary-1 text-primary-5"
                  : "text-black-2 hover:bg-primary-5 hover:text-primary-1"
              }`}
            >
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <label className="eyebrow text-primary-2" style={{ fontSize: "14px" }}>
      {label}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs mt-0.5">{error}</p>}
  </div>
);

const ContactPage = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    type: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set =
    (field: keyof FormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
    } catch {
      setStatus("idle");
      setErrors({ message: "Something went wrong — please try again." });
    }
  };

  return (
    <section className="w-full">
      <div className="grid grid-cols-2 min-h-screen p-20 gap-20 relative">
        {/* HERO */}
        <div className="col-span-1 flex pt-20 w-full">
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col w-full">
              <h1 className="display-2 text-black-2">Madunaga6</h1>
              <h1 className="display-4 w-full text-right text-black-2">
                @gmail
              </h1>
              <h1 className="display-2 w-full text-center text-black-2">
                .com
              </h1>
            </div>
            <p className="max-w-[600px] text-dark-gray-1">
              Whether you have a detailed brief or just an early idea — I&apos;d
              love to hear about it. I typically reply within 24 hours.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="col-span-1 w-full flex items-end pt-40">
          {status === "sent" ? (
            <div className="flex flex-col gap-4">
              <h4 className="text-primary-1">Message sent!</h4>
              <p className="text-dark-gray-1">
                Thanks for reaching out — I&apos;ll get back to you within 24
                hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="w-full flex flex-col gap-4"
            >
              <div className="flex flex-col gap-8">
                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Your Name" error={errors.name}>
                    <input
                      className={inputBase}
                      type="text"
                      name="name"
                      placeholder="Alex Morgan"
                      autoComplete="name"
                      value={form.name}
                      onChange={set("name")}
                    />
                  </Field>

                  <Field label="Email Address" error={errors.email}>
                    <input
                      className={inputBase}
                      type="email"
                      name="email"
                      placeholder="alex@company.com"
                      autoComplete="email"
                      value={form.email}
                      onChange={set("email")}
                    />
                  </Field>
                </div>

                {/* Row 2: Project type */}
                <Field label="What do you need?" error={errors.type}>
                  <CustomSelect
                    value={form.type}
                    onChange={(val) => {
                      setForm((prev) => ({ ...prev, type: val }));
                      if (errors.type)
                        setErrors((prev) => ({ ...prev, type: undefined }));
                    }}
                    error={errors.type}
                  />
                </Field>

                {/* Row 3: Message */}
                <Field
                  label="Tell me about your project"
                  error={errors.message}
                >
                  <textarea
                    className={`${inputBase} resize-none`}
                    name="message"
                    placeholder="Share as much or as little as you like — timeline, goals, rough budget…"
                    rows={6}
                    value={form.message}
                    onChange={set("message")}
                  />
                </Field>
              </div>

              {/* Submit */}
              <div className="w-full flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="relative group w-full flex items-center justify-between gap-4 button-text text-primary-1 bg-white hover:text-primary-5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 rounded-lg outline-none cursor-pointer py-4 pl-8 pr-6 overflow-hidden"
                >
                  <div className="absolute left-0 right-0 bottom-0 w-full h-0 cursor-pointer bg-primary-1 group-hover:h-full transition-all duration-300 ease-in-out" />
                  <div className="z-1 flex items-center justify-between gap-8 w-full">
                    <span>
                      {status === "sending" ? "Sending…" : "Send Message"}
                    </span>
                    <ArrowRightSvg className="stroke-primary-1 group-hover:stroke-primary-5" />
                  </div>
                </button>

                <p className="text-xs text-dark-gray-2 leading-relaxed">
                  No spam, no mailing lists. Your details are used only to reply
                  to your message.{" — "}
                  <a
                    href="mailto:hello@madushan.com"
                    className="underline underline-offset-[3px] hover:text-primary-1 transition-colors duration-200"
                  >
                    hello@madushan.com
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
