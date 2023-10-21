import jwt from "jsonwebtoken";
import { userService } from "../services";

const loginRequired = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token || token === "null") {
    return res.status(401).send(`Access 토큰이 없음`);
  }

  try {
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    // Access Token이 만료까지 5분 이하인 경우에만 Access Token 재발급
    const currentTime = Math.floor(Date.now() / 1000);
    if (user.exp - currentTime <= 300) {
      const newAccessToken = await userService.generateAccessToken(user);
      res.setHeader("Authorization", "Bearer " + newAccessToken);
    }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).send(`Refresh 토큰이 없음`);
      }

      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
        );

        const storedToken = await userService.getTokenByUserId(decoded.userId);

        if (!storedToken) {
          return res.status(401).send(`DB에 해당 id의 토큰이 없음`);
        }

        if (storedToken.token !== refreshToken) {
          return res
            .status(401)
            .send(`DB의 토큰과 Cookie의 토큰이 일치하지 않음`);
        }

        const user = await userService.getUserById(decoded.userId);
        const accessToken = await userService.generateAccessToken(user);

        const newRefreshToken = await userService.generateRefreshToken(user);
        const cookieOptions = {
          // httpOnly: true,
          // secure: true,
          // sameSite: "strict",
        };

        res.cookie("refreshToken", newRefreshToken, cookieOptions);

        await userService.updateRefreshToken(user._id, newRefreshToken);
        req.user = { userId: user._id, role: user.role };
        res.setHeader("Authorization", "Bearer " + accessToken);
        console.log(
          "Access Token이 만료되고, Refresh 검증 후, 쿠키를 변경했습니다.",
        );
        next();
      } catch (error) {
        return res.status(401).send(error.message);
      }
    } else {
      return res.status(401).send(error.message);
    }
  }
};

export { loginRequired };
