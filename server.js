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


app.post('/summarize', async (req, res) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Summarize the following text:\n\n" + req.body.text + "\n\n",
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        const summary = response.data.choices[0].text;
        res.json({ summary });
    } catch (error) {
        console.error('Error while fetching summarized text:', error);
        res.status(500).json({ error: 'Failed to fetch summarized text' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});