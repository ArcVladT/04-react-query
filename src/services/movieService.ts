import axios from "axios";

const myKey = import.meta.env.VITE_API_KEY;

export default async function fetchMovies(value: string, page: number) {
	const response = await axios.get(
		`https://api.themoviedb.org/3/search/movie`,
		{
			params: {
				query: [value],
				page: page,
			},
			headers: {
				Authorization: `Bearer ${myKey}`,
			},
		}
	);
	return response.data;
}
