// const logger = require('../utils/logger');
require('dotenv').config();

exports.handleUssd = async (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  console.log('USSD callback body:', req.body);
  let response = '';
  const number = Math.floor(100000 + Math.random() * 900000).toString();

  // Input validation
  if (!phoneNumber || !sessionId) {
    console.log('Missing required parameters:', { phoneNumber, sessionId });
    return res.status(400).send('END Invalid request parameters');
  }

    // Add service code validation at the start
  if (serviceCode !== process.env.SERVICE_CODE) {
    console.log('Invalid service code:', serviceCode);
    return res.status(403).send('END Invalid service code');
  }

  try {
    // // Rate limiting check
    // const isRateLimited = await checkRateLimit(phoneNumber);
    // if (isRateLimited) {
    //   console.log('Rate limit exceeded for:', phoneNumber);
    //   return res.send('END Please try again after 1 minute');
    // }

    // // Session timeout check
    // const isSessionValid = await checkSessionValidity(sessionId);
    // if (!isSessionValid) {
    //   console.log('Session expired for:', sessionId);
    //   return res.send('END Session expired. Please dial again');
    // }

    if (text === '') {
      response = `CON Welcome to Fun Test Menu! 🎮
      1. Play a Game
      2. Tell me a Joke
      3. Daily Quote
      4. Exit`;
    } else {
      const textArray = text.split('*');
      const level = textArray.length;

      // Validate input format
      if (!textArray.every(input => /^[1-4]$/.test(input))) {
        console.log('Invalid input received:', text);
        return res.send('END Invalid input. Please use numbers 1-4');
      }

      switch(level) {
        case 1:
          switch(textArray[0]) {
            case '1':
              response = `CON Choose your game:
              1. Guess the number
              2. Rock, Paper, Scissors
              3. Quick Math
              4. Back to main menu`;
              break;
            case '2':
              await logUserChoice(phoneNumber, 'joke');
              response = 'END Why did the developer go broke? Because he used up all his cache! 😄';
              break;
            case '3':
              await logUserChoice(phoneNumber, 'quote');
              response = 'END "Be the change you wish to see in the world" - Gandhi';
              break;
            case '4':
              await logUserChoice(phoneNumber, 'exit');
              response = 'END Thanks for testing! Come back soon! 👋';
              break;
            default:
              response = 'END Invalid selection. Please try again';
          }
          break;
        case 2:
          if (textArray[0] === '1') {
            switch(textArray[1]) {
              case '1':
                await logUserChoice(phoneNumber, 'number_game');
                response = `END I\'m thinking of number 7 Did you guess it? 🎲`;
                break;
              case '2':
                await logUserChoice(phoneNumber, 'rps_game');
                response = 'END Paper beats Rock! I win! 🎮';
                break;
              case '3':
                await logUserChoice(phoneNumber, 'math_game');
                response = 'END Quick Math: 2 + 2 = 4, minus 1 that\'s 3! 🧮';
                break;
              case '4':
                response = `CON Welcome back to main menu:
                1. Play a Game
                2. Tell me a Joke
                3. Daily Quote
                4. Exit`;
                break;
              default:
                response = 'END Invalid game selection';
            }
          }
          break;
        default:
          response = 'END Menu depth exceeded. Please start over';
      }
    }

    // Log successful interaction
    await logUssdInteraction(sessionId, phoneNumber, text, response);

  } catch (error) {
    console.log('USSD Error:', {
      error: error.message,
      phoneNumber,
      sessionId,
      text
    });
    response = 'END System error. Please try again later';
    
    // Alert monitoring system
    await alertSystemError(error, phoneNumber);
  }

  // Set response headers
  res.set({
    'Content-Type': 'text/plain',
    'Cache-Control': 'no-cache',
    'X-Session-ID': sessionId
  });

  // Send response with retry mechanism
  try {
    res.send(response);
  } catch (sendError) {
    console.log('Response send error:', sendError);
    res.status(500).send('END Service temporarily unavailable');
  }
};

// // Helper functions
// async function checkRateLimit(phoneNumber) {
//   // Implement rate limiting logic
//   return false;
// }

// async function checkSessionValidity(sessionId) {
//   // Implement session validation logic
//   return true;
// }

async function logUserChoice(phoneNumber, choice) {
  // Implement user choice logging
  console.log('User choice:', { phoneNumber, choice });
}

async function logUssdInteraction(sessionId, phoneNumber, input, output) {
  // Implement interaction logging
  console.log('USSD Interaction:', { sessionId, phoneNumber, input, output });
}

async function alertSystemError(error, phoneNumber) {
  // Implement error alerting system
  console.log('System Alert:', { error, phoneNumber });
}
