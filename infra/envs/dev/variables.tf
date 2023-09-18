variable "github_pat" {
  description = "Github PAT"
  type        = string
  sensitive   = true
}

variable "OPENAI_API_KEY" {
  description = "OpenAI KEY"
  type        = string
  sensitive   = true
}

variable "PINECONE_API_KEY" {
  description = "Pinecone KEY"
  type        = string
  sensitive   = true
}

variable "PINECONE_ENV" {
  description = "Pinecone ENV"
  type        = string
  sensitive   = true
}

variable "PINECONE_INDEX" {
  description = "Pinecone Index"
  type        = string
  sensitive   = true
}

