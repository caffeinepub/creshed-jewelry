import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Message sent! We'll be in touch within 24 hours.");
  };

  return (
    <div>
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs tracking-[0.4em] uppercase text-gold mb-3"
        >
          Get in Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl lg:text-5xl font-medium"
        >
          Contact Us
        </motion.h1>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl font-medium mb-4">
                Let's Speak
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Whether you're looking for a bespoke commission, need guidance
                choosing a gift, or have a question about your order — our team
                is always delighted to assist.
              </p>
            </motion.div>

            {[
              {
                icon: Mail,
                label: "Email",
                value: "hello@crushed.com",
                href: "mailto:hello@crushed.com",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+91 70118 35049",
                href: "tel:+917011835049",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "India",
              },
              {
                icon: Clock,
                label: "Hours",
                value: "Mon–Sat: 10am–7pm IST",
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-4"
              >
                <div className="w-9 h-9 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-gold mb-1">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-pre-line"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-gold/30 p-10 text-center"
                data-ocid="contact.success_state"
              >
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mx-auto mb-5">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-display text-2xl font-medium mb-3">
                  Message Received
                </h3>
                <p className="text-muted-foreground text-sm">
                  Thank you for reaching out. A member of our team will respond
                  within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-6 text-xs tracking-widest uppercase text-gold border-b border-gold/40 pb-0.5"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1.5 block">
                      Name <span className="text-gold">*</span>
                    </Label>
                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      data-ocid="contact.name_input"
                      placeholder="Your name"
                      className="bg-card border-border focus:border-gold placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <div>
                    <Label className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1.5 block">
                      Email <span className="text-gold">*</span>
                    </Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      data-ocid="contact.email_input"
                      placeholder="hello@example.com"
                      className="bg-card border-border focus:border-gold placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1.5 block">
                    Subject
                  </Label>
                  <Input
                    value={form.subject}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, subject: e.target.value }))
                    }
                    data-ocid="contact.subject_input"
                    placeholder="How can we help?"
                    className="bg-card border-border focus:border-gold placeholder:text-muted-foreground/40"
                  />
                </div>

                <div>
                  <Label className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1.5 block">
                    Message <span className="text-gold">*</span>
                  </Label>
                  <Textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    data-ocid="contact.message_textarea"
                    rows={6}
                    placeholder="Tell us about your enquiry..."
                    className="bg-card border-border focus:border-gold placeholder:text-muted-foreground/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  data-ocid="contact.submit_button"
                  className="w-full gold-gradient text-background py-4 text-sm tracking-widest uppercase font-medium hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
