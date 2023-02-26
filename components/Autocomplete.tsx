'use client';
import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import CustomIcon from './Icon';

interface Props {
	options: any[];
	handleSelect: (value: any) => void;
}

export default function Example({ options, handleSelect }: Props) {
	const [query, setQuery] = useState('');

	const filteredOptions =
		query === ''
			? options
			: options.filter((option) =>
					option.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
			  );

	return (
		<div className="w-72">
			<Combobox name="assignee" onChange={handleSelect}>
				<div className="relative mt-1">
					<div className="relative w-full cursor-default overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
						<Combobox.Input
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5"
							onChange={(event) => setQuery(event.target.value)}
							displayValue={(option: any) => option?.name}
						/>
						<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
							<CustomIcon icon="carbon:chevron-down" className="h-5 w-5 text-gray-400" aria-hidden="true" />
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery('')}
					>
						<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
							{filteredOptions.length === 0 && query !== '' ? (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nothing found.</div>
							) : (
								filteredOptions.map((option) => (
									<Combobox.Option
										key={option.id}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? 'bg-teal-500 text-white' : 'text-gray-900'
											}`
										}
										value={option}
									>
										<span className={`block truncate font-normal`}>{option.name}</span>
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
}
