import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../images/logo_transparent.png";

function NavigationBar() {
  const menuObj = [
    {
      name: "24/7 소개",
      path: "/aboutus",
    },
    {
      name: "가정폭력이란?",
      path: "/aboutdomesticviolence",
    },
    {
      name: "이야기 광장",
      path: "/posts",
    },
    {
      name: "상담소 찾기",
      path: "/counselingcenter",
    },
    {
      name: "캠페인",
      path: "/campaigns",
    },
  ];

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    window.location.href = "/";
  };

  return (
    <NavContainer>
      <Link to="/">
        <LogoImg src={logo} alt="logo"></LogoImg>
      </Link>
      <Container>
        <MypageLogoutWrapper>
          {role === "admin" ? (
            <>
              <StyledLink to="/admin">관리자페이지</StyledLink>
              <StyledLink onClick={handleLogout}>로그아웃</StyledLink>
            </>
          ) : token ? (
            <>
              <div>
                {role === "support" || role === "pending"
                  ? `${email.split("@")[0]} 서포터님, 반갑습니다.`
                  : role === "admin"
                  ? "관리자님, 반갑습니다."
                  : `${email.split("@")[0]} 유저님, 반갑습니다.`}
              </div>
              <StyledLink2 to="/users/mypage">마이페이지</StyledLink2>
              <StyledLink2 onClick={handleLogout}>로그아웃</StyledLink2>
            </>
          ) : (
            <>
              <StyledLink to="/users/register">회원가입</StyledLink>
              <StyledLink to="/users/login">로그인</StyledLink>
            </>
          )}
        </MypageLogoutWrapper>
        <MenuWrapper>
          {menuObj.map(({ name, path }) => (
            <StyledLink to={path} key={path}>
              <div key={name}>{name}</div>
            </StyledLink>
          ))}
        </MenuWrapper>
      </Container>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 200px;
  background-color: #447348;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: right;

  margin: 20px 330px 40px 0;

  width: 100%;
  font-size: 30px;
  gap: 40px;
`;

const MypageLogoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 50px 0;
  margin-left: auto;
  gap: 20px;

  width: 450px;
  height: 30px;

  background-color: #c5d4c6;
  border-radius: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover {
    color: #baeb34;
  }
`;

const StyledLink2 = styled(Link)`
  text-decoration: none;
  color: darkblue;
  &:hover {
    color: yellow;
  }
`;

const LogoImg = styled.img`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 20px 20px 40px;

  width: 130px;
  height: 140px;
  background-color: #6ca671;

  border-radius: 100%;
  border: 10px solid white;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
`;

export default NavigationBar;
