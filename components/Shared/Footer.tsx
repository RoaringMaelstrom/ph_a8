
import Link from "next/link";
import {
  MoveRight,
  Mail,
  MapPin,
} from "lucide-react";

import { SiFacebook, SiInstagram, SiYoutube } from "@icons-pack/react-simple-icons";

const categories = [
  { name: "Photo Studios", href: "/studios?category=photo-studios" },
  { name: "Sound Stages", href: "/studios?category=sound-stages" },
  { name: "Podcast Rooms", href: "/studios?category=podcast-rooms" },
  { name: "Music Suites", href: "/studios?category=music-suites" },
  { name: "Art Workshops", href: "/studios?category=art-workshops" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/about" },
  { name: "Host Your Space", href: "/add-studio" },
];

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26L22.828 21.75h-6.785l-5.314-6.947-6.06 6.947H1.36l7.73-8.835L1.172 2.25h6.957l4.804 6.35 5.311-6.35Zm-1.16 17.52h1.833L7.006 4.126H5.04l12.044 15.644Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#242424] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">

          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F06435] text-xl font-bold">
                S
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Studio<span className="text-[#F06435]">Space</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              A creative space for every great idea. Discover and book
              inspiring studios, or share your own space with a community
              of creators.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3 text-sm text-gray-400">
              <p className="flex items-center gap-3">
                <Mail size={16} className="text-[#F06435]" />
                hello@studiospace.com
              </p>

              <p className="flex items-center gap-3">
                <MapPin size={16} className="text-[#F06435]" />
                Connecting creative spaces worldwide
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-white/15 p-3 text-gray-300 transition hover:border-[#F06435] hover:bg-[#F06435] hover:text-white"
              >
                <SiInstagram size={17} />
              </a>

              <a
                href="https://www.Facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full border border-white/15 p-3 text-gray-300 transition hover:border-[#F06435] hover:bg-[#F06435] hover:text-white"
              >
                <SiFacebook size={17} />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="rounded-full border border-white/15 p-3 text-gray-300 transition hover:border-[#F06435] hover:bg-[#F06435] hover:text-white"
              >
                <XIcon />
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="rounded-full border border-white/15 p-3 text-gray-300 transition hover:border-[#F06435] hover:bg-[#F06435] hover:text-white"
              >
                <SiYoutube size={17} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-base font-semibold">Quick Links</h3>

            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition hover:pl-1 hover:text-[#F06435]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-semibold">Explore Spaces</h3>

            <ul className="mt-6 space-y-4">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-sm text-gray-400 transition hover:pl-1 hover:text-[#F06435]"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div className="lg:col-span-3">
            <h3 className="text-base font-semibold">
              Stay in the Creative Loop
            </h3>

            <p className="mt-6 text-sm leading-6 text-gray-400">
              Get updates on inspiring spaces, creative opportunities,
              and the latest StudioSpace news.
            </p>

            <form
              action="/api/newsletter"
              method="POST"
              className="mt-5"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>

              <div className="flex items-center rounded-lg border border-white/15 bg-white/5 p-1.5 transition focus-within:border-[#F06435]">
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500"
                />

                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#F06435] text-white transition hover:bg-[#D94C25]"
                >
                  <MoveRight size={18} />
                </button>
              </div>
            </form>

            <p className="mt-3 text-xs text-gray-500">
              By subscribing, you agree to receive updates from StudioSpace.
            </p>
          </div> */}
        </div> 
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center sm:flex-row sm:text-left lg:px-8">
          <p className="text-xs text-gray-500">
            © 2026 StudioSpace. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs text-gray-500">
            <Link
              href="/terms"
              className="transition hover:text-[#F06435]"
            >
              Terms of Service
            </Link>

            <Link
              href="/privacy"
              className="transition hover:text-[#F06435]"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
