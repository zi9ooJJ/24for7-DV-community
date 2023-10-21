const checkAppJson = (req, res, next) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || !contentType.startsWith("application/json")) {
      res.status(400).send("content-type을 json으로 설정해주세요.");
    }
    next();
  } catch (error) {
    res.status(400);
  }
};

export { checkAppJson };
