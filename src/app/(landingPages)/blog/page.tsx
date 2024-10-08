import { Container, Section } from "@/components";
import { ghostContentApi } from "@/services/ghost";
import { getPageMetaData } from "@/utils/common";
import Image from "next/image";
import { TopBanner } from "../_components";
export const dynamicParams = true;

export const metadata = getPageMetaData({ title: "Blog | Rejoy Health" });

const BlogListPage = async () => {
  const blogs = await ghostContentApi.posts.browse({
    limit: 400,
  });

  return (
    <div>
      <TopBanner>
        <h1 className="text-center heading-1 text-textPrimary">Find our Blogs</h1>
      </TopBanner>
      <Container>
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map((blog) => (
              <div key={blog.id}>
                <div className="bg-white shadow-md rounded-lg max-w-screen-sm mx-auto">
                  <h2 className="text-base font-semibold text-textPrimary p-2">{blog.title}</h2>
                  {blog.feature_image && (
                    <Image
                      src={blog.feature_image}
                      alt={blog.title || ""}
                      height={30}
                      width={30}
                      className="w-full h-[200px] object-cover"
                    />
                  )}
                  <p className="mt-3 text-xs p-2 text-textPrimary">{blog.excerpt}</p>
                  <div className="p-2">
                    <a
                      href={`/blog/${blog.slug}`}
                      className="text-center bg-green text-white py-1 rounded-sm text-sm block"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </Container>
    </div>
  );
};

export default BlogListPage;
