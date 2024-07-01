import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
const handler = NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  secret: "vxcvxvertwrwerwe",
  callbacks: {
    async jwt({ token, account, ...rest }, user, ...rest2) {
      //   console.log("token", token);
      //   console.log("account", account);
      //   console.log("user", user);
      //   console.log("rest", rest);
      // console.log(account, " jwt 1");
      // console.log(account?.provider, " jwt account");
      // console.log(user, " jwt 2");
      // console.log(rest, " jwt 4 ");
      // console.log(rest2, " jwt  5");
      if (account) {
        // console.log("account", account);
        // console.log("token", token);
        token = Object.assign({}, token, {
          access_token:
            account.provider === "google"
              ? account.id_token
              : account.access_token,
          provider: account.provider,
          jwt_token: account.access_token,
          refresh_token: account.refresh_token,
        });
      }
      return token;
    },
    async session({ session, token, ...rest }) {
      // user detail image name email
      // console.log(token, "token 2");
      // // user detail image name email
      // console.log(session, "session 3 ");
      // // empty
      // console.log(rest, "session 4 ");
      // if (session) {
      //   session = Object.assign({}, session, {
      //     access_token: token.access_token,
      //     provider: token.provider,
      //     jwt_token: token.jwt_token,
      //     refresh_token: token.refresh_token,
      //   });
      // }
      // return session;
    },
    async signIn({ account, ...rest }) {
      // console.log("is meeee 1", account);
      // console.log("is meeee 2", rest);
      try {
        // Send the access token to your backend
        // const response = await axios.post(
        //   "http://192.168.100.29:3000/api/v1/auth/google-callback",
        //   {
        //     token: account.access_token,
        //   }
        // );
        // console.log(response.data, "response");
        //   // Assuming your backend response contains relevant data
        //   const backendData = response.data;
        //   // Dispatch the action to store the backendData in the Redux store
        //   // store.dispatch(storeBackendData(backendData));
      } catch (error) {
        // Handle errors appropriately
        console.error("Error sending access token to backend:", error);
      }
      return true;
    },
  },
});
export { handler as GET, handler as POST };
