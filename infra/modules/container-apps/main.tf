resource "azurerm_container_app_environment" "bookalyze-ac-env" {
  name                = "ac-${var.project_name}-${var.environment_name}-env"
  resource_group_name = var.resource_group_name
  location            = var.resource_group_location
}


resource "azurerm_container_app" "bookalyze-ac" {
  name                         = "ac-${var.project_name}-${var.environment_name}"
  container_app_environment_id = azurerm_container_app_environment.bookalyze-ac-env.id
  resource_group_name          = var.resource_group_name
  revision_mode                = "Single"

  ingress {
    allow_insecure_connections = false
    external_enabled           = true
    target_port                = 80
    traffic_weight {
      percentage = 100
    }
  }

  secret {
    name  = var.registry_username
    value = var.registry_password
  }

  registry {
    server               = var.registry_login_server
    username             = var.registry_username
    password_secret_name = var.registry_username
  }

  template {
    min_replicas = 1
    max_replicas = 2
    container {
      name   = "server"
      image  = "${var.registry_login_server}/bookalyze:latest"
      cpu    = 1
      memory = "2Gi"
    }
  }
}
