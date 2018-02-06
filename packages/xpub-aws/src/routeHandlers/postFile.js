module.exports = async (req, res) => {
  if (req.fileValidationError !== undefined) {
    return res.status(400).json({ error: req.fileValidationError })
  }
  res.status(200).json({
    id: req.file.key,
    name: req.file.originalname,
    size: req.file.size,
  })
}
