import React, { useState, useEffect } from 'react';

const MovieFilter = ({ onFilterChange }) => {
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  // Fetch available languages and genres (mocked here)
  useEffect(() => {
    const availableLanguages = ['English','Malayalam','Tamil', 'Hindi', 'Telugu'];
    const availableGenres = ['Action', 'Comedy', 'Drama', 'Thriller', 'Romance','Sports','Horror'];
    setLanguages(availableLanguages);
    setGenres(availableGenres);
  }, []);

  // Handle filter changes
  useEffect(() => {
    onFilterChange({
      language: selectedLanguage,
      genre: selectedGenre,
    });
  }, [selectedLanguage, selectedGenre, onFilterChange]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label htmlFor="language" className="block text-md font-medium text-primary">
          Languages
        </label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="mt-1 p-2 bg-base-200 block w-full rounded-md border-1 border-primary focus:border-primary"
        >
          <option value="">All Languages</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label htmlFor="genre" className="block text-md font-medium text-primary">
          Genres
        </label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="mt-1 p-2 bg-base-200 block w-full rounded-md border-1 border-primary focus:border-primary"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MovieFilter;