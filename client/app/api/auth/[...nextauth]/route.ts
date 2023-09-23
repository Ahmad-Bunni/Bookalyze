import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const externalProviders = [
  GoogleProvider({
    id: 'google',
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  }),
]

export const handler = NextAuth({
  providers: externalProviders,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
})

export { handler as GET, handler as POST }
