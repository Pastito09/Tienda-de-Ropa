import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod'
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';
 

const authenticatedRoutes = [
  '/checkout/address'
]

export const authConfig = {
  pages: {
    signIn: 'auth/login',
    newUser: 'auth/new-account',
  },

  callbacks: {

    authorized({ auth, request: { nextUrl } }) {
      
      const isLoggedIn = !!auth?.user;
      const isOnAuthRoutes = authenticatedRoutes.includes(nextUrl.pathname)
      if (isOnAuthRoutes) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return true//Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },

    jwt({token, user}) {
      if ( user ) {
        token.data = user
      }
      return token
    },
    session({session, token, user}){
      
      session.user = token.data as any
      return session
    },
  },
  providers: [
    Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);

            if ( !parsedCredentials.success ) return null;

            const { email, password } = parsedCredentials.data

            

            //Buscar el correo
            const user = await prisma.user.findUnique({
              where: {email: email.toLowerCase()}
            })
            if (!user) return null;


            // Comparar contraseñas

            if (!bcryptjs.compareSync(password, user.password)) return null;            

            // Regresar usuario sin el password

            const { password: _, ...rest } = user

           

            return rest
        },
      }),
  ]
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)