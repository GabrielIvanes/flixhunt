interface Props {
	totalPages: number;
	page: number;
	setPage: (page: number) => void;
}

function Page({ totalPages, page, setPage }: Props) {
	const lastPage: number = totalPages > 500 ? 500 : totalPages;

	return (
		<div className='page'>
			{page !== 1 && (
				<button
					className='before nav-btn'
					onClick={() => {
						setPage(page - 1);
						document
							.querySelectorAll('.response-wrapper > div')
							.forEach((div) => div.scrollTo(0, 0));
					}}
				>
					&#60;
				</button>
			)}
			{page !== 1 && (
				<button
					className='first-page'
					onClick={() => {
						setPage(1);
						document
							.querySelectorAll('.response-wrapper > div')
							.forEach((div) => div.scrollTo(0, 0));
					}}
				>
					1
				</button>
			)}
			{page !== 1 && page !== 2 && page !== 3 && <span>...</span>}
			{page !== 1 && page !== 2 && (
				<button
					className='page-before number-btn'
					onClick={() => {
						setPage(page - 1);
						document
							.querySelectorAll('.response-wrapper > div')
							.forEach((div) => div.scrollTo(0, 0));
					}}
				>
					{page - 1}
				</button>
			)}
			<button className='current-page'>{page}</button>
			{page !== lastPage && page !== lastPage - 1 && (
				<button
					className='page-after number-btn'
					onClick={() => {
						setPage(page + 1);
						document
							.querySelectorAll('.response-wrapper > div')
							.forEach((div) => div.scrollTo(0, 0));
					}}
				>
					{page + 1}
				</button>
			)}
			{page !== lastPage && page !== lastPage - 1 && page !== lastPage - 2 && (
				<span>...</span>
			)}
			{page !== lastPage && (
				<button
					className='last-page number-btn'
					onClick={() => {
						setPage(lastPage);
						document
							.querySelectorAll('.response-wrapper > div')
							.forEach((div) => div.scrollTo(0, 0));
					}}
				>
					{lastPage}
				</button>
			)}
			{page !== lastPage && (
				<button
					className='after nav-btn'
					onClick={() => {
						setPage(page + 1);
						document
							.querySelectorAll('.response-wrapper > div')
							.forEach((div) => div.scrollTo(0, 0));
					}}
				>
					&#62;
				</button>
			)}
		</div>
	);
}

export default Page;
