/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Nav from '../Nav';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Main from './Main';
import Page from './Page';
import MovieItem from '../ElementItem';
import { useNavigate } from 'react-router-dom';
import Footer from '../home/components/Footer';

interface Props {
	userId: string;
	xsrfToken: string;
	url: string;
	baseUrlBack: string;
}

interface Movie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	media_type: string | null;
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

interface Person {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	media_type: string | null;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	known_for: Movie[];
}

interface TVShow {
	adult: boolean;
	backdrop_path: string;
	id: number;
	name: string;
	original_language: string;
	original_name: string;
	overview: string;
	poster_path: string;
	media_type: string;
	genre_ids: number[];
	popularity: number;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
	origin_country: string[];
}

interface All {
	adult: boolean;
	backdrop_path: string;
	id: number;
	name: string;
	original_language: string;
	original_name: string;
	overview: string;
	poster_path: string;
	media_type: string;
	genre_ids: number[];
	popularity: number;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
	origin_country: string[];
	gender: number;
	known_for_department: string;
	profile_path: string;
	known_for: Movie[];
	original_title: string;
	release_date: string;
	title: string;
	video: boolean;
}

interface ApiResponse {
	page: number;
	results: All[];
	total_pages: number;
	total_results: number;
}

interface ApiMovie {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}

interface ApiTV {
	page: number;
	results: TVShow[];
	total_pages: number;
	total_results: number;
}

interface ApiPerson {
	page: number;
	results: Person[];
	total_pages: number;
	total_results: number;
}

function Search({ userId, xsrfToken, url, baseUrlBack }: Props) {
	const [query, setQuery] = useState<string>('');
	const [type, setType] = useState<string>('');
	const [response, SetResponse] = useState<ApiResponse | null>();
	const [movies, setMovies] = useState<ApiMovie | null>(null);
	const [TVShow, setTVShow] = useState<ApiTV | null>(null);
	const [persons, setPersons] = useState<ApiPerson | null>(null);
	const [message, setMessage] = useState<string>('');
	const [pageMovies, setPageMovies] = useState<number>(1);
	const [pageTV, setPageTV] = useState<number>(1);
	const [pagePersons, setPagePersons] = useState<number>(1);
	const [showAutoComplete, setShowAutoComplete] = useState<boolean>(true);
	const [isWritingComment, setIsWritingComment] = useState<boolean>(false);
	const navigate = useNavigate();

	async function getSearchResponse(type: string, page: number) {
		try {
			const response = await axios.post(
				`${baseUrlBack}/api/TMDB/searchForMovie`,
				{
					query: query,
					type: type,
					page: page,
				},
				{
					headers: {
						'x-xsrf-token': xsrfToken,
					},
					withCredentials: true,
				}
			);

			const results = response.data.search;
			if (type === 'movie') {
				setMovies(results);
			} else if (type === 'tv') {
				setTVShow(results);
			} else if (type === 'person') {
				setPersons(results);
			} else {
				SetResponse(results);
			}
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		if (query === '') {
			SetResponse(null);
			setMessage('Please write at least 1 character');
		} else {
			setMessage('Waiting for search');
			getSearchResponse('multi', 1);
		}
	}, [query]);

	function search(type: string) {
		if (query !== '' && pageMovies && pagePersons && pageTV) {
			[
				{ name: 'multi', page: 1 },
				{ name: 'person', page: pagePersons },
				{ name: 'movie', page: pageMovies },
				{ name: 'tv', page: pageTV },
			].map((typeSearch) =>
				getSearchResponse(typeSearch.name, typeSearch.page)
			);
			if (type === 'search') {
				setPageMovies(1);
				setPagePersons(1);
				setPageTV(1);
			}
		} else {
			setMessage('Please write at least 1 character');
			SetResponse(null);
			setMovies(null);
			setTVShow(null);
			setPersons(null);
		}
	}

	useEffect(() => {
		if (response) {
			if (response.results.length > 0) {
				const mediaType = response.results[0].media_type;
				if (
					mediaType &&
					pageMovies === 1 &&
					pagePersons === 1 &&
					pageTV === 1 &&
					!showAutoComplete
				) {
					setType(mediaType);
				} else if (
					pageMovies === 1 &&
					pagePersons === 1 &&
					pageTV === 1 &&
					!showAutoComplete
				) {
					setType('movie');
				}
			} else {
				setMessage('We found nothing :(');
			}
		} else {
			setMessage('Waiting for search');
		}
	}, [response]);

	useEffect(() => {
		search('page');
	}, [pageMovies, pagePersons, pageTV]);

	function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter' && query !== '') {
			setShowAutoComplete(false);
			search(query);
			const list = document.querySelector(
				`.search-wrapper .main .response-wrapper`
			);
			if (list) {
				list.scrollTo(0, 0);
			}
		}
	}

	return (
		<div
			className='search-wrapper'
			style={
				isWritingComment
					? { overflow: 'hidden', height: '100vh' }
					: { overflow: 'visible' }
			}
		>
			<Nav userId={userId} xsrfToken={xsrfToken} baseUrlBack={baseUrlBack} />
			<div className='search-box'>
				<input
					type='text'
					onChange={(event) => {
						setQuery(event.target.value);
						setShowAutoComplete(true);
					}}
					value={query}
					placeholder='Search for a movie, a person or a TV show ...'
					onKeyDown={handleEnter}
				/>
				<button className='btn-search'>
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						onClick={() => {
							search('search');
							const list = document.querySelector(
								`.search-wrapper .main .response-wrapper`
							);
							if (list) {
								list.scrollTo(0, 0);
							}
						}}
					/>
				</button>
				{showAutoComplete && (
					<div className='auto-complete'>
						{response &&
							response.results.map(
								(result, index) =>
									index < 5 &&
									(result.title ? (
										<div
											key={result.id}
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
												height: '110px',
											}}
											onClick={() => {
												navigate(`/movies/${result.id}`);
												window.scrollTo(0, 0);
											}}
										>
											<span>
												{result.title} ({result.release_date.slice(0, 4)})
											</span>

											{result.poster_path && (
												<img
													style={{ width: '70px', height: '105px' }}
													src={`${url}original${result.poster_path}`}
													alt={result.title}
												/>
											)}
										</div>
									) : (
										<div
											key={result.id}
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
												height: '110px',
											}}
											onClick={() => {
												if (result.media_type === 'tv') {
													navigate(`/tv/${result.id}`);
													window.scrollTo(0, 0);
												} else {
													if (result.known_for_department === 'Acting') {
														navigate(`/cast/${result.id}`);
														window.scrollTo(0, 0);
													} else {
														navigate(`/crew/${result.id}`);
														window.scrollTo(0, 0);
													}
												}
											}}
										>
											<span>
												{result.name}{' '}
												{result.media_type === 'tv' &&
													`(${result.first_air_date.slice(0, 4)})`}
											</span>
											{(result.profile_path || result.poster_path) && (
												<img
													style={{ width: '70px', height: '105px' }}
													src={`${url}original${
														result.profile_path
															? result.profile_path
															: result.poster_path
													}`}
													alt={result.name}
												/>
											)}
										</div>
									))
							)}
					</div>
				)}
			</div>

			<div className='main'>
				<div className='response-wrapper'>
					{type === 'movie' ? (
						movies && movies.results.length > 0 ? (
							<>
								<div className='movie-wrapper'>
									{movies.results.map((movie) => (
										<MovieItem
											width={270}
											height={405}
											id={movie.id}
											title={movie.title}
											posterPath={movie.poster_path}
											url={url}
											fontSize={17}
											media={'movie'}
											tvShow={{ name: '', id: '' }}
											backdropPath=''
											year={
												movie.release_date && movie.release_date.slice(0, 4)
											}
											forceUpdate={null}
											isWritingComment={isWritingComment}
											setIsWritingComment={setIsWritingComment}
											userId={userId}
											xsrfToken={xsrfToken}
											baseUrlBack={baseUrlBack}
										/>
									))}
								</div>
								{movies.total_pages > 1 && (
									<Page
										totalPages={movies.total_pages}
										page={pageMovies}
										setPage={setPageMovies}
									/>
								)}
							</>
						) : (
							<h1>
								{movies
									? movies.results.length === 0 && 'We found no result :('
									: query === ''
									? 'Please write at least one character'
									: 'Waiting for search'}
							</h1>
						)
					) : type === 'tv' ? (
						TVShow && TVShow.results.length > 0 ? (
							<>
								<div className='tv-wrapper'>
									{TVShow.results.map((tvShow) => (
										<MovieItem
											width={270}
											height={405}
											id={tvShow.id}
											title={tvShow.name}
											posterPath={tvShow.poster_path}
											url={url}
											fontSize={17}
											media={'tv'}
											tvShow={{ name: tvShow.name, id: tvShow.id.toString() }}
											backdropPath={tvShow.backdrop_path}
											year={tvShow.first_air_date.slice(0, 4)}
											forceUpdate={null}
											isWritingComment={isWritingComment}
											setIsWritingComment={setIsWritingComment}
											userId={userId}
											xsrfToken={xsrfToken}
											baseUrlBack={baseUrlBack}
										/>
									))}
								</div>
								{TVShow.total_pages > 1 && (
									<Page
										totalPages={TVShow.total_pages}
										page={pageTV}
										setPage={setPageTV}
									/>
								)}
							</>
						) : (
							<h1>
								{TVShow
									? TVShow.results.length === 0 && 'We found no result :('
									: query === ''
									? 'Please write at least one character'
									: 'Waiting for search'}
							</h1>
						)
					) : type === 'person' ? (
						persons && persons.results.length > 0 ? (
							<>
								<div className='person-wrapper-search'>
									{persons.results.map((person) => (
										<Main
											type='person'
											id={person.id}
											navigateType={
												person.known_for_department === 'Acting'
													? 'cast'
													: 'crew'
											}
											posterPath={person.profile_path}
											url={url}
											name={person.name}
										/>
									))}
								</div>
								{persons.total_pages > 1 && (
									<Page
										totalPages={persons.total_pages}
										page={pagePersons}
										setPage={setPagePersons}
									/>
								)}
							</>
						) : (
							<h1>
								{persons
									? persons.results.length === 0 && 'We found no result :('
									: query === ''
									? 'Please write at least one character'
									: 'Waiting for search'}
							</h1>
						)
					) : (
						<h1>{message}</h1>
					)}
				</div>
				<div className='menu-wrapper'>
					<div className='menu'>
						<div
							className={`movies ${type === 'movie' ? 'active' : ''}`}
							onClick={() => {
								setType('movie');
								document
									.querySelector(
										'.search-wrapper .main .response-wrapper > div'
									)
									?.scrollTo(0, 0);
							}}
						>
							<span className='category'>Movies</span>
							{movies && <span className='number'>{movies.total_results}</span>}
						</div>
						<div
							className={`tv ${type === 'tv' ? 'active' : ''}`}
							onClick={() => {
								document
									.querySelector(
										'.search-wrapper .main .response-wrapper > div'
									)
									?.scrollTo(0, 0);
								setType('tv');
							}}
						>
							<span className='category'>TV Show</span>
							{TVShow && <span className='number'>{TVShow.total_results}</span>}
						</div>
						<div
							className={`person ${type === 'person' ? 'active' : ''}`}
							onClick={() => {
								setType('person');
								document
									.querySelector(
										'.search-wrapper .main .response-wrapper > div'
									)
									?.scrollTo(0, 0);
							}}
						>
							<span className='category'>Person</span>
							{persons && (
								<span className='number'>{persons.total_results}</span>
							)}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Search;
