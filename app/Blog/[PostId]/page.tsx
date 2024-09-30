export default async function page({ params }: { params: { PostId: string } }) {
  return <div className="p-24">{params.PostId}</div>;
}
