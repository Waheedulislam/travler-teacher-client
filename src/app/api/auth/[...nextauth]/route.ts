import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

interface ExtendedProfile {
  email: string;
  name: string;
  picture?:
    | string
    | {
        data?: {
          url?: string;
        };
      };
}

const DUMMY_PASSWORD = "social_login_dummy_password";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🟡 authorize() called with:", credentials);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const data = await res.json();
        console.log("🟢 Login Response:", data);

        if (res.ok && data.success) {
          console.log("✅ User authenticated via credentials");
          return {
            id: data.data.user._id,
            name: data.data.user.name,
            email: data.data.user.email,
            accessToken: data.data.accessToken,
          };
        }

        console.log("🔴 Credential login failed");
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log("🔁 jwt() callback");
      console.log("👉 user:", user);
      console.log("👉 account:", account);
      console.log("👉 profile:", profile);

      // From Credentials
      if (user?.accessToken) {
        console.log("✅ accessToken from Credentials");
        token.backendAccessToken = user.accessToken;
      }

      // From Google or Facebook
      if (account && profile) {
        const extendedProfile = profile as ExtendedProfile;
        const userData = {
          email: extendedProfile.email,
          name: extendedProfile.name,
          image:
            typeof extendedProfile.picture === "string"
              ? extendedProfile.picture
              : extendedProfile.picture?.data?.url || "",
          password: DUMMY_PASSWORD,
        };

        try {
          console.log("🟡 Trying to register social user");
          const registerRes = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/user/create-user`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userData),
            }
          );

          const registerData = await registerRes.json();
          console.log("🔵 Register Response:", registerData);

          // Already registered
          if (
            !registerRes.ok &&
            registerData.message === "Email is already registered"
          ) {
            console.log("🔁 Trying login for existing user");

            const loginRes = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: userData.email,
                  password: DUMMY_PASSWORD,
                }),
              }
            );

            const loginData = await loginRes.json();
            console.log("🟢 Login Response (Social):", loginData);

            if (loginData.success && loginData.data?.accessToken) {
              console.log("✅ accessToken from Social Login");
              token.backendAccessToken = loginData.data.accessToken;
            }
          } else if (registerData.success && registerData.data?.accessToken) {
            console.log("✅ accessToken from Social Registration");
            token.backendAccessToken = registerData.data.accessToken;
          }
        } catch (err) {
          console.error("🔴 Social user sync failed:", err);
        }
      }

      console.log("✅ Returning token from jwt() =>", token);
      return token;
    },

    async session({ session, token }) {
      console.log("📦 session() callback");
      console.log("👉 token:", token);

      session.accessToken = token.backendAccessToken as string | undefined;

      console.log("✅ Final session:", session);
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
