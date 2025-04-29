export default async function handler(req, res) {
  try {
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

    // 응답이 유효한지 먼저 체크
    if (!data.choices || !data.choices[0]) {
      console.error("OpenAI 응답 이상:", data);
      return res.status(500).json({ result: "AI 응답을 받는 데 문제가 발생했습니다." });
    }

    res.status(200).json({ result: data.choices[0].message.content });
  } catch (error) {
    console.error("서버 오류:", error);
    res.status(500).json({ result: "서버 오류가 발생했습니다. 나중에 다시 시도해주세요." });
  }
}
