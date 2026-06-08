export default function Contact() {
  return (
    <div>
      {/* Hero Section */}
      <section className="container-md section-py">
        <div className="max-w-3xl">
          <h1 className="heading-1 mb-6">Contact</h1>
          <p className="text-lg text-harvest-600">
            GitHubまたはメールでお気軽にお問い合わせください。
            Web開発、業務改善、AI活用に関するご相談を歓迎しています。
          </p>
        </div>
      </section>

      <section className="bg-harvest-50 section-py">
        <div className="container-md max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card text-center">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="heading-3 mb-2">GitHub</h3>
              <a
                href="https://github.com/harvest-dev-jp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-harvest-700 hover:text-harvest-900"
              >
                harvest-dev-jp
              </a>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">✉</div>
              <h3 className="heading-3 mb-2">メール</h3>
              <a
                href="mailto:harvest.dev.jp@gmail.com"
                className="text-harvest-700 hover:text-harvest-900"
              >
                harvest.dev.jp@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
