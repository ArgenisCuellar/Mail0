import { GmailListResponse, GmailMessage } from "./types";

const GOOGLE_API_URL = "https://www.googleapis.com";

export async function listGmailMessages(
  token: string,
  maxResults: number = 5,
  labels: string[] = ["INBOX"],
): Promise<GmailListResponse> {
  const urlParams = new URLSearchParams({
    maxResults: maxResults.toString(),
  });

  if (labels.length > 0) urlParams.append("labelIds", labels.join(","));

  const response = await fetch(
    `${GOOGLE_API_URL}/gmail/v1/users/me/messages` + "?" + urlParams.toString(),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return await response.json();
}

export async function getGmailMessage(token: string, messageId: string): Promise<GmailMessage> {
  const urlParams = new URLSearchParams({
    format: "full",
  });
  const response = await fetch(
    `${GOOGLE_API_URL}/gmail/v1/users/me/messages/${messageId}` + "?" + urlParams.toString(),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const message = await response.json();
  return message;
}

export async function getBatchGmailMessage(
  token: string,
  messageIds: string[],
): Promise<GmailMessage[] | []> {
  const batchGmailMessages = [];
  for (const messageId of messageIds) {
    console.log(`Getting message ${messageId}`);
    const message = await getGmailMessage(token, messageId);

    batchGmailMessages.push(message);
  }
  return batchGmailMessages;
}
