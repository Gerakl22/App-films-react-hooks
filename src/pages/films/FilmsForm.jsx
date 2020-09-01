import React, { useState } from "react";

export const FilmsForm = (onSave, onCancel) => {
  const [state, setState] = useState({
    title: "",
    year: "",
    producer: "",
    ranking: "",
    status: "",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label>
        Title:
        <input
          name="title"
          type="text"
          value={state.title}
          onChange={(e) => {
            setState({ ...state, title: e.target.value });
          }}
        />
      </label>
      <label>
        Year:
        <input
          name="year"
          type="number"
          value={state.year}
          onChange={(e) => {
            setState({ ...state, year: e.target.value });
          }}
        />
      </label>
      <label>
        Producer:
        <input
          name="producer"
          type="text"
          value={state.producer}
          onChange={(e) => {
            setState({ ...state, producer: e.target.value });
          }}
        />
      </label>
      <label>
        Ranking:
        <select
          name="ranking"
          type="text"
          value={state.ranking}
          onChange={(e) => {
            setState({ ...state, ranking: e.target.value });
          }}
        >
          {!state.ranking && <option value="">Ranking</option>}
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <label>
        Status:
        <select
          name="status"
          type="text"
          value={state.status}
          onChange={(e) => {
            setState({ ...state, status: e.target.value });
          }}
        >
          {!state.status && <option value="">Status</option>}
          <option value="View">View</option>
          <option value="No view">No view</option>
          <option value="Want to view">Want to view</option>
        </select>
      </label>

      <button onClick={() => onSave(state)}>Add</button>
      <button onClick={() => onCancel()}>Cancel</button>
    </form>
  );
};
