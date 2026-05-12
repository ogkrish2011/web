const configUrl = '/api/config';
const statusMessage = document.getElementById('dashboard-status');
const featureForm = document.getElementById('feature-form');
const toggles = document.querySelectorAll('.feature-toggle');

async function loadConfig() {
  try {
    const response = await fetch(configUrl);
    const config = await response.json();

    toggles.forEach(toggle => {
      toggle.checked = Boolean(config.features?.[toggle.name]);
    });

    document.getElementById('welcomeChannelId').value = config.welcomeChannelId || '';
    document.getElementById('farewellChannelId').value = config.farewellChannelId || '';
    document.getElementById('autoRoleId').value = config.autoRoleId || '';
    document.getElementById('logChannelId').value = config.logChannelId || '';
    document.getElementById('modRoleId').value = config.modRoleId || '';
    document.getElementById('autoRoleMessage').value = config.autoRoleMessage || '';
    statusMessage.textContent = 'Configuration loaded successfully.';
  } catch (error) {
    statusMessage.textContent = 'Unable to load configuration.';
    console.error(error);
  }
}

featureForm.addEventListener('submit', async event => {
  event.preventDefault();

  const payload = {
    features: {
      security: document.querySelector('input[name="security"]').checked,
      moderation: document.querySelector('input[name="moderation"]').checked,
      automation: document.querySelector('input[name="automation"]').checked,
      utility: document.querySelector('input[name="utility"]').checked,
      customization: document.querySelector('input[name="customization"]').checked,
      fun: document.querySelector('input[name="fun"]').checked
    },
    welcomeChannelId: document.getElementById('welcomeChannelId').value || null,
    farewellChannelId: document.getElementById('farewellChannelId').value || null,
    autoRoleId: document.getElementById('autoRoleId').value || null,
    logChannelId: document.getElementById('logChannelId').value || null,
    modRoleId: document.getElementById('modRoleId').value || null,
    autoRoleMessage: document.getElementById('autoRoleMessage').value || null
  };

  try {
    await fetch(configUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    statusMessage.textContent = 'Settings saved successfully.';
  } catch (error) {
    statusMessage.textContent = 'Failed to save settings.';
    console.error(error);
  }
});

loadConfig();
