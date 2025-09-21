"use client";
import { useState } from "react";
import { User } from "firebase/auth";
import {
  DocumentIcon,
  CloudArrowUpIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline"; 

interface DocumentsUploadProps {
  user: User;
}

export default function DocumentsUpload({ user }: DocumentsUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    if(!user) {
      console.error("User not authenticated");
      return;
    }
    formData.append("file", file);
    formData.append("uid", user.uid);

    setLoading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Uploaded file:", data);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 bg-gradient-to-br from-amber-50 via-cream to-amber-50/30 font-sans mb-4">
      <div className="w-full max-w-xl p-8 bg-white rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-amber-600 mb-6">
          Upload Legal Document 
        </h2>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6 transition-colors duration-200 hover:border-amber-400">
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center text-center"
          >
            <CloudArrowUpIcon className="w-12 h-12 text-gray-500 mb-2" />
            <p className="text-gray-600 mb-1">
              <span className="font-semibold text-amber-600">Click to upload</span>{" "}
              or drag and drop
            </p>
            <p className="text-sm text-gray-500">PDF file only (Max. 10MB)</p>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
        </div>

        {file && (
          <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200 mb-6">
            <div className="flex items-center space-x-3">
              <DocumentIcon className="w-6 h-6 text-amber-600" />
              <p className="text-sm font-medium text-amber-800">
                {file.name}
              </p>
            </div>
            <p className="text-xs text-amber-700">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-200
            ${
              !file || loading
                ? "bg-amber-400 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
        >
          <span className="flex items-center justify-center space-x-2">
            {loading ? (
              <>
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <span>Upload and Parse</span>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}