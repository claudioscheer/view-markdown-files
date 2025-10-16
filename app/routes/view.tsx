import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Route } from "./+types/view";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { markdownDB } from "~/lib/db";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function meta({}: Route.MetaArgs) {
  return [{ title: "View - Markdown Viewer" }];
}

export default function View() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    async function loadFile() {
      if (id) {
        try {
          const file = await markdownDB.getById(id);
          if (file) {
            setContent(file.content);
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error("Failed to load file:", error);
          navigate("/");
        } finally {
          setIsLoading(false);
        }
      }
    }
    loadFile();
  }, [id, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsHeaderVisible(true);
      } 
      // Hide header when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div 
        className={`fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b z-10 safe-top transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-3 sm:py-4 max-w-4xl">
          <Button variant="ghost" onClick={() => navigate("/")} size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <div className={`container mx-auto px-4 pb-12 max-w-4xl transition-all duration-300 ${
        isHeaderVisible ? 'pt-16 sm:pt-20' : 'pt-4 sm:pt-6'
      }`}>
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-sm sm:prose-base">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}

