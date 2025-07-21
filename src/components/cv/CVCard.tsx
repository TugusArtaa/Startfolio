import Link from "next/link";
import {
  FileText,
  Palette,
  Download,
  Trash2,
  MoreVertical,
  User,
  Calendar,
  Eye,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { CV } from "@/types/cv";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getTemplateIcon(template: string) {
  return template === "creative" ? (
    <Palette className="h-5 w-5" />
  ) : (
    <FileText className="h-5 w-5" />
  );
}

function getTemplateColor(template: string) {
  return template === "creative"
    ? "bg-gradient-to-br from-teal-500 to-emerald-500"
    : "bg-gradient-to-br from-emerald-500 to-teal-500";
}

export function CVCard({
  cv,
  onDelete,
}: {
  cv: CV;
  onDelete: (id: number) => void;
}) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg text-white ${getTemplateColor(
                cv.template
              )}`}
            >
              {getTemplateIcon(cv.template)}
            </div>
            <div>
              <CardTitle className="text-lg">
                {cv.template === "creative"
                  ? "Creative CV"
                  : "ATS Optimized CV"}
              </CardTitle>
              <CardDescription>
                {cv.content?.personalInfo?.name || "Untitled CV"}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/cv/${cv.id}/preview`}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={() => onDelete(cv.id)}
              >
                <Trash2 className="h-4 w-4 mr-2 text-red-600 focus:text-red-600" />
                Delete CV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          {cv.photo && (
            <div className="flex-shrink-0">
              <img
                src={cv.photo || "/placeholder.svg"}
                alt="CV Photo"
                className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
              />
            </div>
          )}
          <div className="flex-1 space-y-2">
            {cv.content?.personalInfo?.email && (
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                {cv.content.personalInfo.email}
              </div>
            )}
            {cv.content?.summary && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {cv.content.summary.substring(0, 100)}...
              </p>
            )}
          </div>
        </div>
        {cv.content?.skills?.technical &&
          cv.content.skills.technical.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {cv.content.skills.technical.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {cv.content.skills.technical.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{cv.content.skills.technical.length - 3} more
                </Badge>
              )}
            </div>
          )}
        <Separator />
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Created: {formatDate(cv.createdAt)}
            </div>
            <div>Updated: {formatDate(cv.updatedAt)}</div>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
            >
              <Link href={`/cv/${cv.id}/preview`}>
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Link>
            </Button>
            <Button asChild size="sm" className="flex-1">
              <Link href={`/cv/${cv.id}/edit`}>
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
