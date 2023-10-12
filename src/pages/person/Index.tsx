/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useParams } from 'react-router-dom';
import Nav from '../Nav';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MovieItem from '../ElementItem';
import Footer from '../home/components/Footer';

interface Props {
	userId: string;
	xsrfToken: string;
	url: string;
	credits: string;
	baseUrlBack: string;
}

interface PersonInfo {
	adult: boolean;
	also_known_as: string[];
	biography: string;
	birthday: string;
	deathday: string;
	gender: number;
	homepage: string;
	id: number;
	imdb_id: string;
	known_for_department: string;
	name: string;
	place_of_birth: string;
	popularity: number;
	profile_path: string;
}

interface MovieCredits {
	adult: boolean;
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	release_date: string;
	title: string;
	name: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	credit_id: string;
	department: string;
	job: string;
	media_type: string;
	first_air_date: string;
}

function Index({ userId, xsrfToken, url, credits, baseUrlBack }: Props) {
	const [person, setPerson] = useState<PersonInfo | null>(null);
	const [personMovies, setPersonMovies] = useState<MovieCredits[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { id: personId } = useParams();
	const [isWritingComment, setIsWritingComment] = useState<boolean>(false);

	useEffect(() => {
		async function getPersonInformation(personId: string) {
			try {
				const response = await axios.post(
					`${baseUrlBack}/api/TMDB/personInformation`,
					{
						personId: `${personId}`,
					},
					{
						headers: {
							'x-xsrf-token': xsrfToken,
						},
						withCredentials: true,
					}
				);
				setPerson(response.data.person);
			} catch (err) {
				console.error(err);
			}
		}
		if (personId) {
			getPersonInformation(personId);
		}
	}, [personId]);

	useEffect(() => {
		async function getPersonMovies(personId: string) {
			try {
				const response = await axios.post(
					`${baseUrlBack}/api/TMDB/personMovies`,
					{
						credits: credits,
						personId: personId,
					},
					{
						headers: {
							'x-xsrf-token': xsrfToken,
						},
						withCredentials: true,
					}
				);
				const results: MovieCredits[] = response.data.movies.filter(
					(movie: MovieCredits) => movie.adult === false
				);

				let sortedPersonMovies: MovieCredits[];

				if (credits === 'director') {
					const filteredResults = results.filter((movie) => {
						return movie.job === 'Director';
					});
					sortedPersonMovies = filteredResults.sort(compareByDate);
				} else {
					const moviesName: string[] = [];
					const filteredResults: MovieCredits[] = [];
					for (const movie of results) {
						let title = '';
						if (movie.title) {
							title = movie.title;
						} else {
							title = movie.name;
						}
						if (!moviesName.includes(title)) {
							moviesName.push(title);
							filteredResults.push(movie);
						}
					}
					sortedPersonMovies = filteredResults.sort(compareByDate);
				}

				setPersonMovies(sortedPersonMovies);
				setIsLoading(false);
			} catch (err) {
				console.error(err);
			}
		}
		if (personId && person) {
			getPersonMovies(personId);
		}
	}, [personId, person]);

	function getAge(birthday: string, deathday: string) {
		if (deathday) {
			const birthDate: Date = new Date(birthday);
			const deathDate = new Date(deathday);
			const difference: number = deathDate.getTime() - birthDate.getTime();
			const age: number = Math.floor(
				difference / (365.25 * 24 * 60 * 60 * 1000)
			);
			return age;
		} else {
			const birthDate: Date = new Date(birthday);
			const today = new Date();
			const difference: number = today.getTime() - birthDate.getTime();
			const age: number = Math.floor(
				difference / (365.25 * 24 * 60 * 60 * 1000)
			);
			return age;
		}
	}

	function compareByDate(a: MovieCredits, b: MovieCredits): number {
		const dateA = new Date(
			a.media_type === 'movie' ? a.release_date : a.first_air_date
		);
		const dateB = new Date(
			b.media_type === 'movie' ? b.release_date : b.first_air_date
		);
		if (isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
			return 1;
		} else if (!isNaN(dateA.getTime()) && isNaN(dateB.getTime())) {
			return -1;
		} else {
			return dateB.getTime() - dateA.getTime();
		}
	}

	return (
		<div className='person-wrapper'>
			<Nav userId={userId} xsrfToken={xsrfToken} baseUrlBack={baseUrlBack} />
			<div className='main'>
				{isLoading ? (
					<div className='loading-indicator'>Loading...</div>
				) : (
					person &&
					personMovies && (
						<>
							<div className='left'>
								{person.profile_path ? (
									<img
										src={`${url}original${person.profile_path}`}
										alt={person.name}
									/>
								) : (
									<div
										style={{
											width: '300px',
											height: '400px',
											backgroundColor: '#1e1e1e',
											color: '1g1g1g',
											borderRadius: '6px',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											fontSize: '60px',
										}}
									>
										<FontAwesomeIcon icon={faImage} />
									</div>
								)}
								<h2>Personal information:</h2>
								<div className='personal-information'>
									{person.known_for_department && (
										<>
											<h3>Known for department</h3>
											<div>{person.known_for_department}</div>
										</>
									)}
									<h3>Date</h3>
									{person.deathday ? (
										<div className='date'>
											<div>
												{person.birthday} / {person.deathday}
											</div>
											<span style={{ marginLeft: '5px' }}>
												({getAge(person.birthday, person.deathday)} years old)
											</span>
										</div>
									) : (
										<div className='date'>
											<div>{person.birthday}</div>
											{person.birthday ? (
												<span style={{ marginLeft: '5px' }}>
													({getAge(person.birthday, person.deathday)} years old)
												</span>
											) : (
												<span>
													{getAge(person.birthday, person.deathday)} years old
												</span>
											)}
										</div>
									)}
									{person.place_of_birth && (
										<>
											<h3>Place of birth</h3>
											<div>{person.place_of_birth}</div>
										</>
									)}
								</div>
							</div>
							<div className='right'>
								<h1>{person.name}</h1>
								<h2>Biography</h2>
								{person.biography ? (
									<div className='biography'>
										{person.biography.split('\n').map((paragraph, index) => (
											<p key={index}>{paragraph}</p>
										))}
									</div>
								) : (
									<p>There is no biography for {person.name}.</p>
								)}
								<h2>Filmography</h2>
								<div className='movies'>
									{personMovies.map((movie) => (
										<MovieItem
											key={movie.id}
											width={230}
											height={345}
											id={movie.id}
											title={
												movie.media_type === 'movie' ? movie.title : movie.name
											}
											posterPath={movie.poster_path}
											url={url}
											fontSize={17}
											media={movie.media_type ? movie.media_type : null}
											backdropPath={
												movie.media_type === 'tv' ? movie.backdrop_path : ''
											}
											tvShow={{
												name: movie.name,
												id: movie.id.toString(),
											}}
											year={
												movie.media_type === 'movie'
													? movie.release_date.slice(0, 4)
													: movie.first_air_date.slice(0, 4)
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
						</>
					)
				)}
			</div>
			{person && personMovies && <Footer />}
		</div>
	);
}

export default Index;
