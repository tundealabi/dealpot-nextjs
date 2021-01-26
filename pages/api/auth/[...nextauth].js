import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { getUser, saveUser } from '../../../lib/data';

const options = {
    providers: [
        Providers.Google({
            clientId: process.env.dealpot_googleAuthClientId,
            clientSecret: process.env.dealpot_googleAuthClientSecret
        })
    ],
    session: {
        jwt: true,
        maxAge: 60 * 60 * 60
    },
    jwt: {
        secret: "Neverdothis"
    },
    secret: process.env.SECRET,
    callbacks: {
        signIn: async (user,account,profile) => {
            // console.log("user",user)
            // console.log("acct",account)
            // console.log("prfile",profile)
            user.id = await saveUser(profile);
            return true;
        },
        session: async (session, token) => {
            // console.log("sess",session)
            // console.log("user-sess",user)
            const dbUser = await getUser(token.id);
            if(!dbUser) return null;
            session.user = {...dbUser};
            return session;
          },
        jwt: async (token,user) => {
            // console.log("token",token)
            // console.log("tok-user",user)
            if(user) token = {id: user.id};
            return token;
        }
    }
};

export default (req, res) => NextAuth(req, res, options);