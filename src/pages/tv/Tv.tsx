/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, SVGProps } from 'react';
import axios from 'axios';
import Nav from '../Nav';
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
	faXmark,
	faHeart as faHeartFull,
	faBookmark as faBookmarkFull,
	faList,
	faPen,
	faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import CastList from '../movie-page/CastList';
import CrewList from '../movie-page/CrewList';
import MoviesList from '../movie-page/RecommendationList';
import SeasonsList from './SeasonsList';
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
interface Cast {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	order: number;
	original_name: string;
	popularity: number;
	profile_path: string;
	roles: Role[];
	total_episode_count: number;
}

interface CastListInterface {
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

interface Role {
	credit_id: string;
	character: string;
	episode_count: number;
}

interface Creator {
	id: number;
	credit_id: string;
	name: string;
	gender: number;
	profile_path: string;
}

interface Crew {
	adult: boolean;
	department: string;
	gender: number;
	id: number;
	jobs: { credit_id: string; job: string; episode_count: number }[];
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	total_episode_count: number;
}

interface CrewListInterface {
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

interface EpisodeToAir {
	id: number;
	name: string;
	overview: string;
	vote_average: number;
	vote_count: number;
	air_date: string;
	episode_number: number;
	episode_type: string;
	production_code: string;
	runtime: number;
	season_number: number;
	show_id: number;
	still_path: string | null;
}

interface Genre {
	id: number;
	name: string;
}

interface Network {
	id: number;
	logo_path: string | null;
	name: string;
	origin_country: string;
}

interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

interface ProductionCompany {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

interface Recommendation {
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
	title: string;
	original_title: string;
	release_date: string;
	video: boolean;
}

interface Season {
	air_date: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string | null;
	season_number: number;
	vote_average: number;
}

interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

interface Video {
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

interface TVShow {
	adult: boolean;
	backdrop_path: string;
	created_by: Creator[];
	aggregate_credits: {
		cast: Cast[];
		crew: Crew[];
	};
	episode_run_time: number[];
	first_air_date: string;
	genres: Genre[];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: EpisodeToAir;
	name: string;
	next_episode_to_air: EpisodeToAir;
	networks: Network[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	recommendations: {
		page: number;
		results: Recommendation[];
		total_pages: number;
		total_results: number;
	};
	seasons: Season[];
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	type: string;
	videos: {
		results: Video[];
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

function Tv({ userId, xsrfToken, url, baseUrlBack }: Props) {
	const { id: tvId } = useParams();
	const [tvInfo, setTvInfo] = useState<TVShow>();
	const [crew, setCrew] = useState<CrewListInterface[]>();
	const [cast, setCast] = useState<CastListInterface[]>();
	const [videos, setVideos] = useState<Video[]>();
	const [trailer, setTrailer] = useState<Video>();
	const [showTrailer, setShowTrailer] = useState<boolean>(false);
	const [writingComment, setWritingComment] = useState<boolean>(false);
	const [tvLiked, setTvLiked] = useState<boolean>(false);
	const [dateLiked, setDateLiked] = useState<string>();
	const [tvInWatchList, setTvInWatchList] = useState<boolean>(false);
	const [tvSeen, setTvSeen] = useState<boolean>(false);
	const [dateSeen, setDateSeen] = useState<string>();
	const [comment, setComment] = useState<string>('');
	const [dateComment, setDateComment] = useState<string>();
	const [commentInSection, setCommentInSection] = useState<string>('');
	const navigate = useNavigate();
	const [_, setRender] = useState<{
		renderObject: number;
	}>({ renderObject: 0 });

	function forceUpdate() {
		setRender((prevRender) => ({
			renderObject: prevRender.renderObject + 1,
		}));
	}

	async function getElementLists() {
		try {
			const response = await axios.post(
				`${baseUrlBack}/api/actions/getElementDefaultLists`,
				{
					userId: userId,
					elementId: tvId,
					elementType: 'tv',
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
					setTvLiked(true);
					setDateLiked(elementList.dateAdded.slice(0, 10));
				} else if (elementList.listName === 'watchlist') {
					setTvInWatchList(true);
				} else if (elementList.listName === 'seen') {
					setTvSeen(true);
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
					elementId: tvId,
					list: list,
					elementType: 'tv',
					action: action,
					title: tvInfo?.name,
					posterPath: tvInfo?.poster_path,
					directors: tvInfo?.created_by
						.filter((creator) => creator.name)
						.join(','),
					genres: tvInfo?.genres.filter((genre) => genre.name).join(','),
					backdropPath: tvInfo?.backdrop_path,
					date: tvInfo?.first_air_date,
				},
				{
					headers: {
						'x-xsrf-token': xsrfToken,
					},
					withCredentials: true,
				}
			);
			console.log(response);
			if (response.data.success) {
				if (list === 'like') {
					setTvLiked(!tvLiked);
				} else if (list === 'watchlist') {
					setTvInWatchList(!tvInWatchList);
				} else if (list === 'seen') {
					setTvSeen(!tvSeen);
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
					elementId: tvId,
					elementType: 'tv',
				},
				{
					headers: {
						'x-xsrf-token': xsrfToken,
					},
					withCredentials: true,
				}
			);
			if (response.data.comment.length > 0) {
				console.log(response.data.comment);
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
					elementId: tvId,
					elementType: 'tv',
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
		setTvInWatchList(false);
		setTvLiked(false);
		setTvSeen(false);

		setComment('');
		setCommentInSection('');
		getElementLists();
		getElementComment();
	}, []);

	useEffect(() => {
		async function getTvInformation(tvId: string) {
			try {
				const response = await axios.post(
					`${baseUrlBack}/api/TMDB/getTvInformation`,
					{
						tvId: tvId,
					},
					{
						headers: {
							'x-xsrf-token': xsrfToken,
						},
						withCredentials: true,
					}
				);
				setTvInfo(response.data.tv);
				console.log(response.data.tv);
			} catch (err) {
				console.error(err);
			}
		}
		if (tvId) {
			getTvInformation(tvId);
		}
	}, [tvId]);

	useEffect(() => {
		if (tvInfo) {
			const tmpCrew: Crew[] = tvInfo.aggregate_credits.crew;
			const filteredCrew: CrewListInterface[] = [];
			const id: number[] = [];
			for (const crewMember of tmpCrew) {
				const crewInterface: CrewListInterface = {
					adult: crewMember.adult,
					gender: crewMember.gender,
					id: crewMember.id,
					known_for_department: crewMember.known_for_department,
					name: crewMember.name,
					original_name: crewMember.original_name,
					popularity: crewMember.popularity,
					profile_path: crewMember.profile_path,
					credit_id: crewMember.id.toString(),
					department: crewMember.department,
					job: crewMember.jobs.map((job) => job.job).join(', '),
				};
				if (!id.includes(crewMember.id)) {
					id.push(crewMember.id);
					filteredCrew.push(crewInterface);
				} else {
					const crewMemberTmp = filteredCrew.find(
						(filteredCrewMember) => filteredCrewMember.id === crewMember.id
					);
					if (crewMemberTmp) {
						crewMemberTmp.job += `, ${crewInterface.job}`;
					}
				}
			}
			setCrew(filteredCrew);

			const updatedCast: CastListInterface[] = [];

			for (const cast of tvInfo.aggregate_credits.cast) {
				const rolesString: string[] = [];
				const tmpCast: CastListInterface = {
					adult: cast.adult,
					gender: cast.gender,
					id: cast.id,
					known_for_department: cast.known_for_department,
					name: cast.name,
					original_name: cast.original_name,
					popularity: cast.popularity,
					profile_path: cast.profile_path,
					character: cast.roles
						.map((role) => {
							for (const roleString of rolesString) {
								const regex = new RegExp(`.*${roleString}.*`, 'i');
								if (regex.test(role.character)) {
									return true;
								}
							}
							rolesString.push(role.character);
							return role.character;
						})
						.filter((role) => role !== true)
						.join(', '),
					order: cast.order,
					cast_id: cast.id,
					credit_id: cast.id.toString(),
				};
				updatedCast.push(tmpCast);
			}

			setCast(updatedCast);

			let updatedVideos: Video[] = tvInfo.videos.results.filter(
				(video) =>
					video.official === true &&
					video.type === 'Trailer' &&
					video.site === 'YouTube'
			);
			if (updatedVideos.length === 0) {
				updatedVideos = tvInfo.videos.results.filter(
					(video) => video.type === 'Trailer' && video.site === 'YouTube'
				);
			}
			setVideos(updatedVideos);
		}
	}, [tvInfo]);

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

	return (
		<div
			className='tv-page-wrapper'
			style={
				showTrailer || writingComment
					? { overflow: 'hidden', height: '100vh' }
					: { overflow: 'visible' }
			}
		>
			<Nav userId={userId} xsrfToken={xsrfToken} baseUrlBack={baseUrlBack} />
			{tvInfo && (
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
									<span className='title'>{tvInfo.name}</span>
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
						className='tv'
						style={showTrailer || writingComment ? { opacity: '0.2' } : {}}
					>
						{tvInfo.backdrop_path && (
							<div
								className='backdrop-image'
								style={{
									backgroundImage: `url(${url}original${tvInfo.backdrop_path})`,
									backgroundSize: 'cover',
									width: '100%',
									height: '100vh',
								}}
							></div>
						)}
						<div className='main'>
							<div className='left'>
								{tvInfo.poster_path ? (
									<img
										src={`${url}original${tvInfo.poster_path}`}
										alt={tvInfo.name}
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
									<h1>{tvInfo.name}</h1>
									{tvInfo.created_by.length > 1 ||
									tvInfo.aggregate_credits.crew.filter((crew) =>
										crew.jobs.find((job) => job.job === 'Creator')
									).length > 1 ? (
										<h3>Creators</h3>
									) : (
										<h3>Creator</h3>
									)}
									<div className='creator'>
										{tvInfo.created_by.length !== 0 ? (
											tvInfo.created_by.length > 1 ? (
												<>
													{tvInfo.created_by.map((creator, index) =>
														index !== tvInfo.created_by.length - 1 ? (
															<span className='creator-person' key={creator.id}>
																<span
																	key={creator.id}
																	className='creator-name'
																	onClick={() => {
																		navigate(`/creators/${creator.id}`);
																		window.scrollTo(0, 0);
																	}}
																>
																	{creator.name}
																</span>
																<span key={index}>, </span>
															</span>
														) : (
															<span
																key={creator.id}
																className='creator-name'
																onClick={() => {
																	navigate(`/creators/${creator.id}`);
																	window.scrollTo(0, 0);
																}}
															>
																{creator.name}
															</span>
														)
													)}
												</>
											) : (
												<span
													className='creator-name'
													onClick={() => {
														navigate(`/creators/${tvInfo.created_by[0].id}`);
														window.scrollTo(0, 0);
													}}
												>
													{tvInfo.created_by[0].name}
												</span>
											)
										) : (
											<>
												{tvInfo.aggregate_credits.crew.find((crew) =>
													crew.jobs.find((job) => job.job === 'Creator')
												) ? (
													tvInfo.aggregate_credits.crew.map(
														(crew) =>
															crew.jobs.find(
																(job) => job.job === 'Creator'
															) && (
																<span
																	key={crew.id}
																	className='from-crew'
																	onClick={() => {
																		navigate(`/creators/${crew.id}`);
																		window.scrollTo(0, 0);
																	}}
																>
																	{crew.name}
																</span>
															)
													)
												) : (
													<span>There is no creator provided.</span>
												)}
											</>
											//
										)}
									</div>
									{tvInfo.tagline && (
										<div className='tagline'>{tvInfo.tagline}</div>
									)}
									<h3>Overview</h3>
									{tvInfo.overview ? (
										<p className='overview' style={{ textAlign: 'justify' }}>
											{tvInfo.overview}
										</p>
									) : (
										<p className='overview'>There is no overview provided.</p>
									)}
									<div className='row genres'>
										{tvInfo.genres.map((genre) => (
											<span
												key={genre.id}
												style={{ cursor: 'pointer' }}
												onClick={() => {
													navigate('/tv', { state: { genre: genre } });
													window.scrollTo(0, 0);
												}}
											>
												{genre.name}
											</span>
										))}
									</div>
									<div className='row'>
										{tvInfo.last_air_date.slice(0, 4) !==
											tvInfo.first_air_date.slice(0, 4) &&
										tvInfo.status === 'Ended' ? (
											<span style={{ cursor: 'default' }}>
												{tvInfo.first_air_date.slice(0, 4)} -{' '}
												{tvInfo.last_air_date.slice(0, 4)}
												<span style={{ marginLeft: '5px' }}>
													<FontAwesomeIcon icon={faCalendar} />
												</span>
											</span>
										) : (
											<span style={{ cursor: 'default' }}>
												{tvInfo.first_air_date.slice(0, 4)}
												<span style={{ marginLeft: '5px' }}>
													<FontAwesomeIcon icon={faCalendar} />
												</span>
											</span>
										)}
										{tvInfo.number_of_seasons > 1 ? (
											<span style={{ cursor: 'default' }}>
												{tvInfo.number_of_seasons} seasons
											</span>
										) : (
											<span style={{ cursor: 'default' }}>
												{tvInfo.number_of_seasons} season
											</span>
										)}
										{tvInfo.number_of_episodes > 1 ? (
											<span>{tvInfo.number_of_episodes} episodes</span>
										) : (
											<span>{tvInfo.number_of_episodes} episodes</span>
										)}
									</div>
									<div className='actions'>
										{trailer && !showTrailer && (
											<span className='video'>
												<div onClick={() => setShowTrailer(true)}>
													<FontAwesomeIcon icon={faPlay} />
													<span>Run Trailer</span>
												</div>
											</span>
										)}

										<span className='like-wrapper'>
											{!tvLiked ? (
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
											{!tvInWatchList ? (
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

										<span className='seen-wrapper'>
											{tvSeen ? (
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
									{tvInfo['watch/providers'].results.FR &&
										tvInfo['watch/providers'].results.FR.flatrate && (
											<>
												<h3>Streaming</h3>
												{tvInfo['watch/providers'].results.FR.flatrate.map(
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
					<div className='lists'>
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

						<div className='seasons-wrapper'>
							{tvInfo && tvInfo.seasons && (
								<div className='seasons'>
									<h2>Seasons</h2>
									<SeasonsList
										seasons={tvInfo.seasons}
										url={url}
										backdropPath={tvInfo.backdrop_path}
										tvShow={{ name: tvInfo.name, id: tvInfo.id.toString() }}
										forceUpdate={forceUpdate}
										userId={userId}
										xsrfToken={xsrfToken}
										baseUrlBack={baseUrlBack}
									/>
								</div>
							)}
						</div>
						<div className='cast-wrapper'>
							{tvInfo && cast && cast.length !== 0 && (
								<div className='cast'>
									<h2>Cast</h2>
									<CastList
										cast={cast}
										url={url}
										forceUpdate={forceUpdate}
										noClick={showTrailer || writingComment ? true : false}
									/>
								</div>
							)}
						</div>
						<div className='crew-wrapper'>
							{tvInfo && tvInfo.aggregate_credits.crew.length !== 0 && crew && (
								<div className='crew'>
									<h2>Crew</h2>
									<CrewList crew={crew} url={url} forceUpdate={forceUpdate} />
								</div>
							)}
						</div>
						<div className='recommendation-wrapper'>
							{tvInfo && tvInfo.recommendations.results.length !== 0 && (
								<div className='recommendation'>
									<h2>Recommendation</h2>
									<MoviesList
										recommendation={tvInfo.recommendations.results}
										url={url}
										forceUpdate={forceUpdate}
										userId={userId}
										xsrfToken={xsrfToken}
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

export default Tv;
