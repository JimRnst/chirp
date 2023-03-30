import type { RouterOutputs } from "~/utils/api";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs['posts']['getAll'][number]

export const PostView = (props: PostWithUser) => {
  const { post, author } = props
  return (
    <div key={post.id} className='p-4 border-b border-slate-400 flex gap-3'>
      <Image src={author.porfilePicture} className='w-16 h-16 rounded-full' alt={`@${author.username}'s porfile picture`} width={56} height={56} />
      <div className='flex flex-col'>
        <div className="flex text-slate-300 font-bold gap-1">
          <Link href={`/@${author.username}`}> <span>{`@${author.username}`}</span> </Link>
          <Link href={`/post/${post.id}`}><span className='font-thin'>{`· ${dayjs(post.createdAt).fromNow()}`}</span></Link>
        </div>
        <span className="text-xl">{post.content}</span>
      </div>
    </div>
  )
}
