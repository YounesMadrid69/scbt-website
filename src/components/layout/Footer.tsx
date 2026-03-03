import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";
import { CLUB_INFO } from "@/lib/constants";

const clubLinks = [
  { label: "Histoire", href: "/le-club#histoire" },
  { label: "Valeurs", href: "/le-club#valeurs" },
  { label: "Staff", href: "/le-club#staff" },
  { label: "Infrastructures", href: "/le-club#infrastructures" },
];

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Équipes", href: "#equipes" },
  { label: "Actualités", href: "#actualites" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-deep">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 - Club identity */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-scbt.png"
                alt={CLUB_INFO.name}
                width={60}
                height={60}
              />
            </Link>
            <p className="text-sm font-medium text-white">
              {CLUB_INFO.name}
            </p>
            <p className="text-sm text-gray-400">
              Depuis {CLUB_INFO.founded}
            </p>
          </div>

          {/* Column 2 - Le Club */}
          <div>
            <h3 className="font-[family-name:var(--font-verbatim)] uppercase tracking-wider text-sm text-gold mb-4">
              Le Club
            </h3>
            <ul className="space-y-2">
              {clubLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Navigation */}
          <div>
            <h3 className="font-[family-name:var(--font-verbatim)] uppercase tracking-wider text-sm text-gold mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="font-[family-name:var(--font-verbatim)] uppercase tracking-wider text-sm text-gold mb-4">
              Contact
            </h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{CLUB_INFO.address}</p>
              <p>{CLUB_INFO.stadium}</p>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={CLUB_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 transition-colors duration-200 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={CLUB_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 transition-colors duration-200 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-sm text-gray-400">
            &copy; 2024 {CLUB_INFO.name}. Tous droits r&eacute;serv&eacute;s.
          </p>
        </div>
      </div>
    </footer>
  );
}
