import "dotenv/config";
import OpenAI from "openai";

// Initialize OpenAI with API Key from env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Required
});

const generateimage = async (req, res,next) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const generatedImage = response.data[0].b64_json;

    res.status(200).json({ photo: generatedImage });
  } catch (error) {
    console.error("Error generating image:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { generateimage };
