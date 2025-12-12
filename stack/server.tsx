import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    // After completing auth in /handler/*, send users into the app.
    afterSignIn: "/dashboard",
    afterSignUp: "/dashboard",
  },
});
