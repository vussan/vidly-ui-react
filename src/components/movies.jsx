import React, { Component } from "react";
import Pagination from "./common/pagination.jsx";
import { paginate } from "../utils/paginate.js";
import ListGroup from "./common/listGroup.jsx";
import MoviesTable from "./moviesTable.jsx";
import SearchInput from "./common/searchInput.jsx";
import { Link } from "react-router-dom";
import _ from "lodash";
import * as movieService from "../services/movieService";
import * as genreService from "../services/genreService";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 3,
    currentPage: 1,
    genres: [],
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchInput: "",
  };

  async componentDidMount() {
    const { data: movies } = await movieService.getMovies();
    const { data: genresList } = await genreService.getGenres();
    const genre = { _id: 0, name: "All Genre" };
    let genres = [genre, ...genresList];

    this.setState({
      movies,
      genres,
      selectedGenre: genre,
    });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    let movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await movieService.deleteMovie(movie._id);
      toast.success("Deleted Successfully");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");
    }
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
    this.setState({ selectedGenre: genre, currentPage: 1, searchInput: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchInput) => {
    const genre = { _id: 0, name: "All Genre" };
    this.setState({ searchInput, currentPage: 1, selectedGenre: genre });
  };

  render() {
    let {
      movies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchInput,
    } = this.state;
    let moviesCount = movies.length;

    if (moviesCount === 0) return <p>There are no movies in the database</p>;

    if (searchInput) {
      movies = movies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchInput.toLowerCase())
      );
      moviesCount = movies.length;
    } else if (selectedGenre._id) {
      movies = movies.filter((movie) => movie.genre._id === selectedGenre._id);
      moviesCount = movies.length;
    }

    let sortedMovies = _.orderBy(movies, sortColumn.path, sortColumn.order);
    let paginatedMovies = paginate(sortedMovies, pageSize, currentPage);
    const { user } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onSelectItem={this.handleSelectItem}
            />
          </div>

          <div className="col">
            {user && (
              <Link
                className="btn btn-primary"
                to="/movies/add"
                style={{ marginBottom: 20 }}
              >
                Add Movie
              </Link>
            )}
            <p>Showing {sortedMovies.length} movies from the database</p>

            <SearchInput value={searchInput} onChange={this.handleSearch} />

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
      </React.Fragment>
    );
  }
}

export default Movies;
