import Groq from "groq-sdk";

const groq = new Groq({ apiKey:'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'});

const getModels = async () => {
  return await groq.models.list();
};

getModels().then((models) => {
  console.log(models);
});
