import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
    providers: [
        Providers.Google({
            clientId: "",
            clientSecret: ""
        })
    ]
};

export default (req, res) => NextAuth(req, res, options);