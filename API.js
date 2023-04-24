const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require("openai");
dotenv.config();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG,
});
const openai = new OpenAIApi(configuration);

// get model list
const models = async () => {
    const response = await openai.listModels();
    console.log(response.data)
}

const apiCall = async () =>  {
    const response = await openai.createCompletion({
        model: "text-davinci-003", // List of models: https://beta.openai.com/docs/api-reference/models
        prompt: "Summarize the following text:\n\n" + "This is a test" + "\n\n",
        temperature: 0.5,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    console.log(response);
    console.log(response.data.choices[0].text);
}


// models()
// apiCall()