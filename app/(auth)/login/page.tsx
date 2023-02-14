import Icon from '@/components/Icon';
import Link from 'next/link';
export default function Login() {
	return (
		<div className="flex justify-between min-h-screen font-sans">
			<div className="hidden relative w-1/2 bg-center bg-cover lg:block bg-gradient-to-l from-rose-100 to-teal-100">
				<div className="flex absolute bottom-20 justify-center w-full">
					<div className="max-w-md text-center">
						<span className="text-3xl font-bold leading-loose text-gray-900">Control Bussiness</span>
						<p className="font-light leading-7 text-gray-500">
							Stock Control is the most comprehensive field service & asset managament platform with combining
							flexibility.
						</p>
					</div>
				</div>
			</div>
			<div className="flex-1 mx-auto max-w-2xl">
				<div className="flex flex-col px-8 pt-10 lg:px-14 xl:px-24">
					<Icon icon="carbon:carbon-for-ibm-product" className="self-center w-10 md:self-end text-teal-500" />
					<div className="pt-5 pb-6">
						<h1 className="text-3xl font-bold tracking-wide leading-loose whitespace-nowrap">Hi, Welcome back!</h1>
						<span className="font-light text-gray-500">Login now to manage your job made easy.</span>

						<form action="">
							<div className="pt-6">
								<label htmlFor="username" className="font-light text-gray-500">
									Username
								</label>
								<div className="flex overflow-hidden items-center mt-2 w-full rounded-lg border border-gray-400 transition-all focus-within:shadow-lg focus-within:border-rose-400">
									<div className="flex justify-center items-center pl-6 ">
										<Icon
											icon="carbon:user"
											className="w-6 h-6 pointer-events-none flex justify-center items-center text-gray-500"
										/>
									</div>
									<input
										type="email"
										name="username"
										id="username"
										placeholder="Enter your username"
										className="p-4 w-full focus:outline-none font-light border-0 focus:ring-0"
									/>
								</div>
							</div>
							<div className="pt-6">
								<label htmlFor="password" className="font-light text-gray-500">
									Password
								</label>
								<div className="flex overflow-hidden items-center mt-2 w-full rounded-lg border border-gray-400 transition-all focus-within:shadow-lg focus-within:border-rose-400">
									<div className="flex justify-center items-center pl-6">
										<Icon
											className="w-6 h-6 pointer-events-none flex justify-center items-center text-gray-500"
											icon="carbon:locked"
										/>
									</div>
									<input
										type="password"
										name="password"
										id="password"
										placeholder="Enter your password"
										className="p-4 w-full focus:outline-none font-light border-0 focus:ring-0"
									/>
								</div>
							</div>
							<div className="flex justify-between items-center pt-4">
								<div className="flex items-center">
									<input
										type="checkbox"
										name="remember"
										id="remember"
										className="w-5 h-5 text-rose-400 bg-white rounded border border-gray-400 focus:outline-none focus:ring-rose-400"
									/>
									<label htmlFor="remember" className="pl-4 font-light text-gray-900">
										Remember me
									</label>
								</div>
								<a href="#" className="text-teal-500 hover:text-teal-600">
									{' '}
									Forgot password
								</a>
							</div>
							<div className="pt-8 w-full">
								<Link
									href="/"
									type="button"
									className="py-4 px-8 w-full text-white bg-rose-400 rounded-lg shadow-lg hover:bg-rose-500 focus:ring-4 focus:ring-rose-100 focus:outline-none text-center"
								>
									Sign in
								</Link>
							</div>
						</form>
						<div className="">
							<div className="flex flex-wrap gap-y-2 justify-between items-center pt-14 text-center whitespace-nowrap">
								<span className="flex-1 text-gray-500">© 2021 Stock Control. All rights reserved.</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
