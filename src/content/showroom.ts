import { site } from "@/config/site";
import { getTemplate, templates, type Template } from "./templates";

export const showroom = {
  title: ["让想法，", "有自己的形状。"],
  introduction: "这里展出网站，也展出不同的表达方式。",
  featuredSlugs: ["depth", "cinema", "doodle", "editorial", "architecture", "music"],
  libraryHref: "/templates",
  motion: { duration: 0.72, textDuration: 0.46, textDelay: 0.15, stagger: 0.055, ease: "power3.out" },
  gesture: { intentDistance: 9, swipeDistance: 44, axisRatio: 1.2, resistance: 0.24, maxOffset: 64 },
};

export const featuredTemplates = showroom.featuredSlugs
  .map(getTemplate)
  .filter((template): template is Template => Boolean(template));

export const showroomCategories = site.categories
  .filter(category => category.id !== "all")
  .map(category => ({ ...category, count: templates.filter(template => template.category === category.id).length }));

export const showroomTemplateCount = templates.length;
