import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

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

interface Props {
	crew: Crew[];
	url: string;
	forceUpdate: () => void;
}

function CrewList({ crew, url, forceUpdate }: Props) {
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
	}, [
		scrollPosition,
		maxScrollPosition,
		window.innerWidth,
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
		<div className='person-crew-wrapper' ref={listScroll}>
			{crew &&
				crew.map((crew) => (
					<div
						className='person-crew'
						key={crew.id}
						style={{
							transform: `translateX(-${scrollPosition}px)`,
							transition: 'transform 0.5s ease-in-out ',
						}}
					>
						{crew.profile_path ? (
							<img
								src={`${url}original${crew.profile_path}`}
								alt={crew.name}
								onClick={() => {
									navigate(`/crew/${crew.id}`);
									window.scrollTo(0, 0);
								}}
								className='poster'
							/>
						) : (
							<div
								className='poster'
								onClick={() => {
									navigate(`/crew/${crew.id}`);
									window.scrollTo(0, 0);
								}}
							>
								<FontAwesomeIcon icon={faImage} />
							</div>
						)}
						<span
							className='name'
							onClick={() => {
								navigate(`/crew/${crew.id}`);
								window.scrollTo(0, 0);
							}}
							style={{ marginTop: '5px' }}
						>
							{crew.name}
						</span>
						<span className='job'>{crew.job}</span>
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

export default CrewList;
