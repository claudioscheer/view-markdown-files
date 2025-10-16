import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/new";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { markdownStorage } from "~/lib/markdown-storage";

export function meta({}: Route.MetaArgs) {
  return [{ title: "New File - Markdown Viewer" }];
}

export default function New() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      markdownStorage.add(title, content);
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

