async function generateDiary() {
    const keywords = document.getElementById('keywords').value;
    document.getElementById('diaryResult').innerText = "일기 생성 중...";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "당신은 엄마의 입장에서 따뜻하고 감성적인 육아일기를 작성하는 AI입니다." },
                { role: "user", content: `다음 키워드를 포함해 따뜻하고 감성적인 육아일기를 써줘: ${keywords}` }
            ],
            max_tokens: 300
        })
    });

    const data = await response.json();
    const diaryText = data.choices[0].message.content;

    document.getElementById('diaryResult').innerText = diaryText;
}
