# GPT-3 for Google Sheets

This is a Google Sheets extension script that allows you to use GPT-3 from within your spreadsheets. It provides the following functions:

- `=GPT(input, max_tokens, model, temperature, stop)`: Generate text from a prompt input and optional options.
- Menu item `Add to list`: A function to expand on your list by highlighting the number of cells you want to add


## Installation Instructions

 1. Copy the contents of the index.gs file in this repo

 2. Open your Google Sheet and in the top menu click Extensions > Apps Scripts

 3. Add a new script file and paste the contents you copied

 4. Add your OpenAi API key where it says
    ```javascript
    const API_KEY = "your-api-key";

 5. Publish the script as a web app. It will likely say you need to give permission to the script to access your Google Sheets. Agree to this and bypass the warning screen by clicking `Advanced` and then `Go to your sheet (unsafe)`. This is just because the script is not verified by Google, but you can see there's nothing but a simple API call to OpenAi in the code you copied.

 6. Hard refresh your Google Sheet (with the browser refresh button, not ctrl + R or the Google Sheets refresh button)


## Add to list

 Perfect for expanding on your list of items to a maximum of about 20 items. Highlight the number of cells you want to add and click the menu item `Add to list`. The extension will generate text for each cell and add it to the list. 

 ![Adding to a list](https://jzkobrxiuflwbfcatllm.supabase.co/storage/v1/object/public/documentation/gifs/Adding%20to%20list%20with%20GPT-3.gif)



 ## =GPT

 Send a prompt to GPT-3 and get a response. 

 ![GPT-3 for Google Sheets](https://jzkobrxiuflwbfcatllm.supabase.co/storage/v1/object/public/documentation/gifs/=GPT.gif)

 The function takes the following arguments:

    - `input`: The prompt to send to GPT-3. 
    Try chaining values from multiple cells together to make a sophisticated prompt using `&` as a separator. For example "What is the " & A1 & " of " & A2 & "?" will return "What is the capital of Australia?" if cell A1 is "capital" and A2 is "Australia".

    Optional arguments:
    - `max_tokens`: Number. The maximum number of tokens to return. Defaults to 100
    - `model`: String. The model to use. Defaults to `text-davinci-003`
    - `temperature`: Number. The temperature to use. Defaults to 0.9
    - `stop`: String. A single stop token or a list of stop tokens.


 ### Important note! – Cement your cell values

 Sheets cells that contain a formula such as `=GPT()` will be re-run every time the sheet is opened. This means that if you have a whole sheet of cells that cost you money to run, you will be charged every time you open the sheet and your values will appear to change.

 To avoid this can ctrl + C the cell and then ctrl + shift + V to copy and paste the value only. This will prevent the cell from being re-run every time you open the sheet.

 ![Cementing a cell value](https://jzkobrxiuflwbfcatllm.supabase.co/storage/v1/object/public/documentation/gifs/Making%20solid%20values.gif)