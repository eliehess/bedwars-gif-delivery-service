import express from 'express';
import {
  InteractionType,
  InteractionResponseType
} from 'discord-interactions';
import { VerifyDiscordRequest } from './utils.js';
import {
  BED_COMMAND,
  KILLSTEAL_COMMAND,
  HasGuildCommands,
} from './commands.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name, options } = data;

    switch (name) {
      case 'bed':
        return handleBed(res, options);
      case 'killsteal':
        return handleKillsteal(res,);
      default:
        return handleDefault(res);
    } 
  }
});

const handleBed = (res, options) => {
  const gifFinder = val => {
    switch (val) {
      case 'blue':
        return 'https://imgur.com/a/Wufpb1w';
      case 'red':
        return 'https://imgur.com/a/tcEzGmi';
      case 'green':
        return 'https://imgur.com/a/CH56sbR';
      case 'yellow':
        return 'https://imgur.com/a/LT4a0dU';
      case 'pink':
        return 'https://imgur.com/a/2CG3U45';
      case 'poop':
      default:
        return 'https://imgur.com/a/MH4cGFm';
    }
  };

  if (!options) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: 'something went wrong with options :(',
      },
    });
  }

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: gifFinder(options[0].value),
    },
  });
};

const handleKillsteal = res => {
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: 'https://imgur.com/a/jtPmOnZ',
    },
  });
}

const handleDefault = res => {
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: 'I was called with an invalid option :(',
    },
  });
};

app.listen(PORT, () => {
  console.log('Listening on port', PORT);

  // Check if guild commands from commands.json are installed (if not, install them)
  HasGuildCommands(process.env.APP_ID, process.env.GUILD_ID, [
    BED_COMMAND,
  ]);
});