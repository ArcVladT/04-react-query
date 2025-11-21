import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import MoiveGrid from "../MovieGrid/MovieGrid";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [close, setClose] = useState(false);
	const [movie, setMovie] = useState<Movie | null>(null);

	const onSubmit = async (value: string) => {
		try {
			setError(false);
			setMovies([]);
			setLoading(true);

			const data: Movie[] = await fetchMovies(value);
			if (!(data.length > 0)) {
				toast.error("No movies found for your request.");
			}
			setMovies(data);
			setLoading(false);
		} catch (e) {
			console.log("error:", e);

			setLoading(false);
			setError(true);
		}
	};
	const selectMovie = (value: Movie) => {
		setMovie(value);
		setClose(true);
	};
	const onClose = () => {
		setClose(false);
	};

	useEffect(() => {
		const handleEscape = (e: globalThis.KeyboardEvent) => {
			if (e.key === "Escape") {
				setClose(false);
			}
		};
		if (close) {
			document.body.style.overflow = "hidden";
		}

		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "";
		};
	}, [close]);

	return (
		<>
			<div>
				<SearchBar onSubmit={onSubmit} />
				<Toaster position="top-center" reverseOrder={false} />
				<MoiveGrid onSelect={selectMovie} movies={movies}></MoiveGrid>
				{loading && <Loader />}
				{error && <ErrorMessage />}
				{close && <MovieModal onClose={onClose} movie={movie}></MovieModal>}
			</div>
		</>
	);
}

export default App;
