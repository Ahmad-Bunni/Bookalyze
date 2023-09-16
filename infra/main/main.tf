module "resource_groups" {
  source           = "../modules/resource-groups"
  project_name     = var.project_name
  environment_name = var.environment_name
}

module "container_registries" {
  source                  = "../modules/container-registries"
  project_name            = var.project_name
  environment_name        = var.environment_name
  resource_group_name     = module.resource_groups.resource_group_name
  resource_group_location = module.resource_groups.resource_group_location
}

module "github" {
  source                = "../modules/github"
  resource_group_name   = module.resource_groups.resource_group_name
  registry_login_server = module.container_registries.container_registry_server
  registry_username     = module.container_registries.container_registry_username
  registry_password     = module.container_registries.container_registry_password
}