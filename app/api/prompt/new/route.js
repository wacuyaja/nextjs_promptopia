import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database"

export const POST = async (req) => {
    const {userId, prompt, tag} = await req.json()
    console.log(`req : ${userId}`);

    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt: prompt,
            tag: tag,
            test: 'test'
        })
        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch (error) {
        return new Response('Failed to create new prompt', {status: 500})
    }
}