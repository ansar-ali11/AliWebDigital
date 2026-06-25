import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  projectType: z.string().min(1, "Choose a project type"),
  message: z.string().trim().min(10, "Tell us a bit more").max(2000),
});

type FormValues = z.infer<typeof schema>;

const projectTypes = [
  "Web Development",
  "Portfolio Website",
  "Business Website",
  "Admin Panel",
  "UI / UX Design",
  "Branding",
  "Other",
];

export function ContactSection() {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: values.name,
          email: values.email,
          phone: values.phone || "Not Provided",
          projectType: values.projectType,
          message: values.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success("Message sent successfully!");
      reset();
    } catch (error: any) {
  console.error("FULL ERROR:", error);

  if (error?.text) {
    console.error("EmailJS Message:", error.text);
  }

  toast.error("Failed to send message");
}finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-navy text-white" id="contact">
      <div className="max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-12 gap-16">
        {/* Left Side */}
        <div className="lg:col-span-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-electric mb-6">
            Contact
          </p>

          <h2 className="font-display font-bold text-5xl md:text-6xl uppercase tracking-tighter leading-[0.95] mb-8">
            Start a <span className="text-electric">project</span>.
          </h2>

          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">
            Tell us about your goals, timeline and budget. We'll reply within
            one business day with next steps.
          </p>

          <ul className="space-y-5 text-sm">
            <li className="flex items-center gap-4 text-white/80">
              <span className="size-10 grid place-items-center border border-white/15 text-electric">
                <Mail size={15} />
              </span>
              <a
                href="mailto:alidigitalexpo11@gmail.com"
                className="hover:text-white"
              >
                alidigitalexpo11@gmail.com
              </a>
            </li>

            <li className="flex items-center gap-4 text-white/80">
              <span className="size-10 grid place-items-center border border-white/15 text-electric">
                <Phone size={15} />
              </span>
              <a
                href="tel:+919502486784"
                className="hover:text-white"
              >
                +91 9502486784
              </a>
            </li>

            <li className="flex items-center gap-4 text-white/80">
              <span className="size-10 grid place-items-center border border-white/15 text-electric">
                <MapPin size={15} />
              </span>
              <span>
                <strong className="block text-white">Business Owner:</strong>
                Mohammad Ansar Ali
                <br />
                <strong className="block text-white mt-2">Address:</strong>
                Marshall High School Backside,
                <br />
                Madhavapatnam,
                <br />
                Kakinada, Andhra Pradesh - 533006,
                <br />
                India
              </span>
            </li>
          </ul>
        </div>

        {/* Right Side Form */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-7 grid grid-cols-2 gap-x-6 gap-y-8 self-start"
        >
          <Field label="Full Name" error={errors.name?.message}>
            <input
              type="text"
              placeholder="John Doe"
              {...register("name")}
              className="bg-transparent w-full py-3 outline-none border-b border-white/15 focus:border-electric text-white placeholder:text-white/30 transition-colors"
            />
          </Field>

          <Field label="Email" error={errors.email?.message}>
            <input
              type="email"
              placeholder="john@company.com"
              {...register("email")}
              className="bg-transparent w-full py-3 outline-none border-b border-white/15 focus:border-electric text-white placeholder:text-white/30 transition-colors"
            />
          </Field>

          <Field label="Phone" error={errors.phone?.message}>
            <input
              type="tel"
              placeholder="Optional"
              {...register("phone")}
              className="bg-transparent w-full py-3 outline-none border-b border-white/15 focus:border-electric text-white placeholder:text-white/30 transition-colors"
            />
          </Field>

          <Field
            label="Project Type"
            error={errors.projectType?.message}
          >
            <select
              {...register("projectType")}
              defaultValue=""
              className="bg-transparent w-full py-3 outline-none border-b border-white/15 focus:border-electric text-white transition-colors"
            >
              <option value="" disabled className="bg-navy">
                Select...
              </option>

              {projectTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                  className="bg-navy"
                >
                  {type}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Message"
            error={errors.message?.message}
            className="col-span-2"
          >
            <textarea
              rows={5}
              placeholder="Tell us about your project..."
              {...register("message")}
              className="bg-transparent w-full py-3 outline-none border-b border-white/15 focus:border-electric text-white placeholder:text-white/30 transition-colors resize-none"
            />
          </Field>

          <div className="col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-electric text-white text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send Inquiry"}

              <Send
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className ?? ""}>
      <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 block mb-1">
        {label}
      </label>

      {children}

      {error && (
        <p className="text-[11px] text-red-400 mt-2">
          {error}
        </p>
      )}
    </div>
  );
}