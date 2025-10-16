import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Route } from "./+types/view";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { markdownStorage } from "~/lib/markdown-storage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function meta({}: Route.MetaArgs) {
  return [{ title: "View - Markdown Viewer" }];
}

export default function View() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      const file = markdownStorage.getById(id);
      if (file) {
        setContent(file.content);
      } else {
        navigate("/");
      }
    }
  }, [id, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b z-10 safe-top">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <Button variant="ghost" onClick={() => navigate("/")} size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-16 sm:pt-20 pb-12 max-w-4xl">
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-sm sm:prose-base">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}

