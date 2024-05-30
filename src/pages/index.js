
import { Inter } from "next/font/google";
import About from "@/components/AboutSection";
import Login from "@/components/Login";
import SignUp from "@/components/Signup";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <About/>
    <Login />
    <SignUp/>
    </>
  );
}
