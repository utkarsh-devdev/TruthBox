import Groq from "groq-sdk";

export const runtime = "edge";

// 🔹 Fallback pool (20 questions)
const FALLBACK_QUESTIONS = [
  "What's a hobby you've recently started?",
  "If you could travel anywhere right now, where would you go?",
  "What's a simple thing that makes you happy?",
  "What's your favorite comfort food?",
  "If you could master any skill instantly, what would it be?",
  "What's a movie you can watch over and over?",
  "What's something small that made your day better?",
  "If you had a free day with no responsibilities, what would you do?",
  "What's a book or show you always recommend?",
  "What's your favorite way to relax after a long day?",
  "If you could live in any city in the world, which one would you pick?",
  "What's a goal you're excited about right now?",
  "What's a song that always lifts your mood?",
  "If you could try any new hobby this month, what would it be?",
  "What's something you're grateful for today?",
  "What's a fun memory that always makes you smile?",
  "If you could have dinner with any fictional character, who would it be?",
  "What's one thing you want to learn this year?",
  "What's your favorite weekend activity?",
  "If you could start a passion project today, what would it be?"
];

// 🔹 Pick 3 random questions
const getRandomThree = () => {
  const shuffled = [...FALLBACK_QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3).join("||");
};

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST() {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform like Qooh.me. Avoid personal or sensitive topics. Keep them friendly and engaging.";

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const text =
      completion.choices[0]?.message?.content?.trim();

    // ✅ Safety check: must contain ||
    if (!text || !text.includes("||")) {
      return new Response(getRandomThree(), {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });

  } catch (error) {
    console.error("Groq failed, sending fallback questions:", error);

    // ✅ Guaranteed fallback
    return new Response(getRandomThree(), {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
