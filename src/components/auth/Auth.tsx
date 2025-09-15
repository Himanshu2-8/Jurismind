"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { auth, googleAuthProvider, db } from "../../../firebase/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { Lock, Mail, User, ArrowRight, LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      router.push("/");
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      console.log("Google user signed in:", userCredential.user);
      router.push("/");
    } catch (error) {
      console.log("Error during Google login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-cream to-amber-50/30 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-amber-100 p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">Sign in to continue</p>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-amber-600" />
            <Input
              type="email"
              placeholder="Email"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-amber-600" />
            <Input
              type="password"
              placeholder="Password"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            onClick={handleLogin}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </Button>

          <Button
            onClick={handleGoogleSignIn}
            className="w-full border-2 border-amber-600 text-amber-600 hover:bg-amber-50 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const saveUser = async (uid: string, name: string, email: string) => {
    try {
      await setDoc(doc(db, "users", uid), {
        uid,
        name,
        email,
        createdAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.log("Error saving user:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user);
      await saveUser(userCredential.user.uid, name, email);
    } catch (error) {
      console.log("Error during register:", error);
    }
  };

  const handleRegisterWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      console.log("Google user registered:", userCredential.user);
      await saveUser(userCredential.user.uid, userCredential.user.displayName || "", userCredential.user.email || "");
    } catch (error) {
      console.log("Error during Google register:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-cream to-amber-50/30 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-amber-100 p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Create Account</h2>
        <p className="text-center text-gray-600 mb-6">Join LegalAI today</p>

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-amber-600" />
            <Input
              type="text"
              placeholder="Name"
              className="pl-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-amber-600" />
            <Input
              type="email"
              placeholder="Email"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-amber-600" />
            <Input
              type="password"
              placeholder="Password"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            onClick={handleRegister}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105"
          >
            <UserPlus className="w-5 h-5" />
            Register
          </Button>

          <Button
            onClick={handleRegisterWithGoogle}
            className="w-full border-2 border-amber-600 text-amber-600 hover:bg-amber-50 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            Register with Google
          </Button>
        </div>
      </div>
    </div>
  );
};