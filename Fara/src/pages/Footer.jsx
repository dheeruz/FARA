// Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-purple-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between">
        <div>
          <h3 className="text-lg font-bold">Fara Events</h3>
          <p>Making memories magical ✨</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/gallery" className="hover:underline">Gallery</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <p>📍 Chennai, India</p>
          <p>📞 +91-91002-56717</p>
          <p>📧 dheerajakula1876@gmail.com</p>
        </div>
      </div>
      <p className="text-center mt-4 text-sm text-gray-300">© {new Date().getFullYear()} Fara Events. All rights reserved.</p>
    </footer>
  );
}
