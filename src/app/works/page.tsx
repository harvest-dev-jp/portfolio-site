export default function Works() {
  const projects = [
    {
      id: 1,
      title: "プロジェクト 1",
      description: "説明がここに入ります。",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      link: "#",
    },
    {
      id: 2,
      title: "プロジェクト 2",
      description: "説明がここに入ります。",
      technologies: ["Next.js", "Node.js", "PostgreSQL"],
      link: "#",
    },
    {
      id: 3,
      title: "プロジェクト 3",
      description: "説明がここに入ります。",
      technologies: ["Python", "TensorFlow", "FastAPI"],
      link: "#",
    },
    {
      id: 4,
      title: "プロジェクト 4",
      description: "説明がここに入ります。",
      technologies: ["React", "Firebase", "Stripe"],
      link: "#",
    },
    {
      id: 5,
      title: "プロジェクト 5",
      description: "説明がここに入ります。",
      technologies: ["Next.js", "AWS", "OpenAI API"],
      link: "#",
    },
    {
      id: 6,
      title: "プロジェクト 6",
      description: "説明がここに入ります。",
      technologies: ["Vue.js", "Django", "Docker"],
      link: "#",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="container-md section-py">
        <div className="max-w-3xl">
          <h1 className="heading-1 mb-6">Works</h1>
          <p className="text-lg text-harvest-600">
            これまでに開発したプロジェクトと、各プロジェクトで活用した技術スタックを紹介しています。
          </p>
        </div>
      </section>

      {/* Works Status */}
      <section className="container-md section-py">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card border-harvest-200 bg-harvest-50">
            <h2 className="heading-2 mb-4">準備中</h2>
            <p className="text-harvest-600">
              ただいまコンテンツを準備中です。しばらくお待ちください。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
