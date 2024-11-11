// const logger = require('../utils/logger');


exports.handleUssd = async (req, res) => {
  console.log('-----------Received USSD ---------');
  console.log('Received USSD request:', req.body);
  const { messageType, msisdn, serviceCode, ussdString } = req.body;
  let response = {
    messageType: messageType,
    msisdn: msisdn,
    serviceCode: serviceCode,
    ussdString: ''
  };

  try {
    // // Validate service code
    // if (serviceCode !== process.env.SERVICE_CODE) {
    //   response.messageType = 2;
    //   response.ussdString = "Invalid service code.";
    //   return res.json(response);
    // }

    // Initial session
    if (messageType == 0) {
      response.messageType = 1;
      response.ussdString = `Hello`;
      console.log('-----------USSD Response ---------');
      console.log("USSD Response:", response);
      return res.json(response);
    }

    // Continue session
    if (messageType === 1) {
      switch(ussdString) {
        case '1':
          response.ussdString = `Choose your game:\n1. Guess the number\n2. Rock, Paper, Scissors\n3. Quick Math\n4. Back\n\nSelect an option:`;
          break;
        case '2':
          response.messageType = 2;
          response.ussdString = "Why did the developer go broke? Because he used up all his cache! ";
          break;
        case '3':
          response.messageType = 2;
          response.ussdString = '"Be the change you wish to see in the world" - Gandhi';
          break;
        case '4':
          response.messageType = 4;
          response.ussdString = "Session has been cancelled.";
          break;
        case '1*1':
          response.messageType = 2;
          response.ussdString = "I'm thinking of number 7! Did you guess it? ";
          break;
        case '1*2':
          response.messageType = 2;
          response.ussdString = "Paper beats Rock! I win! ";
          break;
        case '1*3':
          response.messageType = 2;
          response.ussdString = "Quick Math: 2 + 2 = 4, minus 1 that's 3! ";
          break;
        default:
          response.messageType = 2;
          response.ussdString = "Invalid option selected.";
      }
      console.log("USSD Response:", response);
      return res.json(response);
    }

  } catch (error) {
    console.error('USSD Error:', error);
    response.messageType = 5;
    response.ussdString = "Timeout.";
    return res.json(response);
  }
};

// exports.handleUssd = async (req, res) => {
//   const { messageType, msisdn, serviceCode, ussdString } = req.body;
//   let response = {
//     messageType: messageType,
//     msisdn: msisdn,
//     serviceCode: serviceCode,
//     ussdString: ''
//   };

//   try {
//     if (serviceCode !== process.env.SERVICE_CODE) {
//       response.messageType = 2;
//       response.ussdString = "Invalid service code.";
//       return res.json(response);
//     }

//     // Initial session - Main Menu
//     if (messageType === 0) {
//       response.messageType = 1;
//       response.ussdString = `Welcome to Interactive Menu! 🌟\n
// 1. Games Zone 🎮
// 2. Daily Entertainment 🎯
// 3. Knowledge Hub 📚
// 4. Fun Tools 🛠
// 5. Exit ❌\n
// Select an option:`;
//       return res.json(response);
//     }

//     // Continue session
//     if (messageType === 1) {
//       switch(ussdString) {
//         // Games Zone
//         case '1':
//           response.ussdString = `Games Zone 🎮\n
// 1. Number Guessing
// 2. Word Scramble
// 3. Trivia Quiz
// 4. Rock Paper Scissors
// 5. Back\n
// Select a game:`;
//           break;

//         // Daily Entertainment
//         case '2':
//           response.ussdString = `Daily Entertainment 🎯\n
// 1. Random Joke
// 2. Fun Facts
// 3. Daily Riddle
// 4. Lucky Number
// 5. Back\n
// Choose option:`;
//           break;

//         // Knowledge Hub
//         case '3':
//           response.ussdString = `Knowledge Hub 📚\n
// 1. Quote of the Day
// 2. Did You Know?
// 3. Word of the Day
// 4. History Fact
// 5. Back\n
// Select topic:`;
//           break;

//         // Fun Tools
//         case '4':
//           response.ussdString = `Fun Tools 🛠\n
// 1. Random Name Generator
// 2. Fortune Cookie
// 3. Magic 8 Ball
// 4. Coin Flip
// 5. Back\n
// Pick a tool:`;
//           break;

//         // Games Zone Submenus
//         case '1*1':
//           const randomNum = Math.floor(Math.random() * 10) + 1;
//           response.messageType = 2;
//           response.ussdString = `I'm thinking of a number between 1-10! It's ${randomNum} 🎲`;
//           break;

//         case '1*2':
//           const words = ['HELLO', 'WORLD', 'GAMES', 'PHONE', 'USSD'];
//           const word = words[Math.floor(Math.random() * words.length)];
//           const scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
//           response.messageType = 2;
//           response.ussdString = `Unscramble this: ${scrambled}\nAnswer: ${word}`;
//           break;

//         // Daily Entertainment Submenus
//         case '2*1':
//           const jokes = [
//             "Why don't programmers like nature? It has too many bugs! 🐛",
//             "What's a computer's favorite snack? Microchips! 🍪",
//             "Why did the developer go broke? Because he used up all his cache! 💰",
//             "What do you call a bear with no teeth? A gummy bear! 🐻"
//           ];
//           response.messageType = 2;
//           response.ussdString = jokes[Math.floor(Math.random() * jokes.length)];
//           break;

//         // Knowledge Hub Submenus
//         case '3*1':
//           const quotes = [
//             '"Be the change" - Gandhi',
//             '"Think different" - Steve Jobs',
//             '"Just do it" - Nike',
//             '"Dream big" - Walt Disney'
//           ];
//           response.messageType = 2;
//           response.ussdString = quotes[Math.floor(Math.random() * quotes.length)];
//           break;

//         // Fun Tools Submenus
//         case '4*3':
//           const answers = [
//             "Yes definitely! ✅",
//             "Not likely ❌",
//             "Maybe later 🤔",
//             "Ask again 🔄",
//             "Without a doubt! ⭐"
//           ];
//           response.messageType = 2;
//           response.ussdString = `Magic 8 Ball says: ${answers[Math.floor(Math.random() * answers.length)]}`;
//           break;

//         case '4*4':
//           response.messageType = 2;
//           response.ussdString = `Coin flip result: ${Math.random() < 0.5 ? 'Heads! 🪙' : 'Tails! 🪙'}`;
//           break;

//         case '5':
//           response.messageType = 4;
//           response.ussdString = "Thanks for playing! Come back soon! 👋";
//           break;

//         default:
//           response.messageType = 2;
//           response.ussdString = "Invalid selection. Please try again! 🔄";
//       }
//       return res.json(response);
//     }

//   } catch (error) {
//     console.error('USSD Error:', error);
//     response.messageType = 5;
//     response.ussdString = "Session timeout. Please try again! ⏱️";
//     return res.json(response);
//   }
// };


// // Helper functions
// async function checkRateLimit(msisdn) {
//   // Implement rate limiting logic
//   return false;
// }

// async function checkSessionValidity() {
//   // Implement session validation logic
//   return true;
// }

