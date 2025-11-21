import css from "./MoiveGrid.module.css";
import type { Movie } from "../../types/movie";

interface MoiveGridProps {
	onSelect: (value: Movie) => void;
	movies: Movie[];
}

export default function MoiveGrid({ onSelect, movies }: MoiveGridProps) {
	return (
		<>
			<ul className={css.grid}>
				{movies.map((value) => (
					<li key={String(value.id)} onClick={() => onSelect(value)}>
						<div className={css.card}>
							<img
								className={css.image}
								src={`https://image.tmdb.org/t/p/w500${value.poster_path}`}
								alt={value.title}
								loading="lazy"
							/>
							<h2 className={css.title}>{value.title}</h2>
						</div>
					</li>
				))}
			</ul>
		</>
	);
}
