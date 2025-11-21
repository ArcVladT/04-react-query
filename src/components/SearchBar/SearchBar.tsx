import toast, { Toaster } from "react-hot-toast";
import { useId } from "react";
import css from "./SearchBar.module.css";
import type { SetStateAction } from "react";

interface SearchBarProps {
	setValue: React.Dispatch<SetStateAction<string>>;
}

export default function SearchBar({ setValue }: SearchBarProps) {
	const idForm = useId();
	const dataFromForm = (formData: FormData) => {
		const data = formData.get("query") as string;
		if (!data) {
			toast.error("Please enter your search query.");
		} else {
			setValue(data);
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
