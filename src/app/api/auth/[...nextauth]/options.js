import CredentialsProvider from "next-auth/providers/credentials";
const Backend_URL = "https://apifinterview.thecbt.live/api/v1";

async function refreshToken(token) {
  const res = await fetch(Backend_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });
  console.log("refreshed");

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      // async authorize(credentials) {
      //   // console.log(credentials, "credentials");
      //   const user = {
      //     id: "42",
      //     username: "waliahmadfiles@gmail.com",
      //     password: "wali",
      //   };

      //   if (
      //     credentials?.username == user.username &&
      //     credentials?.password == user.password
      //   ) {
      //     return user;
      //   } else {
      //     return null;
      //   }
      // },
      async authorize(credentials, req) {
        // console.log(credentials, "credentials");
        // console.log(req, "req");
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await fetch(Backend_URL + "/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (
          res.status == 401 ||
          res.status === 400 ||
          res.status === 403 ||
          res.status === 500
        ) {
          return null;
        }

        // console.log(res, "res");
        const user = await res.json();
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  secret: "vxcvxvertwrwerwe",
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      // return token;
      // console.log(token, "token");
      // console.log("=============================");
      // console.log(user, "hgfd");
      // console.log(rest, "rest");
      // console.log(resrt, "rest");
      // return { ...token, ...user };

      // if (user) return { ...token, ...user };

      // if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      // return await refreshToken(token);
    },

    async session({ token, session }) {
      // console.log(session, "sesssinsnsn");
      // console.log(token, "token");
      // console.log(rest, "rest");
      // console.log(rest2, "rest2");
      // session.user = token.user;
      // session.backendTokens = token.backendTokens;
      // return token;

      session.user = token.user;
      // session.backendTokens = token.backendTokens;

      return session;
    },
  },
};
