import { getArticlesByCategory } from "@/lib/newt";
import { format } from "date-fns";
import Link from "next/link";

export default async function page({
  params: {category}
}: {
  params: {
    category: string;
  }
}) {
  const articles = await getArticlesByCategory(category);

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="font-bold text-2xl mb-6">{category}</h1>
      <ul className="space-y-2 col-span-2">
            {articles.map((article) => {
              return (
                <li
                  key={article._id}
                  className="relative border rounded-lg p-4 hover:bg-accent"
                >
                  <h3>
                    <Link href={`articles/${article.slug}`}>
                      {article.title}
                      <span className="absolute inset-0" />
                    </Link>
                  </h3>
                  <time className="text-sm text-muted-foreground">
                    {format(new Date(article._sys.createdAt), "yyyyMMdd")}
                  </time>
                </li>
              );
            })}
          </ul>
    </div>
  )
}
