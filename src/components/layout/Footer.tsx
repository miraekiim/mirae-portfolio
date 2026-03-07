import { Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-white/30 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Mirae Kim. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-white/60"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white/60"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
