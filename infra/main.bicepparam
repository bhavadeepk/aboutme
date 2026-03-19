// ─── Bicep Parameters – Azure Static Web App ──────────────────────────────────
// Reference: https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/parameter-files
//
// Usage:
//   az deployment group create \
//     --resource-group <rg> \
//     --template-file infra/main.bicep \
//     --parameters infra/main.bicepparam

using './main.bicep'

// ── Required ──────────────────────────────────────────────────────────────────
param staticWebAppName = 'swa-aboutme-portfolio'
param repositoryUrl    = 'https://github.com/bhavadeepk/aboutme'

// ── Optional overrides (defaults defined in main.bicep) ───────────────────────
param location         = 'eastus2'
param sku              = 'Free'
param repositoryBranch = 'main'

param tags = {
  project    : 'aboutme-portfolio'
  environment: 'production'
  managedBy  : 'bicep'
}
