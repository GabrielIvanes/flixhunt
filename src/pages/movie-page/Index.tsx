/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import Nav from '../Nav';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, SVGProps } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHeart,
	faBookmark,
	faEye,
	faEyeSlash,
} from '@fortawesome/free-regular-svg-icons';
import {
	faImage,
	faPlay,
	faStar,
	faHourglassStart,
	faCalendar,
	faXmark,
	faHeart as faHeartFull,
	faBookmark as faBookmarkFull,
	faList,
	faPen,
} from '@fortawesome/free-solid-svg-icons';
import MoviesList from './RecommendationList';
import CastList from './CastList';
import CrewList from './CrewList';
import Footer from '../home/components/Footer';

interface DefaultList {
	userId: string;
	listName: string;
	elementId: string;
	elementType: string;
	dateAdded: string;
	title: string;
	posterPath: string | null;
	directors:
		| {
				id: string;
				name: string;
		  }[]
		| null;
	genres:
		| {
				id: string;
				name: string;
		  }[]
		| null;
	backdropPath: string | null;
	date: string;
	elementNumber: string;
	elementParent: {
		parent: {
			name: string;
			id: string;
			number: string;
		}[];
	};
}

interface Genre {
	id: number;
	name: string;
}

interface ProductionCompany {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

interface Cast {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
}

interface Crew {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	credit_id: string;
	department: string;
	job: string;
}

interface Provider {
	logo_path: string;
	provider_id: number;
	provider_name: string;
	display_priority: number;
}

interface WatchProvider {
	link: string;
	buy: Provider[];
	rent: Provider[];
	flatrate: Provider[];
}

interface WatchProviders {
	results: {
		[locale: string]: WatchProvider;
	};
}

interface Recommendation {
	adult: boolean;
	backdrop_path: string | null;
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	poster_path: string | null;
	media_type: string;
	genre_ids: number[];
	popularity: number;
	name: string;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	first_air_date: string;
}

interface VideoItem {
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	published_at: string;
	id: string;
}

interface Movie {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: {
		id: number;
		name: string;
		poster_path: string;
		backdrop_path: string;
	};
	budget: number;
	credits: {
		cast: Cast[];
		crew: Crew[];
	};
	genres: Genre[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	recommendations: {
		page: number;
		results: Recommendation[];
		total_pages: number;
		total_results: number;
	};
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	videos: {
		results: VideoItem[];
	};
	vote_average: number;
	vote_count: number;
	'watch/providers': WatchProviders;
}

interface Props {
	userId: string;
	xsrfToken: string;
	url: string;
	baseUrlBack: string;
}

export function MdiMovieOpenRemoveOutline(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			viewBox='0 0 24 24'
			{...props}
		>
			<path
				fill='currentColor'
				d='m19.65 6.5l-2.74-3.54l3.93-.78l.78 3.92l-1.97.4m-2.94.57l-2.74-3.53l-1.97.39l2.75 3.53l1.96-.39M4.16 5.5l-.98.19a1.995 1.995 0 0 0-1.57 2.35L2 10l4.9-.97L4.16 5.5m7.65 2.55L9.07 4.5l-1.97.41l2.75 3.53l1.96-.39M4 20v-8h16v1.09c.72.12 1.39.37 2 .72V10H2v10a2 2 0 0 0 2 2h9.81c-.35-.61-.59-1.28-.72-2H4m18.54-3.12l-1.42-1.41L19 17.59l-2.12-2.12l-1.41 1.41L17.59 19l-2.12 2.12l1.41 1.42L19 20.41l2.12 2.13l1.42-1.42L20.41 19l2.13-2.12Z'
			></path>
		</svg>
	);
}

export function MdiMovieOpenCheck(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			viewBox='0 0 24 24'
			{...props}
		>
			<path
				fill='currentColor'
				d='m19.65 6.5l-2.74-3.54l3.93-.78l.78 3.92l-1.97.4m-2.94.57l-2.74-3.53l-1.97.39l2.75 3.53l1.96-.39M19 13c1.1 0 2.12.3 3 .81V10H2v10a2 2 0 0 0 2 2h9.81c-.51-.88-.81-1.9-.81-3c0-3.31 2.69-6 6-6m-7.19-4.95L9.07 4.5l-1.97.41l2.75 3.53l1.96-.39M4.16 5.5l-.98.19a2.008 2.008 0 0 0-1.57 2.35L2 10l4.9-.97L4.16 5.5m17.18 10.34l-3.59 3.59l-1.59-1.59L15 19l2.75 3l4.75-4.75l-1.16-1.41Z'
			></path>
		</svg>
	);
}

function Index({ userId, xsrfToken, url, baseUrlBack }: Props) {
	const { id: movieId } = useParams();
	const [movieInfo, setMovieInfo] = useState<Movie>();
	const [crew, setCrew] = useState<Crew[]>();
	const navigate = useNavigate();
	const [directors, setDirectors] = useState<Crew[]>();
	const [videos, setVideos] = useState<VideoItem[]>();
	const [showTrailer, setShowTrailer] = useState<boolean>(false);
	const [trailer, setTrailer] = useState<VideoItem>();
	const [writingComment, setWritingComment] = useState<boolean>(false);
	const [movieLiked, setMovieLiked] = useState<boolean>(false);
	const [dateLiked, setDateLiked] = useState<string>();
	const [movieInWatchList, setMovieInWatchList] = useState<boolean>(false);
	const [movieSeen, setMovieSeen] = useState<boolean>(false);
	const [dateSeen, setDateSeen] = useState<string>();
	const [movieSeenInTheater, setMovieSeenInTheater] = useState<boolean>(false);
	const [dateTheater, setDateTheater] = useState<string>();
	const [comment, setComment] = useState<string>('');
	const [dateComment, setDateComment] = useState<string>();
	const [commentInSection, setCommentInSection] = useState<string>('');
	const [_, setRender] = useState<{
		renderObject: number;
	}>({ renderObject: 0 });

	function forceUpdate() {
		setRender((prevRender) => ({ renderObject: prevRender.renderObject + 1 }));
	}

	async function getElementLists() {
		try {
			const response = await axios.post(
				`${baseUrlBack}/api/actions/getElementDefaultLists`,
				{
					userId: userId,
					elementId: movieId,
					elementType: 'movie',
				},
				{
					headers: {
						'x-xsrf-token': xsrfToken,
					},
					withCredentials: true,
				}
			);
			response.data.elementLists.map((elementList: DefaultList) => {
				if (elementList.listName === 'like') {
					setMovieLiked(true);
					setDateLiked(elementList.dateAdded.slice(0, 10));
				} else if (elementList.listName === 'watchlist') {
					setMovieInWatchList(true);
				} else if (elementList.listName === 'theater') {
					setMovieSeenInTheater(true);
					setDateTheater(elementList.dateAdded.slice(0, 10));
				} else if (elementList.listName === 'seen') {
					setMovieSeen(true);
					setDateSeen(elementList.dateAdded.slice(0, 10));
				}
			});
		} catch (err) {
			console.error(err);
		}
	}

	async function handleActionsClick(list: string, action: string) {
		try {
			const response = await axios.post(
				`${baseUrlBack}/api/actions/defaultAction`,
				{
					userId: userId,
					elementId: movieId,
					list: list,
					elementType: 'movie',
					action: action,
					title: movieInfo?.title,
					posterPath: movieInfo?.poster_path,
					directors: movieInfo?.credits.crew.filter(
						(person) => person.job === 'Director'
					),
					genres: movieInfo?.genres,
					backdropPath: movieInfo?.backdrop_path,
					date: movieInfo?.release_date,
				},
				{
					headers: {
						'x-xsrf-token': xsrfToken,
					},
					withCredentials: true,
				}
			);
			if (response.data.success) {
				if (list === 'like') {
					setMovieLiked(!movieLiked);
				} else if (list === 'watchlist') {
					setMovieInWatchList(!movieInWatchList);
				} else if (list === 'seen') {
					setMovieSeen(!movieSeen);
				} else if (list === 'theater') {
					setMovieSeenInTheater(!movieSeenInTheater);
				}
			}
		} catch (err) {
			console.error(err);
		}
	}

	async function getElementComment() {
		try {
			const response = await axios.post(
				`${baseUrlBack}/api/actions/getElementComment`,
				{
					userId: userId,
					elementId: movieId,
					elementType: 'movie',
				},
				{
					headers: {
						'x-xsrf-token': xsrfToken,
					},
					withCredentials: true,
				}
			);
			if (response.data.comment.length > 0) {
				setComment(response.data.comment[0].comment);
				setCommentInSection(response.data.comment[0].comment);
				setDateComment(response.data.comment[0].dateAdded.slice(0, 10));
			}
		} catch (err) {
			console.error(err);
		}
	}

	async function handleCommentSave() {
		try {
			const response = await axios.post(
				`${baseUrlBack}/api/actions/addComment`,
				{
					userId: userId,
					comment: comment,
					elementId: movieId,
					elementType: 'movie',
				},
				{
					headers: {
						'x-xsrf-token': xsrfToken,
					},
					withCredentials: true,
				}
			);
			if (response.data.success) {
				setWritingComment(false);
				setCommentInSection(comment);
				setDateComment(new Date().toISOString().split('T')[0].toString());
			}
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		setMovieInWatchList(false);
		setMovieLiked(false);
		setMovieSeen(false);
		setMovieSeenInTheater(false);
		setComment('');
		setCommentInSection('');
		getElementLists();
		getElementComment();
	}, [movieInfo]);

	useEffect(() => {
		async function getMovieInformation(movieId: string) {
			try {
				const response = await axios.post(
					`${baseUrlBack}/api/TMDB/getMovieInformation`,
					{
						movieId: movieId,
					},
					{
						headers: {
							'x-xsrf-token': xsrfToken,
						},
						withCredentials: true,
					}
				);
				setMovieInfo(response.data.movie);
			} catch (err) {
				console.error(err);
			}
		}

		if (movieId) {
			getMovieInformation(movieId);
		}
	}, [movieId]);

	useEffect(() => {
		if (movieInfo) {
			const updatedDirectors: Crew[] = movieInfo.credits.crew.filter(
				(person) => person.job === 'Director'
			);
			setDirectors(updatedDirectors);

			const tmpCrew: Crew[] = movieInfo.credits.crew;
			const filteredCrew: Crew[] = [];
			const id: number[] = [];
			for (const crewMember of tmpCrew) {
				if (!id.includes(crewMember.id)) {
					id.push(crewMember.id);
					filteredCrew.push(crewMember);
				} else {
					const crewMemberTmp = filteredCrew.find(
						(filteredCrewMember) => filteredCrewMember.id === crewMember.id
					);
					if (crewMemberTmp) {
						crewMemberTmp.job += `, ${crewMember.job}`;
					}
				}
			}
			setCrew(filteredCrew);

			let updatedVideos: VideoItem[] = movieInfo.videos.results.filter(
				(video) =>
					video.official === true &&
					video.type === 'Trailer' &&
					video.site === 'YouTube'
			);
			if (updatedVideos.length === 0) {
				updatedVideos = movieInfo.videos.results.filter(
					(video) => video.type === 'Trailer' && video.site === 'YouTube'
				);
			}
			setVideos(updatedVideos);
		}
	}, [movieInfo]);

	useEffect(() => {
		if (videos) {
			const videosFiltered = videos.filter(
				(video) =>
					video.name === 'Trailer' ||
					video.name === 'Official Trailer' ||
					video.name === 'Main Trailer' ||
					video.name === 'Official US Trailer'
			);
			if (videosFiltered.length !== 0) {
				setTrailer(videosFiltered[0]);
			} else {
				setTrailer(videos[0]);
			}
		}
	}, [videos]);

	function convertTime(minutes: number) {
		const hour = Math.floor(minutes / 60);
		const minute = minutes % 60;
		const minuteString = minute >= 10 ? `${minute}` : `0${minute}`;
		return `${hour}h ${minuteString}m`;
	}

	return (
		<div
			className='movie-page-wrapper'
			style={
				showTrailer || writingComment
					? { overflow: 'hidden', height: '100vh' }
					: { overflow: 'visible' }
			}
		>
			<Nav userId={userId} xsrfToken={xsrfToken} baseUrlBack={baseUrlBack} />
			{movieInfo && (
				<>
					{writingComment && (
						<div className='comment-wrapper'>
							<div>
								<div
									className='header'
									onClick={() => {
										setWritingComment(false);
									}}
								>
									<span className='title'>{movieInfo.title}</span>
									<span className='xMark'>
										<FontAwesomeIcon icon={faXmark} />
									</span>
								</div>
								<textarea
									className='comment'
									placeholder='Capture your personal thoughts and feelings about the movie or TV Show here. What did you love? What made you think? How did it make you feel? These notes are just for you, to remember the magic of this film journey.'
									maxLength={873}
									onChange={(event) => setComment(event.target.value)}
									value={comment}
								></textarea>
								<button
									onClick={() => {
										handleCommentSave();
										getElementComment();
									}}
								>
									Save
								</button>
							</div>
						</div>
					)}
					{trailer && showTrailer && (
						<div className='trailer-video'>
							<div onClick={() => setShowTrailer(false)}>
								<FontAwesomeIcon icon={faXmark} />
							</div>

							<iframe
								width='700'
								height='393,75'
								src={`https://www.youtube.com/embed/${trailer.key}?rel=0`}
								allowFullScreen
								title={`${trailer.name}`}
								style={{ border: '2px Solid white' }}
							></iframe>
						</div>
					)}
					<div
						className='movie'
						style={showTrailer || writingComment ? { opacity: '0.2' } : {}}
					>
						{movieInfo.backdrop_path && (
							<div
								className='backdrop-image'
								style={{
									backgroundImage: `url(${url}original${movieInfo.backdrop_path})`,
									width: '100%',
									height: '100vh',
									backgroundSize: 'cover',
								}}
							></div>
						)}
						<div className='main-informations'>
							<div className='left'>
								{movieInfo.poster_path ? (
									<img
										src={`${url}original${movieInfo.poster_path}`}
										alt={movieInfo.title}
									/>
								) : (
									<div
										style={{
											width: '300px',
											height: '450px',
											backgroundColor: '#1e1e1e',
											color: '1g1g1g',
											borderRadius: '6px',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											fontSize: '60px',
										}}
									>
										<FontAwesomeIcon icon={faImage} />
									</div>
								)}
							</div>
							<div className='right'>
								<div className='top'>
									<h1>{movieInfo.title}</h1>
									{directors && directors.length > 1 ? (
										<h3>Directors</h3>
									) : (
										<h3>Director</h3>
									)}
									{directors && directors.length !== 0 ? (
										<div className='director'>
											{directors.map((directorPerson, index) => (
												<span
													key={directorPerson.id}
													className='director-name'
													onClick={() => {
														navigate(`/directors/${directorPerson.id}`);
														window.scrollTo(0, 0);
													}}
												>
													{directorPerson.name}
													{index < directors.length - 1 ? ', ' : ''}
												</span>
											))}
										</div>
									) : (
										<div className='director'>
											There is no director provided.
										</div>
									)}
									{movieInfo.tagline && (
										<div className='tagline'>{movieInfo.tagline}</div>
									)}
									<h3>Overview</h3>
									{movieInfo.overview ? (
										<p className='overview'>{movieInfo.overview}</p>
									) : (
										<p className='overview'>There is no overview provided.</p>
									)}
									<div className='row'>
										{movieInfo.release_date && (
											<div className='release-date'>
												<span>{movieInfo.release_date.slice(0, 4)}</span>
												<span>
													<FontAwesomeIcon icon={faCalendar} />
												</span>
											</div>
										)}
										{movieInfo.runtime !== 0 && (
											<div className='runtime'>
												<span>{convertTime(movieInfo.runtime)}</span>
												<span>
													<FontAwesomeIcon icon={faHourglassStart} />
												</span>
											</div>
										)}
										{movieInfo.vote_average !== 0 && (
											<div className='rating'>
												<span>
													{movieInfo.vote_average.toString().slice(0, 3)}/10
												</span>
												<span>
													<FontAwesomeIcon icon={faStar} />
												</span>
											</div>
										)}
									</div>
									<div className='row'>
										{movieInfo.genres.map((genre) => (
											<span
												key={genre.id}
												style={{ cursor: 'pointer' }}
												onClick={() => {
													navigate('/movies', { state: { genre: genre } });
													window.scrollTo(0, 0);
												}}
											>
												{genre.name}
											</span>
										))}
									</div>
									<div className='actions'>
										<span className='video'>
											{trailer && !showTrailer && (
												<div onClick={() => setShowTrailer(true)}>
													<FontAwesomeIcon icon={faPlay} />
													<span>Run Trailer</span>
												</div>
											)}
										</span>
										<span className='like-wrapper'>
											{!movieLiked ? (
												<span className='unlike'>
													<div className='tooltip'>
														Add it to your favorite list
													</div>
													<div className='triangle'></div>
													<button
														onClick={() => {
															handleActionsClick('like', 'add');
															setDateLiked(
																new Date()
																	.toISOString()
																	.split('T')[0]
																	.toString()
															);
														}}
													>
														<FontAwesomeIcon
															icon={faHeart}
															className='movie-icon'
														/>
													</button>
												</span>
											) : (
												<span className='like'>
													{dateLiked && (
														<div className='tooltip'>Liked on {dateLiked}</div>
													)}
													<div className='triangle'></div>
													<button
														onClick={() => {
															handleActionsClick('like', 'remove');
														}}
													>
														<FontAwesomeIcon
															icon={faHeartFull}
															className='movie-icon'
														/>
													</button>
												</span>
											)}
										</span>
										<span className='watchlist-wrapper'>
											{!movieInWatchList ? (
												<span className='not-watchlist'>
													<div className='tooltip'>Add to your watchlist</div>
													<div className='triangle'></div>
													<button
														onClick={() =>
															handleActionsClick('watchlist', 'add')
														}
													>
														<FontAwesomeIcon
															icon={faBookmark}
															className='movie-icon'
														/>
													</button>
												</span>
											) : (
												<span className='watchlist'>
													<div className='tooltip'>
														Remove from your watchlist
													</div>
													<div className='triangle'></div>
													<button
														onClick={() =>
															handleActionsClick('watchlist', 'remove')
														}
													>
														<FontAwesomeIcon
															icon={faBookmarkFull}
															className='movie-icon'
														/>
													</button>
												</span>
											)}
										</span>
										<span className='theater-wrapper'>
											{movieSeenInTheater ? (
												<span className='theater'>
													{dateTheater && (
														<div className='tooltip'>
															Viewed {dateTheater} at the cinema
														</div>
													)}
													<div className='triangle'></div>
													<button
														onClick={() =>
															handleActionsClick('theater', 'remove')
														}
													>
														<MdiMovieOpenCheck className='movie-icon' />
													</button>
												</span>
											) : (
												<span className='not-theater'>
													<div className='tooltip'>
														Add to your watched in theater list
													</div>
													<div className='triangle'></div>
													<button
														onClick={() => {
															handleActionsClick('theater', 'add');
															setDateTheater(
																new Date()
																	.toISOString()
																	.split('T')[0]
																	.toString()
															);
														}}
													>
														<MdiMovieOpenRemoveOutline className='movie-icon' />
													</button>
												</span>
											)}
										</span>
										<span className='seen-wrapper'>
											{movieSeen ? (
												<span className='seen'>
													{dateSeen && (
														<div className='tooltip'>Viewed on {dateSeen}</div>
													)}
													<div className='triangle'></div>
													<button>
														<FontAwesomeIcon
															icon={faEye}
															onClick={() =>
																handleActionsClick('seen', 'remove')
															}
															className='movie-icon'
														/>
													</button>
												</span>
											) : (
												<span className='not-seen'>
													<div className='tooltip'>
														Add to your watched list
													</div>
													<div className='triangle'></div>
													<button
														onClick={() => {
															handleActionsClick('seen', 'add');
															setDateSeen(
																new Date()
																	.toISOString()
																	.split('T')[0]
																	.toString()
															);
														}}
													>
														<FontAwesomeIcon
															icon={faEyeSlash}
															className='movie-icon'
														/>
													</button>
												</span>
											)}
										</span>
										<span className='custom-lists'>
											<div className='tooltip'>Add to a custom list</div>
											<div className='triangle'></div>
											<button>
												<FontAwesomeIcon icon={faList} className='movie-icon' />
											</button>
										</span>
										<span className='comment'>
											<div className='tooltip'>Write a comment</div>
											<div className='triangle'></div>
											<button
												onClick={() => {
													setWritingComment(true);
												}}
											>
												<FontAwesomeIcon icon={faPen} className='movie-icon' />
											</button>
										</span>
									</div>
								</div>
								<div className='providers'>
									{movieInfo['watch/providers'].results.FR &&
										movieInfo['watch/providers'].results.FR.flatrate && (
											<>
												<h3>Streaming</h3>
												{movieInfo['watch/providers'].results.FR.flatrate.map(
													(provider, index) => (
														<img
															key={index}
															src={`${url}original${provider.logo_path}`}
															alt={provider.provider_name}
														/>
													)
												)}
											</>
										)}
								</div>
							</div>
						</div>
					</div>
					<div
						className='lists'
						style={showTrailer || writingComment ? { opacity: '0.2' } : {}}
					>
						{commentInSection && (
							<div className='comment-wrapper-list'>
								<div className='comment'>
									<h2>Comment</h2>
									<div>{commentInSection}</div>
									{dateComment && (
										<div className='date-comment'>{dateComment}</div>
									)}
								</div>
							</div>
						)}

						<div className='cast-wrapper'>
							{movieInfo && movieInfo.credits.cast.length !== 0 && (
								<div className='cast'>
									<h2>Cast</h2>
									<CastList
										cast={movieInfo.credits.cast}
										url={url}
										forceUpdate={forceUpdate}
										noClick={showTrailer || writingComment ? true : false}
									/>
								</div>
							)}
						</div>
						<div className='crew-wrapper'>
							{movieInfo && movieInfo.credits.crew.length !== 0 && crew && (
								<div className='crew'>
									<h2>Crew</h2>
									<CrewList crew={crew} url={url} forceUpdate={forceUpdate} />
								</div>
							)}
						</div>
						<div className='recommendation-wrapper'>
							{movieInfo && movieInfo.recommendations.results.length !== 0 && (
								<div className='recommendation'>
									<h2>Recommendation</h2>
									<MoviesList
										recommendation={movieInfo.recommendations.results}
										url={url}
										forceUpdate={forceUpdate}
										xsrfToken={xsrfToken}
										userId={userId}
										baseUrlBack={baseUrlBack}
									/>
								</div>
							)}
						</div>
					</div>
				</>
			)}
			<Footer />
		</div>
	);
}

export default Index;
