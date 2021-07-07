import React, { Component } from "react";
import Like from "./common/like.jsx";
import Table from "./common/table.jsx";
import { Link } from "react-router-dom";
import auth from "../services/authService.js";

class MoviesTable extends Component {
  headers = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "numberInStock", label: "Stock" },
    { path: "genre.name", label: "Genre" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          Liked={movie.liked}
          onToggleLike={() => this.props.onLike(movie)}
        />
      ),
    },
  ];

  render() {
    let { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        headers={this.headers}
        items={movies}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.headers.push(this.deleteColumn);
  }
}

export default MoviesTable;
