/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect, SVGProps } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faImage,
	faHeart as faHeartFull,
	faBookmark as faBookmarkFull,
	faList,
	faPen,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
	faHeart,
	faBookmark,
	faEye,
	faEyeSlash,
} from '@fortawesome/free-regular-svg-icons';

import axios from 'axios';

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
interface Props {
	width: number;
	height: number;
	posterPath: string | null;
	url: string;
	title: string;
	id: number;
	fontSize: number;
	media: string | null;
	backdropPath: string | null;
	tvShow: {
		name: string;
		id: string;
	};
	year: string;
	forceUpdate: (() => void) | null;
	isWritingComment: boolean;
	setIsWritingComment: (isWritingComment: boolean) => void;
	userId: string;
	xsrfToken: string;
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

function MovieItem({
	width,
	height,
	posterPath,
	url,
	title,
	id,
	fontSize = 15,
	media,
	backdropPath,
	tvShow,
	year,
	forceUpdate,
	isWritingComment,
	setIsWritingComment,
	userId,
	xsrfToken,
	baseUrlBack,
}: Props) {
	const navigate = useNavigate();
	const [writingComment, setWritingComment] = useState<boolean>(false);
	const [elementLiked, setElementLiked] = useState<boolean>(false);
	const [elementInWatchList, setElementInWatchList] = useState<boolean>(false);
	const [elementSeen, setElementSeen] = useState<boolean>(false);
	const [elementSeenInTheater, setElementSeenInTheater] =
		useState<boolean>(false);
	const [comment, setComment] = useState<string>('');

	async function getElementLists() {
		try {
			const response = await axios.post(
				`${baseUrlBack}/api/actions/getElementDefaultLists`,
				{
					userId: userId,
					elementId: id,
					elementType: media,
				},
				{
					headers: {
						'x-xsrf-token': xsrfToken,
					},
					withCredentials: true,
				}
			);
			console.log(response.data);
			response.data.elementLists.map((elementList: DefaultList) => {
				if (elementList.listName === 'like') {
					setElementLiked(true);
				} else if (elementList.listName === 'watchlist') {
					setElementInWatchList(true);
				} else if (elementList.listName === 'theater') {
					setElementSeenInTheater(true);
				} else if (elementList.listName === 'seen') {
					setElementSeen(true);
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
					elementId: id,
					list: list,
					elementType: media,
					action: action,
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
					setElementLiked(!elementLiked);
				} else if (list === 'watchlist') {
					setElementInWatchList(!elementInWatchList);
				} else if (list === 'seen') {
					setElementSeen(!elementSeen);
				} else if (list === 'theater') {
					setElementSeenInTheater(!elementSeenInTheater);
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
					elementId: id,
					elementType: media,
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
			}
		} catch (err) {
			console.error(err);
		}
	}

	async function handleCommentSave() {
		if (comment !== '') {
			try {
				const response = await axios.post(
					`${baseUrlBack}/api/actions/addComment`,
					{
						userId: userId,
						comment: comment,
						elementId: id,
						elementType: media,
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
					setIsWritingComment(false);
				}
			} catch (err) {
				console.error(err);
			}
		}
	}

	// useEffect(() => {
	// 	if (userId && id && media) {
	// 		setElementLiked(false);
	// 		setElementSeen(false);
	// 		setElementInWatchList(false);
	// 		setElementSeenInTheater(false);
	// 		getElementLists();
	// 		getElementComment();
	// 	}
	// }, [media, id]);

	return (
		<>
			{/* {isWritingComment && writingComment && (
				<div className='comment-wrapper'>
					<div>
						<div
							className='header'
							onClick={() => {
								setWritingComment(false);
								setIsWritingComment(false);
							}}
						>
							<span className='title'>{title}</span>
							<span className='xMark'>
								<FontAwesomeIcon icon={faXmark} />
							</span>
						</div>
						<textarea
							className='comment'
							placeholder='Capture your personal thoughts and feelings about the movie or TV Show here. What did you love? What made you think? How did it make you feel? These notes are just for you, to remember the magic of this film journey.'
							maxLength={927}
							onChange={(event) => setComment(event.target.value)}
							value={comment}
						></textarea>
						<button
							onClick={() => {
								handleCommentSave();
							}}
						>
							Save
						</button>
					</div>
				</div>
			)} */}
			<div className='movie-item' style={{ width: `${width}px` }}>
				{posterPath ? (
					<img
						src={`${url}original${posterPath}`}
						alt={title}
						className='poster'
						onClick={() => {
							if (media === 'season') {
								navigate(`/tv/${tvShow.id}/seasons/${id}`, {
									state: { backdropPath: backdropPath, tvShow: tvShow },
								});
								forceUpdate && forceUpdate();
								window.scrollTo(0, 0);
							} else if (media === 'tv') {
								navigate(`/tv/${id}`);
								forceUpdate && forceUpdate();

								window.scrollTo(0, 0);
							} else {
								navigate(`/movies/${id}`);
								if (forceUpdate) {
									forceUpdate();
								}
								window.scrollTo(0, 0);
							}
						}}
						style={{
							width: `${width}px`,
							height: `${height}px`,
						}}
					/>
				) : (
					<div
						className='poster'
						style={{
							width: `${width}px`,
							height: `${height}px`,
							backgroundColor: '#1e1e1e',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							fontSize: '60px',
							cursor: 'pointer',
						}}
						onClick={() => {
							if (media === 'season') {
								navigate(`/tv/${tvShow.id}/seasons/${id}`, {
									state: { backdropPath: backdropPath },
								});
								forceUpdate && forceUpdate();
								window.scrollTo(0, 0);
							} else if (media === 'tv') {
								navigate(`/tv/${id}`);
								forceUpdate && forceUpdate();
								window.scrollTo(0, 0);
							} else {
								navigate(`/movies/${id}`);
								forceUpdate && forceUpdate();
								window.scrollTo(0, 0);
							}
						}}
					>
						<FontAwesomeIcon icon={faImage} />
					</div>
				)}
				<div
					className='title'
					style={
						year
							? { fontSize: `${fontSize}px` }
							: { fontSize: `${fontSize}px`, marginBottom: '20px' }
					}
					onClick={() => {
						if (media === 'season') {
							navigate(`seasons/${id}`, {
								state: { backdropPath: backdropPath },
							});
							forceUpdate && forceUpdate();
							window.scrollTo(0, 0);
						} else if (media === 'tv') {
							navigate(`/tv/${id}`);
							forceUpdate && forceUpdate();
							window.scrollTo(0, 0);
						} else {
							navigate(`/movies/${id}`);

							forceUpdate && forceUpdate();

							window.scrollTo(0, 0);
						}
					}}
				>
					{title}
				</div>
				<div className='year' style={{ textAlign: 'center' }}>
					{year}
				</div>
				{/* {(media === 'tv' || media === 'movie' || media === 'season') && (
					<div className='actions'>
						<div className='like'>
							{!elementLiked ? (
								<>
									<div className='tooltip'>
									<div className='info'>Add it to your favorite list</div>
									<div className='arrow'></div>
								</div> 
									<button onClick={() => handleActionsClick('like', 'add')}>
										<FontAwesomeIcon icon={faHeart} className='movie-icon' />
									</button>
								</>
							) : (
								<>
									<div className='tooltip'>
									<div className='info'>Already liked</div>
									<div className='arrow'></div>
								</div> 
									<button onClick={() => handleActionsClick('like', 'remove')}>
										<FontAwesomeIcon
											icon={faHeartFull}
											className='movie-icon'
										/>
									</button>
								</>
							)}
						</div>
						{!elementInWatchList ? (
							<button onClick={() => handleActionsClick('watchlist', 'add')}>
								<FontAwesomeIcon icon={faBookmark} className='movie-icon' />
							</button>
						) : (
							<button onClick={() => handleActionsClick('watchlist', 'remove')}>
								<FontAwesomeIcon icon={faBookmarkFull} className='movie-icon' />
							</button>
						)}
						{media === 'movie' && (
							<>
								{elementSeenInTheater ? (
									<button
										onClick={() => handleActionsClick('theater', 'remove')}
									>
										<MdiMovieOpenCheck className='movie-icon' />
									</button>
								) : (
									<button onClick={() => handleActionsClick('theater', 'add')}>
										<MdiMovieOpenRemoveOutline className='movie-icon' />
									</button>
								)}
							</>
						)}
						{elementSeen ? (
							<button>
								<FontAwesomeIcon
									icon={faEye}
									onClick={() => handleActionsClick('seen', 'remove')}
									className='movie-icon'
								/>
							</button>
						) : (
							<button onClick={() => handleActionsClick('seen', 'add')}>
								<FontAwesomeIcon icon={faEyeSlash} className='movie-icon' />
							</button>
						)}
						<button>
							<FontAwesomeIcon icon={faList} className='movie-icon' />
						</button>
						<button
							onClick={() => {
								setWritingComment(true);
								setIsWritingComment(true);
							}}
						>
							<FontAwesomeIcon icon={faPen} className='movie-icon' />
						</button>
					</div>
				)} */}
			</div>
		</>
	);
}

export default MovieItem;
