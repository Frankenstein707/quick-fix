import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-4 bg-[#F3F3E0]">
    
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-[1000px] px-4">
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
}
