/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SignIn from './pages/auth/components/SignIn';
import SignUp from './pages/auth/components/SignUp';
import Index from './pages/home/Index';
import axios from 'axios';
import MovieIndex from './pages/movie-page/Index';
import PersonIndex from './pages/person/Index';
import AllMovies from './pages/all-movies/Movies';
import Search from './pages/search/Search';
import Tv from './pages/tv/Tv';
import SeasonsPage from './pages/tv/SeasonsPage';
import EpisodePage from './pages/tv/EpisodePage';
import Tvs from './pages/all-tv/Tvs';
import MyLists from './pages/my-lists/MyLists';

function App() {
	const navigate = useNavigate();
	const location = useLocation();
	const [userId, setUserId] = useState<string>('');
	const [url, setUrl] = useState<string>('');
	const [xsrfToken, setXsrfToken] = useState<string>('');

	// const baseUrlBack = 'http://localhost:3000';
	const baseUrlBack = 'https://flixhunt-api.ivanes.fr';

	useEffect(() => {
		if (!xsrfToken) {
			const storedXsrfToken = window.localStorage.getItem('xsrfToken');
			if (storedXsrfToken) {
				setXsrfToken(JSON.parse(storedXsrfToken));
			}
			navigate('/login');
		}
	}, []);

	useEffect(() => {
		async function getBaseUrl() {
			try {
				const response = await axios.get(`${baseUrlBack}/api/TMDB/baseUrl`, {
					headers: {
						'x-xsrf-token': xsrfToken,
					},
					withCredentials: true,
				});
				console.log(response.data.baseUrl);
				setUrl(response.data.baseUrl);
			} catch (err) {
				console.error(err);
			}
		}
		if (xsrfToken) {
			getBaseUrl();
		}
	}, [xsrfToken]);

	useEffect(() => {
		async function fetchToken() {
			try {
				const response = await axios.get(`${baseUrlBack}/api/user/getId`, {
					withCredentials: true,
				});
				if (response.data.id !== '') {
					setUserId(response.data.id);
					if (location.pathname === '/login') navigate('/');
					else navigate(-1);
				}
			} catch (err) {
				setUserId('');
			}
		}
		fetchToken();
	}, []);

	return (
		<div>
			<Routes>
				<Route
					path='/login'
					element={
						<SignIn
							setUserId={setUserId}
							setXsrfToken={setXsrfToken}
							baseUrlBack={baseUrlBack}
						/>
					}
				/>
				<Route
					path='/register'
					element={<SignUp baseUrlBack={baseUrlBack} />}
				/>

				{xsrfToken && (
					<>
						<Route
							path='/'
							element={
								<Index
									userId={userId}
									url={url}
									xsrfToken={xsrfToken}
									baseUrlBack={baseUrlBack}
								/>
							}
						/>
						<Route
							path='/movies/:id'
							element={
								<MovieIndex
									userId={userId}
									url={url}
									xsrfToken={xsrfToken}
									baseUrlBack={baseUrlBack}
								/>
							}
						></Route>
						<Route
							path='/directors/:id'
							element={
								<PersonIndex
									userId={userId}
									url={url}
									xsrfToken={xsrfToken}
									credits='director'
									baseUrlBack={baseUrlBack}
								/>
							}
						></Route>
						<Route
							path='/creators/:id'
							element={
								<PersonIndex
									userId={userId}
									url={url}
									xsrfToken={xsrfToken}
									credits='creator'
									baseUrlBack={baseUrlBack}
								/>
							}
						></Route>
						<Route
							path='/cast/:id'
							element={
								<PersonIndex
									userId={userId}
									url={url}
									xsrfToken={xsrfToken}
									credits='cast'
									baseUrlBack={baseUrlBack}
								/>
							}
						></Route>
						<Route
							path='/crew/:id'
							element={
								<PersonIndex
									userId={userId}
									url={url}
									xsrfToken={xsrfToken}
									credits='crew'
									baseUrlBack={baseUrlBack}
								/>
							}
						></Route>
						<Route
							path='/movies'
							element={
								<AllMovies
									userId={userId}
									url={url}
									xsrfToken={xsrfToken}
									baseUrlBack={baseUrlBack}
								/>
							}
						></Route>
						<Route
							path='/search'
							element={
								<Search
									userId={userId}
									url={url}
									xsrfToken={xsrfToken}
									baseUrlBack={baseUrlBack}
								/>
							}
						></Route>
						<Route
							path='/tv/:id'
							element={
								<Tv
									userId={userId}
									url={url}
									xsrfToken={xsrfToken}
									baseUrlBack={baseUrlBack}
								/>
							}
						></Route>
						<Route
							path='/tv/:id/seasons/:nbSeason'
							element={
								<SeasonsPage
									userId={userId}
									url={url}
									xsrfToken={xsrfToken}
									baseUrlBack={baseUrlBack}
								/>
							}
						></Route>
						<Route
							path='/tv/:id/seasons/:nbSeason/episodes/:nbEpisode'
							element={
								<EpisodePage
									userId={userId}
									url={url}
									xsrfToken={xsrfToken}
									baseUrlBack={baseUrlBack}
								/>
							}
						></Route>
						<Route
							path='/tv'
							element={
								<Tvs
									userId={userId}
									url={url}
									xsrfToken={xsrfToken}
									baseUrlBack={baseUrlBack}
								/>
							}
						></Route>
						<Route
							path='/lists'
							element={
								<MyLists
									userId={userId}
									url={url}
									xsrfToken={xsrfToken}
									baseUrlBack={baseUrlBack}
								/>
							}
						></Route>
					</>
				)}
			</Routes>
		</div>
	);
}
export default App;
