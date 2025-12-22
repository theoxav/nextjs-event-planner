'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { Session } from 'next-auth';
import { logout } from '@/actions/auth';

const allNavLinks = [
  { href: '/events', label: 'Events', requireAuth: false },
  { href: '/events/create', label: 'Create Event', requireAuth: true },
  { href: '/dashboard', label: 'Dashboard', requireAuth: true },
];

const NavLinks = ({
  className,
  session,
}: {
  className?: string;
  session: Session | null;
}) => {
  const navLinks = allNavLinks.filter((link) => !link.requireAuth || session);

  return (
    <div className="hidden md:flex items-center space-x-4">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx(
            'text-foreground hover:text-primary px-3 py-2 rounded-md font-medium transition-colors',
            className
          )}
        >
          {link.label}
        </Link>
      ))}
      <AuthButton session={session} />
    </div>
  );
};

const MobileNavLinks = ({
  className,
  onLinkClick,
  session,
}: {
  className?: string;
  onLinkClick?: () => void;
  session: Session | null;
}) => {
  const navLinks = allNavLinks.filter((link) => !link.requireAuth || session);

  return (
    <div className="flex flex-col space-y-1 items-start">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className={clsx(
            'text-foreground hover:text-primary hover:bg-slate-700 px-3 py-2 rounded-md font-medium transition-colors',
            className
          )}
        >
          {link.label}
        </Link>
      ))}
      <AuthButton session={session} onLinkClick={onLinkClick} />
    </div>
  );
};

const AuthButton = ({
  session,
  onLinkClick,
}: {
  session: Session | null;
  onLinkClick?: () => void;
}) => {
  if (session) {
    return (
      <button
        onClick={async () => {
          await logout();
          onLinkClick?.();
        }}
        className="bg-red-600 text-background px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors cursor-pointer"
      >
        Logout
      </button>
    );
  }

  return (
    <Link
      href="/login"
      onClick={onLinkClick}
      className="bg-primary text-background px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
    >
      Sign in with Github
    </Link>
  );
};

const Navbar = ({ session }: { session: Session | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-primary text-xl font-bold">
              EventPlanner
            </Link>
          </div>
          <NavLinks className="text-sm block" session={session} />

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-foreground hover:text-primary focus:outline-none focus:text-primary transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLinks
                className="text-base"
                onLinkClick={closeMenu}
                session={session}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
