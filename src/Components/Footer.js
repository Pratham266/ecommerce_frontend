import React from 'react'
import {NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-800">
		<div className="sm:flex sm:items-center sm:justify-between">
			<NavLink to="/" target="_blank" className="flex items-center mb-4 sm:mb-0">
				<img src="logo.png" className="mr-4 h-8" alt="Flowbite Logo" />
				<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">RaoEcommerce</span>
			</NavLink>
			<ul className="flex flex-wrap items-center mb-6 sm:mb-0">
				<li>
					<NavLink to="/about" className="m-2 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">About</NavLink>
				</li>
				<li>
					<NavLink to="#" className="m-2 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Privacy
						Policy</NavLink>
				</li>
				<li>
					<NavLink to="/"
						className="m-2 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Home</NavLink>
				</li>
				<li>
					<NavLink to="/#" className="m-2 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Contact</NavLink>
				</li>
			</ul>
		</div>
		<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
		<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <NavLink to="/"  className="hover:underline">RaoEcommerce</NavLink>. All Rights Reserved.
    </span>
	</footer>
    </>
  )
}

export default Footer
