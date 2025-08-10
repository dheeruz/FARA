// SocialMedia.jsx
export default function SocialMedia() {
  return (
    <section className="bg-white py-12">
      <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">📱 Follow Us on Social Media</h2>
      <p className="text-center text-gray-600 mb-8">See our latest events & reels!</p>
      <div className="flex justify-center gap-6 text-3xl text-purple-700">
        <a href="https://instagram.com" target="_blank" rel="noreferrer">📷</a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer">▶️</a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">💼</a>
      </div>
    </section>
  );
}
