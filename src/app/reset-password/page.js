import { Suspense } from "react";
import ResetPassword from "@/views/ResetPassword/ResetPassword";

export const metadata = {
  title: "Reset Password | Noorrix Motors",
  description: "Set a new password for your Noorrix Motors account.",
};

export default function Page() {
  // ResetPassword reads ?uid=&token= via useSearchParams, which must be
  // wrapped in a Suspense boundary in the App Router.
  return (
    <Suspense fallback={null}>
      <ResetPassword />
    </Suspense>
  );
}
