"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CVContent } from "@/types/cv";

interface AdditionalSectionProps {
  formData: CVContent;
  validationErrors: Record<string, string>;
  onAddCertification: () => void;
  onUpdateCertification: (index: number, field: string, value: string) => void;
  onRemoveCertification: (index: number) => void;
  onAchievementsChange: (value: string) => void;
}

export function AdditionalSection({
  formData,
  validationErrors,
  onAddCertification,
  onUpdateCertification,
  onRemoveCertification,
  onAchievementsChange,
}: AdditionalSectionProps) {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Certifications
          </CardTitle>
          <Button type="button" onClick={onAddCertification} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Certification
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.certifications.map((cert, index) => (
            <Card
              key={index}
              className={cn("border-l-4 border-l-yellow-500", {
                "border-l-red-500": Object.keys(validationErrors).some((key) =>
                  key.startsWith(`certifications[${index}]`)
                ),
              })}
            >
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-4">
                  <h5 className="font-medium">Certification #{index + 1}</h5>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => onRemoveCertification(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Certification Name *</Label>
                    <Input
                      value={cert.name}
                      onChange={(e) =>
                        onUpdateCertification(index, "name", e.target.value)
                      }
                      placeholder="AWS Solutions Architect"
                      className={cn({
                        "border-red-500":
                          validationErrors[`certifications[${index}].name`],
                      })}
                    />
                    {validationErrors[`certifications[${index}].name`] && (
                      <p className="text-sm text-red-500">
                        {validationErrors[`certifications[${index}].name`]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Issuing Organization *</Label>
                    <Input
                      value={cert.issuer}
                      onChange={(e) =>
                        onUpdateCertification(index, "issuer", e.target.value)
                      }
                      placeholder="Amazon Web Services"
                      className={cn({
                        "border-red-500":
                          validationErrors[`certifications[${index}].issuer`],
                      })}
                    />
                    {validationErrors[`certifications[${index}].issuer`] && (
                      <p className="text-sm text-red-500">
                        {validationErrors[`certifications[${index}].issuer`]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Issue Date *</Label>
                    <Input
                      type="month"
                      value={cert.date}
                      onChange={(e) =>
                        onUpdateCertification(index, "date", e.target.value)
                      }
                      className={cn({
                        "border-red-500":
                          validationErrors[`certifications[${index}].date`],
                      })}
                    />
                    {validationErrors[`certifications[${index}].date`] && (
                      <p className="text-sm text-red-500">
                        {validationErrors[`certifications[${index}].date`]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry Date (Optional)</Label>
                    <Input
                      type="month"
                      value={cert.expiryDate || ""}
                      onChange={(e) =>
                        onUpdateCertification(
                          index,
                          "expiryDate",
                          e.target.value
                        )
                      }
                      className={cn({
                        "border-red-500":
                          validationErrors[
                            `certifications[${index}].expiryDate`
                          ],
                      })}
                    />
                    {validationErrors[
                      `certifications[${index}].expiryDate`
                    ] && (
                      <p className="text-sm text-red-500">
                        {
                          validationErrors[
                            `certifications[${index}].expiryDate`
                          ]
                        }
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Credential ID (Optional)</Label>
                    <Input
                      value={cert.credentialId || ""}
                      onChange={(e) =>
                        onUpdateCertification(
                          index,
                          "credentialId",
                          e.target.value
                        )
                      }
                      placeholder="Credential ID or URL"
                      className={cn({
                        "border-red-500":
                          validationErrors[
                            `certifications[${index}].credentialId`
                          ],
                      })}
                    />
                    {validationErrors[
                      `certifications[${index}].credentialId`
                    ] && (
                      <p className="text-sm text-red-500">
                        {
                          validationErrors[
                            `certifications[${index}].credentialId`
                          ]
                        }
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {formData.certifications.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>
                No certifications added yet. Click "Add Certification" to get
                started.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements & Awards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Achievements (one per line)</Label>
            <Textarea
              value={formData.achievements.join("\n")}
              onChange={(e) => onAchievementsChange(e.target.value)}
              placeholder="Employee of the Year 2023&#10;Published research paper on Google&#10;Led team that increased revenue by 25%"
              className="min-h-[120px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
