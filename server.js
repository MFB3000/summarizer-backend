const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG,
});
const openai = new OpenAIApi(configuration);

app.get('/models', async (req, res) => {
    console.log("Fetching models")
    await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const modelNames = data.data.map(model => model.root);
            res.json(modelNames);
        })
});

app.post('/getOpenAIRes', async (req, res) => {
    console.log("Getting response from OpenAI")
    const { model, prompt, temperature, max_tokens, top_p, frequency_penalty, presence_penalty } = req.body.data;
    try {
        const response = await openai.createCompletion({
            model: model,
            prompt: prompt,
            temperature: temperature,
            max_tokens: max_tokens,
            top_p: top_p,
            frequency_penalty: frequency_penalty,
            presence_penalty: presence_penalty
        });
        console.log(response.data.choices[0].text)
        res.json({ response: response.data.choices[0].text });
    } catch (error) {
        res.json({ response: "Model isn't suitable for this type of application." });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});