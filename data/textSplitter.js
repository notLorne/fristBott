const fs = require('fs');
const path = require('path');

// Function to create an index for each exchange
function createIndexes(lines) {
  let indexes = [];
  let currentIndex = 0;
  let lorneCount = 0;
  let kaylaCount = 0;

  lines.forEach((line, index) => {
    if (line.startsWith('lorne_a_20014')) {
      lorneCount++;
      indexes[index] = currentIndex;
    } else if (line.startsWith('kayla_princess94')) {
      kaylaCount++;
      indexes[index] = currentIndex;
    } else {
      indexes[index] = currentIndex;
    }

    if (lorneCount > 0 && kaylaCount > 0 && (lorneCount + kaylaCount) % 2 === 0) {
      currentIndex++;
      lorneCount = 0;
      kaylaCount = 0;
    }
  });

  return indexes;
}

// Function to remove name and timestamp from each line
function removeNameAndTimestamp(line) {
  return line.replace(/^(?:lorne_a_20014|kayla_princess94) \(\d{2}\/\d{2}\/\d{2} \d{1,2}:\d{2}:\d{2} [AP]M\): /, '');
}

// Define the path to the chat log file
const baseFilePath = path.join(__dirname, 'originalChatlog.txt');

// Read the conversation from the text file
fs.readFile(baseFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Split the text into individual lines
  const lines = data.split('\n').filter(line => line.trim() !== '');

  // Create indexes for each exchange
  const indexes = createIndexes(lines);

  // Separate the lines into Lorne and Kayla files
  const lorneLines = [];
  const kaylaLines = [];

  lines.forEach((line, index) => {
    const cleanedLine = removeNameAndTimestamp(line);
    const formattedLine = `[${indexes[index]}] ${cleanedLine}`;

    if (line.startsWith('lorne_a_20014')) {
      lorneLines.push(formattedLine);
    } else {
      kaylaLines.push(formattedLine);
    }
  });

  // Define the path to the output files
  const outputFolderPath = path.join(__dirname);
  const lorneFilePath = path.join(outputFolderPath, 'lorne_lines.txt');
  const kaylaFilePath = path.join(outputFolderPath, 'kayla_lines.txt');
  const indexesFilePath = path.join(outputFolderPath, 'indexes.txt');

  // Write Lorne's lines to a file
  fs.writeFile(lorneFilePath, lorneLines.join('\n'), err => {
    if (err) {
      console.error('Error writing Lorne lines:', err);
    } else {
      console.log('Lorne lines saved successfully!');
    }
  });

  // Write Kayla's lines to a file
  fs.writeFile(kaylaFilePath, kaylaLines.join('\n'), err => {
    if (err) {
      console.error('Error writing Kayla lines:', err);
    } else {
      console.log('Kayla lines saved successfully!');
    }
  });

  // Write the indexes to a file
  fs.writeFile(indexesFilePath, indexes.map((index, i) => `[${index}] ${lines[i]}`).join('\n'), err => {
    if (err) {
      console.error('Error writing indexes:', err);
    } else {
      console.log('Indexes saved successfully!');
    }
  });
});
