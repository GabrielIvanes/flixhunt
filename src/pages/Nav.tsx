/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface Props {
	userId: string;
	baseUrlBack: string;
	xsrfToken: string;
}

function Nav({ userId, baseUrlBack, xsrfToken }: Props) {
	const [username, setUsername] = useState<string>('');
	const [userMenu, setUserMenu] = useState<boolean>(false);
	const [image, setImage] = useState<string>('');
	const navigate = useNavigate();
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
	}, []);

	async function logout() {
		try {
			const response = await axios.get(`${baseUrlBack}/api/user/logout`, {
				withCredentials: true,
			});
			navigate('/login');
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		async function getUserInfo() {
			try {
				const response = await axios.post(`${baseUrlBack}/api/user/${userId}`);
				setUsername(response.data.username);
				setImage(response.data.image);
			} catch (err) {
				console.error(err);
			}
		}
		if (userId) {
			getUserInfo();
		}
	}, [userId]);

	const user = {
		name: username,
		img: `/src/assets/profile_picture/${image}`,
	};

	return (
		<div className={`header ${isScrolled ? 'blur-effect' : ''}`}>
			<div className='navbar'>
				<nav onClick={() => navigate('/')}>
					<img src={logo} alt='logo' width={'50px'} height={'50px'} />
					<span>FlixHunt</span>
				</nav>
				<button
					className='movies btn'
					onClick={() => {
						navigate('/movies');
						window.scrollTo(0, 0);
					}}
				>
					Movies
				</button>
				<button
					className='tv btn'
					onClick={() => {
						navigate('/tv');
						window.scrollTo(0, 0);
					}}
				>
					TV
				</button>
				<button
					className='search btn'
					onClick={() => {
						navigate('/search');
						window.scrollTo(0, 0);
					}}
				>
					Search
				</button>
				<button
					className='my-lists-btn btn'
					onClick={() => {
						navigate('/lists');
						window.scrollTo(0, 0);
					}}
				>
					My lists
				</button>
			</div>

			<div className='user' onClick={() => setUserMenu(!userMenu)}>
				{userId !== '' && (
					<>
						{username && <span className='name'>{user.name}</span>}
						{image && <img src={user.img} alt={user.name} />}
					</>
				)}
				{userMenu && (
					<div className='user-menu' onClick={logout}>
						<span>Logout</span>
						<FontAwesomeIcon icon={faArrowRightFromBracket} className='icon' />
					</div>
				)}
			</div>
		</div>
	);
}

export default Nav;
