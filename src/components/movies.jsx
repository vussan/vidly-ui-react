import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService.js";
import { getGenres } from "../services/fakeGenreService.js";
import Pagination from "./common/pagiantion.jsx";
import { paginate } from "../utils/paginate.js";
import ListGroup from "./common/listGroup.jsx";
import MoviesTable from "./moviesTable.jsx";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 2,
    currentPage: 1,
    genres: [],
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genre = { _id: 0, name: "All Genre" };
    let genres = [genre, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
      selectedGenre: genre,
    });
  }

  handleDelete = (movie) => {
    let movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = this.state.movies;
    const index = movies.findIndex((x) => x._id === movie._id);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSelectItem = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    let { movies, pageSize, currentPage, genres, selectedGenre, sortColumn } =
      this.state;
    let moviesCount = movies.length;

    if (moviesCount === 0) return <p>There are no movies in the database</p>;

    if (selectedGenre._id) {
      movies = movies.filter((movie) => movie.genre._id === selectedGenre._id);
      moviesCount = movies.length;
    }

    let sortedMovies = _.orderBy(movies, sortColumn.path, sortColumn.order);
    let paginatedMovies = paginate(sortedMovies, pageSize, currentPage);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onSelectItem={this.handleSelectItem}
          />
        </div>

        <div className="col">
          <p>Showing {sortedMovies.length} movies from the database</p>

          <MoviesTable
            movies={paginatedMovies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />

          <Pagination
            itemsCount={moviesCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
