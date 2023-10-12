/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect, useRef } from 'react';
import ElementItem from '../ElementItem';

interface Recommendation {
	adult: boolean | null;
	backdrop_path: string | null;
	id: number;
	title: string;
	name: string;
	original_language: string;
	original_title: string;
	overview: string;
	poster_path: string | null;
	media_type: string;
	genre_ids: number[];
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	first_air_date: string;
}

interface Props {
	recommendation: Recommendation[] | null;
	url: string;
	forceUpdate: (() => void) | null;
	xsrfToken: string;
	userId: string;
	baseUrlBack: string;
}

function MoviesList({
	recommendation,
	url,
	forceUpdate,
	xsrfToken,
	userId,
	baseUrlBack,
}: Props) {
	const listScroll = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [maxReached, setMaxReached] = useState<boolean>(false);
	const [isWritingComment, setIsWritingComment] = useState<boolean>(false);
	const maxScrollPosition = listScroll.current
		? listScroll.current.scrollWidth - listScroll.current.clientWidth
		: 0;

	useEffect(() => {
		setScrollPosition(0);
	}, [forceUpdate]);

	useEffect(() => {
		if (
			(listScroll.current &&
				window.innerWidth >= listScroll.current.scrollWidth) ||
			(scrollPosition >= maxScrollPosition && scrollPosition !== 0)
		) {
			setMaxReached(true);
		} else {
			setMaxReached(false);
		}
	}, [scrollPosition]);

	function next() {
		if (listScroll.current) {
			const scrollWidth = listScroll.current.scrollWidth;
			const scrollAmount = listScroll.current.clientWidth * 0.5;
			const newScrollPosition = Math.min(
				scrollPosition + scrollAmount,
				scrollWidth - listScroll.current.clientWidth
			);
			setScrollPosition(newScrollPosition);
		}
	}

	function prev() {
		if (listScroll.current) {
			const scrollAmount = listScroll.current.clientWidth * 0.5;
			const newScrollPosition = Math.max(scrollPosition - scrollAmount, 0);
			setScrollPosition(newScrollPosition);
		}
	}

	const divElements = document.querySelectorAll<HTMLDivElement>(
		'.recommendation-movie-wrapper > div'
	);

	if (divElements) {
		divElements.forEach((divElement) => {
			divElement.style.transform = `translateX(-${scrollPosition}px)`;
			divElement.style.transition = 'transform 0.5s ease-in-out ';
		});
	}

	return (
		<div className='recommendation-movie-wrapper' ref={listScroll}>
			{recommendation &&
				recommendation.map((reco) => (
					<ElementItem
						width={200}
						height={300}
						posterPath={reco.poster_path}
						url={url}
						title={reco.title ? reco.title : reco.name}
						id={reco.id}
						fontSize={17}
						key={reco.id}
						media={reco.title ? 'movie' : 'tv'}
						backdropPath={reco.name ? reco.backdrop_path : ''}
						tvShow={
							reco.name
								? { name: reco.name, id: reco.id.toString() }
								: { name: '', id: '' }
						}
						year={
							reco.title
								? reco.release_date.slice(0, 4)
								: reco.first_air_date.slice(0, 4)
						}
						forceUpdate={forceUpdate}
						isWritingComment={isWritingComment}
						setIsWritingComment={setIsWritingComment}
						userId={userId}
						xsrfToken={xsrfToken}
						baseUrlBack={baseUrlBack}
					/>
				))}

			{!maxReached && (
				<button onClick={next} className='btn-list btn-next'>
					&#62;
				</button>
			)}
			{scrollPosition !== 0 && (
				<button onClick={prev} className='btn-list btn-prev'>
					&#60;
				</button>
			)}
		</div>
	);
}

export default MoviesList;
