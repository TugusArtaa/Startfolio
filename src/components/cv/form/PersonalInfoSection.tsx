"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CVContent } from "@/types/cv";

interface PersonalInfoSectionProps {
  formData: CVContent;
  validationErrors: Record<string, string>;
  onPersonalInfoChange: (field: string, value: string) => void;
  onSummaryChange: (value: string) => void;
}

export function PersonalInfoSection({
  formData,
  validationErrors,
  onPersonalInfoChange,
  onSummaryChange,
}: PersonalInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.personalInfo.name}
              onChange={(e) => onPersonalInfoChange("name", e.target.value)}
              placeholder="Putu Agus"
              className={cn({
                "border-red-500": validationErrors["personalInfo.name"],
              })}
            />
            {validationErrors["personalInfo.name"] && (
              <p className="text-sm text-red-500">
                {validationErrors["personalInfo.name"]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.personalInfo.email}
              onChange={(e) => onPersonalInfoChange("email", e.target.value)}
              placeholder="tugus@example.com"
              className={cn({
                "border-red-500": validationErrors["personalInfo.email"],
              })}
            />
            {validationErrors["personalInfo.email"] && (
              <p className="text-sm text-red-500">
                {validationErrors["personalInfo.email"]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.personalInfo.phone}
              onChange={(e) => onPersonalInfoChange("phone", e.target.value)}
              placeholder="+62 812-3456-7890"
              className={cn({
                "border-red-500": validationErrors["personalInfo.phone"],
              })}
            />
            {validationErrors["personalInfo.phone"] && (
              <p className="text-sm text-red-500">
                {validationErrors["personalInfo.phone"]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              value={formData.personalInfo.address}
              onChange={(e) => onPersonalInfoChange("address", e.target.value)}
              placeholder="City, State, Country"
              className={cn({
                "border-red-500": validationErrors["personalInfo.address"],
              })}
            />
            {validationErrors["personalInfo.address"] && (
              <p className="text-sm text-red-500">
                {validationErrors["personalInfo.address"]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              value={formData.personalInfo.linkedin}
              onChange={(e) => onPersonalInfoChange("linkedin", e.target.value)}
              placeholder="https://www.linkedin.com/in/iputuagusseniartawan/"
              className={cn({
                "border-red-500": validationErrors["personalInfo.linkedin"],
              })}
            />
            {validationErrors["personalInfo.linkedin"] && (
              <p className="text-sm text-red-500">
                {validationErrors["personalInfo.linkedin"]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website/Portfolio</Label>
            <Input
              id="website"
              value={formData.personalInfo.website}
              onChange={(e) => onPersonalInfoChange("website", e.target.value)}
              placeholder="https://portofolio-web-tugus.vercel.app/"
              className={cn({
                "border-red-500": validationErrors["personalInfo.website"],
              })}
            />
            {validationErrors["personalInfo.website"] && (
              <p className="text-sm text-red-500">
                {validationErrors["personalInfo.website"]}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub Profile</Label>
          <Input
            id="github"
            value={formData.personalInfo.github}
            onChange={(e) => onPersonalInfoChange("github", e.target.value)}
            placeholder="https://github.com/TugusArtaa"
            className={cn({
              "border-red-500": validationErrors["personalInfo.github"],
            })}
          />
          {validationErrors["personalInfo.github"] && (
            <p className="text-sm text-red-500">
              {validationErrors["personalInfo.github"]}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary *</Label>
          <Textarea
            id="summary"
            value={formData.summary}
            onChange={(e) => onSummaryChange(e.target.value)}
            placeholder="Write a compelling professional summary that highlights your key achievements and career objectives..."
            className={cn("min-h-[120px]", {
              "border-red-500": validationErrors["summary"],
            })}
          />
          {validationErrors["summary"] && (
            <p className="text-sm text-red-500">
              {validationErrors["summary"]}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
