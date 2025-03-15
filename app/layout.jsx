import '@/assets/styles/global.css'
import NavBar from "@/components/navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";
import { GlobalProvider } from "@/context/GlobalContext";
export const metadata = {
  title: "Property Pulse",
  keywords: "rental, property, real estate",
  description: "Find the perfect rental property",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html>
          <body>
            <main>
              <NavBar />
              {children}
              <Footer />
              <ToastContainer />
            </main>
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};
 
export default MainLayout;