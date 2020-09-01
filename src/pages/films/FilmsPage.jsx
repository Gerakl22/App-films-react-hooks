import React, { useState, useEffect } from "react";

import "./FilmsPage.css";

export const FilmsPage = () => {
  const [films, setFilms] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/films")
      .then((response) => response.json())
      .then((films) => setFilms(films))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return "...isLoading...";
  }

  if (error) {
    return "...Error...";
  }

  return (
    <table className="table-film">
      <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>Producer</th>
          <th>Ranking(0-5)</th>
          <th>Status</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody className="tbody-film">
        {films &&
          films.map((film) => (
            <tr key={film.id}>
              <td>{film.title}</td>
              <td>{film.year}</td>
              <td>{film.producer}</td>
              <td>{film.ranking}</td>
              <td>{film.status}</td>
              <td>
                <button>Edit</button>
              </td>
              <td>
                <button
                  onClick={async () => {
                    setIsLoading(true);
                    try {
                      await fetch(`/films/${film.id}`, { method: "DELETE" });

                      setFilms((films) =>
                        films.filter((e) => e.id !== film.id)
                      );
                    } catch (error) {
                      setError(error);
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
