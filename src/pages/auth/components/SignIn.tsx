/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// Se connecter
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';

interface Props {
	setUserId: (id: string) => void;
	setXsrfToken: (xsrfToken: string) => void;
	baseUrlBack: string;
}

function SignIn({ setUserId, setXsrfToken, baseUrlBack }: Props) {
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const [passwordValue, setPasswordValue] = useState<string>('');
	const [emailValue, setEmailValue] = useState<string>('');
	const [error, setError] = useState<string>('');
	const navigate = useNavigate();

	async function handleSubmitClick(
		event: React.MouseEvent<HTMLInputElement, MouseEvent>
	) {
		event.preventDefault();
		try {
			const response = await axios.post(
				`${baseUrlBack}/api/user/login`,

				{
					email: `${emailValue}`,
					password: `${passwordValue}`,
				},
				{
					withCredentials: true,
				}
			);
			if (response.data.success) {
				setUserId(response.data.user);
				const xsrfToken = response.data.xsrfToken;
				localStorage.setItem('xsrfToken', JSON.stringify(xsrfToken));
				setXsrfToken(xsrfToken);
				navigate('/');
				window.scrollTo(0, 0);
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				if (err.response) {
					setError(err.response.data.message);
				}
			}
			localStorage.setItem('xsrfToken', '');
			setUserId('');
		}
	}

	return (
		<div className='log-wrapper'>
			<nav>
				<img src={logo} alt='logo' width={'50px'} height={'50px'} />
				<span>FlixHunt</span>
			</nav>

			<div className='card-wrapper'>
				<h1>Login</h1>
				<form>
					<div className='username'>
						<input
							type='text'
							placeholder='Enter your email address'
							value={emailValue}
							onChange={(event) => setEmailValue(event.target.value)}
						/>
					</div>
					<div className='password'>
						{passwordVisible ? (
							<>
								<input
									type='text'
									placeholder='Enter your password'
									onChange={(event) => setPasswordValue(event.target.value)}
									value={passwordValue}
									id='password'
								/>
								<FontAwesomeIcon
									icon={faEye}
									onClick={() => setPasswordVisible(!passwordVisible)}
									className='visibility'
								/>
							</>
						) : (
							<>
								<input
									type='password'
									placeholder='Enter your password'
									onChange={(event) => setPasswordValue(event.target.value)}
									value={passwordValue}
									id='password'
								/>
								<FontAwesomeIcon
									icon={faEyeSlash}
									onClick={() => setPasswordVisible(!passwordVisible)}
									className='visibility'
								/>
							</>
						)}
					</div>
					<div className='error-message'>{error}</div>
					<input
						type='submit'
						value='Sign in'
						onClick={(event: React.MouseEvent<HTMLInputElement, MouseEvent>) =>
							handleSubmitClick(event)
						}
					/>
				</form>
				<div className='sign-in'>
					<p>Don't have an account yet ?</p>
					<Link to='/register'>Create an account</Link>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
