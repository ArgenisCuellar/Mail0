import { cookies } from "next/headers";

import { MailWrapper } from "@/components/mail/mail-wrapper";

export default async function MailPage() {
  const cookieStore = await cookies();
  const layout = cookieStore.get("react-resizable-panels:layout:mail");
  const collapsed = cookieStore.get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <div className="w-full bg-white dark:bg-background">
      <div className="flex-col dark:text-gray-100 md:flex">
        <MailWrapper defaultLayout={defaultLayout} defaultCollapsed={defaultCollapsed} />
      </div>
    </div>
  );
}
