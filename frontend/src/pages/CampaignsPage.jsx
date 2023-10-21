import styled from "styled-components";
import blackdotImg from "../images/blackdot.jpg";
import blackdot2Img from "../images/blackdot2.jpg";
import violenceSignImg from "../images/violenceSign.jpg";

function CampaignsPage() {
  const Blackdot = () => {
    return (
      <Container>
        <img style={{ width: "30%" }}src={blackdotImg} alt="blackdotImage_01" />
        <img style={{ width: "30%" }}src={blackdot2Img} alt="blackdotImage_02" />
        <TextBox>
          <h2>블랙닷 캠페인 (Black Dot Campaigne)</h2>
          <div>
            블랙닷 캠페인은 2015년 영국에서 시작된 캠페인입니다. 폭력을 당하고
            있다고 하더라도, 가족이거나 친밀한 사람이라면 보복 등이 무서워서
            경찰에 고발하기 어려운 경우가 있습니다. 이런 가정폭력, 남들에게
            알려지기 어려운 폭력에 노출된 사람들을 돕기 위해 시작된
            캠페인입니다.
          </div>

          <div>
            방법은 아주 간단한데, 손바닥에 검은 점을 찍어서 누군가에게
            보여주기만 하면 됩니다. 손바닥 위의 검은 점을 발견한 사람이 대신
            경찰에 신고해서 도움을 받을 수 있도록 하는 사회적 시그널입니다.
          </div>
          <div>
            밖으로 알려지기 어려운 폭력을 당하는 사람들은 많이 위축되어 있고,
            스스로 벗어날 방법을 찾지 못해서 헤매기도 하기 때문에, 구조요청을 할
            수 있는 작은 방법이 있다는 사실만으로도 큰 위로가 되고, 도움을 받을
            수 있는 가능성이 올라가게 됩니다.
          </div>
        </TextBox>
      </Container>
    );
  };

  const ViolenceSign = () => {
    return (
      <SecondContainer>
        <img
          style={{ width: "50%" }}
          src={violenceSignImg}
          alt="violenceSign_01"
        />
        <TextBox>
          <h2>도움이 필요해요 ( Signal For Help )</h2>
          <div>
            '가정폭력 피해자는 언제 어디서든 상대방에게 손바닥을 보여준 후,
            엄지손가락을 먼저 접은 뒤, 나머지 손가락을 접어 주먹을 쥐면 된다.'
          </div>
          <div>
            캐나다 여성재단의 유튜브에 올라온 'Signal For Help' 라는 제목의 30초
            영상에 담겨있던 이 손동작은, 현실에서도 간단한 방법으로 가정폭력
            피해를 알릴 수 있도록 고안됐다. 가정폭력 피해자들은 가해자와 같은
            공간에서 오랜 시간 함께 하거나, 평상시에도 강도 높은 감시가 이뤄질
            가능성이 높다. 따라서 기록이 남는 전화나 문자, 이메일 등을 사용하여
            외부에 도움을 요청하기에는 많은 현실적 부담이 뒤따를 수 있다.
          </div>
          <div>
            캐나다 여성재단은 위 영상을 통해 "고립은 가정 폭력의 위험을 증가시킬
            수 있으며, 이런 경우에 도움이 필요하다는 것을 알리기 위해 화상
            통화에 이 신호를 사용할 것은 권장한다"고 전했다.
          </div>
        </TextBox>
      </SecondContainer>
    );
  };

  return (
    <>
      <MainHead> 캠페인 소개 </MainHead>
      <Blackdot />
      <ViolenceSign />
    </>
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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 3rem;
  padding-bottom: 3rem;
  gap: 2rem;

  border-bottom: 1px solid lightgray;

  font-size: 1.5rem;
  width: 95%;
`;

const SecondContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  align-items: center;
  margin: 3rem;
  gap: 2rem;
  
  width: 95%;
`;

const TextBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 2rem;
  width: 60rem;

  color: darkgreen;
  font-size: 1.5rem;
`;

export default CampaignsPage;
