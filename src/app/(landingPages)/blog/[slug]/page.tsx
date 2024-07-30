import { Container } from "@/components";
import { ghostContentApi } from "@/services/ghost";
import { getPageMetaData } from "@/utils/common";
import { PostOrPage } from "@tryghost/content-api";
import Link from "next/link";
import { DownloadButtons, TopBanner } from "../../_components";
export const dynamicParams = true;

const getRandomThreeItemList = (posts: PostOrPage[]) => {
  const randomList: PostOrPage[] = [];

  let count = 0;

  for (let post of posts) {
    count++;
    if (count <= 3) {
      randomList.push(post);
    } else {
      if (Math.random() * count < 1) {
        randomList[Math.floor(Math.random() * 3)] = post;
      }
    }
  }

  return randomList;
};

export async function generateMetadata({ params }: any) {
  const slug = params.slug;
  const post = await ghostContentApi.posts.read({ slug });
  return getPageMetaData({
    title: post.title || "Post not found",
    description: post.excerpt || "Post not found",
  });
}

export default async function QuestionPage({ params }: any) {
  const posts = await ghostContentApi.posts.browse({
    limit: "all",
  });
  const post = await ghostContentApi.posts.read({ slug: params.slug });
  const suggestions = getRandomThreeItemList(
    posts.filter((p) => p.slug !== post.slug)
  );

  return (
    <TopBanner>
      <Container>
        <h1 className="text-center heading-1 text-textPrimary">
          <span className="text-primary whitespace-pre-wrap">
            {post?.title || "Blog not found"}
          </span>
        </h1>
        <p className="max-w-screen-md mx-auto body-1 mt-4 whitespace-pre-wrap">
          {post && post?.html && (
            <div
              suppressHydrationWarning
              dangerouslySetInnerHTML={{ __html: post.html }}
            ></div>
          )}
        </p>
        <div className="pt-6">
          <p className="text-center heading-2">
            To get more personalized answers, <br /> download now
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <DownloadButtons />
          </div>
        </div>
        <div className="mt-6 text-center heading-4 ">
          Explore Related Articles for Deeper Insights
        </div>
        <div className="grid mt-4 md:grid-cols-3 gap-4">
          {suggestions.map((item, index) => (
            <div key={index}>
              <div className="md:h-[250px] max-w-[600px] mx-auto flex flex-col gap-3 justify-between border rounded-md border-primaryBoder p-4">
                <div className="space-y-2">
                  <div className="text-lg font-semibold">{item.title}</div>
                  <div className="text-sm text-textSecondary">
                    {item.excerpt?.substring(0, 100)}...
                  </div>
                </div>
                <Link
                  className="text-sm text-primary"
                  href={`/blog/${item.slug}`}
                >
                  View{" "}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </TopBanner>
  );
}

export async function generateStaticParams() {
  const posts = await ghostContentApi.posts.browse({
    limit: "all",
  });
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
