import { IAttachment, IChatMessage } from "@/models/chat";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { tool } from "@langchain/core/tools";
import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { StructuredOutputParser } from "langchain/output_parsers";
import { Ragie } from "ragie";
import { v1 } from "uuid";
import { z } from "zod";

const contextInputSchema = z.object({
  query: z.string(),
});

const contextTool = tool(
  async (query) => {
    const res = await getRegieResponse(query.query);
    const obj = JSON.stringify(res.scoredChunks);
    return obj;
  },
  {
    name: "getContext",
    description:
      "Use this tool to get the documents of youtube videos, google drive attachments, and books. Construct of good query to get the best results. Do not unnecessarily use this tool. Use once per message.\n\
      Example user message on which you can use this tool:\n\
      - Suggest me some books on international relations\n\
      - I need some youtube videos on the cold war\n\
      - Share some google drive attachments on the cold war\n\
      - Whats your opinion on the cold war\n\
      Example user message on which you should not use this tool:\n\
      - What is the cold war\n\
      - Explain the cold war\n\
      - Hi there\n\
      - Thanks \n\
      ",
    schema: contextInputSchema,
  }
);

export const outputParser = StructuredOutputParser.fromZodSchema(
  z.object({
    message: z.string().describe("Response of user message"),
    googleDriveAttachment: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
        documentId: z
          .string()
          .describe("Document ID of the document present in the context"),
        description: z.string().describe("formatted text info in 200 words"),
        dateTime: z.string().optional().describe("IST date time"),
        author: z.string().optional().describe("Author of the document"),
      })
    ),
    youtubeVideoAttachment: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
        documentId: z
          .string()
          .describe("Document ID of the document present in the context"),
        description: z.string(),
        dateTime: z.string().optional().describe("IST date time"),
      })
    ),
    books: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
        documentId: z
          .string()
          .describe("Document ID of the document present in the context "),
        description: z.string().describe("formatted text info in 200 words"),
        dateTime: z.string().optional().describe("IST date time"),
        author: z.string().optional().describe("Author of the book"),
      })
    ),
  })
);

export const getRegieResponse = async (message: string) => {
  console.time("get regie response");
  const regie = new Ragie({
    auth: "tnt_GfTA3r8KvXH_HMcUIDplfHTYO1uvhvpRyS1BNQ6LKjx6df2tWDPRqoE",
  });

  const response = await regie.retrievals.retrieve({
    query: message,
    topK: 2,
    maxChunksPerDocument: 1,
    filter: {},
  });
  console.timeEnd("get regie response");
  return response;
};

export const getOpenApiResponse = async (
  message: string,
  chatHistory: IChatMessage[]
) => {
  chatHistory = chatHistory;
  const template =
    "You need to act like John Mearsheimer, who is an American political scientist and international relations scholar. Chat with user with the help of context. context contain document details in json format. Use context to add attachments to your message as reference or suggestion. Your message should have a good amount of perplexity and burstiness, and as short as possible.";

  const formattedHistory = chatHistory.map((message) => {
    if (message.sender == "user") return new HumanMessage(message.message);
    else
      return new AIMessage(message.message, {
        attachments: message.attachments?.map((attachment) => ({
          type: attachment.type,
          name: attachment.name,
        })),
      });
  });

  const ragieResponse = await getRegieResponse(message);

  const prompt = ChatPromptTemplate.fromMessages([
    new SystemMessage(template),
    new MessagesPlaceholder("chat_history"),
    new MessagesPlaceholder("agent_scratchpad"),
    new MessagesPlaceholder("context"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
    new MessagesPlaceholder("format_instructions"),
  ]);

  const llm = new ChatOpenAI({
    temperature: 0.5,
    model: "gpt-4o-mini",
    // verbose: true,
  });

  const agent = createToolCallingAgent({
    llm,
    prompt,
    tools: [],
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools: [],
    maxIterations: 2,
  });
  console.time("get open api response");

  const agentResponse = await agentExecutor.invoke({
    chat_history: formattedHistory,
    context: JSON.stringify(ragieResponse),
    format_instructions: outputParser.getFormatInstructions(),
    input: message,
  });
  console.timeEnd("get open api response");

  const output = agentResponse["output"];
  const parsedOutput = await outputParser.parse(output);

  const attachments: IAttachment[] = [];

  for (const attachment of parsedOutput.googleDriveAttachment) {
    attachments.push({
      type: "drive",
      name: attachment.name,
      url: attachment.url,
      description: attachment.description,
      documentId: attachment.documentId,
      dateTime: attachment.dateTime,
    });
  }
  for (const attachment of parsedOutput.youtubeVideoAttachment) {
    attachments.push({
      type: "youtube",
      name: attachment.name,
      url: attachment.url,
      description: attachment.description,
      documentId: attachment.documentId,
      dateTime: attachment.dateTime,
    });
  }
  for (const attachment of parsedOutput.books) {
    attachments.push({
      type: "book",
      name: attachment.name,
      url: attachment.url,
      description: attachment.description,
      documentId: attachment.documentId,
    });
  }
  const res: IChatMessage = {
    id: v1(),
    message: parsedOutput.message,
    sender: "agent",
    attachments: attachments,
  };
  return res;
};
