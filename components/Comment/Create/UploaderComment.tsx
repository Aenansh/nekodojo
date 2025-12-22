"use client";

import { ImageKitAbortError, upload } from "@imagekit/next";
import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export interface UploadFile {
  postUrl: string;
  type: "image" | "video";
  id: string;
}

interface Props {
  onUploadSuccess: (file: UploadFile) => void;
  maxSizeInMB?: number;
}

const UploaderComment = ({ onUploadSuccess, maxSizeInMB = 5 }: Props) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // 1. Authenticator Function
  const authenticator = async () => {
    try {
      // Ensure you have created app/api/upload-auth/route.ts
      const response = await fetch("/api/upload-auth");

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Auth API Error:", errorText);
        throw new Error(`Auth failed: ${response.statusText}`);
      }

      const data = await response.json();
      const { expire, token, signature, publicKey } = data;
      return { expire, token, signature, publicKey };
    } catch (error: any) {
      console.error("Authenticator Error:", error);
      throw new Error("Authentication request failed!");
    }
  };

  // 2. Main Handler using Event Object
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    console.log("File selected:", file.name, file.type, file.size); // Debug Log

    // Validation: Type
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type. Only images are allowed.");
      // Reset input so user can try again
      e.target.value = "";
      return;
    }

    // Validation: Size
    if (file.size > maxSizeInMB * 1024 * 1024) {
      toast.error(`File too large. Max size is ${maxSizeInMB}MB.`);
      e.target.value = "";
      return;
    }

    setUploading(true);
    setProgress(0);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const authParams = await authenticator();

      const response = await upload({
        file,
        fileName: file.name,
        useUniqueFileName: true,
        tags: ["forum-comment", "image"],
        expire: authParams.expire,
        token: authParams.token,
        signature: authParams.signature,
        publicKey: authParams.publicKey,
        abortSignal: abortController.signal,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
      });

      if (response) {
        console.log("Upload success:", response); // Debug Log
        onUploadSuccess({
          id: response.fileId!,
          postUrl: response.url,
          type: "image",
          name: response.name,
        } as UploadFile);
        toast.success("Image attached");
      }
    } catch (err: any) {
      console.error("Upload process error:", err); // Debug Log

      if (err.name === "AbortError" || err instanceof ImageKitAbortError) {
        toast.info("Upload cancelled");
      } else {
        toast.error("Failed to upload image. Check console for details.");
      }
    } finally {
      setUploading(false);
      abortControllerRef.current = null;
      // Reset input value to allow selecting the same file again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const cancelUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={onFileChange}
        disabled={uploading}
      />

      <button
        type="button"
        onClick={() => !uploading && fileInputRef.current?.click()}
        disabled={uploading}
        className={`relative w-full flex items-center justify-center gap-2 h-10 px-4 py-2 rounded-md font-medium text-sm transition-all border
          ${
            uploading
              ? "border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] cursor-default"
              : "border-[#3e2723] bg-[#1a110d] text-[#eaddcf] hover:bg-[#3e2723]/40 hover:text-[#d4af37] hover:border-[#d4af37]/50"
          }
        `}
      >
        {uploading ? (
          <div className="flex items-center gap-3 w-full justify-center">
            <Loader2 className="size-4 animate-spin shrink-0" />
            <span className="animate-pulse tabular-nums">{Math.round(progress)}%</span>

            <div
              role="button"
              onClick={cancelUpload}
              className="absolute right-3 p-1 rounded-full hover:bg-[#d4af37]/20 text-[#d4af37] transition-colors"
              title="Cancel Upload"
            >
              <X className="size-4" />
            </div>
          </div>
        ) : (
          <>
            <ImageIcon className="size-4" />
            <span className="capitalize">Add</span>
            <Upload className="size-3 ml-auto opacity-50" />
          </>
        )}
      </button>
    </div>
  );
};

export default UploaderComment;
