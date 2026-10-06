import Layout from "@/components/common/Layout";
import Provider from "@/context";
import AIAssistantProvider from "@/components/ai/AIAssistantProvider";
import { Inter, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });

export default function App({ Component, pageProps }) {
  return (
    <div className={`${inter.variable} ${grotesk.variable}`}>
      <Provider>
        <ToastContainer autoClose={2000} theme="dark" />
        <AIAssistantProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AIAssistantProvider>
      </Provider>
    </div>
  );
}
