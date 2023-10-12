/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../Nav';
import Footer from '../home/components/Footer';
import ListElements from '../home/components/ListElements';

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
	userId: string;
	url: string;
	xsrfToken: string;
	baseUrlBack: string;
}

function MyLists({ userId, url, xsrfToken, baseUrlBack }: Props) {
	const [elementsLiked, setElementsLiked] = useState<DefaultList[]>();
	const [elementsWatchlist, setElementsWatchlist] = useState<DefaultList[]>();
	const [elementsSeen, setElementsSeen] = useState<DefaultList[]>();
	const [elementsTheater, setElementsTheater] = useState<DefaultList[]>();
	const [filter, setFilter] = useState<string>('movie');
	const [_, setRender] = useState<{
		renderObject: number;
	}>({ renderObject: 0 });

	function forceUpdate() {
		setRender((prevRender) => ({ renderObject: prevRender.renderObject + 1 }));
	}

	async function getUserElements() {
		try {
			const response = await axios.post(
				`${baseUrlBack}/api/actions/getUserElements`,
				{
					userId: userId,
				},
				{
					headers: {
						'x-xsrf-token': xsrfToken,
					},
					withCredentials: true,
				}
			);
			console.log(response);
			setElementsLiked(
				response.data.elements.filter(
					(element: DefaultList) =>
						element.listName === 'like' && element.elementType === filter
				)
			);
			setElementsWatchlist(
				response.data.elements.filter(
					(element: DefaultList) =>
						element.listName === 'watchlist' && element.elementType === filter
				)
			);
			setElementsSeen(
				response.data.elements.filter(
					(element: DefaultList) =>
						element.listName === 'seen' && element.elementType === filter
				)
			);
			setElementsTheater(
				response.data.elements.filter(
					(element: DefaultList) =>
						element.listName === 'theater' && element.elementType === filter
				)
			);
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		getUserElements();
	}, [userId, filter]);

	return (
		<div className='my-lists-wrapper'>
			<Nav userId={userId} xsrfToken={xsrfToken} baseUrlBack={baseUrlBack} />
			<div className='filters-wrapper'>
				<div className='filters'>
					<div
						className={filter === 'movie' ? 'active' : ''}
						onClick={() => setFilter('movie')}
					>
						Movies
					</div>
					<div
						className={filter === 'tv' ? 'active' : ''}
						onClick={() => setFilter('tv')}
					>
						TV Show
					</div>
					<div
						className={filter === 'season' ? 'active' : ''}
						onClick={() => setFilter('season')}
					>
						Seasons
					</div>
					<div
						className={filter === 'episode' ? 'active' : ''}
						onClick={() => setFilter('episode')}
					>
						Episodes
					</div>
				</div>
			</div>
			<div className='my-lists'>
				<div>
					{elementsLiked?.length === 0 &&
						elementsSeen?.length === 0 &&
						elementsTheater?.length === 0 &&
						elementsWatchlist?.length === 0 && (
							<h1>
								There is no {filter === 'tv' ? 'TV Show' : filter}s in your
								lists
							</h1>
						)}
					{elementsLiked && elementsLiked.length !== 0 && (
						<div className='like-list'>
							<ListElements
								list={null}
								myLists={{ title: 'Like', elements: elementsLiked }}
								url={url}
								xsrfToken={xsrfToken}
								userId={userId}
								forceUpdate={forceUpdate}
								baseUrlBack={baseUrlBack}
							/>
						</div>
					)}
					{elementsWatchlist && elementsWatchlist.length !== 0 && (
						<div className='watchlist'>
							<ListElements
								list={null}
								myLists={{ title: 'Watchlist', elements: elementsWatchlist }}
								url={url}
								xsrfToken={xsrfToken}
								userId={userId}
								forceUpdate={forceUpdate}
								baseUrlBack={baseUrlBack}
							/>
						</div>
					)}
					{elementsSeen && elementsSeen.length !== 0 && (
						<div className='seen'>
							<ListElements
								list={null}
								myLists={{ title: 'Seen', elements: elementsSeen }}
								url={url}
								xsrfToken={xsrfToken}
								userId={userId}
								forceUpdate={forceUpdate}
								baseUrlBack={baseUrlBack}
							/>
						</div>
					)}
					{elementsTheater && elementsTheater?.length !== 0 && (
						<div className='theater'>
							<ListElements
								list={null}
								myLists={{ title: 'Cinema', elements: elementsTheater }}
								url={url}
								xsrfToken={xsrfToken}
								userId={userId}
								forceUpdate={forceUpdate}
								baseUrlBack={baseUrlBack}
							/>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default MyLists;
