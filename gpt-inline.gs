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
