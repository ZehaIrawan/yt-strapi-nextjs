import Link from "next/link";

async function getVideos() {
  try {
    const res = await fetch("http://localhost:1337/api/videos?populate=*");
    const videos = await res.json();
    return videos;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

export default async function Home() {
  const response = await getVideos();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold mb-4">Video Gallery</h1>
      <Link href="/upload">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Upload Video</button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {response.data.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <h2 className="text-xl font-semibold p-2">{video.title}</h2>
            <video className="w-full" controls src={`http://localhost:1337/${video.content.url}`} />
            <p className="text-gray-600 p-2">{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
