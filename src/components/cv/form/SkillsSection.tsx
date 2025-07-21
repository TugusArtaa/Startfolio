"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CVContent } from "@/types/cv";

interface SkillsSectionProps {
  formData: CVContent;
  validationErrors: Record<string, string>;
  onAddSkill: (
    category: "technical" | "soft" | "languages",
    skill: string
  ) => void;
  onRemoveSkill: (
    category: "technical" | "soft" | "languages",
    index: number
  ) => void;
}

interface SkillInputProps {
  category: "technical" | "soft" | "languages";
  placeholder: string;
  formData: CVContent;
  validationErrors: Record<string, string>;
  onAddSkill: (
    category: "technical" | "soft" | "languages",
    skill: string
  ) => void;
  onRemoveSkill: (
    category: "technical" | "soft" | "languages",
    index: number
  ) => void;
}

function SkillInput({
  category,
  placeholder,
  formData,
  validationErrors,
  onAddSkill,
  onRemoveSkill,
}: SkillInputProps) {
  const [skillInput, setSkillInput] = useState("");
  const hasError = !!validationErrors[`skills.${category}`];

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAddSkill(category, skillInput);
      setSkillInput("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder={placeholder}
          onKeyPress={handleKeyPress}
          className={cn({ "border-red-500": hasError })}
        />
        <Button
          type="button"
          onClick={() => {
            onAddSkill(category, skillInput);
            setSkillInput("");
          }}
          size="sm"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {hasError && (
        <p className="text-sm text-red-500">
          {validationErrors[`skills.${category}`]}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {formData.skills[category].map((skill, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {skill}
            <button
              type="button"
              onClick={() => onRemoveSkill(category, index)}
              className="ml-1 hover:text-red-500"
            >
              ×
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection({
  formData,
  validationErrors,
  onAddSkill,
  onRemoveSkill,
}: SkillsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Skills & Competencies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Technical Skills *
            </Label>
            <SkillInput
              category="technical"
              placeholder="e.g., JavaScript, Python, React, AWS..."
              formData={formData}
              validationErrors={validationErrors}
              onAddSkill={onAddSkill}
              onRemoveSkill={onRemoveSkill}
            />
          </div>
          <Separator />
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Soft Skills *
            </Label>
            <SkillInput
              category="soft"
              placeholder="e.g., Leadership, Communication, Problem Solving..."
              formData={formData}
              validationErrors={validationErrors}
              onAddSkill={onAddSkill}
              onRemoveSkill={onRemoveSkill}
            />
          </div>
          <Separator />
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Languages *
            </Label>
            <SkillInput
              category="languages"
              placeholder="e.g., English (Native), Spanish (Fluent)..."
              formData={formData}
              validationErrors={validationErrors}
              onAddSkill={onAddSkill}
              onRemoveSkill={onRemoveSkill}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
