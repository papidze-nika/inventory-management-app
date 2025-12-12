import { StackClientApp } from "@stackframe/stack";

export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
  urls: {
    // Keep client + server consistent.
    afterSignIn: "/dashboard",
    afterSignUp: "/dashboard",
  },
});
