import React, { useState, useEffect } from "react";

import { FilmsForm } from './FilmsForm';

import "./FilmsPage.css";

const FilmsPageMode = {
  ADD: "film_add",
  EDIT: "film_edit",
  LIST: "film_list",
}

export const FilmsPage = () => {
  const [films, setFilms] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState(FilmsPageMode.LIST);

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

  if(mode === FilmsPageMode.ADD) {
    return <FilmsForm 
    onSave={() => {}}
    onCancel={() => setMode({mode: FilmsPageMode.LIST})}
    />
  }

  return (
    <>
    <button
    onClick={() => setMode({mode: FilmsPageMode.ADD})}
    >
      Add
    </button>
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
    </>
  );
};
