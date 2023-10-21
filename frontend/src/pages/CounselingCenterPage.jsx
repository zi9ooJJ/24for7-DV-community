import MapContainer from "../components/pages/counslingcenter/MapContainer";
// import SidoSelect from "../components/pages/counslingcenter/SidoSelect";
// import CenterSelect from "../components/pages/counslingcenter/CenterSelect";
// import { useState } from "react";
// import centerAddresses from "../datas/counseling_center.json";
// import { sido } from "../utils/consts";
import styled from "styled-components";

function CounselingCenterPage() {
  //! 셀렉트박스 시도별로 상담소 표시하여 지도 구현 못함..
  // const sidoName = centerAddresses.map((data) => data.시도명);
  // const centerName = centerAddresses.map((data) => data.상담소명);
  // const [sidos, setSidos] = useState();
  // const handleSidoChange = (e) => {
  //   setSidos(e.target.value);
  //   console.log(sidos);
  // };
  // const [center, setCenter] = useState();
  // const handleCenterChange = (e) => {
  //   setCenter(e.target.value);
  // }

  return (
    <div>
      <MainHead>가정폭력 상담소(22.6.30. 국비 지원 기준)</MainHead>
      <ContentContainer>
        <MapContainer />
        {/* <SidoSelect
          sido={sido}
          defaultValue="seoul"
          // onChange={handleSidoChange}
        ></SidoSelect>
        <CenterSelect
          centerName={centerName}
          // onChange={handleCenterChange}
        ></CenterSelect> */}
      </ContentContainer>
    </div>
  );
}

const MainHead = styled.h1`
  text-align: center;
  justify-content: center;
  margin: 5rem;
  padding-bottom: 5rem;

  width: 90%;
  border-bottom: 1px solid lightgray;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export default CounselingCenterPage;
