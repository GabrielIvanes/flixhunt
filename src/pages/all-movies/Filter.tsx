/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';

interface Genre {
	id: number;
	name: string;
}

interface Props {
	filtersGenres: Genre[];
	setFiltersGenres: (genres: Genre[]) => void;
}

function Filter({ filtersGenres, setFiltersGenres }: Props) {
	const [genres, setGenres] = useState<Genre[]>([]);
	const [showGenres, setShowGenres] = useState<boolean>(false);
	const genresListRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const storedGenres = window.localStorage.getItem('genres');
		if (storedGenres) {
			setGenres(JSON.parse(storedGenres));
		}
	}, []);

	const handleAddGenreClick = (genre: Genre) => {
		setFiltersGenres([...filtersGenres, genre]);
		setShowGenres(false);
	};

	const handleRemoveGenreClick = (genre: Genre) => {
		const updatedFiltersGenres = filtersGenres.filter(
			(filterGenre) => filterGenre.id !== genre.id
		);
		setFiltersGenres(updatedFiltersGenres);
	};

	function handleClickOutside(event: MouseEvent) {
		if (
			genresListRef.current &&
			!genresListRef.current.contains(event.target as Node)
		) {
			setShowGenres(false);
		}
	}
	document.addEventListener('click', handleClickOutside);

	return (
		<div className='filter-wrapper'>
			{genres && filtersGenres && (
				<>
					<div className='all'>
						<label>Select a genre:</label>
						<div className='genre-list-container'>
							<div className='genre-list' ref={genresListRef}>
								<div onClick={() => setShowGenres(!showGenres)}>
									<FontAwesomeIcon icon={faChevronDown} />
								</div>
								{showGenres &&
									genres.map((genre) => {
										const isGenreFiltered = filtersGenres.some(
											(filterGenre) => filterGenre.id === genre.id
										);

										if (!isGenreFiltered) {
											return (
												<div
													key={genre.id}
													onClick={() => handleAddGenreClick(genre)}
												>
													{genre.name}
												</div>
											);
										}
									})}
							</div>
						</div>
					</div>
					<div className='selected'>
						{filtersGenres.map((genre) => (
							<div key={genre.id}>
								<span>{genre.name}</span>
								<FontAwesomeIcon
									icon={faXmark}
									className='xmark'
									onClick={() => handleRemoveGenreClick(genre)}
								/>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default Filter;
