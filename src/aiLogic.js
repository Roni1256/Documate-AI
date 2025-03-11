import Groq from "groq-sdk";


const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function main(code) {
  try {
    const chatCompletion = await getGroqChatCompletion(code);
    return chatCompletion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error generating documentation:", error);
    return "Failed to generate documentation.";
  }
}

export const getGroqChatCompletion = async (code) => {
  try {
    return await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Generate well-formatted documentation in markdown format for the following code:\n\`\`\`javascript\n${code}\n\`\`\``,
        },
        {
          role: "system",
          content: "1. **Cover Page** – Project Name, Version, Author\n2. **Introduction** – Overview, Purpose, Features\n3. **Installation** – Setup, Requirements, Deployment\n4. **Architecture** – Tech stack, Folder structure\n5. **Usage** – How to use, Screenshots, Examples\n6. **API & Code** – Endpoints, Functions, Sample code\n7. **Configuration** – Settings, Environment variables\n8. **Security** – Authentication, Best practices\n9. **Errors & Debugging** – Common issues, Fixes\n10. **Testing & Deployment** – CI/CD, Steps\n11. **Contribution & License** – How to contribute, Legal info\n\n🚀 **Keep it short, clear, and updated!make the documentation in this format."
        }      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      max_completion_tokens: 5120,
      top_p: 1,
      stop: null,
      stream: false,
    });
  } catch (error) {
    console.error("Error fetching completion:", error);
    return {
      choices: [{ message: { content: "Failed to generate documentation." } }],
    };
  }
};

