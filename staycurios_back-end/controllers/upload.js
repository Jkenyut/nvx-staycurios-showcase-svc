exports.upload = (req, res, next) => {
  if (!req.file) {
    return res.status(200).send({
      message: "File not stored",
      data: "only format jpg, jpeg, and png (max size a file 3 MB)",
    });
  }
  filePath = req.file.path.replace("\\", "/");
  return res.status(201).json({
    message: "file stored",
    data: "success",
    filePath: filePath.replace("\\", "/"),
  });
};
