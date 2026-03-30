"use client";

import { updateCacheTagAction } from "@/lib/updateCacheTagAction";
import { cn } from "@shared/utils/cn";
import { useActionState, useEffect } from "react";
import { BiRefresh } from "react-icons/bi";
import { toast } from "react-toastify";

interface RefetchProps extends React.HTMLAttributes<HTMLFormElement> {
  tag: string;
}

export default function Refetch({ tag, className, ...props }: RefetchProps) {
  const [state, dispatch, isPending] = useActionState(updateCacheTagAction, null);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
  }, [state]);

  return (
    <form action={dispatch} className={cn("text-theme-500", className)} {...props}>
      <input type="hidden" name="tag" value={tag} />

      <button type="submit" disabled={isPending} aria-label="Refresh">
        <BiRefresh
          className={cn(
            "cursor-pointer hover:text-inherit transition",
            isPending && "animate-spin opacity-70",
          )}
        />
      </button>
    </form>
  );
}
