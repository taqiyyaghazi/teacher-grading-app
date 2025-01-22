import Link from 'next/link';
import RegisterForm from './_components/register-form';

export default function Register() {
  return (
    <main className="min-h-screen w-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="font-bold text-xl">Create Account</h1>
      <RegisterForm />
      <p className="text-sm">
        Already have an account?{' '}
        <Link href="/" className="text-blue-400">
          Log In
        </Link>
      </p>
    </main>
  );
}
