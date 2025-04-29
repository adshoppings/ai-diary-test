export default async function handler(req, res) {
  const { keywords } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "당신은 따뜻하고 감성적인 엄마의 육아일기를 작성하는 AI입니다." },
        { role: "user", content: `다음 키워드를 포함한 감성적인 육아일기를 써줘: ${keywords}` },
      ],
      max_tokens: 300,
    }),
  });

  const data = await response.json();
  res.status(200).json({ result: data.choices[0].message.content });
}
