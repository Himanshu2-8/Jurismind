"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { db } from "../../../firebase/firebaseConfig"; 
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { ErrorIcon } from "react-hot-toast";
import {
  UserCircleIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  CloudIcon
} from "@heroicons/react/24/outline";

interface UserProps {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface DocumentData {
  id: string;
  fileName: string;
  fileUrl: string;
  status: string;
  createdAt: any;
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
        });
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "users", user.uid, "documents"),
        orderBy("createdAt", "desc")
      );
      const unsubscribeDocs = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as DocumentData[];
        setDocuments(docs);
      });

      return () => unsubscribeDocs();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <ArrowPathIcon className="h-10 w-10 text-amber-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 text-center">
        <ErrorIcon className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-semibold text-gray-800">Access Denied</h1>
        <p className="text-gray-600 mt-2">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* User Info Card */}
        <div className="lg:w-1/3 bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col items-center text-center h-fit">
          <UserCircleIcon className="w-24 h-24 text-amber-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user.displayName || "User Profile"}
          </h1>
          <p className="text-lg text-gray-600 mb-6">{user.email}</p>
          <div className="w-full">
            <h2 className="text-md font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Account Stats
            </h2>
            <div className="flex justify-around items-center space-x-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-600">
                  {documents.length}
                </p>
                <p className="text-sm text-gray-500">Documents</p>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Table */}
        <div className="lg:w-2/3 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Document History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Submitted
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.length > 0 ? (
                  documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <DocumentTextIcon className="w-5 h-5 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900 truncate">
                            {doc.fileName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${doc.status === "parsed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <CalendarDaysIcon className="w-4 h-4 text-gray-400" />
                          <span>
                            {new Date(doc.createdAt.seconds * 1000).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href={`/documents/${doc.id}`} className="text-amber-600 hover:text-amber-900">
                          View Analysis
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500 italic">
                      No documents uploaded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;