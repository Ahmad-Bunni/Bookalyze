resource "azurerm_resource_group" "bookalyze_rg" {
  name     = "${var.project_name}-${var.environment_name}-rg"
  location = local.resource_group_location
}

