import CreatePostForm from "@/components/create-post-form";

function TopicSlugPage({ params }: any) {
  const { slug } = params;
  return (<div>
    <div className="flex items-center justify-between">
      <p className="capitalize">{slug}</p>
      <CreatePostForm slug={slug} />
    </div>
    <div className="grid grid-cols-4">
      <div className="col-span-3">1</div>
      <div className="col-span-1">2</div>
    </div>
  </div>)
}

export default TopicSlugPage;