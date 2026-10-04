import { useHashRoute } from "./hooks/useHashRoute";
import { EditionStrip, Footer, Masthead, Navigation } from "./components/Chrome";
import { AboutPage, ArticlePage } from "./pages/Article";
import { ComparePage, DecadePage, FrontPage } from "./pages/Pages";

export default function App() {
  const [route, navigate] = useHashRoute();

  return (
    <div className="min-h-screen flex flex-col">
      <Masthead navigate={navigate} />
      <EditionStrip />
      <Navigation current={route} navigate={navigate} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        {route.name === "front" && <FrontPage navigate={navigate} />}
        {route.name === "decade" && (
          <DecadePage decade={route.decade} navigate={navigate} />
        )}
        {route.name === "article" && (
          <ArticlePage id={route.id} navigate={navigate} />
        )}
        {route.name === "compare" && <ComparePage navigate={navigate} />}
        {route.name === "about" && <AboutPage />}
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}
