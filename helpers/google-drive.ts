const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
import { Auth } from "googleapis";

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: Auth.OAuth2Client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }

  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });

  if (client.credentials) {
    await saveCredentials(client);
  }

  return client;
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */

const getFolders = async (folderId: string, drive: any) => {
  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    pageSize: 50,
    fields: "*",
  });
  return response?.data?.files || [];
};

export async function getGallery(authClient: Auth.OAuth2Client) {
  const albumFolderId = "1pBrJIArgo1hAeV5lBpGCUioN5oQxOjDa";
  const drive = google.drive({ version: "v3", auth: authClient });

  const albumCovers = await getFolders(albumFolderId, drive);

  if (albumCovers.length === 0) {
    console.log("No album covers found.");
    return;
  }

  const albums = albumCovers.map((file: any) => ({
    imgPath: file.id,
    ...(file.description && { name: file.description }),
  }));

  return albums;
}

type TFolders = { id: string; name: string }[];

export async function getAlbum(
  authClient: Auth.OAuth2Client,
  folderName: string
) {
  const folderId = "13pCo-sN-A5EVKYkEFi6MquPJwUyGUCdY";
  const drive = google.drive({ version: "v3", auth: authClient });

  const folders = await getFolders(folderId, drive);

  const folda: Array<any> = [];

  folders.forEach(
    (file: any) =>
      file.mimeType.endsWith("folder") &&
      folda.push({ id: file.id, name: file.name })
  );

  const albumFolder = folda.find((folder) => folder.name === folderName);

  if (!albumFolder?.id) {
    return [];
  }

  const response = await drive.files.list({
    q: `'${albumFolder?.id}' in parents and trashed = false`,
    pageSize: 100,
    fields: "*",
  });

  const album = response.data.files;

  if (album.length === 0) {
    return [];
  }

  const albumImages = album.map((file: any) => ({
    imgPath: file.id,
    ...(file.description && { name: file.description }),
  }));

  return albumImages;
}
