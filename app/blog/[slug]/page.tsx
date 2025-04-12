type Props = {
  params: {
    slug: string
  }
}

export default function BlogPost({ params }: Props) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">
        Article : {params.slug}
      </h1>
      {/* Contenu de l'article */}
    </article>
  );
}
