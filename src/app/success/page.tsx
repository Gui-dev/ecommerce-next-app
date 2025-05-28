import Link from 'next/link'

const Success = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Compra Aprovada! ✅
      </h1>
      <p className="mb-6">Obrigado pela sua compra.</p>

      <Link
        href="/dashboard"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Voltar para loja
      </Link>
    </main>
  )
}

export default Success
