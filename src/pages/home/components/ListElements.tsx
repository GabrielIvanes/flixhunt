/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ElementItem from '../../ElementItem';
import EpisodeItem from '../../tv/EpisodeItem';

interface Genre {
	id: number;
	name: string;
}

interface Element {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	name: string;
	title: string;
	video: boolean;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
}

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

interface List {
	title: Genre;
	elements: Element[];
}

interface MyListElements {
	title: string;
	elements: DefaultList[];
}

interface Props {
	list: List | null;
	url: string;
	userId: string;
	xsrfToken: string;
	myLists: MyListElements | null;
	forceUpdate: (() => void) | null;
	baseUrlBack: string;
}

function List({
	list,
	url,
	userId,
	xsrfToken,
	myLists,
	forceUpdate,
	baseUrlBack,
}: Props) {
	const elementsScroll = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [maxReached, setMaxReached] = useState<boolean>(false);
	const maxScrollPosition = elementsScroll.current
		? elementsScroll.current.scrollWidth - elementsScroll.current.clientWidth
		: 0;
	const [isWritingComment, setIsWritingComment] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		setScrollPosition(0);
	}, [forceUpdate]);

	useEffect(() => {
		if (
			(elementsScroll.current &&
				window.innerWidth >= elementsScroll.current.scrollWidth) ||
			(scrollPosition >= maxScrollPosition && scrollPosition !== 0)
		) {
			setMaxReached(true);
		} else {
			setMaxReached(false);
		}
	}, [
		scrollPosition,
		window.innerWidth,
		list,
		myLists,
		elementsScroll.current && elementsScroll.current.scrollWidth,
	]);

	function next() {
		if (elementsScroll.current) {
			const scrollWidth = elementsScroll.current.scrollWidth;
			const scrollAmount = elementsScroll.current.clientWidth * 0.5;
			const newScrollPosition = Math.min(
				scrollPosition + scrollAmount,
				scrollWidth - elementsScroll.current.clientWidth
			);
			setScrollPosition(newScrollPosition);
		}
	}

	function prev() {
		if (elementsScroll.current) {
			const scrollAmount = elementsScroll.current.clientWidth * 0.5;
			const newScrollPosition = Math.max(scrollPosition - scrollAmount, 0);
			setScrollPosition(newScrollPosition);
		}
	}

	return (
		<div className='lists-container'>
			{url && list && (
				<div className='elements-wrapper'>
					<div className='title-container'>
						<h1>{list.title.name}</h1>
						{list.title.id !== 0 && (
							<span
								onClick={() => {
									navigate('/movies', { state: { genre: list.title } });
									window.scrollTo(0, 0);
								}}
							>
								See more &#62;
							</span>
						)}
					</div>
					<div
						className='elements'
						style={{
							transform: `translateX(-${scrollPosition}px)`,
							transition: 'transform 0.5s ease-in-out',
						}}
						ref={elementsScroll}
					>
						{list.elements.map((element) => (
							<ElementItem
								width={230}
								height={345}
								posterPath={element.poster_path}
								url={url}
								title={element.title ? element.title : element.name}
								id={element.id}
								fontSize={17}
								key={element.id}
								backdropPath={element.name ? element.backdrop_path : ''}
								tvShow={
									element.name
										? { name: element.name, id: element.id.toString() }
										: { name: '', id: '' }
								}
								media={element.title ? 'movie' : 'tv'}
								year={
									element.release_date
										? element.release_date.slice(0, 4)
										: element.first_air_date.slice(0, 4)
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
				</div>
			)}
			{url && myLists && (
				<div className='my-lists-elements-wrapper'>
					<div className='title-container'>
						<h1>{myLists.title}</h1>
					</div>
					<div
						className='elements'
						style={{
							transform: `translateX(-${scrollPosition}px)`,
							transition: 'transform 0.5s ease-in-out',
						}}
						ref={elementsScroll}
					>
						{myLists.elements.map((element) =>
							element.elementType === 'episode' ? (
								<EpisodeItem
									key={element.elementId}
									id={element.elementId}
									posterPath={element.posterPath}
									url={url}
									title={element.title}
									backdropPath={element.backdropPath}
									episodeNumber={element.elementNumber}
									tvShow={{
										name: element.elementParent.parent[0].name,
										id: element.elementParent.parent[0].id,
									}}
									season={{
										name: element.elementParent.parent[1].name,
										id: element.elementParent.parent[1].id,
										number: element.elementParent.parent[1].number,
									}}
								/>
							) : (
								<ElementItem
									key={element.elementId}
									width={200}
									height={300}
									posterPath={element.posterPath}
									url={url}
									title={element.title}
									id={
										element.elementType === 'season'
											? parseInt(element.elementNumber)
											: parseInt(element.elementId)
									}
									fontSize={17}
									media={element.elementType}
									backdropPath={element.backdropPath}
									tvShow={
										element.elementType === 'season' ||
										element.elementType === 'episode'
											? {
													name: element.elementParent.parent[0].name,
													id: element.elementParent.parent[0].id,
											  }
											: { name: '', id: '' }
									}
									year={element.date && element.date.slice(0, 4)}
									isWritingComment={isWritingComment}
									setIsWritingComment={setIsWritingComment}
									userId={userId}
									xsrfToken={xsrfToken}
									forceUpdate={null}
									baseUrlBack={baseUrlBack}
								/>
							)
						)}
					</div>
				</div>
			)}

			{!maxReached && (
				<button onClick={next} className='btn btn-next'>
					&#62;
				</button>
			)}
			<button
				onClick={prev}
				className='btn btn-prev'
				style={{ visibility: scrollPosition === 0 ? 'hidden' : 'visible' }}
			>
				&#60;
			</button>
		</div>
	);
}

export default List;
