'user client';
import { DOTS, usePagination } from '@/lib/usePagination';
import CustomIcon from './Icon';

interface Props {
	onPageChange: (page: number) => void;
	totalCount: number;
	siblingCount?: number;
	currentPage: number;
	pageSize: number;
}

export default function Pagination({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize }: Props) {
	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange[paginationRange.length - 1];
	return (
		<ul className="inline-flex items-center -space-x-px">
			<li>
				<button
					className={`block px-3 py-2 ml-0 leading-tight text-gray-500 border border-gray-300 rounded-l-lg ${
						currentPage === 1 ? '' : 'bg-gray-50 hover:bg-gray-100 hover:text-gray-700'
					}`}
					onClick={onPrevious}
					disabled={currentPage === 1}
				>
					<CustomIcon icon="carbon:chevron-left" className="w-5 h-5" />
				</button>
			</li>

			{paginationRange.map((pageNumber, i) => {
				if (pageNumber === DOTS) {
					return (
						<li key={i}>
							<button className="px-3 py-2">&#8230;</button>
						</li>
					);
				}

				return (
					<li key={i}>
						<button
							className={`px-3 py-2 leading-tight border ${
								pageNumber === currentPage
									? 'text-teal-600  border-teal-300 bg-teal-50 hover:bg-teal-100 hover:text-teal-500'
									: 'text-gray-500 border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-700'
							}`}
							onClick={() => onPageChange(+pageNumber)}
						>
							{pageNumber}
						</button>
					</li>
				);
			})}
			<li>
				<button
					className={`block px-3 py-2 ml-0 leading-tight text-gray-500 border border-gray-300 rounded-r-lg ${
						currentPage === lastPage ? '' : 'bg-gray-50 hover:bg-gray-100 hover:text-gray-700'
					}`}
					onClick={onNext}
					disabled={currentPage === lastPage}
				>
					<span className="sr-only">Next</span>
					<CustomIcon icon="carbon:chevron-right" className="w-5 h-5" />
				</button>
			</li>
		</ul>
	);
}
