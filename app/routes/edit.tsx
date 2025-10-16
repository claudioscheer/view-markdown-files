import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import type { Route } from "./+types/edit";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { markdownDB } from "~/lib/db";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Edit File - Markdown Viewer" }];
}

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadFile() {
      if (id) {
        try {
          const file = await markdownDB.getById(id);
          if (file) {
            setTitle(file.title);
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

  const handleSave = async () => {
    if (id && title.trim() && content.trim() && !isSaving) {
      setIsSaving(true);
      try {
        await markdownDB.update(id, title, content);
        navigate("/");
      } catch (error) {
        console.error("Failed to save file:", error);
        setIsSaving(false);
      }
    }
  };

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
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-10 safe-top">
        <div className="container mx-auto px-4 py-3 sm:py-4 max-w-4xl">
          <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={() => navigate("/")} size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} size="sm" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-4">
          <div>
            <Input
              placeholder="File title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg sm:text-xl font-semibold"
              autoFocus
            />
          </div>
          <div>
            <Textarea
              placeholder="Write your markdown content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[calc(100vh-16rem)] font-mono text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

