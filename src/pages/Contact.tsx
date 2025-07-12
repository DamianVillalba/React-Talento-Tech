const Contact = () => {
	return (
		<div className="isolate bg-white px-6 py-24 sm:py-18 lg:px-8">
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
					Contacto
				</h2>
				<p className="mt-2 text-lg/8 text-gray-600">
					Responderemos a cualquier duda que tengas
				</p>
			</div>
			<form
				action="#"
				method="GET"
				className="mx-auto mt-16 max-w-xl sm:mt-20"
			>
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div>
						<label
							htmlFor="first-name"
							className="block text-sm/6 font-semibold text-gray-900"
						>
							Nombre
						</label>
						<div className="mt-2.5">
							<input
								id="first-name"
								name="first-name"
								type="text"
								autoComplete="given-name"
								className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="last-name"
							className="block text-sm/6 font-semibold text-gray-900"
						>
							Apellido
						</label>
						<div className="mt-2.5">
							<input
								id="last-name"
								name="last-name"
								type="text"
								autoComplete="family-name"
								className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="email"
							className="block text-sm/6 font-semibold text-gray-900"
						>
							Email
						</label>
						<div className="mt-2.5">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label
							htmlFor="message"
							className="block text-sm/6 font-semibold text-gray-900"
						>
							Mensaje
						</label>
						<div className="mt-2.5">
							<textarea
								id="message"
								name="message"
								rows={4}
								className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
								defaultValue={""}
							/>
						</div>
					</div>
				</div>
				<div className="mt-10">
					<button
						type="submit"
						className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Contactar
					</button>
				</div>
			</form>
		</div>
	);
};

export default Contact;
