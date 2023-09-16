output "container_registry_server" {
  value       = azurerm_container_registry.bookalyze-acr.login_server
  description = "The server of the api container registry"
  sensitive   = true
}

output "container_registry_username" {
  value       = azurerm_container_registry.bookalyze-acr.admin_username
  description = "The server of the api container registry"
  sensitive   = true
}


output "container_registry_password" {
  value       = azurerm_container_registry.bookalyze-acr.admin_password
  description = "The server of the api container registry"
  sensitive   = true
}
