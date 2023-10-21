import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Chat from "./components/commons/Chat";
import styled from "styled-components";

const Layout = lazy(() => import("./components/commons/Layout"));
const MainPage = lazy(() => import("./pages/MainPage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const AboutDomesticViolencePage = lazy(() =>
  import("./pages/AboutDomesticViolencePage")
);
const CommunityMainPage = lazy(() =>
  import("./pages/Community/CommunityMainPage")
);
const PostPage = lazy(() => import("./pages/Community/PostPage"));
const PostingPage = lazy(() => import("./pages/Community/PostingPage"));
const ModifyPage = lazy(() => import("./pages/Community/ModifyPage"));
const CounselingCenterPage = lazy(() => import("./pages/CounselingCenterPage"));
const CampaignsPage = lazy(() => import("./pages/CampaignsPage"));
const Register = lazy(() => import("./pages/Register"));
const ChangeUserInfo = lazy(() =>
  import("./components/pages/users/ChangeUserInfo")
);
const UserLoginForm = lazy(() =>
  import("./components/pages/users/UserLoginForm")
);
const UserWithdrawal = lazy(() =>
  import("./components/pages/users/UserWithdrawal")
);
const ChangePassword = lazy(() =>
  import("./components/pages/users/ChangePassword")
);
const AdminMain = lazy(() => import("./pages/AdminMain"));
const MyPosts = lazy(() => import("./components/pages/users/MyPosts"));

const MyPage = lazy(() => import("./pages/MyPage"));
const AdminUserDB = lazy(() => import("./components/pages/admin/AdminUserDB"));
const RequestApprove = lazy(() =>
  import("./components/pages/admin/RequestApprove")
);

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <p
            style={{
              "text-align": "center",
              "font-size": "50px",
              "line-height": "600px",
            }}
          >
            {" "}
            Loading...
          </p>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/aboutus" element={<AboutUsPage />} />
            <Route
              path="/aboutdomesticviolence"
              element={<AboutDomesticViolencePage />}
            />
            <Route path="/posts" element={<CommunityMainPage />} />
            <Route path="/posts/:_id" element={<PostPage />} />
            <Route path="/posts/write" element={<PostingPage />} />
            <Route path="/posts/modify/:_id" element={<ModifyPage />} />
            <Route
              path="/posts/category/:category"
              element={<CommunityMainPage />}
            />
            <Route
              path="/counselingcenter"
              element={<CounselingCenterPage />}
            />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/users/register" element={<Register />} />
            <Route path="/users/mypage" element={<MyPage />} />
            <Route path="/users/changeuserinfo" element={<ChangeUserInfo />} />
            <Route path="/users/login" element={<UserLoginForm />} />
            <Route path="/users/userwithdrawal" element={<UserWithdrawal />} />
            <Route path="/users/changepassword" element={<ChangePassword />} />
            <Route path="/admin" element={<AdminMain />} />
            <Route path="/users/myposts" element={<MyPosts />} />
            <Route path="/users/mypage" element={<MyPage />} />
            <Route path="/admin/userdb" element={<AdminUserDB />} />
            <Route path="/admin/requestapprove" element={<RequestApprove />} />
          </Route>
        </Routes>
      </Suspense>
      <ChatWrapper>
        <Chat />
      </ChatWrapper>
    </Router>
  );
}

const ChatWrapper = styled.div`
  display: flex;
  position: fixed;
  right: 10px;
  bottom: 30px;
`;

export default App;
