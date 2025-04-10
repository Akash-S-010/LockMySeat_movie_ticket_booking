import React from 'react'
import { useState, useEffect } from "react";
import {Button} from "../../components/ui/Buttons";

const EditMovieModal = ({ movie, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
      title: "",
      duration: "",
      genre: "",
      plot: "",
      cast: "",
      releaseDate: "",
      language: "",
      bannerImg: "",
      verticalImg: "",
    });
  
    useEffect(() => {
      if (movie) {
        setFormData({
          title: movie.title || "title",
          duration: movie.duration || "duration",
          genre: movie.genre?.join(", ") || "gene",
          plot: movie.plot || "plot",
          cast: movie.cast?.join(", ") || "cast",
          releaseDate: movie.releaseDate || "date",
          language: movie.language?.join(", ") || "language",
          bannerImg: movie.bannerImg || "bannerImg",
          verticalImg: movie.verticalImg || "verticalImg",
        });
      }
    }, [movie]);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedMovie = {
        ...formData,
        genre: formData.genre.split(",").map((item) => item.trim()),
        cast: formData.cast.split(",").map((item) => item.trim()),
        language: formData.language.split(",").map((item) => item.trim()),
      };
      onUpdate(updatedMovie);
    };
  
    return (
      <div className="modal modal-open backdrop-blur-sm">
        <div className="modal-box max-h-[90vh] overflow-y-auto my-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-primary">EDIT MOVIE</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Genre (comma-separated)</label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Plot</label>
              <textarea
                name="plot"
                value={formData.plot}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
                rows="3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Cast (comma-separated)</label>
              <input
                type="text"
                name="cast"
                value={formData.cast}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Release Date</label>
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Language (comma-separated)</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Banner Image URL</label>
              <input
                type="url"
                name="bannerImg"
                value={formData.bannerImg}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Vertical Image URL</label>
              <input
                type="url"
                name="verticalImg"
                value={formData.verticalImg}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary text-base"
                required
              />
            </div>
            <div className="modal-action">
              <Button
              title="Cancel"
                type="button"
                className="btn bg-black hover:bg-black"
                onClick={onClose}
              />
              <Button title="Update Movie" type="submit" className="btn btn-primary"/>
            </div>
          </form>
        </div>
      </div>
    );
  };

export default EditMovieModal
