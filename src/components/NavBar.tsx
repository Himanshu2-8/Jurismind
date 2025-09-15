import React from 'react'
import { Scale } from 'lucide-react';
import {auth} from "../../firebase/firebaseConfig"

const NavBar = () => {

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
              <span className="text-2xl font-bold text-gray-800">Jurismind</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-amber-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-amber-600 transition-colors">How it Works</a>
              <a href="#pricing" className="text-gray-700 hover:text-amber-600 transition-colors">Pricing</a>
            </nav>
            {auth.currentUser.photoURL?(<img src={auth.currentUser.photoURL} alt="" />):auth.currentUser.displayName[0]}
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
              <span className="text-2xl font-bold text-gray-800">Jurismind</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-amber-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-amber-600 transition-colors">How it Works</a>
              <a href="#pricing" className="text-gray-700 hover:text-amber-600 transition-colors">Pricing</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-amber-600 transition-colors">Sign In</button>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default NavBar