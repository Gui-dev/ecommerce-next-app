'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/hooks/use-auth'
import { loginSchema, type LoginSchemaData } from '@/validations/login-schema'

export default function Home() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginSchemaData>({
    resolver: zodResolver(loginSchema),
  })
  const router = useRouter()
  const { login, user } = useAuth()

  const handleLogin = (data: LoginSchemaData) => {
    login(data.email, data.password)
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow"
      >
        <h1 className="text-xl font-bold text-gray-900 mb-4">Login</h1>

        <div className="mb-4">
          <input
            type="email"
            placeholder="E-mail"
            className="w-full border px-3 rounded-md placeholder:text-gray-700"
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
            className="w-full border px-3 rounded-md placeholder:text-gray-700"
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Entrar
        </button>
      </form>
    </main>
  )
}
