import NextAuth, { NextAuthOptions, User, Session } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import pool from '../../../utils/db'
import bcrypt from 'bcrypt'
import { useUserStore } from '../../../store/user'; // 更新为你的 userStore 的路径

interface ExtendedUser extends User {
  id: string
  phone: string
  address: string
  name?: string | null
  email?: string | null
  image?: string | null
}
interface ExtendedSession extends Session {
  user: ExtendedUser
}


interface ExtendedJWT extends JWT {
  id: string
  phone: string
  address: string
}

const options: NextAuthOptions = {
  
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials): Promise<any> => {
        console.log("start authorize");
        const { email, password } = credentials as { email: string, password: string };
        
        try {
          const db = process.env.POSTGRES_DATABASE;
          const { rows: users } = await pool.query(`SELECT * FROM ${db}.users WHERE email = $1`, [email]);
          console.log("users", users);
          if (users && Array.isArray(users) && users.length > 0) {
            const user: any = users[0];
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (isValidPassword) {
              console.log("login success");
              return { id: user.userId, name: user.name, email: user.email, phone: user.phone, address: user.address };
            } else {
              console.log("login failed - invalid password");
              throw new Error('Invalid password');
            }
          } else {
            console.log("login failed - user not found");
            throw new Error('User not found');
          }
        } catch (error) {
          console.log("login failed - error", error);
          throw error;
        }
        
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      // user 参数只在登录时存在
      console.log('User:', user);
      console.log('Token before:', token);

      let extendedToken: ExtendedJWT = {
        ...token,
        id: user?.id ?? token.sub,
        phone: user?.phone ?? token.phone,
        address: user?.address ?? token.address,
      };
      console.log("middle token",extendedToken);
      // Get the updated user from the database
      if (extendedToken) {
        const db = process.env.POSTGRES_DATABASE;
        const { rows: [latestUser] } = await pool.query(
          `SELECT * FROM ${db}.users WHERE email = $1`,
          [extendedToken.email]
        )
        console.log("latestUser", latestUser);
        // Add the updated user to the extendedSession
        extendedToken = { ...extendedToken, ...latestUser };
        }
      console.log("final token",extendedToken)
      return extendedToken;
    },

    async session({ session, token }: { session: Session; token: any }) {

      const extendedSession: ExtendedSession = {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          phone: token.phone,
          address: token.address,
        },
      };
      console.log("final session", extendedSession)
      return extendedSession;
    },
  },
}

export default NextAuth(options);
