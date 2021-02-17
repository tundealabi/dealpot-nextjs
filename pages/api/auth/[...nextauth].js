import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { getUser, saveUser } from '../../../lib/data';

const options = {
    providers: [
        Providers.Google({
            clientId: process.env.dealpot_googleAuthClientId,
            clientSecret: process.env.dealpot_googleAuthClientSecret
        }),
        Providers.Email({
            server: {
                port: 465,
                host: 'smtp.gmail.com',
                secure: true,
                auth: {
                  user: process.env.EMAIL_SERVER_USER,
                  pass: process.env.EMAIL_SERVER_PASSWORD
                },
                tls: {
                  rejectUnauthorized: false,
                },
              },
              from: process.env.NEXTAUTH_EMAIL_FROM
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
            if(account.type === "oauth"){
                console.log("came to type of oauth")
                 user.id = await saveUser(profile);
                 return true;
            }
            if(account.type === "email" && !profile.verificationRequest){
                console.log("came to verification reques")
                user.id = await saveUser(profile);
                return true;
            }
            
        },
        session: async (session, token) => {
            // console.log("sess",session)
            // console.log("user-sess",token)
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