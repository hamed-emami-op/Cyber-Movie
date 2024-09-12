import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/header/footer/Footer";
import { Toaster } from "react-hot-toast";
// import Main from "./components/main/Main";

export function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
