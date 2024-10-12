import { convexAuth } from "@convex-dev/auth/server";
//other auth providers
import GitHub from "@auth/core/providers/github";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [GitHub],
});
