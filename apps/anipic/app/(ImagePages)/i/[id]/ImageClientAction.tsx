"use client";

import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { SlCloudDownload } from "react-icons/sl";
import { IoShareSocialOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { getDownloadUrl } from "./action";
import { Button } from "@shared/components/ui/Button";
import copyToClipboard from "@shared/utils/CopyToClipboard";

// TODO: Implement like functionality with backend integration

// export function LikeButton() {
//   const [liked, setLiked] = useState(false);

//   return (
//     <button
//       aria-label={liked ? "Unlike" : "Like"}
//       onClick={() => setLiked((v) => !v)}
//       className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
//         liked
//           ? "border-rose-500/50 bg-rose-500/10 text-rose-400"
//           : "border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800 text-neutral-300"
//       }`}
//     >
//       {liked ? (
//         <FaHeart className="text-rose-500 text-base" />
//       ) : (
//         <FaRegHeart className="text-base" />
//       )}
//       {liked ? "Liked" : "Like"}
//     </button>
//   );
// }

export function DownloadButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await getDownloadUrl(id);
      if (!res.success) throw new Error(res.message);

      const anchor = document.createElement("a");
      anchor.href = res.downloadUrl;
      anchor.download = "";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      toast.success("Download started!");
    } catch {
      toast.error("Failed to start download. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button aria-label="Download image" disabled={loading} onClick={() => void handleDownload()}>
      {loading ? (
        <AiOutlineLoading className="animate-spin text-base" />
      ) : (
        <SlCloudDownload className="text-base" />
      )}
      Download
    </Button>
  );
}

export function ShareButton({ id, title }: { id: string; title: string }) {
  const handleShare = async () => {
    const url = `${window.location.origin}/i/${id}`;

    // Use Web Share API if available (mobile)
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // User cancelled or API failed — fall through to clipboard
      }
    }

    // Clipboard fallback
    copyToClipboard(url);
  };

  return (
    <Button aria-label="Share image" onClick={() => void handleShare()}>
      <IoShareSocialOutline className="text-base" />
      Share
    </Button>
  );
}
