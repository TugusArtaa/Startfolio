"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CVContent } from "@/types/cv";

interface EducationSectionProps {
  formData: CVContent;
  validationErrors: Record<string, string>;
  onAddEducation: () => void;
  onUpdateEducation: (index: number, field: string, value: string) => void;
  onRemoveEducation: (index: number) => void;
}

export function EducationSection({
  formData,
  validationErrors,
  onAddEducation,
  onUpdateEducation,
  onRemoveEducation,
}: EducationSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Education
        </CardTitle>
        <Button type="button" onClick={onAddEducation} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {formData.education.map((edu, index) => (
          <Card
            key={index}
            className={cn("border-l-4 border-l-green-500", {
              "border-l-red-500": Object.keys(validationErrors).some((key) =>
                key.startsWith(`education[${index}]`)
              ),
            })}
          >
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold text-lg">
                  Education #{index + 1}
                </h4>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => onRemoveEducation(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Institution *</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) =>
                      onUpdateEducation(index, "institution", e.target.value)
                    }
                    placeholder="University Name"
                    className={cn({
                      "border-red-500":
                        validationErrors[`education[${index}].institution`],
                    })}
                  />
                  {validationErrors[`education[${index}].institution`] && (
                    <p className="text-sm text-red-500">
                      {validationErrors[`education[${index}].institution`]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Degree *</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) =>
                      onUpdateEducation(index, "degree", e.target.value)
                    }
                    placeholder="Bachelor's, Master's, PhD, etc."
                    className={cn({
                      "border-red-500":
                        validationErrors[`education[${index}].degree`],
                    })}
                  />
                  {validationErrors[`education[${index}].degree`] && (
                    <p className="text-sm text-red-500">
                      {validationErrors[`education[${index}].degree`]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Field of Study *</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) =>
                      onUpdateEducation(index, "field", e.target.value)
                    }
                    placeholder="Computer Science, Business, etc."
                    className={cn({
                      "border-red-500":
                        validationErrors[`education[${index}].field`],
                    })}
                  />
                  {validationErrors[`education[${index}].field`] && (
                    <p className="text-sm text-red-500">
                      {validationErrors[`education[${index}].field`]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Location *</Label>
                  <Input
                    value={edu.location}
                    onChange={(e) =>
                      onUpdateEducation(index, "location", e.target.value)
                    }
                    placeholder="City, State"
                    className={cn({
                      "border-red-500":
                        validationErrors[`education[${index}].location`],
                    })}
                  />
                  {validationErrors[`education[${index}].location`] && (
                    <p className="text-sm text-red-500">
                      {validationErrors[`education[${index}].location`]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) =>
                      onUpdateEducation(index, "startDate", e.target.value)
                    }
                    className={cn({
                      "border-red-500":
                        validationErrors[`education[${index}].startDate`],
                    })}
                  />
                  {validationErrors[`education[${index}].startDate`] && (
                    <p className="text-sm text-red-500">
                      {validationErrors[`education[${index}].startDate`]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>End Date *</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) =>
                      onUpdateEducation(index, "endDate", e.target.value)
                    }
                    className={cn({
                      "border-red-500":
                        validationErrors[`education[${index}].endDate`],
                    })}
                  />
                  {validationErrors[`education[${index}].endDate`] && (
                    <p className="text-sm text-red-500">
                      {validationErrors[`education[${index}].endDate`]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>GPA (Optional)</Label>
                  <Input
                    value={edu.gpa || ""}
                    onChange={(e) =>
                      onUpdateEducation(index, "gpa", e.target.value)
                    }
                    placeholder="3.8/4.0"
                    className={cn({
                      "border-red-500":
                        validationErrors[`education[${index}].gpa`],
                    })}
                  />
                  {validationErrors[`education[${index}].gpa`] && (
                    <p className="text-sm text-red-500">
                      {validationErrors[`education[${index}].gpa`]}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {formData.education.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No education added yet. Click "Add Education" to get started.</p>
            {validationErrors["education"] && (
              <p className="text-sm text-red-500 mt-2">
                {validationErrors["education"]}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
