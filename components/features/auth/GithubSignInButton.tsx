'use client';

import { login } from '@/actions/auth';
import { Github } from 'lucide-react';

const GithubSignInButton = () => {
  return (
    <button
      onClick={login}
      className="w-full flex bg-gray-900 text-foreground items-center justify-center gap-3 font-medium px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
    >
      <Github className="w-4 h-4" />
      <span>Continue with Github</span>
    </button>
  );
};

export default GithubSignInButton;
