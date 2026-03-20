"use client";
import { Button } from "@shared/components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "./client";
import { useSearchParams } from "next/navigation";

export default function SocialLogin() {
  const searchParams = useSearchParams();

  const doSocialLogin = async (formData: FormData) => {
    const action = formData.get("action");
    if (!action || typeof action !== "string") return;

    const goNext = searchParams.get("next") ?? window.location.pathname;

    const safeNext = goNext.startsWith("/") ? goNext : window.location.pathname; // prevent open redirect

    const callbackURL = new URL(safeNext, window.location.origin).href;

    switch (action) {
      case "google":
        await signIn.social({ provider: "google", callbackURL });
        break;

      default:
        console.error("Unknown auth provider:", action);
        return;
    }
  };

  return (
    <form action={doSocialLogin} className="w-full flex flex-row gap-3 justify-center">
      {/* {referBy && <input type="hidden" name="referCode" value={referBy} />} */}
      <Button
        className="text-lg flex bg-transparent text-inherit items-center gap-1 border-2 border-gray-500/20 shadow-md hover:scale-100 hover:shadow-inner rounded-full"
        type="submit"
        name="action"
        value="google"
        svg={<FcGoogle />}
      >
        Sign In With Google
      </Button>
    </form>
  );
}
