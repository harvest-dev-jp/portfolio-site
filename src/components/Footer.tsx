import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-harvest-900 text-harvest-100 mt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-semibold mb-4 text-white">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/works" className="hover:text-white transition-colors">
                  Works
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Projects</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/harvest-dev-jp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Portfolio
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@example.com"
                  className="hover:text-white transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Brand</h4>
            <p className="text-sm">
              実り、信頼、AI活用、落ち着いた雰囲気
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-harvest-800 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <p className="text-sm">
                © {currentYear} <span className="font-semibold">Harvest</span>. All rights reserved.
              </p>
            </div>
            <div className="text-sm mt-4 md:mt-0">
              <p>Personal Developer Portfolio</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
