"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const UploadComponent = ({ isEditing = false, existingVideo = null }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
  });

  useEffect(() => {
    if (isEditing && existingVideo) {
      setFormData({
        title: existingVideo.title,
        description: existingVideo.description,
      });
    }
  }, [isEditing, existingVideo]);

  const createVideo = async (videoId) => {
    try {
      const response = await fetch("http://localhost:1337/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            title: formData.title,
            description: formData.description,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateVideo = async (videoId) => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/videos/${videoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              title: formData.title,
              description: formData.description,
              content: { id: existingVideo.content.id },
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isEditing) {
      await updateVideo(existingVideo?.documentId);
      return;
    }

    const video = await createVideo();

    const videoId = video.data.id;

    const videoFormData = new FormData();
    videoFormData.append("files", formData.video);
    videoFormData.append("ref", "api::video.video");
    videoFormData.append("refId", videoId);
    videoFormData.append("field", "content");

    try {
      const response = await fetch("http://localhost:1337/api/upload", {
        method: "POST",
        body: videoFormData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await response.json();
      router.push(`/`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      video: e.target.files[0],
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-4">
        <div>
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border p-2 w-full"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="border p-2 w-full"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          {!isEditing && (
            <>
              <label htmlFor="video" className="block mb-2">
                Video
              </label>
              <input
                type="file"
                id="video"
                name="video"
                className="border p-2 w-full"
                accept="video/*"
                onChange={handleFileChange}
              />
            </>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isEditing ? "Update" : "Upload"}
      </button>
    </form>
  );
};

export default UploadComponent;
