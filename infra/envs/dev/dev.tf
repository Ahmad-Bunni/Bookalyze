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
  source           = "../../main"
  project_name     = "bookalyze"
  environment_name = "dev"
  OPENAI_API_KEY   = var.OPENAI_API_KEY
  PINECONE_API_KEY = var.PINECONE_API_KEY
  PINECONE_INDEX   = var.PINECONE_INDEX
  PINECONE_ENV     = var.PINECONE_ENV
}
