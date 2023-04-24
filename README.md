# OpenAI Express API

This is a simple API server built using [Express.js](https://expressjs.com/) that allows you to interact with the [OpenAI GPT-3 API](https://beta.openai.com/docs/api-reference/introduction) in a more user-friendly way. The server exposes two endpoints: `/models` and `/getOpenAIRes`.

## Prerequisites

Before running this server, make sure that you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) (which comes with Node.js)

## Installation

To install the required dependencies, simply run the following command:

npm install

Usage

To start the server, run the following command:

bash

npm start

This will start the server at http://localhost:5000. If you want to use a different port, you can set the PORT environment variable.
/models

This endpoint returns a list of all the available OpenAI models that you can use. To use this endpoint, simply make a GET request to /models.
/getOpenAIRes

This endpoint takes in a JSON object with the following properties:

    model: The name of the OpenAI model to use.
    prompt: The text prompt to provide to the model.
    temperature: Controls the "creativity" of the response. Higher values will result in more diverse responses.
    max_tokens: Controls the maximum length of the response.
    top_p: Controls the "quality" of the response. Higher values will result in more "coherent" responses.
    frequency_penalty: Penalizes frequently occurring words in the response.
    presence_penalty: Penalizes words that are not present in the prompt.

To use this endpoint, simply make a POST request to /getOpenAIRes with the JSON object as the request body. If the request is successful, the server will return a JSON object with a response property that contains the text response generated by the OpenAI model.