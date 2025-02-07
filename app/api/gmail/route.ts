import { getBatchGmailMessage, listGmailMessages } from "@/server/gmail/queries";
import { transformBatchEmailData } from "@/server/gmail/transform";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const GOOGLE_ACCESS_TOKEN = "";
export async function GET(request: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const session = await auth.api.getSession({ headers: request.headers });
  //   console.log(session);

  const messagesObject = await listGmailMessages(GOOGLE_ACCESS_TOKEN);

  if (!messagesObject) {
    return NextResponse.json([]);
  }

  const messagesIds = messagesObject.messages?.map((message: { id: string }) => message.id);

  const messagesBatchDetails = await getBatchGmailMessage(GOOGLE_ACCESS_TOKEN, messagesIds);

  if (!messagesBatchDetails) {
    return NextResponse.json([]);
  }
  const parsedMessages = transformBatchEmailData(messagesBatchDetails);

  return NextResponse.json(parsedMessages);
}
