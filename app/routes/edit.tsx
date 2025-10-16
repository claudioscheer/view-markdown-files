import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import type { Route } from "./+types/edit";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { markdownStorage } from "~/lib/markdown-storage";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Edit File - Markdown Viewer" }];
}

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      const file = markdownStorage.getById(id);
      if (file) {
        setTitle(file.title);
        setContent(file.content);
      } else {
        navigate("/");
      }
    }
  }, [id, navigate]);

  const handleSave = () => {
    if (id && title.trim() && content.trim()) {
      markdownStorage.update(id, title, content);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-10 safe-top">
        <div className="container mx-auto px-4 py-3 sm:py-4 max-w-4xl">
          <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={() => navigate("/")} size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} size="sm">
              Save
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

