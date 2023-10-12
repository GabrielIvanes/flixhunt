/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, useEffect } from 'react';
import Nav from '../Nav';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Filter from './Filter';
import ElementItem from '../ElementItem';
import Footer from '../home/components/Footer';

interface Props {
	userId: string;
	xsrfToken: string;
	url: string;
	baseUrlBack: string;
}

interface Genre {
	id: number;
	name: string;
}

interface Movie {
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
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

interface ApiResponse {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}

function Movies({ userId, xsrfToken, url, baseUrlBack }: Props) {
	const location = useLocation();
	const [response, setResponse] = useState<ApiResponse>();
	const [page, setPage] = useState<number>(1);
	const [lastPage, setLastPage] = useState<number>(500);
	const [genres, setGenres] = useState<Genre[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isWritingComment, setIsWritingComment] = useState<boolean>(false);

	async function getTopRatedMovies(page: number) {
		try {
			const response = await axios.post(
				`${baseUrlBack}/api/TMDB/getTopRatedMovies`,
				{
					page: page,
					genres: genres,
				},
				{
					headers: {
						'x-xsrf-token': xsrfToken,
					},
					withCredentials: true,
				}
			);
			if (
				(location.state &&
					response.data.genres.length !== 0 &&
					location.state.genre) ||
				(location.state && !location.state.genre)
			) {
				setResponse(response.data.response);
				delete location.state.genre;
				delete location.state;
				window.history.replaceState(location.state, '');
				setIsLoading(false);
			} else if (!location.state) {
				setResponse(response.data.response);
				setIsLoading(false);
			}
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		if (location.state && location.state.genre) {
			const genre: Genre = location.state.genre;
			setGenres((prevGenres) =>
				!prevGenres.includes(genre) ? [...prevGenres, genre] : prevGenres
			);
			getTopRatedMovies(page);
		} else if (!location.state) {
			getTopRatedMovies(page);
		}
	}, [location.state, page, genres, location.state && location.state.genre]);

	useEffect(() => {
		if (response) {
			if (response.total_pages < 500) setLastPage(response.total_pages);
		}
	}, [response]);

	useEffect(() => {
		setPage(1);
	}, [genres]);

	return (
		<div
			className='all-movies-wrapper'
			style={
				isWritingComment
					? { overflow: 'hidden', height: '100vh' }
					: { overflow: 'visible' }
			}
		>
			<Nav userId={userId} xsrfToken={xsrfToken} baseUrlBack={baseUrlBack} />

			{!isLoading ? (
				<>
					{response && response.results.length === 0 && (
						<h1 className='no-result'>No result found</h1>
					)}
					<div className='all-movies'>
						<Filter filtersGenres={genres} setFiltersGenres={setGenres} />
						{response && response.results.length > 0 && (
							<div className='movies'>
								{response.results.map((movie) => (
									<ElementItem
										width={300}
										height={450}
										posterPath={movie.poster_path}
										url={url}
										title={movie.title}
										id={movie.id}
										fontSize={20}
										key={movie.id}
										media={'movie'}
										backdropPath=''
										tvShow={{ name: '', id: '' }}
										year={movie.release_date && movie.release_date.slice(0, 4)}
										forceUpdate={null}
										isWritingComment={isWritingComment}
										setIsWritingComment={setIsWritingComment}
										userId={userId}
										xsrfToken={xsrfToken}
										baseUrlBack={baseUrlBack}
									/>
								))}
							</div>
						)}

						{response && response.results.length > 0 && (
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
						)}
					</div>
				</>
			) : (
				<h1 className='wait'>Loading ...</h1>
			)}
			{!isLoading && <Footer />}
		</div>
	);
}

export default Movies;
