import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getArticles, getCategories, getStaffs } from "@/lib/newt";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const articles = await getArticles();
  const staffs = await getStaffs();

  return (
    <main className="">
      <section className="container py-10">
        <h2 className="font-bold text-3xl mb-6">Member</h2>
        <ul className="grid grid-cols-5 gap-6">
          {staffs.map((staff) => {
            return (
              <li
                key={staff._id}
                className="overflow-auto relative border rounded-lg p-4 hover:bg-accent"
              >
                <div className="aspect-video border rounded-lg bg-muted-foreground mb-4"></div>
                <h3>
                  <Link href={`staffs/${staff._id}`}>
                    {staff.fullName}
                    <span className="absolute inset-0" />
                  </Link>
                </h3>
                <time className="text-sm text-muted-foreground">
                  {format(new Date(staff._sys.createdAt), "yyyyMMdd")}
                </time>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="container">
        <h2 className="font-bold text-3xl mb-6">Notice</h2>
        <div className="grid grid-cols-3 gap-6">
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
          <div>
            <h2>Category</h2>
            <ul>
              {(await getCategories()).map((category) => (
                <li key={category._id}>
                  <Button asChild variant='ghost'>
                    <Link href={`/news/${category._id}`}>
                      {category.name}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <h2>Contact</h2>
        <form
          method="post"
          action="https://aim-gonbe.form.newt.so/v1/GpHkSC5j8"
        >
          <Input type="text" name="Full name" />
          <Button type="submit">Submit</Button>
        </form>
      </section>
    </main>
  );
}
