import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

interface Props {
	id: string;
	posterPath: string | null;
	url: string;
	title: string;
	episodeNumber: string;
	backdropPath: string | null;
	tvShow: {
		name: string;
		id: string;
	};
	season: {
		name: string;
		id: string;
		number: string;
	};
}

function EpisodeItem({
	id,
	posterPath,
	url,
	title,
	episodeNumber,
	backdropPath,
	tvShow,
	season,
}: Props) {
	const navigate = useNavigate();

	return (
		<div className='episode' key={id}>
			{posterPath ? (
				<img
					src={`${url}original${posterPath}`}
					alt={title}
					className='poster-episode'
					onClick={() => {
						navigate(
							`/tv/${tvShow.id}/seasons/${season.number}/episodes/${episodeNumber}`,
							{
								state: { backdropPath: backdropPath, tvShow: tvShow },
							}
						);
						window.scrollTo(0, 0);
					}}
				/>
			) : (
				<div className='poster-episode'>
					<FontAwesomeIcon icon={faImage} />
				</div>
			)}

			<div className='title'>
				S{season.number}E{episodeNumber} - {title}
			</div>
		</div>
	);
}

export default EpisodeItem;
