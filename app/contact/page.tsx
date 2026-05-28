"use client";

import React, { useEffect, useRef, useState } from "react";
import ArrowRightSvg from "@/public/assets/svg/ArrowRightSvg";
import Link from "next/link";
import Fiverr from "@/components/common/buttons/social/Fiverr";
import Upwork from "@/components/common/buttons/social/Upwork";

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
        <p>{selected ? selected.label : "Select a service"}</p>
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
              className={`px-6 py-4 cursor-pointer transition-colors duration-150 ${
                s.value === value
                  ? "bg-primary-1 text-primary-5"
                  : "text-black-2 hover:bg-primary-5 hover:text-primary-1"
              }`}
            >
              <p>{s.label}</p>
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

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen p-4 md:p-8 lg:p-12 xl:p-16 2xl:p-20 gap-12 md:gap-16 lg:gap-20 relative">
        {/* HERO */}
        <div className="col-span-1 flex pt-20 w-full">
          <div className="w-full flex flex-col gap-8">
            <Link href="mailto:hello@madushan.design">
              <div className="group flex flex-col w-full cursor-pointer">
                <div className="w-full flex items-center justify-between">
                  <h1 className="display-2 text-black-2">Hello</h1>
                  <div className="hidden md:flex relative items-center justify-center w-20 aspect-square overflow-hidden">
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 80 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute opacity-100 group-hover:opacity-0 fill-black-2 group-hover:translate-x-40 group-hover:-translate-y-40 transition-all duration-200"
                    >
                      <path d="M4 67.9504L49.2788 22.6716C50.9459 21.0045 50.9459 18.3016 49.2788 16.6344C48.4453 15.8009 47.3527 15.3846 46.2602 15.3846H29.715V4H75.998V4.00197H76V50.285H64.6154V33.7398C64.6154 32.6473 64.1991 31.5547 63.3656 30.7212C61.6984 29.0541 58.9955 29.0541 57.3284 30.7212L12.0496 76L4 67.9504Z" />
                    </svg>

                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 80 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute opacity-0 -translate-x-40 translate-y-40 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 fill-primary-1 transition-all duration-200"
                    >
                      <path d="M4 67.9504L49.2788 22.6716C50.9459 21.0045 50.9459 18.3016 49.2788 16.6344C48.4453 15.8009 47.3527 15.3846 46.2602 15.3846H29.715V4H75.998V4.00197H76V50.285H64.6154V33.7398C64.6154 32.6473 64.1991 31.5547 63.3656 30.7212C61.6984 29.0541 58.9955 29.0541 57.3284 30.7212L12.0496 76L4 67.9504Z" />
                    </svg>
                  </div>

                  <div className="md:hidden relative items-center justify-center w-14 aspect-square overflow-hidden">
                    <svg
                      width="52"
                      height="52"
                      viewBox="0 0 80 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute opacity-100 group-hover:opacity-0 fill-black-2 group-hover:translate-x-40 group-hover:-translate-y-40 transition-all duration-200"
                    >
                      <path d="M4 67.9504L49.2788 22.6716C50.9459 21.0045 50.9459 18.3016 49.2788 16.6344C48.4453 15.8009 47.3527 15.3846 46.2602 15.3846H29.715V4H75.998V4.00197H76V50.285H64.6154V33.7398C64.6154 32.6473 64.1991 31.5547 63.3656 30.7212C61.6984 29.0541 58.9955 29.0541 57.3284 30.7212L12.0496 76L4 67.9504Z" />
                    </svg>
                  </div>
                </div>
                <h1 className="display-4 w-full text-black-2 group-hover:text-primary-1 transition-all duration-200">
                  @madushan
                </h1>
                <h1 className="display-2 w-full text-right text-black-2">
                  .design
                </h1>
              </div>
            </Link>
            <p className="max-w-[600px] text-dark-gray-1">
              Whether you have a detailed brief or just an early idea — I&apos;d
              love to hear about it. I typically reply within 24 hours.
            </p>
            <div className="flex items-center gap-2 bg-white w-fit px-4 py-3 rounded-lg">
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                className="stroke-black-2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>

              <div className="flex gap-2 items-center">
                <p className="text-black-2" style={{ fontSize: "14px" }}>
                  Usually replies within
                </p>{" "}
                <p
                  className="eyebrow text-primary-1"
                  style={{ fontSize: "14px" }}
                >
                  24 hours
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 h-full justify-end">
              <p className="eyebrow text-black-2" style={{ fontSize: "14px" }}>
                Or hire me on
              </p>
              <div className="flex items-center gap-4">
                <Upwork className="fill-primary-2 group-hover:fill-primary-1" />
                <Fiverr className="fill-primary-2 group-hover:fill-primary-1" />
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="col-span-1 w-full flex items-end ">
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
              className="w-full flex flex-col gap-4 bg-white/50 rounded-2xl p-6 md:p-8"
            >
              <div className="flex flex-col gap-8">
                <h5 className="max-w-[280px] text-black-2">
                  Drop your message here
                </h5>
                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Field label="Your Name" error={errors.name}>
                    <input
                      className={`${inputBase} ${errors.name ? "border-red-400" : ""}`}
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
                      className={`${inputBase} ${errors.name ? "border-red-400" : ""}`}
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
                    className={`${inputBase} resize-none ${errors.name ? "border-red-400" : ""}`}
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
                  className="relative group w-full flex items-center justify-between gap-4 button-text text-primary-5 bg-primary-1 hover:text-primary-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 rounded-lg outline-none cursor-pointer py-4 pl-8 pr-6 overflow-hidden"
                >
                  <div className="absolute left-0 right-0 bottom-0 w-full h-0 cursor-pointer bg-white group-hover:h-full transition-all duration-300 ease-in-out" />
                  <div className="z-1 flex items-center justify-between gap-8 w-full">
                    <span>
                      {status === "sending" ? "Sending…" : "Send Message"}
                    </span>
                    <ArrowRightSvg className="stroke-primary-5 group-hover:stroke-primary-1" />
                  </div>
                </button>

                <p className="text-xs text-dark-gray-2 leading-relaxed">
                  No spam, no mailing lists. Your details are used only to reply
                  to your message.{" — "}
                  <a
                    href="mailto:hello@madushan.design"
                    className="underline underline-offset-[3px] hover:text-primary-1 transition-colors duration-200"
                  >
                    hello@madushan.design
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
