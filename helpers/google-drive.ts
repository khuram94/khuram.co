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
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.js");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    console.log("hello");
    const content = await fs.readFile(TOKEN_PATH);
    console.log({ content });
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    console.log({ err });
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
    console.log("have client");
    return client;
  }
  console.log("ok");
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  console.log("set client");
  if (client.credentials) {
    console.log("client credentials");
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

export async function getImageUrls(authClient: Auth.OAuth2Client) {
  const drive = google.drive({ version: "v3", auth: authClient });
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    pageSize: 10,
    fields: "nextPageToken, files(id, name, webViewLink)",
  });
  const files = res.data.files;
  if (files.length === 0) {
    console.log("No files found.");
    return;
  }

  const imageIds = files.map((file: FileType) => file.id);
  return imageIds;
}
