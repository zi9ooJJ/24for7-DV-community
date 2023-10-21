import DaumPostcode from "react-daum-postcode";
import React from "react";
import styled from "styled-components";

function DaumPost({ done }) {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? `(${extraAddress})` : "";
    }
    done(data);
  };
  return (
    <div>
      <DaumPostcode
        className="postcode"
        autoClose
        onComplete={handleComplete}
      />
    </div>
  );
}

export default DaumPost;

const postcode = styled.div`
  position: fixed;
  background: "white";
  border: 1px solid "black";
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
`;
