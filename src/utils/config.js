import fs from 'fs';
import path from 'path';

const configPath = path.resolve('src/data/config.json');
const defaultConfig = {
  features: {
    security: true,
    moderation: true,
    automation: true,
    utility: true,
    customization: true,
    fun: true
  },
  welcomeChannelId: null,
  farewellChannelId: null,
  autoRoleId: null,
  logChannelId: null,
  modRoleId: null,
  autoRoleMessage: null,
  serverPrefix: '!',
  lastUpdated: null
};

function ensureConfigFile() {
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), 'utf8');
  }
}

export function loadConfig() {
  ensureConfigFile();
  const file = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(file);
}

export function saveConfig(updatedConfig) {
  const baseConfig = loadConfig();
  const config = {
    ...baseConfig,
    ...updatedConfig,
    lastUpdated: new Date().toISOString()
  };
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
  return config;
}

export function isFeatureEnabled(feature) {
  const config = loadConfig();
  return !!config.features?.[feature];
}
