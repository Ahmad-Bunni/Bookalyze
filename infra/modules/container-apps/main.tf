resource "azurerm_container_app_environment" "bookalyze-ac-env" {
  name                = "ac-${var.project_name}-${var.environment_name}-env"
  resource_group_name = var.resource_group_name
  location            = var.resource_group_location
}


resource "azurerm_container_app" "bookalyze-ac-be" {
  name                         = "ac-${var.project_name}-${var.environment_name}-be"
  container_app_environment_id = azurerm_container_app_environment.bookalyze-ac-env.id
  resource_group_name          = var.resource_group_name
  revision_mode                = "Single"

  ingress {
    allow_insecure_connections = false
    external_enabled           = false
    target_port                = 5000
    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }

  secret {
    name  = var.registry_username
    value = var.registry_password
  }

  secret {
    name  = "pineconekey"
    value = var.PINECONE_API_KEY
  }

  secret {
    name  = "openaikey"
    value = var.OPENAI_API_KEY
  }

  registry {
    server               = var.registry_login_server
    username             = var.registry_username
    password_secret_name = var.registry_username
  }

  template {
    min_replicas = 0
    max_replicas = 1
    container {
      name   = "server"
      image  = "${var.registry_login_server}/bookalyze-be:latest"
      cpu    = 2
      memory = "4Gi"

      env {
        name  = "PINECONE_ENV"
        value = var.PINECONE_ENV
      }

      env {
        name  = "PINECONE_INDEX"
        value = var.PINECONE_INDEX
      }

      env {
        name        = "PINECONE_API_KEY"
        secret_name = "pineconekey"
      }

      env {
        name        = "OPENAI_API_KEY"
        secret_name = "openaikey"
      }
    }
  }
}


resource "azurerm_container_app" "bookalyze-ac-fe" {
  name                         = "ac-${var.project_name}-${var.environment_name}-fe"
  container_app_environment_id = azurerm_container_app_environment.bookalyze-ac-env.id
  resource_group_name          = var.resource_group_name
  revision_mode                = "Single"

  ingress {
    allow_insecure_connections = false
    external_enabled           = true
    target_port                = 3000
    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }

  secret {
    name  = var.registry_username
    value = var.registry_password
  }

  secret {
    name  = "nextauthsecret"
    value = var.NEXTAUTH_SECRET
  }

  secret {
    name  = "googleoauthsecret"
    value = var.GOOGLE_CLIENT_SECRET
  }


  registry {
    server               = var.registry_login_server
    username             = var.registry_username
    password_secret_name = var.registry_username
  }

  template {
    min_replicas = 0
    max_replicas = 1
    container {
      name   = "client"
      image  = "${var.registry_login_server}/bookalyze-fe:latest"
      cpu    = 0.25
      memory = "0.5Gi"

      env {
        name        = "GOOGLE_CLIENT_SECRET"
        secret_name = "googleoauthsecret"
      }

      env {
        name        = "NEXTAUTH_SECRET"
        secret_name = "nextauthsecret"
      }

      env {
        name  = "GOOGLE_CLIENT_ID"
        value = var.GOOGLE_CLIENT_ID
      }

      env {
        name  = "NEXTAUTH_URL"
        value = var.NEXTAUTH_URL
      }

      env {
        name  = "API_BASE_URL"
        value = "https://${azurerm_container_app.bookalyze-ac-be.ingress[0].fqdn}/api"
      }
    }
  }
}
