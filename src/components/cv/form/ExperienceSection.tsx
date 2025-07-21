"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CVContent } from "@/types/cv";

interface ExperienceSectionProps {
  formData: CVContent;
  validationErrors: Record<string, string>;
  onAddWorkExperience: () => void;
  onUpdateWorkExperience: (
    index: number,
    field: string,
    value: string | boolean
  ) => void;
  onRemoveWorkExperience: (index: number) => void;
}

export function ExperienceSection({
  formData,
  validationErrors,
  onAddWorkExperience,
  onUpdateWorkExperience,
  onRemoveWorkExperience,
}: ExperienceSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Work Experience
        </CardTitle>
        <Button type="button" onClick={onAddWorkExperience} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {formData.workExperience.map((exp, index) => (
          <Card
            key={index}
            className={cn("border-l-4 border-l-blue-500", {
              "border-l-red-500": Object.keys(validationErrors).some((key) =>
                key.startsWith(`workExperience[${index}]`)
              ),
            })}
          >
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold text-lg">
                  Experience #{index + 1}
                </h4>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => onRemoveWorkExperience(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name *</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) =>
                      onUpdateWorkExperience(index, "company", e.target.value)
                    }
                    placeholder="Company Name"
                    className={cn({
                      "border-red-500":
                        validationErrors[`workExperience[${index}].company`],
                    })}
                  />
                  {validationErrors[`workExperience[${index}].company`] && (
                    <p className="text-sm text-red-500">
                      {validationErrors[`workExperience[${index}].company`]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Position *</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) =>
                      onUpdateWorkExperience(index, "position", e.target.value)
                    }
                    placeholder="Job Title"
                    className={cn({
                      "border-red-500":
                        validationErrors[`workExperience[${index}].position`],
                    })}
                  />
                  {validationErrors[`workExperience[${index}].position`] && (
                    <p className="text-sm text-red-500">
                      {validationErrors[`workExperience[${index}].position`]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      onUpdateWorkExperience(index, "startDate", e.target.value)
                    }
                    className={cn({
                      "border-red-500":
                        validationErrors[`workExperience[${index}].startDate`],
                    })}
                  />
                  {validationErrors[`workExperience[${index}].startDate`] && (
                    <p className="text-sm text-red-500">
                      {validationErrors[`workExperience[${index}].startDate`]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>End Date {exp.current ? "" : "*"}</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) =>
                      onUpdateWorkExperience(index, "endDate", e.target.value)
                    }
                    disabled={exp.current}
                    className={cn({
                      "border-red-500":
                        validationErrors[`workExperience[${index}].endDate`],
                    })}
                  />
                  {validationErrors[`workExperience[${index}].endDate`] && (
                    <p className="text-sm text-red-500">
                      {validationErrors[`workExperience[${index}].endDate`]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Location *</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) =>
                      onUpdateWorkExperience(index, "location", e.target.value)
                    }
                    placeholder="City, State"
                    className={cn({
                      "border-red-500":
                        validationErrors[`workExperience[${index}].location`],
                    })}
                  />
                  {validationErrors[`workExperience[${index}].location`] && (
                    <p className="text-sm text-red-500">
                      {validationErrors[`workExperience[${index}].location`]}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id={`current-${index}`}
                    checked={exp.current}
                    onChange={(e) =>
                      onUpdateWorkExperience(index, "current", e.target.checked)
                    }
                    className="rounded"
                  />
                  <Label htmlFor={`current-${index}`}>
                    Currently working here
                  </Label>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label>Job Description *</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) =>
                    onUpdateWorkExperience(index, "description", e.target.value)
                  }
                  placeholder="Describe your responsibilities, achievements, and key contributions..."
                  className={cn("min-h-[100px]", {
                    "border-red-500":
                      validationErrors[`workExperience[${index}].description`],
                  })}
                />
                {validationErrors[`workExperience[${index}].description`] && (
                  <p className="text-sm text-red-500">
                    {validationErrors[`workExperience[${index}].description`]}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {formData.workExperience.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>
              No work experience added yet. Click "Add Experience" to get
              started.
            </p>
            {validationErrors["workExperience"] && (
              <p className="text-sm text-red-500 mt-2">
                {validationErrors["workExperience"]}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
