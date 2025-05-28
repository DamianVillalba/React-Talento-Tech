import BackToHomeLink from '../components/common/BackToHome'

const NotFound = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <section className="max-w-md w-full text-center">
        <h1 className="text-7xl font-extrabold text-indigo-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>
        <BackToHomeLink />
      </section>
    </main>
  )
}

export default NotFound
