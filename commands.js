import { DiscordRequest } from './utils.js';

export async function HasGuildCommands(appId, guildId, commands) {
  if (guildId === '' || appId === '') return;
  commands.forEach((c) => HasGuildCommand(appId, guildId, c));
}

// Checks for a command
async function HasGuildCommand(appId, guildId, command) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

  try {
    const res = await DiscordRequest(endpoint, { method: 'GET' });
    const data = await res.json();

    if (data) {
      const installedNames = data.map((c) => c['name']);
      // This is just matching on the name, so it's not good for updates
      if (!installedNames.includes(command['name'])) {
        console.log(`Installing "${command['name']}"`);
        InstallGuildCommand(appId, guildId, command);
      } else {
        console.log(`"${command['name']}" command already installed`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

// Installs a command
export async function InstallGuildCommand(appId, guildId, command) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
  // install command
  try {
    await DiscordRequest(endpoint, { method: 'POST', body: command });
  } catch (err) {
    console.error(err);
  }
}

export const BED_COMMAND = {
  name: 'bed',
  descripton: 'bedget',
  type: 1,
};

export const KILLSTEAL_COMMAND = {
  name: 'killsteal',
  descripton: 'killsteal',
  type: 1,
};

export const ANDREW_COMMAND = {
  name: 'andrew',
  descripton: 'andrew',
  type: 1,
};

export const ARJUN_COMMAND = {
  name: 'arjun',
  descripton: 'arjun',
  type: 1,
};

export const AUSTIN_COMMAND = {
  name: 'austin',
  descripton: 'austin',
  type: 1,
};

export const ELIE_COMMAND = {
  name: 'elie',
  descripton: 'elie',
  type: 1,
};

export const GARRETT_COMMAND = {
  name: 'garrett',
  descripton: 'garrett',
  type: 1,
};

export const REN_COMMAND = {
  name: 'ren',
  descripton: 'ren',
  type: 1,
};

export const SAYUJ_COMMAND = {
  name: 'sayuj',
  descripton: 'sayuj',
  type: 1,
};
