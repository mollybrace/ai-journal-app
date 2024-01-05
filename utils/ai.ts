import { OpenAI } from "langchain/llms/openai"
import { PromptTemplate } from "langchain/prompts"
import { loadQARefineChain } from "langchain/chains"
import { StructuredOutputParser } from "langchain/output_parsers"
import z from "zod"
import { Document } from "langchain/document"
import { create } from "domain"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { MemoryVectorStore } from "langchain/vectorstores/memory"

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z.string().describe("the mood of the person who wrote the journal entry."),
        summary: z.string().describe("quick summary of the entire entry"),
        subject: z.string().describe("the subject of the journal entry"),
        negative: z.boolean().describe("is the journal entry negative? (i.e. does it contain negative emotions?"),
        colour: z.string().describe(
            "Choose a colour that represents the mood of the entry and return the hexidecimal colour code for that colour."
        )
    })
)

const getPrompt = async (content) => {
    const format_instructions = parser.getFormatInstructions()

    const prompt= new PromptTemplate({
        template: "Analyse the following journal entry. Follow the instructions and format your response to match the format instructions. No matter what! \n {format_instructions}\n{entry}",
        inputVariables: ["entry"],
        partialVariables: {format_instructions},
    })

    const input = await prompt.format({
        entry: content,
    })

    console.log(input)
    return input
}

export const analyse = async (content) => {
    const input = await getPrompt(content)
    const model = new OpenAI({temperature: 0, modelName: "gpt-3.5-turbo" })
    const result = await model.call(input)
    console.log(result)

    try {
        return parser.parse(result)
    } catch (error) {
        console.log(error)
    }
}


export const qa = async (question, entries) => {
 const docs = entries.map(
    (entry) => {
    return new Document({
        pageContent: entry.content,
        metadata: { id: entry.id, createdAt: entry.createdAt },
    })
 })
 
 //create model and chain
 const model = new OpenAI({temperature: 0, modelName: "gpt-3.5-turbo"})
 const chain = loadQARefineChain(model)
 const embeddings = new OpenAIEmbeddings()
 //Load the docs and create vector store
 const store =  await MemoryVectorStore.fromDocuments(docs, embeddings)
 console.log(docs, "HELLO")
 const relevantDocs = await store.similaritySearch(question)
 //call the chain
 const res = await chain.call({
    input_documents: relevantDocs,
    question,
 })

 return res.output_text
}