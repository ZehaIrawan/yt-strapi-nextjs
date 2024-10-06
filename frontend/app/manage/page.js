"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ManagePage() {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    const res = await fetch("http://localhost:1337/api/videos?populate=*");
    const videos = await res.json();
    setVideos(videos.data);
  };

  useEffect(() => {
    getVideos();
  }, []);

  const deleteVideo = async (documentId) => {
    await fetch(`http://localhost:1337/api/videos/${documentId}`, {
      method: "DELETE",
    });
    setVideos(videos.filter((video) => video.documentId !== documentId));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-4">Manage</h1>
        <div className="flex gap-4">
          <Link href="/">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Homepage
            </button>
          </Link>

          <Link href="/upload">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Upload Video
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        {videos.map((video) => (
          <div key={video.id}>
            <h2 className="text-xl font-bold">{video.title}</h2>
            <div className="flex gap-4 mt-4">
              <Link href={`/edit/${video.documentId}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => deleteVideo(video.documentId)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
