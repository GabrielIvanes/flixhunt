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
import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';
import image5 from '../assets/5.png';
import image6 from '../assets/6.png';
import image7 from '../assets/7.png';
import image8 from '../assets/8.png';
import image9 from '../assets/9.png';
import image10 from '../assets/10.png';
import image11 from '../assets/11.png';
import image12 from '../assets/12.png';
import image13 from '../assets/13.png';
import image14 from '../assets/14.png';
import image15 from '../assets/15.png';

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
	const [imageSrc, setImageSrc] = useState<string>('');

	useEffect(() => {
		const loadImage = async () => {
			const imageModule = await import(`./src/assets/${image}`);
			setImageSrc(imageModule.default);
		};

		loadImage();
	}, [image]);

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
		img: imageSrc,
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
			<div style={{ visibility: 'hidden' }}>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((index) => (
					<img src={`image${index}`} alt='nav' />
				))}
			</div>
		</div>
	);
}

export default Nav;
