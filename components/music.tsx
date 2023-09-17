// import { WebPlayback, SetupPlayer } from "@/components/Spotify/WebPlayback";
// import { useEffect } from "react";
// import { useRouter } from "next/router";

// const redirectUri = "http://localhost:3001/music";

// const generateRandomString = () => {
//   return Math.floor(Math.random() * Date.now()).toString(36);
// };

// const authorise = async () => {
//   const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;

//   const state = generateRandomString();
//   const scope = "streaming user-read-private user-read-email";

//   const authQueryParams = new URLSearchParams({
//     response_type: "code",
//     client_id: spotifyClientId || "",
//     scope: scope,
//     redirect_uri: redirectUri,
//     state: state,
//   });

//   const response = await fetch(
//     "https://accounts.spotify.com/authorize/?" + authQueryParams.toString()
//   );

//   return response;
// };

// const authenticate = async () => {
//   const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
//   const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

//   const response = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${Buffer.from(
//         `${spotifyClientId}:${spotifyClientSecret}`
//       ).toString("base64")}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: new URLSearchParams({
//       grant_type: "client_credentials",
//       scope: "streaming user-read-email user-read-private",
//     }),
//   });

//   return await response.json();
// };

// const getAccessToken = async ({ code }) => {
//   const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
//   const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

//   const authQueryParams = new URLSearchParams({
//     code: code,
//     redirect_uri: redirectUri,
//     grant_type: "authorization_code",
//   });

//   const response = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${Buffer.from(
//         `${spotifyClientId}:${spotifyClientSecret}`
//       ).toString("base64")}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: authQueryParams,
//   });

//   return await response.json();
// };

// import Head from "next/head";
// import { GetServerSideProps } from "next";

// export default function Music({ accessToken }) {
//   console.log("music");
//   // const router = useRouter();
//   // useEffect(() => {
//   //   router?.replace("/music", undefined, { shallow: true });
//   // }, []);

//   console.log({ accessToken });

//   return (
//     <>
//       <Head>
//         <title>Music</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main
//         style={{
//           height: "100dvh",
//           background:
//             "linear-gradient(0deg, rgba(0,0,0,1) 1%, rgba(29,29,29,1) 50%, rgba(0,0,0,1) 99%)",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <h1 className="heading">Music. Vibes.</h1>

//         <div>
//           {/* <SetupPlayer accessToken={accessToken} /> */}
//           <iframe
//             style={{
//               borderRadius: "12px",
//               width: "50%",
//               height: "152px",
//               border: "0",
//             }}
//             src="https://open.spotify.com/embed/track/4DByEumlGTZKSzuVEZ35eo?utm_source=generator"
//             allowFullScreen={true}
//             allow="autoplay"
//             loading="lazy"
//           ></iframe>
//         </div>
//       </main>
//     </>
//   );
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { code } = context.query;

//   console.log("get server side called");

//   const url =
//     "localhost:3001/music?code=AQDMjY4AgWN4uh7xh24CFApr_Ti8Dky4kxKFKB9yfpRDoW24MDtNt0hzaAnNrRGUNZOIDNJZzmQ65M096-SSz7lW3dKlPHmCxUBv47X0nH8kZ-SBQ865cnMLlWA2rwACElMOcuhWNikYwzzpXjjSVC2HzFU8fCC953T6lhHVKvqjznIcfK2ywaE1_6jBRp-j__WSIfuvqgsiY_WMBYr11yUQ8qgk34HrEfcCTw_E&state=fidv4mrc";

//   if (!code) {
//     const authoriseUser = await authorise();
//     return {
//       redirect: {
//         destination: authoriseUser.url,
//         permanent: false,
//       },
//     };
//   }

//   const token = await getAccessToken({ code });
//   const accessToken = token.access_token;

//   //   const authentication = await authenticate();
//   //   console.log({ authentication });

//   return {
//     props: { accessToken },
//   };
// };
