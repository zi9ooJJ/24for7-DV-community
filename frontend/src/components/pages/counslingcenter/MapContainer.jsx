import { useEffect } from "react";
import centerAddresses from "../../../datas/counseling_center.json";

const { kakao } = window;
const _sleep = async () =>
  await new Promise((resolve) => setTimeout(() => resolve(), 10));
function MapContainer() {
  const setmarker = async () => {
    const mapContainer = document.getElementById("myMap");
    const mapOption = {
      center: new kakao.maps.LatLng(35.9424, 128.1135947),
      level: 13,
    };
    // 지도 생성
    const map = new kakao.maps.Map(mapContainer, mapOption);
    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    // 주소-좌표 변환 객체 생성
    const geocoder = new kakao.maps.services.Geocoder();

    for (const addr of centerAddresses) {
      await _sleep();
      const { 상담소명, 주소 } = addr;
      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(주소, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new kakao.maps.Marker({
            map: map,
            position: coords,
            clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 함
          });

          // 인포윈도우에 들어갈 내용
          const iwContent =
              '<div style="width:280px;text-align:center;padding:20px 0;font-weight:bold;border-bottom: 2px solid #ccc">' +
              `${상담소명}` +
              "</div>" +
              '<div style="width:280px;text-align:center;padding:10px 0;">' +
              `${주소}` +
              "</div>",
            iwRemoveable = true;

          // 인포윈도우 생성
          const infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable,
          });

          kakao.maps.event.addListener(marker, "click", function () {
            infowindow.open(map, marker);
          });
        }
      });
    }
  };
  useEffect(() => {
    setmarker();
  }, []);

  return (
    <div
      id="myMap"
      style={{
        width: "700px",
        height: "750px",
      }}
    ></div>
  );
}

export default MapContainer;
