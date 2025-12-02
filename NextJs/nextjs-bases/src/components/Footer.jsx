"use client";
import { FaGithub,  FaLinkedin  } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-gray-300 py-6 mt-10">
      <div className="max-w-full mx-auto px-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">

        {/* Copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="font-semibold">Jemmysan</span>. Tous droits réservés.
        </p>

        {/* Social icons */}
        <div className="flex space-x-6 text-xl">
          <a
            href="https://github.com/TON_GITHUB"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaGithub />
          </a>

          <a
            href="https://linkedin.com/in/TON_LINKEDIN"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
