"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CVContent } from "@/types/cv";

interface ProjectsSectionProps {
  formData: CVContent;
  validationErrors: Record<string, string>;
  onAddProject: () => void;
  onUpdateProject: (
    index: number,
    field: string,
    value: string | string[]
  ) => void;
  onRemoveProject: (index: number) => void;
}

export function ProjectsSection({
  formData,
  validationErrors,
  onAddProject,
  onUpdateProject,
  onRemoveProject,
}: ProjectsSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Projects & Portfolio
        </CardTitle>
        <Button type="button" onClick={onAddProject} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {formData.projects.map((project, index) => (
          <Card
            key={index}
            className={cn("border-l-4 border-l-purple-500", {
              "border-l-red-500": Object.keys(validationErrors).some((key) =>
                key.startsWith(`projects[${index}]`)
              ),
            })}
          >
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold text-lg">Project #{index + 1}</h4>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => onRemoveProject(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Name *</Label>
                  <Input
                    value={project.name}
                    onChange={(e) =>
                      onUpdateProject(index, "name", e.target.value)
                    }
                    placeholder="Project Name"
                    className={cn({
                      "border-red-500":
                        validationErrors[`projects[${index}].name`],
                    })}
                  />
                  {validationErrors[`projects[${index}].name`] && (
                    <p className="text-sm text-red-500">
                      {validationErrors[`projects[${index}].name`]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Project URL (Optional)</Label>
                  <Input
                    value={project.url || ""}
                    onChange={(e) =>
                      onUpdateProject(index, "url", e.target.value)
                    }
                    placeholder="https://project-demo.com"
                    className={cn({
                      "border-red-500":
                        validationErrors[`projects[${index}].url`],
                    })}
                  />
                  {validationErrors[`projects[${index}].url`] && (
                    <p className="text-sm text-red-500">
                      {validationErrors[`projects[${index}].url`]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="month"
                    value={project.startDate}
                    onChange={(e) =>
                      onUpdateProject(index, "startDate", e.target.value)
                    }
                    className={cn({
                      "border-red-500":
                        validationErrors[`projects[${index}].startDate`],
                    })}
                  />
                  {validationErrors[`projects[${index}].startDate`] && (
                    <p className="text-sm text-red-500">
                      {validationErrors[`projects[${index}].startDate`]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>End Date *</Label>
                  <Input
                    type="month"
                    value={project.endDate}
                    onChange={(e) =>
                      onUpdateProject(index, "endDate", e.target.value)
                    }
                    className={cn({
                      "border-red-500":
                        validationErrors[`projects[${index}].endDate`],
                    })}
                  />
                  {validationErrors[`projects[${index}].endDate`] && (
                    <p className="text-sm text-red-500">
                      {validationErrors[`projects[${index}].endDate`]}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label>Technologies Used * (comma-separated)</Label>
                <Input
                  value={project.technologies.join(", ")}
                  onChange={(e) =>
                    onUpdateProject(
                      index,
                      "technologies",
                      e.target.value.split(",").map((t) => t.trim())
                    )
                  }
                  placeholder="React, Node.js, MongoDB, AWS..."
                  className={cn({
                    "border-red-500":
                      validationErrors[`projects[${index}].technologies`],
                  })}
                />
                {validationErrors[`projects[${index}].technologies`] && (
                  <p className="text-sm text-red-500">
                    {validationErrors[`projects[${index}].technologies`]}
                  </p>
                )}
              </div>
              <div className="space-y-2 mt-4">
                <Label>Project Description *</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) =>
                    onUpdateProject(index, "description", e.target.value)
                  }
                  placeholder="Describe the project, your role, challenges overcome, and results achieved..."
                  className={cn("min-h-[100px]", {
                    "border-red-500":
                      validationErrors[`projects[${index}].description`],
                  })}
                />
                {validationErrors[`projects[${index}].description`] && (
                  <p className="text-sm text-red-500">
                    {validationErrors[`projects[${index}].description`]}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {formData.projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>
              No projects added yet. Click "Add Project" to showcase your work.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
