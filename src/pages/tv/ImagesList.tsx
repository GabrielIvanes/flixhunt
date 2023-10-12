import { useState, useEffect, useRef } from 'react';

interface Image {
	aspect_ratio: number;
	height: number;
	iso_639_1: string;
	file_path: string;
	vote_average: number;
	vote_count: number;
	width: number;
}

interface Props {
	images: Image[];
	url: string;
}

function ImagesList({ images, url }: Props) {
	const listScroll = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [maxReached, setMaxReached] = useState<boolean>(false);
	const maxScrollPosition = listScroll.current
		? listScroll.current.scrollWidth - listScroll.current.clientWidth
		: 0;

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
	}, [scrollPosition, images]);

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
		'.images-list-wrapper > div'
	);

	if (divElements) {
		divElements.forEach((divElement) => {
			divElement.style.transform = `translateX(-${scrollPosition}px)`;
			divElement.style.transition = 'transform 0.5s ease-in-out ';
		});
	}

	return (
		<div className='images-list-wrapper' ref={listScroll}>
			{images &&
				images.map(
					(image, index) =>
						image.file_path && (
							<div
								key={index}
								className='image'
								style={{
									width: `420px`,
								}}
							>
								<img
									src={`${url}original${image.file_path}`}
									alt='image'
									width={'420px'}
									height={'236,25px'}
									style={{ borderRadius: '10px', cursor: 'auto' }}
								/>
							</div>
						)
				)}
			{!maxReached && (
				<button
					onClick={next}
					className='btn-list btn-next'
					style={{ top: '110px' }}
				>
					&#62;
				</button>
			)}
			{scrollPosition !== 0 && (
				<button
					onClick={prev}
					className='btn-list btn-prev'
					style={{ top: '110px' }}
				>
					&#60;
				</button>
			)}
		</div>
	);
}

export default ImagesList;
