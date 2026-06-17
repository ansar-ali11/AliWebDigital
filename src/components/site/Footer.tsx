import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tighter uppercase leading-[0.95]">
              Let's create the<br />
              <span className="text-electric">Standard</span>.
            </h3>
            <p className="text-white/50 mt-6 max-w-md">
              Premium web development, branding, and digital experiences for
              ambitious teams. Available for new engagements worldwide.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center mt-8 px-8 py-4 bg-electric text-white text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all"
            >
              Start a Project
            </Link>
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 gap-8 lg:gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-5">
                Studio
              </p>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="text-white/70 hover:text-electric transition-colors">About Us</Link></li>
                <li><Link to="/services" className="text-white/70 hover:text-electric transition-colors">Services</Link></li>
                <li><Link to="/pricing" className="text-white/70 hover:text-electric transition-colors">Pricing</Link></li>
                <li><Link to="/projects" className="text-white/70 hover:text-electric transition-colors">Projects</Link></li>
                <li><Link to="/contact" className="text-white/70 hover:text-electric transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-5">
                Legal
              </p>
              <ul className="space-y-3 text-sm text-white/70">
                <li><Link to="/privacy-policy" className="text-white/70 hover:text-electric transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-white/70 hover:text-electric transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/refund-policy" className="text-white/70 hover:text-electric transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-5">
              Contact
            </p>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-white/70">
                <Mail size={16} className="mt-0.5 text-electric" />
                <a href="mailto:alidigitalexpo11@gmail.com" className="hover:text-white transition-colors">alidigitalexpo11@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <Phone size={16} className="mt-0.5 text-electric" />
                <a href="tel:+919502486784" className="hover:text-white transition-colors">+91 9502486784</a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPin size={16} className="mt-0.5 text-electric" />
                <span>Kakinada, Andhra Pradesh</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.instagram.com/aliwebdigital/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="size-10 grid place-items-center border border-white/10 hover:border-electric hover:text-electric transition-colors"
              >
                <Instagram size={15} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 gap-3">
          <span>© {new Date().getFullYear()} AliWebDigital · All rights reserved</span>
          <span>Crafted with precision</span>
        </div>
      </div>
    </footer>
  );
}
