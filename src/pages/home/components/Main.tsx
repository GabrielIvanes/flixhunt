/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';
import { useEffect, useState } from 'react';
import ListElements from './ListElements';
import Footer from '../components/Footer';

interface Genre {
	id: number;
	name: string;
}

interface Element {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	name: string;
	title: string;
	video: boolean;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
}

interface List {
	title: Genre;
	elements: Element[];
}

interface Props {
	url: string;
	xsrfToken: string;
	userId: string;
	baseUrlBack: string;
}

function Main({ url, xsrfToken, userId, baseUrlBack }: Props) {
	const [elementsListHome, setElementsListHome] = useState<List[]>([]);
	const [genres, setGenres] = useState<Genre[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		async function getGenres() {
			try {
				const response = await axios.get(`${baseUrlBack}/api/TMDB/getGenres`, {
					headers: {
						'x-xsrf-token': xsrfToken,
					},
					withCredentials: true,
				});
				setGenres(response.data.genres);
				window.localStorage.setItem(
					'genres',
					JSON.stringify(response.data.genres)
				);
			} catch (err) {
				console.error(err);
			}
		}
		const storedGenres = window.localStorage.getItem('genres');
		if (storedGenres) {
			setGenres(JSON.parse(storedGenres));
		} else if (xsrfToken) {
			getGenres();
		}
		if (xsrfToken) {
			getMoviesInTheater();
			getTrendingMovies();
			getTrendingTv();
		}
	}, []);

	useEffect(() => {
		async function getMoviesByGenresCall() {
			if (genres && xsrfToken) {
				await Promise.all(genres.map((genre) => getMoviesByGenre(genre)))
					.then(() => setIsLoading(false))
					.catch((err) => console.error(err));
			}
		}
		getMoviesByGenresCall();
	}, [genres]);

	async function getMoviesByGenre(genre: Genre) {
		try {
			const response = await axios.post(
				`${baseUrlBack}/api/TMDB/getMoviesByGenre`,
				{
					genreId: genre.id,
				},
				{
					headers: {
						'x-xsrf-token': xsrfToken,
					},
					withCredentials: true,
				}
			);
			if (!elementsListHome.some((list) => list.title.name === genre.name)) {
				setElementsListHome((prevElementsList) => [
					...prevElementsList,
					{
						title: genre,
						elements: response.data.elements,
					},
				]);
			}
		} catch (err) {
			console.error(err);
		}
	}

	async function getTrendingTv() {
		try {
			const response = await axios.get(
				`${baseUrlBack}/api/TMDB/getTrendingTv`,
				{
					headers: {
						'x-xsrf-token': xsrfToken,
					},
					withCredentials: true,
				}
			);
			const title = {
				id: 0,
				name: 'Trending TV',
			};
			const list: List = {
				title: title,
				elements: response.data.trendingTv.filter(
					(element: Element) => element.adult === false
				),
			};
			const elementsListHomeTmp: List[] = elementsListHome;

			if (!elementsListHomeTmp.some((list) => list.title.name === title.name)) {
				elementsListHomeTmp.push(list);
				setElementsListHome(elementsListHomeTmp);
			}
		} catch (err) {
			console.error(err);
		}
	}

	async function getTrendingMovies() {
		try {
			const response = await axios.get(
				`${baseUrlBack}/api/TMDB/getTrendingMovies`,
				{
					headers: {
						'x-xsrf-token': xsrfToken,
					},
					withCredentials: true,
				}
			);
			const title = {
				id: 0,
				name: 'Trending',
			};
			const list: List = {
				title: title,
				elements: response.data.trending.filter(
					(element: Element) => element.adult === false
				),
			};
			const elementsListHomeTmp: List[] = elementsListHome;

			if (!elementsListHomeTmp.some((list) => list.title.name === title.name)) {
				elementsListHomeTmp.push(list);
				setElementsListHome(elementsListHomeTmp);
			}
		} catch (err) {
			console.error(err);
		}
	}

	async function getMoviesInTheater(): Promise<void> {
		try {
			const response = await axios.get(
				`${baseUrlBack}/api/TMDB/getMoviesInTheater`,
				{
					headers: {
						'x-xsrf-token': xsrfToken,
					},
					withCredentials: true,
				}
			);
			const title = {
				id: 0,
				name: 'In theatres',
			};
			const list: List = {
				title: title,
				elements: response.data.elements,
			};
			const elementsListHomeTmp: List[] = elementsListHome;

			if (!elementsListHomeTmp.some((list) => list.title.name === title.name)) {
				elementsListHomeTmp.push(list);
				setElementsListHome(elementsListHomeTmp);
			}
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className='lists-wrapper'>
			{!isLoading ? (
				<>
					{elementsListHome.map((list) => (
						<ListElements
							list={list}
							url={url}
							key={list.title.name}
							userId={userId}
							xsrfToken={xsrfToken}
							myLists={null}
							forceUpdate={null}
							baseUrlBack={baseUrlBack}
						/>
					))}
					<Footer />
				</>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	);
}

export default Main;
