import React from "react";
import {
  List as ListIcon,
  Bold,
  AlignLeft,
  Link as LinkIcon,
  Smartphone,
  Zap,
} from "lucide-react";
import FeatureCard from "./feature-card";

export default function HighlightFeatures() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
      <FeatureCard
        icon={Bold}
        title="Text Formatting"
        description="Bold, italic, underline, strike, code, and more."
      />
      <FeatureCard
        icon={ListIcon}
        title="Lists"
        description="Bulleted, numbered, and checklist support."
      />
      <FeatureCard
        icon={AlignLeft}
        title="Alignment"
        description="Left, center, right, and justify."
      />
      <FeatureCard
        icon={LinkIcon}
        title="Link Support"
        description="Add and edit links with ease."
      />
      <FeatureCard
        icon={Smartphone}
        title="Mobile Mode"
        description="Optimized editing experience on mobile."
      />
      <FeatureCard
        icon={Zap}
        title="Easy Setup"
        description="Drop in and start building instantly."
      />
    </section>
  );
}
