
let geocoder = new kakao.maps.services.Geocoder();

function useGPS() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      document.getElementById('departure').value = `(${lat}, ${lng})`;
    }, () => {
      alert('GPS 정보를 가져오지 못했습니다.');
    });
  } else {
    alert('이 브라우저는 GPS를 지원하지 않습니다.');
  }
}

function calculateETA() {
  const query = document.getElementById('departure').value;
  if (!query) {
    alert("출발지를 입력하세요.");
    return;
  }

  geocoder.addressSearch(query, function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
      const lat = result[0].y;
      const lng = result[0].x;

      document.getElementById('result').innerHTML = `
        <p><b>${query}</b> → 좌표 변환 성공</p>
        <ul>
          <li>위도: ${lat}</li>
          <li>경도: ${lng}</li>
          <li>🚑 구급차 ETA: 11분</li>
          <li>🚗 닥터카 ETA: 16분 (15분 지연 포함)</li>
          <li>ETA 차이: 5분 → 구간 2</li>
          <li>추천 병원: A병원, B병원</li>
          <li>추천 소방서: C119, D119</li>
        </ul>`;
    } else {
      alert("주소를 찾을 수 없습니다.");
    }
  });
}
