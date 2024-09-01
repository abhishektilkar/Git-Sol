// components/AppBar.tsx
import { auth, signIn } from '@/auth';
import Link from 'next/link';
import UserButton from './UserButton';
import { Button } from '@/components/ui/button';

const AppBar = async () => {
    const session = await auth();
    const user = session?.user;

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link href='/'>
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            id="github"
                            className="w-8 h-8 text-blue-600"
                        >
                            <path
                                fill="currentColor"
                                d="M7.999 0C3.582 0 0 3.596 0 8.032a8.031 8.031 0 0 0 5.472 7.621c.4.074.546-.174.546-.387 0-.191-.007-.696-.011-1.366-2.225.485-2.695-1.077-2.695-1.077-.363-.928-.888-1.175-.888-1.175-.727-.498.054-.488.054-.488.803.057 1.225.828 1.225.828.714 1.227 1.873.873 2.329.667.072-.519.279-.873.508-1.074-1.776-.203-3.644-.892-3.644-3.969 0-.877.312-1.594.824-2.156-.083-.203-.357-1.02.078-2.125 0 0 .672-.216 2.2.823a7.633 7.633 0 0 1 2.003-.27 7.65 7.65 0 0 1 2.003.271c1.527-1.039 2.198-.823 2.198-.823.436 1.106.162 1.922.08 2.125.513.562.822 1.279.822 2.156 0 3.085-1.87 3.764-3.652 3.963.287.248.543.738.543 1.487 0 1.074-.01 1.94-.01 2.203 0 .215.144.465.55.386A8.032 8.032 0 0 0 16 8.032C16 3.596 12.418 0 7.999 0z"
                            />
                        </svg>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent pl-2">Git-Sol</h1>
                    </div>
                </Link>
                <div className="flex gap-4 md:gap-8 lg:gap-16 items-center">
                    <div className='hidden md:flex gap-8'>
                        <Link href="/" className="pt-2 text-lg text-gray-700 hover:text-blue-600 transition duration-300">Home</Link>
                        <Link href="/about" className="pt-2 text-lg text-gray-700 hover:text-blue-600 transition duration-300">About</Link>
                        <Link href="/leaderBoard" className="pt-2 text-lg text-gray-700 hover:text-blue-600 transition duration-300">Leaderboard</Link>
                    </div>
                    <div className='flex md:hidden'>
                        <Link href="/about" className="pt-2 text-lg text-gray-700 hover:text-blue-600 transition duration-300">About</Link>
                    </div>
                    <div>
                        {user ? <UserButton user={user} /> : <SignInButton />}
                    </div>
                </div>
            </div>
        </nav>
    );
};

function SignInButton() {
    return (
        <form action={async () => {
            "use server";
            await signIn();
        }}>
            <Button type="submit" className='bg-blue-500 hover:bg-slate-500/35'>Sign in</Button>
        </form>
    );
}

export default AppBar;
