import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import MoiveGrid from "../MovieGrid/MovieGrid";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";

function App() {
	const [close, setClose] = useState(false);
	const [movie, setMovie] = useState<Movie | null>(null);
	const [value, setValue] = useState("");
	const [page, setPage] = useState(1);

	const { data, isLoading, isError } = useQuery({
		queryKey: ["person", value, page],
		queryFn: () => fetchMovies(value, page),
		enabled: value !== "",
	});
	// console.log(value !== "");
	// console.log(data?.results);

	// console.log(data.results);
	const totalPages = data?.total_pages ?? 0;

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
				<SearchBar setValue={setValue} />
				<Toaster position="top-center" reverseOrder={false} />
				{data && totalPages > 0 && (
					<ReactPaginate
						pageCount={Math.ceil(totalPages ?? 0)}
						pageRangeDisplayed={5}
						marginPagesDisplayed={1}
						onPageChange={({ selected }) => setPage(selected + 1)}
						forcePage={page - 1}
						containerClassName={css.pagination}
						activeClassName={css.active}
						nextLabel="→"
						previousLabel="←"
					/>
				)}
				<MoiveGrid onSelect={selectMovie} data={data?.results}></MoiveGrid>
				{isLoading && <Loader />}
				{isError && <ErrorMessage />}
				{close && <MovieModal onClose={onClose} data={movie}></MovieModal>}
			</div>
		</>
	);
}

export default App;
