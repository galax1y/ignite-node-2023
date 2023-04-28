import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"

// Campos obrigatórios
interface QuestionProps {
  title: string
  content: string
  slug: Slug
  authorId: string
}

export class Question extends Entity<QuestionProps> {}
