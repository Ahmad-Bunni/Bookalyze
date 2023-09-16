resource "github_actions_secret" "resource_group" {
  repository      = local.repository_name
  secret_name     = "RESOURCE_GROUP"
  plaintext_value = var.resource_group_name
}

resource "github_actions_secret" "registry_login_server" {
  repository      = local.repository_name
  secret_name     = "REGISTRY_LOGIN_SERVER"
  plaintext_value = var.registry_login_server
}

resource "github_actions_secret" "registry_username" {
  repository      = local.repository_name
  secret_name     = "REGISTRY_USERNAME"
  plaintext_value = var.registry_username
}

resource "github_actions_secret" "registry_password" {
  repository      = local.repository_name
  secret_name     = "REGISTRY_PASSWORD"
  plaintext_value = var.registry_password
}
