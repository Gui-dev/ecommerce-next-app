'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useAuth } from '@/hooks/use-auth'
import { type LoginSchemaData, loginSchema } from '@/validations/login-schema'

export default function Home() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginSchemaData>({
    resolver: zodResolver(loginSchema),
  })
  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = (data: LoginSchemaData) => {
    login(data.email, data.password)
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <Head>
        <title>Home - Faça seu login</title>
        <meta name="description" content="Faça seu login e boas compras" />
      </Head>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-sm bg-zinc-900 p-6 rounded-xl shadow-gray-600 shadow-sm"
      >
        <h1 className="text-xl font-bold text-gray-100 mb-4">Login</h1>

        <div className="mb-4">
          <input
            type="email"
            placeholder="E-mail"
            className="text-gray-100 w-full border border-gray-800 px-3 py-2 rounded-md placeholder:text-gray-300"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Senha"
            className="text-gray-100 w-full border border-gray-800 px-3 py-2 rounded-md placeholder:text-gray-300"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition cursor-pointer"
        >
          Entrar
        </button>
      </form>
    </main>
  )
}
