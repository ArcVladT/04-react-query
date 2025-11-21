import { createPortal } from "react-dom";
import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";

interface MovieModalProps {
	data: Movie | null;
	onClose: () => void;
}

export default function MovieModal({ data, onClose }: MovieModalProps) {
	const container = document.getElementById("modal-root");
	if (!container) return null;

	const closeBackDrop = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	return createPortal(
		<>
			<div
				className={css.backdrop}
				onClick={closeBackDrop}
				role="dialog"
				aria-modal="true"
			>
				<div className={css.modal}>
					<button
						onClick={onClose}
						className={css.closeButton}
						aria-label="Close modal"
					>
						&times;
					</button>
					<img
						src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}}`}
						alt="movie_title"
						className={css.image}
					/>
					<div className={css.content}>
						<h2>{data?.title}</h2>
						<p>{data?.overview}</p>
						<p>
							<strong>Release Date:</strong> {data?.release_date}
						</p>
						<p>
							<strong>Rating:</strong> {data?.vote_average}/10
						</p>
					</div>
				</div>
			</div>
		</>,
		container
	);
}
