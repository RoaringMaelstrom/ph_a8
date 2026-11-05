
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Clapperboard,
  Mic2,
  Music2,
  Palette,
  Target,
  Users,
  Search,
  CalendarCheck,
  Lightbulb,
  ShieldCheck,
  HeartHandshake,
  Building2,
} from "lucide-react";

const audiences = [
  {
    icon: Camera,
    title: "Photographers",
    description:
      "Find professional photography studios, lighting setups, and creative environments for your next shoot.",
  },
  {
    icon: Clapperboard,
    title: "Filmmakers",
    description:
      "Discover sound stages and production spaces suitable for filming, video production, and creative projects.",
  },
  {
    icon: Mic2,
    title: "Podcasters",
    description:
      "Explore podcast rooms equipped for recording conversations, interviews, and audio content.",
  },
  {
    icon: Music2,
    title: "Musicians",
    description:
      "Find music suites and recording environments to practice, record, and produce your next track.",
  },
  {
    icon: Palette,
    title: "Artists & Creators",
    description:
      "Discover inspiring workshops and creative spaces where new ideas can take shape.",
  },
  {
    icon: Building2,
    title: "Studio Owners",
    description:
      "List your creative workspace and make it discoverable to creators looking for a place to work.",
  },
];

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover Spaces",
    description:
      "Browse creative workspaces and explore studios that match your project requirements.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Choose Your Hours",
    description:
      "Review studio details, pricing, and availability before choosing a suitable booking slot.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Make a Booking",
    description:
      "Submit your reservation and manage your booking through your personal account.",
  },
  {
    number: "04",
    icon: Lightbulb,
    title: "Create & Produce",
    description:
      "Bring your ideas to life in a space designed to support your creative work.",
  },
];

const values = [
  {
    icon: Target,
    title: "Accessibility",
    description:
      "We want creators to have an easier way to discover and access spaces suited to their work.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We bring studio hosts and creative professionals together through a shared platform.",
  },
  {
    icon: HeartHandshake,
    title: "Trust & Transparency",
    description:
      "Clear pricing, studio information, host profiles, and booking details help users make informed decisions.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-base-200 text-base-content">

      {/* Hero Section */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">

        <div>
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
            About StudioSpace
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Every great idea deserves the{" "}
            <span className="text-primary">
              right space.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-base-content/70">
            StudioSpace is a peer-to-peer marketplace that connects
            creative professionals with inspiring workspaces.
            Whether you are producing a film, capturing photographs,
            recording a podcast, or making music, we help you discover
            spaces where your ideas can become reality.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-content transition hover:bg-secondary"
            >
              Explore Studios
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/register"
              className="rounded-lg border border-base-300 px-6 py-3.5 text-sm font-semibold text-base-content transition hover:border-primary hover:text-primary"
            >
              Become a Host
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
              alt="Creative workspace with a modern studio interior"
              className="h-[350px] w-full object-cover sm:h-[450px]"
            />
          </div>

          <div className="absolute -bottom-6 -left-3 max-w-[240px] rounded-xl border border-base-300 bg-base-100 p-5 shadow-xl sm:-left-6">
            <p className="text-sm font-semibold text-base-content">
              Your space. Your creativity.
            </p>

            <p className="mt-1 text-xs leading-5 text-base-content/65">
              Discover a workspace that fits your next big idea.
            </p>
          </div>
        </div>
      </section>

      {/* Why StudioSpace */}
      <section className="bg-base-100 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">

          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Why StudioSpace?
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              A better connection between spaces and creators.
            </h2>

            <p className="mt-6 leading-8 text-base-content/70">
              Finding the right environment is an important part of
              bringing a creative project to life. Photographers need
              studios, filmmakers need production spaces, podcasters
              need recording rooms, and musicians need places to create.
            </p>

            <p className="mt-4 leading-8 text-base-content/70">
              At the same time, studio owners have spaces that can
              serve other creators. StudioSpace brings these two sides
              together in one marketplace, making it easier to discover
              available workspaces, compare their details, and manage
              reservations.
            </p>

            <p className="mt-4 leading-8 text-base-content/70">
              Our goal is to make creative workspace sharing more
              accessible while helping studio owners connect with
              people who can benefit from their spaces.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=700&q=85"
                alt="Professional photography equipment"
                className="h-64 w-full object-cover"
              />
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=700&q=85"
                alt="Music recording studio"
                className="h-64 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">
            Who We Serve
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Built for people who create.
          </h2>

          <p className="mt-5 leading-7 text-base-content/70">
            Whether you need a place to work or have a space to share,
            StudioSpace brings the creative community together.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((person) => {
            const Icon = person.icon;

            return (
              <div
                key={person.title}
                className="rounded-2xl border border-base-300 bg-base-100 p-7 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {person.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-base-content/70">
                  {person.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-base-300 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Simple & Convenient
            </span>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              From discovery to creation.
            </h2>

            <p className="mt-5 leading-7 text-base-content/70">
              Finding and booking your next creative workspace
              is designed to be straightforward.
            </p>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.number}>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">
                      {step.number}
                    </span>

                    <Icon size={27} className="text-primary" />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-base-content/70">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">
            What Matters to Us
          </span>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            What drives StudioSpace.
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div key={value.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={27} />
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {value.title}
                </h3>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-base-content/70">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Host CTA */}
      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary px-7 py-14 text-center text-primary-content sm:px-12 sm:py-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Have a space worth sharing?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-primary-content/85 sm:text-base">
            Make your creative workspace discoverable. List your
            studio on StudioSpace and connect with creators looking
            for the right environment for their projects.
          </p>

          <Link
            href="/add-studio"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-base-100 px-6 py-3.5 text-sm font-bold text-primary transition hover:bg-base-200"
          >
            List Your Studio
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </main>
  );
}