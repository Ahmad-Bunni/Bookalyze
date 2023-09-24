variable "project_name" {
  description = "Project name"
  type        = string
}

variable "environment_name" {
  description = "Environment name"
  type        = string
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

variable "GOOGLE_CLIENT_ID" {
  description = "Google OAuth ID"
  type        = string
  sensitive   = false
}

variable "GOOGLE_CLIENT_SECRET" {
  description = "Google OAuth Secret"
  type        = string
  sensitive   = true
}

variable "NEXTAUTH_SECRET" {
  description = "Next Auth Secret"
  type        = string
  sensitive   = true
}

variable "NEXTAUTH_URL" {
  description = "Next Auth URL"
  type        = string
}

