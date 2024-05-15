const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function createImagePrompts() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          `You are a helpful assistant. I need an array of strings containing 4 items. First and second item is a subject. It could be anything but if it's a person, make it a guessable profession like police, soldier, nurse, etc. or a very famous person. Anything else could be an animal or something else. Make it creative. If the first item is a person, sometimes make the second item an animal. Just be creative, and don't be repetitive. Third item should be an activity. Make it specific, like 'cooking fried rice' or 'playing chess'. Fourth item will be the fusion of first, second, and third item (if first item is 'soldier', second item is 'cat', third item is 'cooking fried rice' the result will be 'soldier and cat cooking fried rice'. This will be used as a prompt to generate image to DALL-E model for an image-guessing game, so make the combination as funny and as random as possible. Do not give me another answer other than an array and requested items inside that array. Do not add another text other than an array such as "here is the answer" or anything else. I only need the array as your response. Make sure it's a single array containing 4 strings, not single array containing 4 arrays inside it.`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}

async function createImageUrl(prompt) {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
  });

  return response.data[0].url;
}

module.exports = { createImagePrompts, createImageUrl };
