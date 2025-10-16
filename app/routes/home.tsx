import { useNavigate } from "react-router";
import type { Route } from "./+types/home";
import { useMarkdownStorage } from "~/hooks/use-markdown-storage";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Plus, Trash2, Edit, Eye } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Markdown Viewer" },
    { name: "description", content: "Store and view markdown files" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const { files, deleteFile } = useMarkdownStorage();

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"?`)) {
      deleteFile(id);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-10 safe-top">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold">Markdown Files</h1>
            <Button size="sm" onClick={() => navigate("/new")}>
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">New File</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {files.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16">
              <p className="text-muted-foreground mb-4 text-center px-4">
                No markdown files yet. Create your first one!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3 sm:gap-4">
            {files.map((file) => (
              <Card key={file.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg sm:text-xl truncate">
                        {file.title}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Updated {formatDate(file.updatedAt)}
                      </CardDescription>
                    </div>
                    <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => navigate(`/view/${file.id}`)}
                        className="sm:size-9"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => navigate(`/edit/${file.id}`)}
                        className="sm:size-9"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleDelete(file.id, file.title)}
                        className="sm:size-9"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2 break-words">
                    {file.content.substring(0, 150)}...
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
