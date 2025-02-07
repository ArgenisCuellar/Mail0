import type { Mail } from "@/components/mail/data";
import type { GmailMessage } from "./types";
// import { Buffer } from "buffer";

// const decode = (str: string): string => Buffer.from(str, "base64").toString("binary");

export function transformEmailData(data: GmailMessage): Mail {
  const from = data.payload.headers.find((header) => header.name === "From")?.value || "";
  const fromMatch = from.match(/^(.*?)\s*<([^>]*)>/) || [];
  const name = fromMatch[1]?.trim().replace(/^["']|["']$/g, "") || from;
  const email = fromMatch[2] || "";
  const read = data.labelIds.includes("UNREAD");

  console.log(data.payload.parts);

  const generic: Mail = {
    id: data.id,
    name: name,
    email: email,
    labels: data.labelIds,

    subject: data.payload.headers.find((header) => header.name === "Subject")?.value || "",
    date: data.payload.headers.find((header) => header.name === "Date")?.value || "",
    // text: decode(data.payload.parts![1].body.data!),
    text: data.snippet,
    read: !read,
  };
  return generic;
}

export function transformBatchEmailData(data: GmailMessage[]): Mail[] {
  return data.map(transformEmailData);
}
