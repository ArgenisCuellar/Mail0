"use client";
import { accounts, type Mail as MailType } from "@/components/mail/data";
import { useQuery } from "@tanstack/react-query";

import { Mail } from "./mail";

export function MailWrapper({
  defaultLayout,
  defaultCollapsed,
}: {
  defaultLayout?: number[] | undefined;
  defaultCollapsed?: boolean;
}) {
  const { data, isLoading, isError } = useQuery<MailType[]>({
    queryKey: ["emails"],
    queryFn: async () => {
      const response = await fetch("/api/gmail");
      const emailsData = response.json();
      return emailsData;
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  console.log(data);
  return (
    <Mail
      accounts={accounts}
      mails={data || []}
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={4}
    />
  );
}
