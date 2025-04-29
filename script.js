async function generateDiary() {
    const keywords = document.getElementById('keywords').value;
    document.getElementById('diaryResult').innerText = "일기 생성 중...";

    const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ keywords }),
    });

    const data = await response.json();
    document.getElementById('diaryResult').innerText = data.result;
}
