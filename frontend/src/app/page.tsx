import Link from 'next/link';
import LoginForm from './_components/login-form';

export default function Home() {
  return (
    <main className="min-h-screen w-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="font-bold text-xl">Log In</h1>
      <LoginForm />
      <p className="text-sm">
        Don&rsquo;t have an account?{' '}
        <Link href="/register" className="text-blue-400">
          Create Account
        </Link>
      </p>
    </main>
  );
}
