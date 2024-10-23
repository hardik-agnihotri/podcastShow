import React, { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import CSS for toast notifications

const InputPodcast = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [inputs, setInputs] = useState({ title: "", description: "", category: "" });
  const audioInputRef = useRef(null); // Ref for the audio input field

  const handleSubmitPodcast = async () => {
    if (!inputs.title || !inputs.description || !inputs.category || !frontImage || !audioFile) {
      toast.error("Please fill all fields and upload both image and audio.");
      return;
    }
  
    const data = new FormData();
    data.append("title", inputs.title);
    data.append("description", inputs.description);
    data.append("category", inputs.category);
    data.append("frontImage", frontImage);
    data.append("audioFile", audioFile);
  
    try {
      const res = await axios.post("http://localhost:1000/api/v1/podcast/addpodcast", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success(res.data.msg);
      
      // Reset the form after successful submission
      setInputs({ title: "", description: "", category: "" });
      setAudioFile(null);
      setFrontImage(null);
  
      // Clear the actual file input field using the ref
      if (audioInputRef.current) {
        audioInputRef.current.value = ""; // Reset the file input
      }
  
    } catch (error) {
      toast.error(error.response?.data?.msg || "An error occurred.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleRemoveAudio = () => {
    setAudioFile(null); // Remove the selected audio file from state
  };

  const handleAudioFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleDropImage = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFrontImage(file);
    }
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFrontImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleRemoveImage = () => {
    setFrontImage(null);
  };

  return (
    <div className="my-4 px-4 lg:px-12">
      <ToastContainer />
      <h1 className="text-2xl font-semibold">Create Your Podcast</h1>
      <div className="mt-5 flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-2/6 flex items-center justify-center lg:justify-start">
          <div
            className={`h-[20vh] lg:h-[60vh] w-full flex items-center justify-center transition-all duration-300 ${
              dragging ? "bg-blue-200" : "hover:bg-slate-50"
            }`}
            style={{ border: "1px dashed black" }}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDropImage}
          >
            <input
              type="file"
              accept="image/*"
              id="file"
              className="hidden"
              name="frontImage"
              onChange={handleChangeImage}
            />
            {frontImage ? (
              <div className="relative h-full w-full">
                <img
                  src={URL.createObjectURL(frontImage)}
                  alt="thumbnail"
                  className="h-[100%] w-[100%] object-cover"
                />
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <button
                    onClick={handleRemoveImage}
                    className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-400"
                  >
                    Remove Image
                  </button>
                  <label
                    htmlFor="file"
                    className="bg-zinc-900 text-white px-4 py-2 rounded font-semibold hover:bg-zinc-800 cursor-pointer"
                  >
                    Choose Another Image
                  </label>
                </div>
              </div>
            ) : (
              <label
                htmlFor="file"
                className={`text-xl h-[100%] w-[100%] flex p-4 items-center justify-center hover:cursor-pointer transition-all duration-300 hover:bg-zinc-200 ${
                  dragging ? "bg-blue-200" : ""
                }`}
              >
                <div className="text-center">
                  Drag and drop the thumbnail or click here
                </div>
              </label>
            )}
          </div>
        </div>
        <div className="w-full lg:w-4/6">
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title of your podcast"
              className="w-full lg:w-[60%] mt-4 px-4 py-2 outline-none border border-zinc-800 rounded"
              value={inputs.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex mt-4 flex-col">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Description of your podcast"
              className="w-full lg:w-[60%] mt-4 px-4 py-2 outline-none border border-zinc-800 rounded"
              rows={4}
              value={inputs.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex w-[60%] mt-4 justify-between flex-col lg:flex-row gap-4">
            <div className="flex flex-col w-full lg:w-2/6">
              <label htmlFor="audioFile">Select Audio</label>
              <input
                type="file"
                accept=".mp3,.wav,.m4a,.ogg"
                id="audioFile"
                name="audioFile"
                className="mt-4"
                onChange={handleAudioFile}
                ref={audioInputRef} // Use the ref here
              />
              {audioFile && (
                <div>
                  <p>{audioFile.name}</p> {/* Display the audio file name */}
                  <button
                    onClick={handleRemoveAudio}
                    className="bg-red-500 text-white px-4 py-2 mt-2 rounded font-semibold hover:bg-red-400"
                  >
                    Remove Audio
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col w-full lg:w-2/6">
              <label htmlFor="category">Select Category</label>
              <select
                id="category"
                name="category"
                className="mt-4 px-4 py-2 outline-none border border-zinc-800 rounded"
                value={inputs.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                <option value="Comedy">Comedy</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Horror">Horror</option>
              </select>
            </div>
          </div>
          <div className="mt-8 lg:mt-6">
            <button
              onClick={handleSubmitPodcast}
              className="bg-zinc-900 text-white rounded font-semibold hover:bg-zinc-800 px-8 py-2 w-[60%] transition-all"
            >
              Create Podcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPodcast;
