const adminOnly = (req, res, next) => {
  const userRole = req.user.role;

  try {
    if (userRole !== "admin") {
      throw new Error("관리자 권한이 없습니다.");
    }
    next();
  } catch (error) {
    res.status(403);
  }
};

export { adminOnly };
