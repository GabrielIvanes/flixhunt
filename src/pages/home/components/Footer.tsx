import tmdbLogo from '../../../assets/tmdb.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
	return (
		<div className='footer-wrapper'>
			<div className='footer'>
				<div className='tmdb'>
					<a href='https://www.themoviedb.org/'>
						<img src={tmdbLogo} alt='TMDB logo' />
					</a>
					<span>
						This product uses the{' '}
						<a href='https://www.themoviedb.org/'>TMDB API</a> but is not
						endorsed or certified by TMDB.
					</span>
				</div>
				<a className='contact' href='mailto:ivanes.gabriel@gmail.com'>
					Contact me !
				</a>
				<div className='me'>
					<span>
						I'm Gabriel Ivanes a french engineering student who loves web
						development. You can find my complete code on GitHub with the link
						below.
					</span>
					<div>
						<a href='https://github.com/GabrielIvanes/Movie-app'>
							<FontAwesomeIcon icon={faGithub} className='icon' />
						</a>
						<a href='https://www.linkedin.com/in/gabriel-ivanes/'>
							<FontAwesomeIcon icon={faLinkedin} className='icon' />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
	//
	//logo TMDB
}

export default Footer;
