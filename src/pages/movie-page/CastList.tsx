/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

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

interface Props {
	cast: Cast[];
	url: string;
	forceUpdate: () => void;
	noClick: boolean;
}

function CastList({ cast, url, forceUpdate, noClick }: Props) {
	const navigate = useNavigate();

	const listScroll = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [maxReached, setMaxReached] = useState<boolean>(false);
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
	}, [scrollPosition, maxScrollPosition]);

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
		<div className='person-cast-wrapper' ref={listScroll}>
			{cast &&
				cast.map((cast) => (
					<div
						className='person-cast'
						key={cast.id}
						style={
							!noClick
								? {
										transform: `translateX(-${scrollPosition}px)`,
										transition: 'transform 0.5s ease-in-out ',
								  }
								: { cursor: 'default' }
						}
					>
						{cast.profile_path ? (
							<img
								src={`${url}original${cast.profile_path}`}
								alt={cast.name}
								onClick={() => {
									if (!noClick) {
										navigate(`/cast/${cast.id}`);
										window.scrollTo(0, 0);
									}
								}}
								className='poster'
							/>
						) : (
							<div
								className='poster'
								onClick={() => {
									if (!noClick) {
										navigate(`/cast/${cast.id}`);
										window.scrollTo(0, 0);
									}
								}}
							>
								<FontAwesomeIcon icon={faImage} />
							</div>
						)}
						<span
							className='actor'
							onClick={() => {
								if (!noClick) {
									navigate(`/cast/${cast.id}`);
									window.scrollTo(0, 0);
								}
							}}
							style={{ marginTop: '5px' }}
						>
							{cast.name}
						</span>
						<span className='character'>{cast.character}</span>
					</div>
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

export default CastList;
