import styled from "styled-components";

function AboutDomesticViolencePage() {
  const Titles = ({ title }) => {
    return <HeadStyle> {title} </HeadStyle>;
  };

  const AboutViolence = () => {
    return (
      <DivBox>
        남편과 아내, 부모와 자녀, 형제자매 및 기타 동거가족을 포함한 가족구성원
        중의 한사람이 다른 구성원에게 의도적으로 물리적인 힘을 사용하거나,
        정신적인 학대를 통하여 고통을 주는 행위입니다.
      </DivBox>
    );
  };

  const ViolenceLaw = () => {
    return (
      <DivStyle>
        <DivBox >
          '가정폭력이란 가정구성원 사이의 신체적, 정신적 또는 재산상 피해를
          수반하는 행위를 말합니다.'
        </DivBox>
        <DivBox >
          가정폭력의 범위를 "신체적, 정신적, 또는 재산상 피해를 수반하는 행위"
          로 보고 있어 신체적 폭력에 국한하지 않고 정신적 학대와 재산상의 손해
          및 손괴를 포함하는 포괄적인 폭력 개념을 인정하고 있습니다.
        </DivBox>
      </DivStyle>
    );
  };

  const AboutLaw = () => {
    return (
      <DivBox>
        가정폭력방지 및 피해자보호 등에 관한 법률 가정폭력범죄의 처벌 등에 관한
        특례법
      </DivBox>
    );
  };

  const ViolenceType = () => {
    return (
      <DivStyle>
        <DivBox >
          경미 ------------------------------------------------------{">"}{" "}
          매우심각
        </DivBox>
        <TypeStyle>
          <TypeBox> 신체적 폭력 </TypeBox>{" "}
          <TypeBox> 잡기, 흔들기, 밀치기, 뺨때리기 </TypeBox>{" "}
          <TypeBox> 주먹으로 때리기, 발로차기, 목조르기 </TypeBox>{" "}
          <TypeBox> 흉기 사용 살해하기 </TypeBox>
        </TypeStyle>

        <TypeStyle>
          <TypeBox> 심리/정서적 폭력 </TypeBox>{" "}
          <TypeBox> 말로 상처주기 무시하기 </TypeBox>{" "}
          <TypeBox> 경제적 학대, 구속하기 </TypeBox>{" "}
          <TypeBox> 위협하기, 자살하기 </TypeBox>
        </TypeStyle>

        <TypeStyle>
          <TypeBox> 성적 폭력 </TypeBox>{" "}
          <TypeBox>
            {" "}
            과거 성적인 일 비난, 신체에 대한 비난, 성적으로 비하하는 욕{" "}
          </TypeBox>{" "}
          <TypeBox>
            {" "}
            싫은데도 성행위 요구, 원치않은 성행위 강요, 구타 후 성관계{" "}
          </TypeBox>{" "}
          <TypeBox> 흉기로 위협하여 성관계, 강간 후 살해 </TypeBox>
        </TypeStyle>

        <TypeStyle>
          <TypeBox> 경제적 폭력 </TypeBox>{" "}
          <TypeBox> 경제활동에 대한 심한 간섭 </TypeBox>{" "}
          <TypeBox> 경제활동에 대한 심한 구속, 조롱 </TypeBox>{" "}
          <TypeBox> 수입지출 독점, 독단적인 재산 처분 </TypeBox>
        </TypeStyle>
      </DivStyle>
    );
  };

  const QnA = () => {
    return (
      <DivStyle>
        <QustionBox>
          {" "}
          Q. 누군가 맞고있다면 맞아도 될만한 행동을 한 것이다?{" "}
        </QustionBox>
        <AnswerBox>
          {" "}
          A. NO. 부부싸움 과정에서 일어난 폭력은 어떠한 이유에서라도 정당화될 수
          없습니다.
        </AnswerBox>

        <QustionBox>
          {" "}
          Q. 상대방에게 심한 말을 했어도 겉으로 상처가 난 폭력이 아니라면 그것은
          폭력이 아니다?{" "}
        </QustionBox>
        <AnswerBox>
          {" "}
          A. NO. 언어적 폭력도 상대방에게 큰 상처가 되는 폭력이고, 이러한
          언어폭력이 중한 폭력으로 이어지게 됩니다.{" "}
        </AnswerBox>

        <QustionBox>
          {" "}
          Q. 이 정도를 가정폭력이라고 하면 처벌받지 않을 폭력이 어디 있나요?{" "}
        </QustionBox>
        <AnswerBox>
          {" "}
          A. NO. 경미한 폭력도 가정폭력입니다. 미미한 폭력의 시작이 결국 생명에
          위협을 주는 폭력으로 커질 수 밖에 없습니다.{" "}
        </AnswerBox>

        <QustionBox> Q. 부부폭력은 누가 신고할 수 있나요? </QustionBox>
        <AnswerBox>
          {" "}
          A. 일반적으로 범죄사실을 알고 있는 사람은 누구든지 신고할 수 있는
          것이지만 특례법은 이를 특히 강조하여 '누구든지 가정폭력범죄를 알게 될
          때에는 수사기관에 신고할 수 있다'고 명시해 놓고 있습니다. (제4조 1항).
        </AnswerBox>

        <QustionBox> Q. 신고하면 경찰이 어떤 도움을 주나요? </QustionBox>
        <AnswerBox>
          {" "}
          A. 부부간 폭력 아동학대, 노인학대 등 진행 중인 가정폭력범죄에 대하여
          신고를 받은 사법경찰관리는 즉시 현장에 출동하여 다음과 같은 조치를
          취해야 합니다.
        </AnswerBox>
        <ExampleBox>
          {" "}
          <ExampleText>
            {" "}
            01. 폭력행위를 제지시키고 범죄를 수사합니다. 그리고 피해자의 동의가
            있는 경우에는 피해자를 가정폭력관련 상담소나 보호시설로 인도하고
            (제5조 1호, 2호) 만약 긴급치료가 필요한 피해자는 병원 등의
            의료기관으로 인도하게 됩니다. (제5조 3호){" "}
          </ExampleText>
          <ExampleText>
            {" "}
            02. 폭력행위 재발 시는 격리 또는 접근금지 등의 임시조치를 신청할 수
            있음을 가해자에게 통보합니다. (제5조 4호)
          </ExampleText>
          <ExampleText>
            {" "}
            03. 위와 같은 응급조치에도 불구하고 가정폭력범죄가 재발할 우려가
            있다고 인정될 때에는 사법경찰관리는 검사에 대하여 법원에 임시조치를
            청구하여 줄 것을 신청할 수 있는데(제8조), 그때의 임시조치로는
            피해자나 가정구성원이 살거나 점유하는 방으로부터의 퇴거 등 격리나
            (제29조 1항 1호), 피해자의 주거, 직장 등에서 100미터 이내의
            접근금지명령 등이 있습니다.(제29조 1항 2호)
          </ExampleText>
        </ExampleBox>

        <QustionBox> Q. 법원의 임시조치 종류는 무엇인가요? </QustionBox>
        <AnswerBox>
          {" "}
          A. 가정보호사건에 있어 법원은 사건의 원활한 조사, 심리 또는 피해자의
          보호를 위하여 필요하다고 인정될 때에는 아래와 같은 임시조치 중
          한가지를 할 수 있습니다.
        </AnswerBox>
        <ExampleBox>
          {" "}
          <ExampleText>
            {" "}
            01. 가해자를 피해자 또는 가정구성원의 주거 또는 점유하는
            방으로부터의 퇴거 등 격리시킬 수 있다. (제29조 1항 1호){" "}
          </ExampleText>
          <ExampleText>
            {" "}
            02. 피해자의 주거, 직장 등에서 100미터 이내의 접근을 금지시킬 수
            있다.(제29조 1항 2호)
          </ExampleText>
          <ExampleText> 03. 의료기관이나 기타 요양소에 위탁. (제29조 1항 3호)</ExampleText>
          <ExampleText>
            {" "}
            04. 경찰관서의 유치장 또는 구치소에 유치할 수 있습니다. (제29조 1항
            4호)
          </ExampleText>
          <ExampleText>
            {" "}
            *격리 및 접근금지 기간은 2월을, 위탁 및 유치 기간은 1월을 초과할 수
            없습니다. 단 피해자를 위하여 필요할 때에는 1차에 한하여 연장할 수
            있습니다. (제29조 5항)
          </ExampleText>
        </ExampleBox>
      </DivStyle>
    );
  };

  return (
    <Container>
      <MainHead>가정폭력의 정의</MainHead>

      <Titles title={"가정폭력이란"}></Titles>
      <AboutViolence />
      <Titles title={"법에서 정의하는 가정폭력은?"}></Titles>
      <ViolenceLaw />
      <Titles title={"관련법"}></Titles>
      <AboutLaw />
      <Titles title={"가정폭력의 유형"}></Titles>
      <ViolenceType />
      <Titles title={"가정폭력 바로알기 Q&A"}></Titles>
      <QnA />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainHead = styled.h1`
  text-align: center;
  justify-content: center;
  margin: 5rem;
  padding-bottom: 5rem;

  width: 90%;
  border-bottom: 1px solid lightgray;
`;

const HeadStyle = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin: 3rem 0 1rem 0;

  font-size: 1.75rem;
`;

const DivStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 75px;
  

  height: auto;
`;

const TypeStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: auto;
`;

const TypeBox = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 8rem;
  border: 1px solid black;
  margin: 15px 30px 0 0;
  padding: 0.2rem;
  text-align: center;

  font-size: 1.3rem;
  
`;

const QustionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background: #c5d4c6;

  width: 80%;
  height: 2rem;
  padding: 1rem;
  margin: 0.5rem;

  font-size: 1.5rem;
`;

const AnswerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0.5rem;

  width: 80%;
  height: 3rem;
  padding: 1rem;

  font-size: 1.5rem;
`;

const ExampleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: auto;
  padding: 1rem;
  gap: 0.5rem;
  margin: 0.5rem;

  font-size: 1.5rem;
`;

const DivBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin: 0.5rem;
  text-align: center;

  font-size: 1.5rem;

  width: 90%;
`

const ExampleText = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;

  width: 100%;
  height: auto;
  padding: 1rem;
  gap: 0.5rem;

  font-size: 1.5rem;
  color: green;
`

export default AboutDomesticViolencePage;
