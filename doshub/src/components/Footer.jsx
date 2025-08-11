/**
 * Footer component with contact information and social links
 * Features:
 * - Contact info placeholders
 * - Social media links
 * - Copyright notice
 */
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Contact Information */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Contact Us</h2>
            <address className="not-italic">
              <p className="mb-2">Barangay Dos Office</p>
              <p className="mb-2">123 Main Street</p>
              <p className="mb-2">City, Province 1234</p>
              <p className="mb-2">
                <span className="sr-only">Phone:</span>
                <a href="tel:+639123456789" className="hover:text-primary-300">
                  +63 912 345 6789
                </a>
              </p>
              <p>
                <span className="sr-only">Email:</span>
                <a href="mailto:info@doshub.ph" className="hover:text-primary-300">
                  info@doshub.ph
                </a>
              </p>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Office Hours</h2>
            <ul>
              <li className="mb-2">Monday - Friday: 8:00 AM - 5:00 PM</li>
              <li className="mb-2">Saturday: 8:00 AM - 12:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="#facebook"
                className="hover:text-primary-300"
                aria-label="Follow us on Facebook"
              >
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                </svg>
              </a>
              <a
                href="#twitter"
                className="hover:text-primary-300"
                aria-label="Follow us on Twitter"
              >
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.95,4.57a10,10,0,0,1-2.82.77,4.96,4.96,0,0,0,2.16-2.72,9.9,9.9,0,0,1-3.12,1.19,4.92,4.92,0,0,0-8.39,4.49A14,14,0,0,1,1.64,3.16,4.92,4.92,0,0,0,3.19,9.72a4.86,4.86,0,0,1-2.23-.61v.06A4.92,4.92,0,0,0,4.94,14a5,5,0,0,1-2.21.08,4.93,4.93,0,0,0,4.6,3.42,9.85,9.85,0,0,1-7.29,2A14,14,0,0,0,7.53,21c9.14,0,14.12-7.58,14.12-14.12q0-.32-.01-.64A10.1,10.1,0,0,0,24,3.78"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {currentYear} DosHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
