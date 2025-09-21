"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { Scale } from 'lucide-react';
import {auth} from "../../firebase/firebaseConfig"
import Link from 'next/link';

const NavBar = () => {
  const router = useRouter();

  if(auth.currentUser && auth.currentUser.displayName){
    return(
      <div className='bg-gradient-to-br from-amber-50 via-cream to-amber-50/30'>
      <header className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-600 p-2 rounded-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <Link href="/">
                <span className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-amber-600">Jurismind</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/features" className="text-gray-700 hover:text-amber-600 transition-colors">Features</Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-amber-600 transition-colors">How it Works</Link>
              <Link href='/pricing' className="text-gray-700 hover:text-amber-600 transition-colors">Pricing</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button onClick={() => router.push('/profile')} className="text-gray-700 hover:text-amber-600 transition-colors">Profile</button>
              <button onClick={() => auth.signOut()} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
    )
  }

  return (
    <div className='bg-gradient-to-br from-amber-50 via-cream to-amber-50/30'>
      <header className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-600 p-2 rounded-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <Link href="/">
                <span className="text-2xl font-bold text-gray-800 cursor-pointer">Jurismind</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#features" className="text-gray-700 hover:text-amber-600 transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-gray-700 hover:text-amber-600 transition-colors">How it Works</Link>
              <Link href="/pricing" className="text-gray-700 hover:text-amber-600 transition-colors">Pricing</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button onClick={() => router.push('/signin')} className="text-gray-700 hover:text-amber-600 transition-colors">Sign In</button>
              <button onClick={() => router.push('/signup')} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default NavBar