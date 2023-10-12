import { useState, useEffect, useRef } from 'react';
import EpisodeItem from './EpisodeItem';

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

interface Episode {
	air_date: string;
	episode_number: number;
	episode_type: string;
	id: number;
	name: string;
	overview: string;
	production_code: string;
	runtime: number;
	show_id: number;
	still_path: string;
	vote_average: number;
	vote_count: number;
	crew: Crew[];
	guest_stars: GuestStar[];
}

interface Props {
	episodes: Episode[];
	url: string;
	backdropPath: string;
	tvShow: {
		name: string;
		id: string;
	};
	seasonNumber: string;
}

function EpisodeList({
	episodes,
	url,
	backdropPath,
	tvShow,
	seasonNumber,
}: Props) {
	const listScroll = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [maxReached, setMaxReached] = useState<boolean>(false);
	const maxScrollPosition = listScroll.current
		? listScroll.current.scrollWidth - listScroll.current.clientWidth
		: 0;

	useEffect(() => {
		if (
			episodes &&
			((listScroll.current &&
				window.innerWidth >= listScroll.current.scrollWidth) ||
				(scrollPosition >= maxScrollPosition && scrollPosition !== 0))
		) {
			setMaxReached(true);
		} else {
			setMaxReached(false);
		}
	}, [scrollPosition, episodes]);

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
		'.episodes-list-wrapper > div'
	);

	if (divElements) {
		divElements.forEach((divElement) => {
			divElement.style.transform = `translateX(-${scrollPosition}px)`;
			divElement.style.transition = 'transform 0.5s ease-in-out ';
		});
	}

	return (
		<div className='episodes-list-wrapper' ref={listScroll}>
			{episodes &&
				episodes.map((episode) => (
					<EpisodeItem
						key={episode.id}
						id={episode.id.toString()}
						title={episode.name}
						posterPath={episode.still_path}
						backdropPath={backdropPath}
						url={url}
						tvShow={tvShow}
						episodeNumber={episode.episode_number.toString()}
						season={{
							name: episode.name,
							id: episode.id.toString(),
							number: seasonNumber,
						}}
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

export default EpisodeList;
