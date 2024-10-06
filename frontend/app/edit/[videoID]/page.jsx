"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import UploadComponent from "../../../components/UploadComponent";
import { useEffect, useState } from "react";

export default function EditPage() {
  const { videoID } = useParams();

  const [video, setVideo] = useState(null);

  const getVideo = async () => {
    const response = await fetch(`http://localhost:1337/api/videos/${videoID}?populate=*`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchVideo = async () => {
      const video = await getVideo();
      setVideo(video.data);
    };
    fetchVideo();
  }, []);


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-4">{`Editing ${video?.title}`}</h1>
        <div className="flex gap-4">
          <Link href="/">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Home
            </button>
          </Link>
          <Link href="/upload">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Upload Video
          </button>
        </Link>
        </div>
      </div>
      <UploadComponent isEditing={true} existingVideo={video} />
    </div>
  );
}
