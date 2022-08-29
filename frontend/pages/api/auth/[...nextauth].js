import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const options = {
  theme: {
    colorScheme: "dark",
    logo: "/rw.png"
  },
  cookies: {
    sessionToken: {
      name: `__riverwolves.sistem-de-siguranta-unu`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    },
    callbackUrl: {
      name: `__riverwolves.sistem-de-siguranta-doi`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    },
    csrfToken: {
      name: `__riverwolves.sistem-de-siguranta-trei`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    },
    pkceCodeVerifier: {
      name: `riverwolves-cod-de-securitate`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    },
    state: {
      name: `riverwolves.status`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        console.log("at",token.accessToken);
      }
      // setDB(token.email, token.accessToken);
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      return session
    }
  },
  session: {
    maxAge: 24 * 60 * 60 * 31 * 10, // 10 luni
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 24 * 60 * 60 * 31 * 10, // 10 luni
    encryption: true
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  secret: process.env.SECRET
}

const NA = (req,res) => NextAuth(req, res, options);

export default NA;