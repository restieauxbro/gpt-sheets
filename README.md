# GPT-3 for Google Sheets

[![GPT-3 for Google Sheets](https://media.giphy.com/media/DruTv6RJyScvjn4Xuk/giphy.gif)

## Introduction

This is a Google Sheets extension that allows you to use GPT-3 from within your spreadsheets. It provides the following functions:

- `=GPT3_TEXT(prompt, options)`: Generate text from a prompt and optional options.
- `=GPT3_COMPLETE(prompt, options)`: Complete text from a prompt and optional options. The result will be in the same format as `=GOOGLEFINANCE()`.
- `=GPT3_CONVERSE(prompt, options)`: Converse with GPT-3, generating responses to prompts and optional options. The result will be in the same format as `=GOOGLEFINANCE()`.
- `=GPT3_TRANSLATE(text, sourceLanguage, targetLanguage)`: Translate text between languages using GPT-3. The result will be in the same format as `=GOOGLETRANSLATE()`.


## Installation Instructions

 1. Install the [List with GPT-3](https://chrome.google.com/webstore/detail/list-with-gpt%E2%80%933/jhkfkdikcjnkpibmjgfhfhbkkljjkpci?hl=en&authuser=0) extension for Google Chrome (or Firefox). This extension is required for this extension to work properly.

 2. Install this extension by clicking on "Install" below:

    <a href="https://chrome.google.com/webstore/detail/gpt%E2%80%933-for-google-sheets/eoegfpjkbfljehmeknblcidajmihhfhp"><img src="https://developer.chrome.com/webstore/images/ChromeWebStore_BadgeWBorder_v2_206x58.png" alt="Install"></a>

 3. Open up a new Google Sheet and make sure that you have granted permissions to this extension when prompted by Google Sheets (you may need to refresh the page). You should see a new menu item called "Sheets with GPT-3".

 4. Click on "Sheets with GPT-3 > Get API Key" and follow the instructions there to get an API key for OpenAI's API v1 (this requires an account at [OpenAI](https://openai.com)). Once you have an API key, click on "Sheets with GPT-3 > Set API Key" and paste it into the dialog box that appears (make sure you don't share your API key with anyone else!). If you have multiple sheets open at once, each sheet will have its own separate API key so that you can use different keys for different sheets if needed (for example, if one of your keys has been rate limited).

 5a. To generate text from a prompt or complete some text from a prompt, enter either of these formulas into any cell in your sheet:

     ```javascript
     =GPT3_TEXT("My favorite food is ", {maxTokens: 100}) // Generates text given a prompt ("My favorite food is ..."). The maxTokens option limits how many tokens are generated (the default value is 50 tokens). See below for more information about other available options for generating text or completing text from prompts!
     =GPT3_COMPLETE("My favorite food is ", {maxTokens: 100}) // Completes some text given a prompt ("My favorite food is ..."). The maxTokens option limits how many tokens are generated (the default value is 50 tokens). See below for more information about
