import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { jwtDecode } from "jwt-decode";

export const authOptions = {
  
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER, // Le chemin complet vers ton realm Keycloak
      authorization: { params: { scope: 'openid profile email' } },
      token_endpoint_auth_method: 'client_secret_post',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,  // Utilisé pour signer les tokens de session
  session: {
    strategy: 'jwt',  // Utilisation de JWT pour gérer les sessions
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'None',  // Pour autoriser les cookies entre différents domaines
        secure: true, // process.env.NODE_ENV === 'production',  // Utiliser Secure en production
        domain: process.env.NODE_ENV === 'production' ? '.jw-solutions.fr' : 'localhost',  // Partage des cookies en local
        path: '/',
      },
    },
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // console.log("JWT callback:", { token, account, profile });
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        
        const decoded = jwtDecode(account.access_token);  // Décoder le token JWT
        token.realmAccess = decoded.realm_access?.roles || [];
        token.resourceAccess = decoded.resource_access || {};
        token.profile = profile;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("Session callback:", { session, token });
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.realmAccess = token.realmAccess;
      session.resourceAccess = token.resourceAccess;
      session.token = token;
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      // console.log("Redirect callback", { url, baseUrl });
      return process.env.NEXTAUTH_URL;
    },

    async signIn(user, account, profile) {
      // console.log("SignIn callback:", { user, account, profile });
      return true;
    }, 
  },
};

export default NextAuth(authOptions);