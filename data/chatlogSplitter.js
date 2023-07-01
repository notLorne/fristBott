const fs = require('fs');

// Read the conversation from the original chatlog file
const conversation = fs.readFileSync('C:/codeStudio/javascript/myFristBot/data/originalChatlog.txt', 'utf-8');

// Rest of the code remains the same as before...

// Split the conversation into individual lines
const lines = conversation.split('\n');

// Initialize objects to store messages for each person
const messages = {
  lorne_a_20014: [],
  kayla_princess94: [],
};

// Process each line to extract messages
lines.forEach((line) => {
  // Extract the name and message part after the date and ":"
  const [name, message] = line.match(/^[^(]+\(([^)]+)\):\s(.*)$/).slice(1);

  // Save the message in the respective person's array
  if (name in messages) {
    messages[name].push(message);
  }
});

// Save the messages for each person in separate text files
for (const person in messages) {
  const filename = `C:/codeStudio/javascript/myFristBot/data/${person}.txt`;
  const text = messages[person].join('\n');
  fs.writeFileSync(filename, text);
  console.log(`Saved messages for ${person} in ${filename}`);
}
