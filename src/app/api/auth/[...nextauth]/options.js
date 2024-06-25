import CredentialsProvider from "next-auth/providers/credentials";

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
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const res = await fetch(Backend_URL + "/auth/login", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status == 401) {
          console.log(res.statusText);

          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      // if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      // return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
};
