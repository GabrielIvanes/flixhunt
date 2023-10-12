/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
} from '@fortawesome/free-solid-svg-icons';
import CastList from '../movie-page/CastList';
import CrewList from '../movie-page/CrewList';
import EpisodeList from './EpisodeList';
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

interface Crew {
	job: string;
	department: string;
	credit_id: string;
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
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

interface GuestStar {
	character: string;
	credit_id: string;
	order: number;
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
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

interface Episode {
	air_date: string;
	episode_number: number;
	episode_type: string;
	id: number;
	name: string;
	overview: string;
	production_code: string;
	runtime: number;
	season_number: number;
	show_id: number;
	still_path: string;
	vote_average: number;
	vote_count: number;
	crew: Crew[];
	guest_stars: GuestStar[];
}

interface Season {
	name: string;
	overview: string;
	credits: {
		cast: Cast[];
		crew: Crew[];
	};
	id: number;
	poster_path: string;
	season_number: number;
	vote_average: number;
	episodes: Episode[];
	videos: {
		results: Video[];
	};
	'watch/providers': WatchProviders;
}

interface Props {
	xsrfToken: string;
	userId: string;
	url: string;
	baseUrlBack: string;
}

function SeasonsPage({ xsrfToken, userId, url, baseUrlBack }: Props) {
	const { id: tvId, nbSeason } = useParams();
	const [seasonInfo, setSeasonInfo] = useState<Season>();
	const location = useLocation();
	const [trailer, setTrailer] = useState<Video>();
	const [showTrailer, setShowTrailer] = useState<boolean>(false);
	const [videos, setVideos] = useState<Video[]>();
	const [writingComment, setWritingComment] = useState<boolean>(false);
	const [seasonLiked, setSeasonLiked] = useState<boolean>(false);
	const [dateLiked, setDateLiked] = useState<string>();
	const [seasonInWatchList, setSeasonInWatchList] = useState<boolean>(false);
	const [seasonSeen, setSeasonSeen] = useState<boolean>(false);
	const [dateSeen, setDateSeen] = useState<string>();
	const [comment, setComment] = useState<string>('');
	const [dateComment, setDateComment] = useState<string>();
	const [commentInSection, setCommentInSection] = useState<string>('');
	const [crew, setCrew] = useState<Crew[]>();
	const navigate = useNavigate();
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
					elementId: seasonInfo?.id,
					elementType: 'season',
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
					setSeasonLiked(true);
					setDateLiked(elementList.dateAdded.slice(0, 10));
				} else if (elementList.listName === 'watchlist') {
					setSeasonInWatchList(true);
				} else if (elementList.listName === 'seen') {
					setSeasonSeen(true);
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
					elementId: seasonInfo?.id,
					list: list,
					elementType: 'season',
					action: action,
					title: seasonInfo?.name,
					posterPath: seasonInfo?.poster_path,
					directors: seasonInfo?.credits.crew
						.filter((person) => person.job === 'Creator')
						.join(','),
					genres: null,
					backdropPath: location.state && location.state.backdropPath,
					date: null,
					elementNumber: seasonInfo?.season_number,
					elementParent: {
						parent: [
							{
								name: location.state.tvShow.name,
								id: tvId,
							},
						],
					},
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
					setSeasonLiked(!seasonLiked);
				} else if (list === 'watchlist') {
					setSeasonInWatchList(!seasonInWatchList);
				} else if (list === 'seen') {
					setSeasonSeen(!seasonSeen);
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
					elementId: seasonInfo?.id,
					elementType: 'season',
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
					elementId: seasonInfo?.id,
					elementType: 'season',
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
		setSeasonInWatchList(false);
		setSeasonLiked(false);
		setSeasonSeen(false);
		setComment('');
		setCommentInSection('');
		if (seasonInfo && tvId) {
			getElementLists();
			getElementComment();
		}
	}, [seasonInfo, tvId]);

	useEffect(() => {
		async function getSeasonInformation(tvId: string, nbSeason: string) {
			try {
				const response = await axios.post(
					`${baseUrlBack}/api/TMDB/getSeasonInformation`,
					{
						tvId: tvId,
						nbSeason: nbSeason,
					},
					{
						headers: {
							'x-xsrf-token': xsrfToken,
						},
						withCredentials: true,
					}
				);
				setSeasonInfo(response.data.season);
			} catch (err) {
				console.error(err);
			}
		}
		if (tvId && nbSeason) {
			getSeasonInformation(tvId, nbSeason);
		}
	}, [tvId, nbSeason]);

	useEffect(() => {
		if (seasonInfo) {
			const tmpCrew: Crew[] = seasonInfo.credits.crew;
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

			let updatedVideos: Video[] = seasonInfo.videos.results.filter(
				(video) =>
					video.official === true &&
					video.type === 'Trailer' &&
					video.site === 'YouTube'
			);
			if (updatedVideos.length === 0) {
				updatedVideos = seasonInfo.videos.results.filter(
					(video) => video.type === 'Trailer' && video.site === 'YouTube'
				);
			}
			setVideos(updatedVideos);
		}
	}, [seasonInfo]);

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
			className='season-page-wrapper'
			style={
				showTrailer || writingComment
					? { overflow: 'hidden', height: '100vh' }
					: { overflow: 'visible' }
			}
		>
			<Nav userId={userId} xsrfToken={xsrfToken} baseUrlBack={baseUrlBack} />
			{seasonInfo && (
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
									<span className='title'>{seasonInfo.name}</span>
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
					{location.state && location.state.backdropPath && (
						<div
							className='backdrop-image'
							style={{
								backgroundImage: `url(${url}original${location.state.backdropPath})`,
								backgroundSize: 'cover',
								width: '100%',
								height: '100vh',
								position: 'absolute',
								top: '0',
								opacity: 0.2,
							}}
						></div>
					)}
					<div
						className='season'
						style={showTrailer || writingComment ? { opacity: '0.2' } : {}}
					>
						<div className='main'>
							<div className='left'>
								{seasonInfo.poster_path ? (
									<img
										src={`${url}original${seasonInfo.poster_path}`}
										alt={seasonInfo.name}
										className='poster'
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
										className='poster'
									>
										<FontAwesomeIcon icon={faImage} />
									</div>
								)}
							</div>
							<div className='right'>
								<div className='top'>
									<h1>{seasonInfo.name}</h1>
									{location.state && location.state.tvShow && (
										<h2 style={{ marginBottom: '10px' }}>
											<span
												className='tvName'
												onClick={() => {
													navigate(`/tv/${tvId}`);
													window.scrollTo(0, 0);
												}}
											>
												{location.state.tvShow.name}
											</span>{' '}
											- Season {seasonInfo.season_number}
										</h2>
									)}
									{seasonInfo.overview ? (
										<p className='overview' style={{ textAlign: 'justify' }}>
											Overview: {seasonInfo.overview}
										</p>
									) : (
										<p className='overview'>
											Overview: There is no overview provided.
										</p>
									)}
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
											{!seasonLiked ? (
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
											{!seasonInWatchList ? (
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
											{seasonSeen ? (
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
									{seasonInfo['watch/providers'].results.FR &&
										seasonInfo['watch/providers'].results.FR.flatrate && (
											<>
												<h3>Streaming</h3>
												{seasonInfo['watch/providers'].results.FR.flatrate.map(
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
						<div className='episodes-wrapper'>
							{seasonInfo && seasonInfo.episodes.length !== 0 && (
								<div className='episodes'>
									<h2>Episodes</h2>
									<EpisodeList
										episodes={seasonInfo.episodes}
										url={url}
										backdropPath={
											location.state && location.state.backdropPath
												? location.state.backdropPath
												: ''
										}
										tvShow={location.state.tvShow}
										seasonNumber={seasonInfo.season_number.toString()}
									/>
								</div>
							)}
						</div>
						<div className='cast-wrapper'>
							{seasonInfo && seasonInfo.credits.cast.length !== 0 && (
								<div className='cast'>
									<h2>Cast</h2>
									<CastList
										cast={seasonInfo.credits.cast}
										url={url}
										forceUpdate={forceUpdate}
										noClick={showTrailer || writingComment ? true : false}
									/>
								</div>
							)}
						</div>
						<div className='crew-wrapper'>
							{seasonInfo && seasonInfo.credits.crew.length !== 0 && crew && (
								<div className='crew'>
									<h2>Crew</h2>
									<CrewList crew={crew} url={url} forceUpdate={forceUpdate} />
								</div>
							)}
						</div>
					</div>
					<Footer />
				</>
			)}
		</div>
	);
}

export default SeasonsPage;
