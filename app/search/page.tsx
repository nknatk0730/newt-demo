import { searchArticles } from "@/lib/newt";
import { format } from "date-fns";
import Link from "next/link";

export default async function page({
  searchParams: {
    q
  }
}: {
  searchParams: {
    q: string;
  }
}) {
  const articles = await searchArticles(q);
  return (
    <div className="container max-w-lg py-10">
      <h1 className="font-bold text-2xl mb-6">Search &apos;{q}&apos; Result</h1>

      <ul className="space-y-2">
          {articles.map((article) => {
            return (
              <li key={article._id} className="relative border rounded-lg p-4 hover:bg-accent">
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