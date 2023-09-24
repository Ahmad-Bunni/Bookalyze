terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.71.0"
    }
  }
  backend "azurerm" {
    resource_group_name  = "tfstate-rg"
    storage_account_name = "tfstrgaccstate"
    container_name       = "bookalyzetfstate"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

provider "github" {
  token = var.github_pat
}

module "main" {
  source               = "../../main"
  project_name         = "bookalyze"
  environment_name     = "dev"
  NEXTAUTH_URL         = "https://bookalyze.com"
  GOOGLE_CLIENT_ID     = var.GOOGLE_CLIENT_ID
  GOOGLE_CLIENT_SECRET = var.GOOGLE_CLIENT_SECRET
  NEXTAUTH_SECRET      = var.NEXTAUTH_SECRET
  OPENAI_API_KEY       = var.OPENAI_API_KEY
  PINECONE_API_KEY     = var.PINECONE_API_KEY
  PINECONE_INDEX       = var.PINECONE_INDEX
  PINECONE_ENV         = var.PINECONE_ENV
}
