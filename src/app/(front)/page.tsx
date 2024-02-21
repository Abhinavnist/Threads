import { ThemeToggleBtn } from "@/components/common/ThemeToggleBtn";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import LeftSidebar from "@/components/base/LeftSidebar";


export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div className="container">
      {/* <ThemeToggleBtn/> */}
      <LeftSidebar/>
    </div>
  );
}
