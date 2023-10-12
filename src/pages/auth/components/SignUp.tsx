/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// Se connecter
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState } from 'react';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

interface Props {
	baseUrlBack: string;
}

function SignUp({ baseUrlBack }: Props) {
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] =
		useState<boolean>(false);
	const [passwordValue, setPasswordValue] = useState<string>('');
	const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [usernameValue, setUsernameValue] = useState<string>('');
	const [emailValue, setEmailValue] = useState<string>('');

	const navigate = useNavigate();

	function handleSubmitClick(
		event: React.MouseEvent<HTMLInputElement, MouseEvent>
	) {
		event.preventDefault();
		const passwordRegex =
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
		setErrorMessage('');
		if (passwordValue != confirmPasswordValue) {
			setErrorMessage('Passwords do not match');
		} else if (!passwordValue.match(passwordRegex)) {
			setErrorMessage(
				'Your password must contain at least one lowercase and one uppercase letter, one digit, one special character and be between 8 and 20 characters'
			);
		} else {
			axios
				.post(`${baseUrlBack}/api/user/register`, {
					username: `${usernameValue}`,
					email: `${emailValue}`,
					password: `${passwordValue}`,
				})
				.then((response) => {
					console.log(response.data);
					navigate('/login');
					window.scrollTo(0, 0);
				})
				.catch((error) => {
					if (error.response) {
						console.error('Server error:', error.response.data);
					} else {
						console.error('Request error:', error.message);
					}
				});
		}
	}

	return (
		<div className='log-wrapper'>
			<nav>
				<img src={logo} alt='logo' width={'50px'} height={'50px'} />
				<span>FlixHunt</span>
			</nav>
			<div className='card-wrapper'>
				<h1>Create account</h1>
				<form>
					<div className='email'>
						<input
							type='text'
							placeholder='Enter your email address'
							value={emailValue}
							onChange={(event) => setEmailValue(event.target.value)}
						/>
					</div>
					<div className='username'>
						<input
							type='text'
							placeholder='Create a username'
							value={usernameValue}
							onChange={(event) => setUsernameValue(event.target.value)}
						/>
					</div>
					<div className='password'>
						{passwordVisible ? (
							<>
								<input
									type='text'
									placeholder='Create a password'
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
									placeholder='Create a password'
									onChange={(event) => setPasswordValue(event.target.value)}
									value={passwordValue}
									className='password-input'
								/>
								<FontAwesomeIcon
									icon={faEyeSlash}
									onClick={() => setPasswordVisible(!passwordVisible)}
									className='visibility'
								/>
							</>
						)}
					</div>
					<div className='password'>
						{confirmPasswordVisible ? (
							<>
								<input
									type='text'
									placeholder='Confirm your password'
									onChange={(event) =>
										setConfirmPasswordValue(event.target.value)
									}
									value={confirmPasswordValue}
									id='password'
								/>
								<FontAwesomeIcon
									icon={faEye}
									onClick={() => setConfirmPasswordVisible(!passwordVisible)}
									className='visibility'
								/>
							</>
						) : (
							<>
								<input
									type='password'
									placeholder='Confirm your password'
									onChange={(event) =>
										setConfirmPasswordValue(event.target.value)
									}
									value={confirmPasswordValue}
									className='password-input'
								/>
								<FontAwesomeIcon
									icon={faEyeSlash}
									onClick={() => setPasswordVisible(!passwordVisible)}
									className='visibility'
								/>
							</>
						)}
					</div>
					<div className='error-message'>
						{errorMessage && (
							<>
								<span>{errorMessage}</span>
							</>
						)}
					</div>
					<input
						type='submit'
						value='Sign up'
						onClick={(event: React.MouseEvent<HTMLInputElement, MouseEvent>) =>
							handleSubmitClick(event)
						}
						style={{ marginBottom: '20px' }}
					/>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
