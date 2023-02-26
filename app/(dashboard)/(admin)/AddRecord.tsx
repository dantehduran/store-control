'use client';
import Autocomplete from '@/components/Autocomplete';
import CustomIcon from '@/components/Icon';
import fetcher from '@/lib/fetcher';
import { Product } from '@/types';
import { Listbox, RadioGroup, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import { Fragment, useState } from 'react';
import useSWR, { mutate } from 'swr';

const radioOptions = [
	{ label: 'In', value: 'INCREMENT' },
	{ label: 'Out', value: 'DECREMENT' },
];

const getProducts = async () => {
	const response = await fetcher({ url: `${process.env.NEXT_PUBLIC_API}/products`, method: 'GET' });
	const data = await response.json();
	if (!response.ok) {
		const error = new Error(data.message);
		signOut();
		throw error;
	}
	return data;
};

export default function AddRecord({ closeAddRecord }: { closeAddRecord: () => void }) {
	const { data } = useSWR<Product[]>(`${process.env.NEXT_PUBLIC_API}/products`, getProducts);
	const [product, setProduct] = useState<Product | null>((data && data[0]) || null);
	const [type, setType] = useState<'INCREMENT' | 'DECREMENT'>('INCREMENT');
	const [amount, setAmount] = useState(1);

	const [errors, setErrors] = useState<string[] | null>(null);
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const response = await fetcher({
			url: `${process.env.NEXT_PUBLIC_API}/records`,
			method: 'POST',
			body: JSON.stringify({ amount, type, productId: product?.id }),
		});
		const data = await response.json();
		if (response.ok) {
			mutate(`${process.env.NEXT_PUBLIC_API}/records`);
			closeAddRecord();
		}
		setErrors(data.message);
	};
	return (
		<div className="flex flex-col gap-2 ">
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<div className="grid gap-6 mb-6 md:grid-cols-3">
					<div>
						<RadioGroup value={type} onChange={setType}>
							<RadioGroup.Label className="block mb-2 text-sm font-medium text-gray-900 ">Plan</RadioGroup.Label>
							<div className="grid w-full gap-2 md:grid-cols-2">
								{radioOptions.map((option) => (
									<RadioGroup.Option
										key={option.value}
										value={option.value}
										className={({ active, checked }) =>
											`${active ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-100' : ''}
                  ${
										checked
											? option.value === 'INCREMENT'
												? 'bg-teal-400 bg-opacity-75 text-white'
												: 'bg-rose-400 bg-opacity-75 text-white'
											: 'bg-gray-50'
									}
                    relative flex cursor-pointer rounded-lg px-4 py-2 shadow-md focus:outline-none`
										}
									>
										{({ checked }) => (
											<>
												<div className="flex w-full items-center justify-between">
													<div className="flex items-center">
														<div className="text-sm">
															<RadioGroup.Label
																as="p"
																className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}
															>
																{option.label}
															</RadioGroup.Label>
														</div>
													</div>
													{checked && (
														<div className="shrink-0 text-white">
															<CustomIcon
																icon={
																	option.value === 'INCREMENT' ? 'carbon:connection-receive' : 'carbon:connection-send'
																}
																className="h-6 w-6"
															/>
														</div>
													)}
												</div>
											</>
										)}
									</RadioGroup.Option>
								))}
							</div>
						</RadioGroup>
					</div>
					<div>
						<Listbox value={product} onChange={setProduct}>
							<Listbox.Label className="block mb-2 text-sm font-medium text-gray-900 ">Product</Listbox.Label>
							<div className="relative mt-1">
								<Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-50 py-2.5 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
									<span className="block truncate">{product?.name}</span>
									<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
										<CustomIcon icon="carbon:chevron-sort" className="h-5 w-5 text-gray-400" aria-hidden="true" />
									</span>
								</Listbox.Button>
								<Transition
									as={Fragment}
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
										{data?.map((person, personIdx) => (
											<Listbox.Option
												key={personIdx}
												className={({ active }) =>
													`relative cursor-default select-none py-2 pl-10 pr-4 ${
														active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
													}`
												}
												value={person}
											>
												{({ selected }) => (
													<>
														<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
															{person.name}
														</span>
														{selected ? (
															<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																<CustomIcon icon="carbon:checkmark" className="h-5 w-5" aria-hidden="true" />
															</span>
														) : null}
													</>
												)}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</div>
						</Listbox>
					</div>
					<div>
						<label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 ">
							Amount
						</label>
						<input
							type="number"
							id="amount"
							min={1}
							max={type === 'DECREMENT' ? product?.stock : undefined}
							onChange={(e) => setAmount(Number(e.target.value))}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5 "
						/>
					</div>
				</div>

				{errors && (
					<div className="text-sm text-rose-500 px-5">
						<ul className="list-disc">
							{errors.map((error, index) => (
								<li key={index} className="capitalize">
									{error}
								</li>
							))}
						</ul>
					</div>
				)}
				<div className="flex justify-end items-center gap-4">
					<button type="submit" className="py-1 px-3 bg-teal-600 text-white rounded-md">
						<CustomIcon icon="carbon:checkmark" className="w-6 h-6 fill-current" />
					</button>
					<button className="py-1 px-3 bg-rose-400 text-white rounded-md" onClick={closeAddRecord}>
						<CustomIcon icon="carbon:close" className="w-6 h-6 fill-current" />
					</button>
				</div>
			</form>
			<hr className="py-2" />
		</div>
	);
}
