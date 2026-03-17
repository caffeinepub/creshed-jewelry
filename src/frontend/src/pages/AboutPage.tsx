import { Gem, Heart, Leaf } from "lucide-react";
import { motion } from "motion/react";

const values = [
  {
    icon: Gem,
    title: "Master Craftsmanship",
    description:
      "We work with a select group of master goldsmiths and lapidaries who have dedicated their lives to the jeweller's art. Every piece passes through dozens of skilled hands before it reaches yours.",
  },
  {
    icon: Leaf,
    title: "Ethical Sourcing",
    description:
      "We are committed to responsible sourcing. All our gemstones are certified conflict-free, and we partner only with suppliers who share our commitment to environmental and social responsibility.",
  },
  {
    icon: Heart,
    title: "Timeless Elegance",
    description:
      "We reject the ephemeral nature of fast fashion. Crushed pieces are designed to transcend trends — heirlooms in the making, crafted to be passed down through generations.",
  },
];

const team = [
  {
    name: "Amara Crushed",
    title: "Founder & Creative Director",
    bio: "With a background in classical goldsmithing and a decade spent in the ateliers of Paris and Milan, Amara founded Crushed in 2026 with a singular vision: to create jewellery that speaks.",
  },
  {
    name: "Olivier Marceau",
    title: "Head Goldsmith",
    bio: "Trained at the École de Joaillerie de Paris, Olivier brings 25 years of expertise to Crushed. His exacting standards and quiet passion for perfection define every piece we create.",
  },
  {
    name: "Sophia Laurent",
    title: "Gemologist & Buyer",
    bio: "A certified GIA gemologist, Sophia travels the world in search of the finest stones. Her refined eye ensures that only the most exceptional gems find their way into Crushed pieces.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 lg:py-36 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card/80" />
        <div className="absolute right-0 top-0 w-1/2 h-full">
          <img
            src="/assets/generated/crushed-about-founder.dim_800x600.jpg"
            alt="Crushed Story"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs tracking-[0.4em] uppercase text-gold mb-4"
            >
              Our Story
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-5xl lg:text-7xl font-medium leading-tight mb-6"
            >
              Born from a
              <br />
              <span className="italic text-gold">Love of Beauty</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground leading-relaxed text-lg"
            >
              Crushed was founded in 2026 with a single, unwavering conviction:
              that jewellery should be more than decoration. It should be a form
              of self-expression, a mark of one's story, and a gift to future
              generations.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg"
          >
            The name Crushed comes from an ancient word meaning "to adorn with
            intention." It captures our founding philosophy: that the act of
            choosing a piece of jewellery is never accidental. It is a
            declaration.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We began with a small atelier and three artisans. Today, our team of
            24 craftspeople, gemologists, and designers work across two
            continents, united by the same obsessive pursuit of excellence that
            has defined us from the start.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Each Crushed piece takes between 40 and 200 hours to create,
            depending on its complexity. We use only 18k gold and platinum,
            paired with gemstones selected individually for their exceptional
            character. Nothing is mass-produced. Everything is made to last.
          </motion.p>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 bg-card/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-px h-12 gold-gradient mx-auto mb-8" />
          <blockquote className="font-display text-3xl lg:text-4xl italic font-medium">
            "We do not make jewellery. We create memories that can be worn."
          </blockquote>
          <p className="mt-5 text-sm tracking-[0.3em] uppercase text-gold">
            — Amara Crushed
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">
            What We Stand For
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-medium">
            Our Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {values.map((val, idx) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="border border-border p-8"
            >
              <div className="w-10 h-10 border border-gold/30 flex items-center justify-center mb-5">
                <val.icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display text-xl font-medium mb-3">
                {val.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {val.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-card/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">
              The People
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-medium">
              Behind the Craft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 border border-gold/20 mx-auto mb-4 flex items-center justify-center bg-card">
                  <span className="font-display text-2xl text-gold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium mb-1">
                  {member.name}
                </h3>
                <p className="text-xs tracking-wider uppercase text-gold mb-3">
                  {member.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
