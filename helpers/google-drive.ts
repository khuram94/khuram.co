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

type FileType = {
  name: string;
  id: string;
};

const folderId = "13pCo-sN-A5EVKYkEFi6MquPJwUyGUCdY";

export async function getAlbumCovers(authClient: Auth.OAuth2Client) {
  const albumFolderId = "1pBrJIArgo1hAeV5lBpGCUioN5oQxOjDa";

  const drive = google.drive({ version: "v3", auth: authClient });
  const response = await drive.files.list({
    q: `'${albumFolderId}' in parents and trashed = false`,
    pageSize: 50,
    fields: "*",
  });

  const albumCovers = response.data.files;

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

export async function getImageUrls(authClient: Auth.OAuth2Client) {
  const drive = google.drive({ version: "v3", auth: authClient });
  const res = await drive.files
    .list({
      q: `'${folderId}' in parents and trashed = false`,
      pageSize: 50,
      fields: "nextPageToken, files(id, name, webViewLink, mimeType)",
    })
    .then(async (response: any) => {
      const folders: any = [];
      response.data.files.forEach(
        (file: any) =>
          file.mimeType.endsWith("folder") &&
          folders.push({ id: file.id, name: file.name })
      );
      return folders;
    });

  const pictures = await drive.files.list({
    q: res.map((folder: any) => `'${folder.id}' in parents`).join(" or "),
    pageSize: 50,
    fields: "*",
  });

  const test = pictures.data.files;

  if (test.length === 0) {
    console.log("No files found.");
    return;
  }

  const imageIds = test.map((file: FileType) => file.id);

  const albums = res.map((folder: any, i: number) => {
    const index = i * 3;
    return {
      albumName: folder.name,
      images: [imageIds[index], imageIds[index + 1], imageIds[index + 2]],
    };
  });

  return imageIds;
}
