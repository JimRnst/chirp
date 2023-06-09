import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import Image from "next/image";
import { LoadingPage } from "~/components/loading";
import { PostView } from "~/components/postsview";
import { generateSSGHerlper } from "~/server/helpers/ssgHelper";

const PorfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({
    userId: props.userId,
  })

  if (isLoading) return <LoadingPage />

  if (!data || data.length === 0) return <div>User has not posts yet</div>

  return <div className='flx flex-col'>
    {data.map((fullPost) => (
      <PostView {...fullPost} key={fullPost.post.id} />
    ))}
  </div>
}

const PorfilePage: NextPage<{ username: string }> = ({ username }) => {

  const { data } = api.porfile.getUserByUsername.useQuery({
    username,
  })

  if (!data) return <div>404</div>

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <PageLayout>
        <div className='h-36 bg-slate-600 relative'>
          <Image
            src={data.porfilePicture}
            alt={`${data.username ?? ''}'s porfile pic`}
            width={128}
            height={128}
            className='-mb-[64px] absolute bottom-0 left-0 ml-4 rounded-full border-4 border-black bg-black'
          />
        </div>
        <div className='h-[64px]'></div>
        <div className='p-4 text-2xl font-bold'>{`@${data.username ?? ''}`}</div>
        <div className='border-b border-slate-400 w-full' />
        <PorfileFeed userId={data.id} />
      </PageLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHerlper()

  const slug = context.params?.slug

  if (typeof slug !== "string") throw new Error("No slug")

  const username = slug.replace("@", "")

  await ssg.porfile.getUserByUsername.prefetch({ username })


  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    }
  }
}

export const getStaticPaths = () => {
  return {
    paths: [], fallback: "blocking"
  }
}

export default PorfilePage
