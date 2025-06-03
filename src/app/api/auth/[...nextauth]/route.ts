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

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
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
        if (res.ok && data.success) {
          return {
            id: data.data.user._id,
            name: data.data.user.name,
            email: data.data.user.email,
            accessToken: data.data.accessToken,
          };
        }
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
      // Credentials Provider থেকে accessToken সেট করা
      if (user?.accessToken) {
        token.backendAccessToken = user.accessToken;
      }

      // Google / Facebook Social Login এর জন্য
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
          const registerRes = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/user/create-user`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userData),
            }
          );

          const registerData = await registerRes.json();

          if (
            !registerRes.ok &&
            registerData.message === "Email is already registered"
          ) {
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
            if (loginData.success && loginData.data?.accessToken) {
              token.backendAccessToken = loginData.data.accessToken;
            }
          } else if (registerData.success && registerData.data?.accessToken) {
            token.backendAccessToken = registerData.data.accessToken;
          }
        } catch (err) {
          console.error("Social user sync failed:", err);
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.backendAccessToken as string | undefined;
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
