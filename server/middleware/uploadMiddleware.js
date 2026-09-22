import multer from "multer";

const maxFileSize = Number(process.env.MAX_CV_FILE_SIZE_BYTES) || 10 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxFileSize,
    files: 20,
  },
  fileFilter: (_request, file, callback) => {
    if (file.mimetype !== "application/pdf") {
      const error = new Error("Only PDF files are allowed");
      error.statusCode = 400;
      return callback(error);
    }

    callback(null, true);
  },
});

export const uploadCVFiles = upload.fields([
  { name: "files", maxCount: 20 },
  { name: "file", maxCount: 1 },
]);

export { maxFileSize };