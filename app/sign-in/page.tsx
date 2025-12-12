import { stackServerApp } from "@/stack/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await stackServerApp.getUser();
  if (user) {
    redirect("/dashboard");
  }

  // We intentionally keep this as a visible page before auth starts.
  // The actual auth UI is served by Stack's built-in handler routes.
  const handlerSignInUrl = stackServerApp.urls.signIn;
  const handlerSignUpUrl = stackServerApp.urls.signUp;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-950 dark:to-purple-950 px-4">
      <div className="max-w-md w-full space-y-6 bg-white/90 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Please sign in to continue to your inventory dashboard.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href={handlerSignInUrl}
            className="block w-full text-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Continue to sign in
          </Link>

          <Link
            href={handlerSignUpUrl}
            className="block w-full text-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Create an account
          </Link>

          <Link href="/" className="block text-center text-sm text-gray-600 dark:text-gray-300">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
