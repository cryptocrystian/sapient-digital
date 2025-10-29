import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-800 border-t border-line-700">
      <div className="mx-auto max-w-7xl px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-2xl font-semibold text-accent-500 mb-4">
              Sapient Digital
            </h3>
            <p className="text-fg-300 text-sm mb-4">
              Senior-led agency delivering integrated PR, content, and SEO systems.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-700 border border-line-700">
              <span className="text-xs text-fg-300">Innovation Partner:</span>
              <a
                href="https://saipienlabs.com"
                className="text-xs text-fg-100 hover:text-accent-400 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Saipien Labs
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-fg-100 mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services#pr"
                  className="text-fg-300 hover:text-fg-100 text-sm transition"
                >
                  Public Relations
                </Link>
              </li>
              <li>
                <Link
                  href="/services#content"
                  className="text-fg-300 hover:text-fg-100 text-sm transition"
                >
                  Content Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/services#seo"
                  className="text-fg-300 hover:text-fg-100 text-sm transition"
                >
                  Technical SEO
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-fg-100 mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-fg-300 hover:text-fg-100 text-sm transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="text-fg-300 hover:text-fg-100 text-sm transition"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/approach"
                  className="text-fg-300 hover:text-fg-100 text-sm transition"
                >
                  Approach
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-fg-300 hover:text-fg-100 text-sm transition"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-fg-100 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/resources"
                  className="text-fg-300 hover:text-fg-100 text-sm transition"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-fg-300 hover:text-fg-100 text-sm transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-line-700 text-center">
          <p className="text-fg-300 text-sm">
            © {currentYear} Sapient Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
