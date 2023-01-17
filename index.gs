/**
 * Prompts GPT-3 to fill the cell. You can use a template like
 *
 * @param {string} input The value to send to GPT-3
 * @param {number} max_tokens The longest possible response
 * @param {"text-davinci-002" | "text-curie-001" | "text-babbage-001" | "text-ada-001"} model The model intelligence
 * @param {number} temperature The randomness control
 * @param {string} stop Stop when the ai reaches one of these
 * @example <caption>GPT("Hello my name is", 5, "text-babbage-01")</caption>
 * @return Prompts GPT-3 to fill the cell.
 * @customfunction
 */

async function GPT(input, max_tokens, model, temperature, stop) {
  try {
    const res = await _callAPI(input, { max_tokens, model, temperature, stop })
    console.log(res)
    return res
  }
  catch (error) {
    console.log(error.message)
  }
}

const API_KEY = "your-api-key";

function _callAPI(prompt, { max_tokens, model, temperature, stop }) {
  const data = {
    'prompt': prompt,
    'max_tokens': max_tokens || 25,
    'temperature': temperature || 1,
    'stop': stop ? [stop] : null
  };

  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(data),
    'headers': {
      Authorization: 'Bearer ' + API_KEY,
    },
  };

  response = UrlFetchApp.fetch(
    `https://api.openai.com/v1/engines/${model || 'text-curie-001'}/completions`,
    options,
  );
  const returned = JSON.parse(response.getContentText())['choices'][0]['text'].trim()
  return returned;
}

// Add to list function
// highlight a selection of partially filled cells horizontally and fill them in

function gpt3Listing() {
  const spreadsheet = SpreadsheetApp.getActive();
  const range = spreadsheet.getActiveRange();
  const num_rows = range.getNumRows();

  let vals = []

  for (var i = 1; i < num_rows + 1; i++) {
    input_val = range.getCell(i, 1).getValue();
    vals.push(input_val)
  }
  const existingVals = vals;
  const res = callAPIList(promptify(vals))
  const additions = parseResult(res)
  console.log(res)
  let fullList = existingVals
    .concat(additions)
    .filter(x => x !== "")
    .map(x => [x])
    .slice(0, num_rows)
  if (fullList.length === num_rows) {
    range.setValues(fullList)
  }
  else {
    console.log(`${fullList.length} items`, `${num_rows} rows`);
    const lengthOfEmptyCells = num_rows - fullList.length
    fullList.push(...[...Array(lengthOfEmptyCells)].map(x => [""]))
    console.log(fullList.length, fullList)
    range.setValues(fullList)
  }
}

function callAPIList(prompt) {
  const data = {
    'prompt': prompt,
    'max_tokens': 270,
    'temperature': 1,
  };
  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(data),
    'headers': {
      Authorization: 'Bearer ' + API_KEY,
    },
  };
  response = UrlFetchApp.fetch(
    'https://api.openai.com/v1/engines/text-davinci-003/completions',
    options,
  );
  console.log(response.getContentText())
  return JSON.parse(response.getContentText())['choices'][0]['text']
}

function promptify(arr) {
  const filtered = arr.filter(x => x !== "");
  const list = filtered.join('\n');
  const str = `Add ${arr.length - filtered.length} additions to this list, separated by line breaks\n\n${list}\n\nNEW ADDITIONS:\n`
  console.log(str)
  return str
}

function parseResult(openaiStr) {
  const array = openaiStr
    .split("\n")
    .filter(x => x !== "") // remove empty
    .map(x => x.replace(/^\d+\.\s*/, '')) // remove any numbered bullets at the start

  return array
}


// Menu function

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('GPT-3')
      .addItem('Add to list', 'gpt3Listing')
      .addToUi();
}
