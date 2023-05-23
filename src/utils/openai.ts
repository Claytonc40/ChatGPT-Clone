import { ChatMessage } from "@/types/ChatMessage";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const api = new OpenAIApi(config);

export const openai = {
  generate: async (messages: ChatCompletionRequestMessage[]) => {
    try {
      const response = await api.createChatCompletion({
        model: "ttext-ada-001",
        temperature: 0.6,
        messages,
      });
      return response.data.choices[0]?.message?.content;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },
  translateMenssages: (messages: ChatMessage[]) => {
    let reqMessage: ChatCompletionRequestMessage[] = [];

    for (let i in messages) {
      reqMessage.push({
        role: messages[i].author === "me" ? "user" : "assistant",
        content: messages[i].body,
      });
    }
    return reqMessage;
  },
};
