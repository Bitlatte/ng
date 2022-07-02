import { Configuration, OpenAIApi } from 'openai';
import type { RequestHandler } from '@sveltejs/kit';

const config = new Configuration({
	apiKey: import.meta.env.VITE_OPENAI_API_KEY
});

const openai = new OpenAIApi(config);

const promptGenerator = (keywords: string[]) => {
	const prompt = `Generate a list of 15 names by inventing a new word inspired by the keywords.\nKeywords: ${keywords.join(
		', '
	)}`;
	return prompt;
};

export const post: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const res = await openai.createCompletion({
		model: 'text-davinci-002',
		prompt: promptGenerator(data.keywords),
		max_tokens: 60,
		temperature: 0.9,
		frequency_penalty: 0.8,
		presence_penalty: 1.4
	});

	if (res.data.choices) {
		const text: string | undefined = res.data.choices[0].text;
		if (typeof text === 'string') {
			const names = text.replace(/[^a-zA-Z ]+/g, '').split(' ');
			return {
				body: { names: names, success: true }
			};
		}
	}
	return {
		status: 500
	};
};
