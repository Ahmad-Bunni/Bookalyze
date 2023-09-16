output "resource_group_name" {
  value       = azurerm_resource_group.bookalyze_rg.name
  description = "The name of the resource group"
}

output "resource_group_location" {
  value       = azurerm_resource_group.bookalyze_rg.location
  description = "The name of resource group location"
}
