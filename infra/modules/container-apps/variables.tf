variable "project_name" {
  description = "Project name"
  type        = string
}

variable "environment_name" {
  description = "Environment name"
  type        = string
}

variable "resource_group_name" {
  description = "Resource group name"
  type        = string
}

variable "resource_group_location" {
  description = "Resource group location"
  type        = string
}

variable "registry_login_server" {
  description = "The server of the api container registry"
  sensitive   = true
}

variable "registry_username" {
  description = "The server of the api container registry"
  sensitive   = true
}


variable "registry_password" {
  description = "The server of the api container registry"
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

