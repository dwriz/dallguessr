const { OpenAI } = require("openai");
// require("dotenv").config()

async function openAI() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. I need an array of strings containing 4 items. First and second item is a subject. It could be anything but if it's a person, make it a guessable profession like police, soldier, nurse, etc. or a very famous person. Anything else could be an animal or something else. Third item should be an activity. Make it specific, like 'cooking fried rice' or 'playing chess'. Fourth item will be the fusion of first, second, and third item (if first item is 'soldier', second item is 'cat', third item is 'cooking fried rice' the result will be 'soldier and cat cooking fried rice'. This will be used as a prompt to generate image to DALL-E model for an image-guessing game, so make the combination as funny and as random as possible. Do not give me another answer other than an array and requested items inside that array.",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}

module.exports = { openAI };
