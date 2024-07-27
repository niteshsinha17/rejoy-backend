import { Container } from "@/components";
import { ghostContentApi } from "@/services/ghost";
import { getPageMetaData } from "@/utils/common";
import { PostOrPage } from "@tryghost/content-api";
import Link from "next/link";
import { DownloadButtons, TopBanner } from "../../_components";

function generateRandomNumbers(min: number, max: number) {
  if (max - min + 1 < 3) {
    throw new Error("Range is too small to generate 3 unique numbers.");
  }

  var result: number[] = [];

  while (result.length < 3) {
    var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!result.includes(randomNum)) {
      result.push(randomNum);
    }
  }

  return result;
}

const getRandomThreeItemList = (posts: PostOrPage[]) => {
  const randomList: PostOrPage[] = [];
  const randomNumbers = generateRandomNumbers(0, posts.length - 1);

  randomNumbers.forEach((num) => {
    randomList.push(posts[num]);
  });

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
  const suggestions = getRandomThreeItemList(posts);

  return (
    <TopBanner>
      <Container>
        <h1 className="text-center heading-1 text-textPrimary">
          <span className="text-primary whitespace-pre-wrap">
            {post?.title || "Question not found"}
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
                  <div className="text-lg font-semibold">{post.title}</div>
                  <div className="text-sm text-textSecondary">
                    {item.excerpt?.substring(0, 100)}...
                  </div>
                </div>
                <Link
                  className="text-sm text-primary"
                  href={`/ask/${item.slug}`}
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
