#!/usr/bin/env node

/**
 * Utility script to help manage metadata configuration
 * Usage: node scripts/update-metadata.js
 */

const fs = require('fs')
const path = require('path')

const metadataFile = path.join(__dirname, '../lib/metadata.ts')

function readMetadataFile() {
  try {
    const content = fs.readFileSync(metadataFile, 'utf8')
    return content
  } catch (error) {
    console.error('Error reading metadata file:', error.message)
    return null
  }
}

function addNewRoute(route, metadata) {
  const content = readMetadataFile()
  if (!content) return

  // Find the routeMetadataMap object
  const mapStart = content.indexOf(
    'export const routeMetadataMap: Record<string, RouteMetadata> = {'
  )
  if (mapStart === -1) {
    console.error('Could not find routeMetadataMap in file')
    return
  }

  // Find the closing brace of the object
  let braceCount = 0
  let mapEnd = mapStart
  for (let i = mapStart; i < content.length; i++) {
    if (content[i] === '{') braceCount++
    if (content[i] === '}') {
      braceCount--
      if (braceCount === 0) {
        mapEnd = i
        break
      }
    }
  }

  // Create the new route entry
  const newRoute = `  '${route}': {
    title: '${metadata.title || 'Page Title'}',
    description: '${metadata.description || 'Page description'}',
    keywords: [${(metadata.keywords || ['page'])
      .map((k) => `'${k}'`)
      .join(', ')}],
    openGraph: {
      title: '${metadata.openGraph?.title || metadata.title || 'Page Title'}',
      description: '${
        metadata.openGraph?.description ||
        metadata.description ||
        'Page description'
      }',
      type: '${metadata.openGraph?.type || 'website'}',
    },
  },`

  // Insert the new route before the closing brace
  const newContent =
    content.slice(0, mapEnd) + '\n' + newRoute + '\n' + content.slice(mapEnd)

  try {
    fs.writeFileSync(metadataFile, newContent, 'utf8')
    console.log(`✅ Successfully added route: ${route}`)
  } catch (error) {
    console.error('Error writing to metadata file:', error.message)
  }
}

function listRoutes() {
  const content = readMetadataFile()
  if (!content) return

  // Extract route names using regex
  const routeRegex = /'([^']+)':\s*{/g
  const routes = []
  let match

  while ((match = routeRegex.exec(content)) !== null) {
    routes.push(match[1])
  }

  console.log('\n📋 Available routes:')
  routes.forEach((route) => {
    console.log(`  - ${route}`)
  })
  console.log('')
}

function showHelp() {
  console.log(`
🔧 Metadata Management Script

Usage:
  node scripts/update-metadata.js [command] [options]

Commands:
  list                    List all available routes
  add <route> <title>     Add a new route with basic metadata
  help                    Show this help message

Examples:
  node scripts/update-metadata.js list
  node scripts/update-metadata.js add "/dashboard/analytics" "Analytics Dashboard"
  node scripts/update-metadata.js add "/about" "About Us"

Note: After adding a route, you'll need to create the corresponding layout file manually.
`)
}

// Main script logic
const command = process.argv[2]

switch (command) {
  case 'list':
    listRoutes()
    break

  case 'add':
    const route = process.argv[3]
    const title = process.argv[4]

    if (!route || !title) {
      console.error('❌ Please provide both route and title')
      console.error(
        'Usage: node scripts/update-metadata.js add <route> <title>'
      )
      process.exit(1)
    }

    const metadata = {
      title: title,
      description: `${title} - Admin Dashboard`,
      keywords: [
        title.toLowerCase().replace(/\s+/g, '-'),
        'admin',
        'dashboard',
      ],
      openGraph: {
        title: `${title} - Admin Dashboard`,
        description: `${title} - Admin Dashboard`,
        type: 'website',
      },
    }

    addNewRoute(route, metadata)
    break

  case 'help':
  default:
    showHelp()
    break
}
