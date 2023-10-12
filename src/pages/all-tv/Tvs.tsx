/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../Nav';
import axios from 'axios';
import ElementItem from '../ElementItem';
import Filter from './Filter';
import Footer from '../home/components/Footer';

interface Genre {
	id: number;
	name: string;
}

interface TVShow {
	backdrop_path: string;
	first_air_date: string;
	genre_ids: number[];
	id: number;
	name: string;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	vote_average: number;
	vote_count: number;
}

interface TVShowResponse {
	page: number;
	results: TVShow[];
	total_pages: number;
	total_results: number;
}

interface Props {
	userId: string;
	xsrfToken: string;
	url: string;
	baseUrlBack: string;
}

function Tvs({ userId, xsrfToken, url, baseUrlBack }: Props) {
	const location = useLocation();
	const [response, setResponse] = useState<TVShowResponse>();
	const [page, setPage] = useState<number>(1);
	const [lastPage, setLastPage] = useState<number>(500);
	const [genres, setGenres] = useState<Genre[]>([]);
	const [filterGenres, setFilterGenres] = useState<Genre[]>([]);
	const [isWritingComment, setIsWritingComment] = useState<boolean>(false);

	async function getTopRatedTv(page: number) {
		try {
			const response = await axios.post(
				`${baseUrlBack}/api/TMDB/getTopRatedTv`,
				{
					page: page,
					genres: filterGenres,
				},
				{
					headers: {
						'x-xsrf-token': xsrfToken,
					},
					withCredentials: true,
				}
			);

			if (!location.state) {
				setResponse(response.data.response);
			} else if (
				(location.state &&
					response.data.genres.length !== 0 &&
					location.state.genre) ||
				(location.state && !location.state.genre)
			) {
				setResponse(response.data.response);
				delete location.state.genre;
				delete location.state;
				window.history.replaceState(location.state, '');
			}
		} catch (err) {
			console.error(err);
		}
	}

	async function getTvGenres() {
		try {
			const response = await axios.get(`${baseUrlBack}/api/TMDB/getTvGenres`, {
				headers: {
					'x-xsrf-token': xsrfToken,
				},
				withCredentials: true,
			});
			setGenres(response.data.genres);
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		getTvGenres();
	}, []);

	useEffect(() => {
		if (location.state && location.state.genre) {
			const genre: Genre = location.state.genre;
			setFilterGenres((prevFilterGenres) =>
				!prevFilterGenres.includes(genre)
					? [...prevFilterGenres, genre]
					: prevFilterGenres
			);
			getTopRatedTv(page);
		} else if (!location.state) {
			getTopRatedTv(page);
		}
	}, [
		location.state,
		page,
		filterGenres,
		location.state && location.state.genre,
	]);

	useEffect(() => {
		if (response) {
			if (response.total_pages < 500) setLastPage(response.total_pages);
		}
	}, [response]);

	useEffect(() => {
		setPage(1);
	}, [filterGenres]);

	return (
		<div className='all-tv-wrapper'>
			<Nav userId={userId} xsrfToken={xsrfToken} baseUrlBack={baseUrlBack} />
			<div className='all-tv'>
				<Filter
					genres={genres}
					filtersGenres={filterGenres}
					setFiltersGenres={setFilterGenres}
				/>
				{response && response.total_results !== 0 ? (
					<>
						<div className='tv'>
							{response.results.map((tv) => (
								<ElementItem
									width={300}
									height={450}
									posterPath={tv.poster_path}
									url={url}
									title={tv.name}
									id={tv.id}
									fontSize={20}
									key={tv.id}
									media={'tv'}
									backdropPath=''
									tvShow={{ name: tv.name, id: tv.id.toString() }}
									year={tv.first_air_date && tv.first_air_date.slice(0, 4)}
									forceUpdate={null}
									isWritingComment={isWritingComment}
									setIsWritingComment={setIsWritingComment}
									userId={userId}
									xsrfToken={xsrfToken}
									baseUrlBack={baseUrlBack}
								/>
							))}
						</div>
						<div className='pages'>
							{page !== 1 && (
								<button
									className='before nav-btn'
									onClick={() => {
										setPage(page - 1);
										window.scrollTo(0, 0);
									}}
								>
									&#60;
								</button>
							)}
							{page !== 1 && (
								<button
									className='first-page number-btn'
									onClick={() => {
										setPage(1);
										window.scrollTo(0, 0);
									}}
								>
									1
								</button>
							)}
							{page !== 1 && page !== 2 && page !== 3 && <span>...</span>}
							{page !== 1 && page !== 2 && (
								<button
									className='page-before number-btn'
									onClick={() => {
										setPage(page - 1);
										window.scrollTo(0, 0);
									}}
								>
									{page - 1}
								</button>
							)}
							<button className='current-page number-btn'>{page}</button>
							{page !== lastPage && page !== lastPage - 1 && (
								<button
									className='page-after number-btn'
									onClick={() => {
										setPage(page + 1);
										window.scrollTo(0, 0);
									}}
								>
									{page + 1}
								</button>
							)}
							{page !== lastPage &&
								page !== lastPage - 1 &&
								page !== lastPage - 2 && <span>...</span>}
							{page !== lastPage && (
								<button
									className='last-page number-btn'
									onClick={() => {
										setPage(lastPage);
										window.scrollTo(0, 0);
									}}
								>
									{lastPage}
								</button>
							)}
							{page !== lastPage && (
								<button
									className='after nav-btn'
									onClick={() => {
										setPage(page + 1);
										window.scrollTo(0, 0);
									}}
								>
									&#62;
								</button>
							)}
						</div>
					</>
				) : (
					<h1 className='no-result'>No result found</h1>
				)}
			</div>
			{response && response.total_results !== 0 && <Footer />}
		</div>
	);
}

export default Tvs;
