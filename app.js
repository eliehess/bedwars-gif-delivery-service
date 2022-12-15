import express from 'express';
import {
  InteractionType,
  InteractionResponseType
} from 'discord-interactions';
import { VerifyDiscordRequest } from './utils.js';
import {
  HasGuildCommands,
  BED_COMMAND,
  KILLSTEAL_COMMAND,
  ANDREW_COMMAND,
  ARJUN_COMMAND,
  AUSTIN_COMMAND,
  ELIE_COMMAND,
  GARRETT_COMMAND,
  REN_COMMAND,
  SAYUJ_COMMAND,
} from './commands.js';

const gifs = {
  ANDREW: 'https://imgur.com/a/nXDzYQS',
  ANDREW_ANSWER: 'https://imgur.com/a/X0du2by',
  ANDREW_BALL: 'https://imgur.com/a/o6iDkc8',
  ANDREW_IGNORE: 'https://imgur.com/a/0i2vhki',
  ANDREW_JUICE: 'https://imgur.com/a/55JeHRp',
  ANDREW_POOL: 'https://imgur.com/a/3EVvtYz',
  ARJUN_POWERS: 'https://imgur.com/a/GFO4tn9',
  AUSTIN_AVOID: 'https://imgur.com/9qhzBQz',
  AUSTIN_PISS: 'https://imgur.com/oHOlbOD',
  AUSTIN_THINK: 'https://imgur.com/NqiA6Da',
  BLUE_BED: 'https://imgur.com/a/Wufpb1w',
  ELIE_EXPLODE: 'https://imgur.com/a/J8UCmrs',
  ELIE_ICECREAM: 'https://imgur.com/a/A823bBo',
  GARRETT_BEDWARZ: 'https://imgur.com/a/ocQttGL',
  GREEN_BED: 'https://imgur.com/a/CH56sbR',
  KILLSTEAL: 'https://imgur.com/a/jtPmOnZ',
  PINK_APPLE: 'https://imgur.com/a/2CG3U45',
  POOP_BED: 'https://imgur.com/a/MH4cGFm',
  RED_BED: 'https://imgur.com/a/tcEzGmi',
  REN_ANIME: 'https://imgur.com/a/eOWeZEp',
  REN_EGG: 'https://media.giphy.com/media/y7Ee4XQFLA3ZpijcUU/giphy.gif',
  REN_MOMENT: 'https://imgur.com/a/m4fHG58',
  SAYUJ_DEEPFRIED: 'https://imgur.com/a/TGxt4uD',
  SAYUJ_CONSPIRACY: 'https://imgur.com/a/WMHoThO',
  SAYUJ_FIREBALL: 'https://imgur.com/YAD8uEh',
  SAYUJ_MICROWAVE: 'https://imgur.com/a/6BQWJj2',
  YELLOW_BED: 'https://imgur.com/a/LT4a0dU',
}

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
        return handleKillsteal(res);
      case 'andrew':
        return handleAndrew(res, options);
      case 'arjun':
        return handleArjun(res, options);
      case 'austin':
        return handleAustin(res, options);
      case 'elie':
        return handleElie(res, options);
      case 'garrett':
        return handleGarrett(res, options);
      case 'ren':
        return handleRen(res, options);
      case 'sayuj':
        return handleSayuj(res, options);
      default:
        return handleDefault(res);
    } 
  }
});

const handleBed = (res, options) => {
  const gifFinder = val => {
    if (val && val[0] && val[0].value) {
      switch (val[0].value.toLowerCase()) {
        case 'blue':
          return gifs.BLUE_BED;
        case 'red':
          return gifs.RED_BED;
        case 'green':
          return gifs.GREEN_BED;
        case 'yellow':
          return gifs.YELLOW_BED;
        case 'pink':
          return gifs.PINK_APPLE;
        case 'poop':
          return gifs.POOP_BED;
      }
    }
    return gifs.BLUE_BED;
  };

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: gifFinder(options),
    },
  });
};

const handleKillsteal = res => {
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: gifs.KILLSTEAL,
    },
  });
};

const handleAndrew = (res, options) => {
  const gifFinder = val => {
    if (val && val[0] && val[0].value) {
      switch (val[0].value.toLowerCase()) {
        case 'answer':
          return gifs.ANDREW_ANSWER;
        case 'ball':
          return gifs.ANDREW_BALL;
        case 'juice':
          return gifs.ANDREW_JUICE;
        case 'ignore':
          return gifs.ANDREW_IGNORE;
        case 'pool':
          return gifs.ANDREW_POOL;
      }
    }
    return gifs.ANDREW;
  };

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: gifFinder(options),
    },
  });
};

const handleArjun = (res, options) => {
  const gifFinder = val => {
    if (val && val[0] && val[0].value) {
      switch (val[0].value.toLowerCase()) {
        case 'powers':
          return gifs.ARJUN_POWERS;
      }
    }
    return gifs.ARJUN_POWERS;
  };

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: gifFinder(options),
    },
  });
};

const handleAustin = (res, options) => {
  const gifFinder = val => {
    if (val && val[0] && val[0].value) {
      switch (val[0].value.toLowerCase()) {
        case 'avoid':
          return gifs.AUSTIN_AVOID;
        case 'piss':
          return gifs.AUSTIN_PISS;
        case 'think':
          return gifs.AUSTIN_THINK;
      }
    }
    return gifs.AUSTIN_PISS;
  };

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: gifFinder(options),
    },
  });
};

const handleElie = (res, options) => {
  const gifFinder = val => {
    if (val && val[0] && val[0].value) {
      switch (val[0].value.toLowerCase()) {
        case 'ball':
          return gifs.ANDREW_BALL;
        case 'explode':
          return gifs.ELIE_EXPLODE;
        case 'icecream':
          return gifs.ELIE_ICECREAM
      }
    }
    return gifs.ELIE_EXPLODE;
  };

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: gifFinder(options),
    },
  });
};

const handleGarrett = (res, options) => {
  const gifFinder = val => {
    if (val && val[0] && val[0].value) {
      switch (val[0].value.toLowerCase()) {
        case 'bedwarz':
          return gifs.GARRETT_BEDWARZ;
      }
    }
    return gifs.GARRETT_BEDWARZ;
  };

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: gifFinder(options),
    },
  });
};

const handleRen = (res, options) => {
  const gifFinder = val => {
    if (val && val[0] && val[0].value) {
      switch (val[0].value.toLowerCase()) {
        case 'anime':
          return gifs.REN_ANIME;
        case 'egg':
          return gifs.REN_EGG;
        case 'moment':
          return gifs.REN_MOMENT;
      }
    }
    return gifs.REN_MOMENT;
  };

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: gifFinder(options),
    },
  });
};

  const handleSayuj = (res, options) => {
    const gifFinder = val => {
      if (val && val[0] && val[0].value) {
        switch (val[0].value.toLowerCase()) {
          case 'deepfried':
            return gifs.SAYUJ_DEEPFRIED;
          case 'conspiracy':
            return gifs.SAYUJ_CONSPIRACY;
          case 'fireball':
            return gifs.SAYUJ_FIREBALL;
          case 'microwave':
            return gifs.SAYUJ_MICROWAVE;
        }
      }
      return gifs.SAYUJ_DEEPFRIED;
    };

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: gifFinder(options),
    },
  });
};

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
    KILLSTEAL_COMMAND,
    ANDREW_COMMAND,
    ARJUN_COMMAND,
    AUSTIN_COMMAND,
    ELIE_COMMAND,
    GARRETT_COMMAND,
    REN_COMMAND,
    SAYUJ_COMMAND
  ]);
});