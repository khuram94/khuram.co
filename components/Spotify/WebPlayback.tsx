// "use client";
// import React, { useState, useEffect } from "react";

// declare global {
//   interface Window {
//     onSpotifyWebPlaybackSDKReady: any;
//     Spotify: any;
//   }
// }

// export const WebPlayback = ({ player }) => {
//   const handlePause = () => {
//     console.log("triggered: ", { player });
//     console.log(JSON.stringify(player, null, 2));
//     if (player !== null) {
//       player
//         .togglePlay()
//         .then(() => {
//           console.log("Paused playback");
//         })
//         .catch((error) => {
//           console.error("Error pausing playback:", error);
//         });
//     }
//   };

//   console.log("playa: ", JSON.stringify(player, null, 2));

//   return (
//     <>
//       <div className="test">
//         <div className="main-wrapper">
//           <button onClick={() => handlePause()}>Play it ffs</button>
//           {/* <button id="togglePlay">play 2.0</button> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export const SetupPlayer = ({ accessToken }) => {
//   const [player, setPlayer] = useState<any>(undefined);

//   console.log("rendered");

//   useEffect(() => {
//     console.log("execute use effect");
//     const script = document.createElement("script");
//     script.src = "https://sdk.scdn.co/spotify-player.js";
//     script.async = true;

//     document.body.appendChild(script);

//     window.onSpotifyWebPlaybackSDKReady = () => {
//       const player = new window.Spotify.Player({
//         name: "Web Playback SDK",
//         getOAuthToken: (cb: any) => {
//           cb(accessToken);
//         },
//         volume: 0.5,
//       });

//       console.log("Player is: ", JSON.stringify(player, null, 2));

//       player.addListener("not_ready", ({ device_id }) => {
//         console.log("Device ID has gone offline", device_id);
//       });

//       player.addListener("ready", ({ device_id }) => {
//         console.log("lets go");
//         player.togglePlay();
//         setPlayer(player);
//       });

//       player.connect().then(() => console.log("connected"));
//     };
//   }, []);

//   console.log({ player });

//   // return <div></div>;

//   // player ? console.log("player is: ", { player }) : console.log("idk");

//   return player ? <WebPlayback player={player} /> : <div></div>;
// };
