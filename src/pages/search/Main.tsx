import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

interface Props {
	type: string;
	id: number;
	navigateType: string;
	posterPath: string;
	url: string;
	name: string;
}

function Main({ type, id, navigateType, posterPath, url, name }: Props) {
	const navigate = useNavigate();

	return (
		<>
			<div
				className={type}
				onClick={() => {
					navigate(`/${navigateType}/${id}`);
					window.scrollTo(0, 0);
				}}
			>
				{posterPath ? (
					<img
						src={`${url}original${posterPath}`}
						alt={name}
						className='poster'
					/>
				) : (
					<div className='poster'>
						<FontAwesomeIcon icon={faImage} />
					</div>
				)}
				<div className='title' style={{ marginBottom: '15px' }}>
					{name}
				</div>
			</div>
		</>
	);
}

export default Main;
