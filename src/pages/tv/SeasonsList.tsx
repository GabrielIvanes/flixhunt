import { useState, useEffect, useRef } from 'react';
import MovieItem from '../ElementItem';

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

interface Props {
	seasons: Season[];
	url: string;
	backdropPath: string;
	tvShow: {
		name: string;
		id: string;
	};
	forceUpdate: () => void;
	userId: string;
	xsrfToken: string;
	baseUrlBack: string;
}

function SeasonsList({
	seasons,
	url,
	backdropPath,
	tvShow,
	forceUpdate,
	userId,
	xsrfToken,
	baseUrlBack,
}: Props) {
	const listScroll = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState<number>(0);
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
		const divElements = document.querySelectorAll<HTMLDivElement>(
			'.seasons-list-wrapper > div'
		);

		if (divElements) {
			divElements.forEach((divElement) => {
				divElement.style.transform = `translateX(-${scrollPosition}px)`;
				divElement.style.transition = 'transform 0.5s ease-in-out ';
			});
		}
	}, [
		scrollPosition,
		window.innerWidth,
		seasons,
		listScroll.current && listScroll.current.scrollWidth,
	]);

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

	return (
		<div className='seasons-list-wrapper' ref={listScroll}>
			{seasons &&
				seasons.map((season) => (
					<MovieItem
						width={200}
						height={300}
						posterPath={season.poster_path}
						url={url}
						title={season.name}
						id={season.season_number}
						fontSize={17}
						key={season.id}
						media={'season'}
						backdropPath={backdropPath}
						tvShow={tvShow}
						year={season.air_date && season.air_date.slice(0, 4)}
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

export default SeasonsList;
