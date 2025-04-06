
document.getElementById('calc').addEventListener('click', async () => {
  const start = document.getElementById('start').value;
  if (!start) {
    alert('출발지를 입력하세요');
    return;
  }
  document.getElementById('result').innerText = 'ETA 계산 중...';

  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(start)}`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: 'KakaoAK 15c28ebb75dda243548737ac615a5681' }
    });
    const data = await res.json();
    if (data.documents.length === 0) {
      document.getElementById('result').innerText = '주소를 찾을 수 없습니다.';
      return;
    }
    const { x, y } = data.documents[0];
    document.getElementById('result').innerText = `좌표: ${y}, ${x}`;
  } catch (err) {
    document.getElementById('result').innerText = 'ETA 계산 실패';
  }
});
