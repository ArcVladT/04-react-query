import toast, { Toaster } from "react-hot-toast";
import { useId } from "react";
import css from "./SearchBar.module.css";

interface SearchBarProps {
	onSubmit: (value: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
	const idForm = useId();
	const dataFromForm = (formData: FormData) => {
		const data = formData.get("query") as string;
		if (!data) {
			toast.error("Please enter your search query.");
		} else {
			onSubmit(data);
		}
	};

	return (
		<>
			<Toaster position="top-center" reverseOrder={false} />
			<header className={css.header}>
				<div className={css.container}>
					<a
						className={css.link}
						href="https://www.themoviedb.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Powered by TMDB
					</a>
					<form
						className={css.form}
						action={dataFromForm}
						id={`${idForm}-query`}
					>
						<input
							className={css.input}
							type="text"
							name="query"
							autoComplete="off"
							placeholder="Search movies..."
							autoFocus
							id={`${idForm}-query`}
						/>
						<button className={css.button} type="submit">
							Search
						</button>
					</form>
				</div>
			</header>
		</>
	);
}
