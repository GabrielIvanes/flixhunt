import Main from './components/Main';
import Nav from '../Nav';

interface Props {
	userId: string;
	xsrfToken: string;
	url: string;
	baseUrlBack: string;
}

function Index({ userId, xsrfToken, url, baseUrlBack }: Props) {
	return (
		<div className='home-wrapper'>
			<Nav userId={userId} xsrfToken={xsrfToken} baseUrlBack={baseUrlBack} />
			<Main
				url={url}
				xsrfToken={xsrfToken}
				userId={userId}
				baseUrlBack={baseUrlBack}
			/>
		</div>
	);
}

export default Index;
