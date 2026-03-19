// ─── Azure Static Web App – Infrastructure Definition ─────────────────────────
// Deploy with:
//   az deployment group create \
//     --resource-group <rg> \
//     --template-file infra/main.bicep \
//     --parameters infra/main.bicepparam

@description('Name of the Azure Static Web App resource.')
param staticWebAppName string

@description('Azure region to deploy the resource into.')
param location string = 'eastus2'

@description('Pricing tier. "Free" is sufficient for a personal portfolio.')
@allowed(['Free', 'Standard'])
param sku string = 'Free'

@description('The branch that triggers automatic deployments.')
param repositoryBranch string = 'main'

@description('Public URL of the GitHub repository (without trailing slash).')
param repositoryUrl string

@description('Resource tags applied to every resource in this deployment.')
param tags object = {
  project: 'aboutme-portfolio'
  managedBy: 'bicep'
}

// ─── Static Web App ───────────────────────────────────────────────────────────
resource staticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: staticWebAppName
  location: location
  tags: tags
  sku: {
    name: sku
    tier: sku
  }
  properties: {
    repositoryUrl: repositoryUrl
    branch: repositoryBranch
    buildProperties: {
      appLocation: '/'
      outputLocation: '/'
      skipGithubActionWorkflowGeneration: true  // we manage the workflow ourselves
    }
  }
}

// ─── Outputs ──────────────────────────────────────────────────────────────────
@description('The default hostname of the deployed Static Web App.')
output defaultHostname string = staticWebApp.properties.defaultHostname

@description('Resource ID of the Static Web App.')
output resourceId string = staticWebApp.id
