import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import path from "node:path";
import { maxFileSize } from "../middleware/uploadMiddleware.js";

const serverDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const storageDirectory = path.resolve(serverDirectory, process.env.CV_STORAGE_PATH || "uploads/cvs");

function getUploadedFiles(request) {
  return Object.values(request.files || {}).flat();
}

function isPdf(file) {
  return file.mimetype === "application/pdf" && file.buffer.subarray(0, 5).toString() === "%PDF-";
}

export async function uploadCVs(request, response, next) {
  try {
    const files = getUploadedFiles(request);

    if (files.length === 0) {
      const error = new Error("At least one PDF file is required");
      error.statusCode = 400;
      throw error;
    }

    const invalidFile = files.find((file) => file.size > maxFileSize || !isPdf(file));
    if (invalidFile) {
      const error = new Error(
        invalidFile.size > maxFileSize
          ? `File exceeds the ${Math.floor(maxFileSize / 1024 / 1024)} MB size limit`
          : "The uploaded file is not a valid PDF",
      );
      error.statusCode = 400;
      throw error;
    }

    await fs.mkdir(storageDirectory, { recursive: true });
    const storedFiles = [];

    for (const file of files) {
      const storedName = `${crypto.randomUUID()}.pdf`;
      await fs.writeFile(path.join(storageDirectory, storedName), file.buffer, { flag: "wx" });
      storedFiles.push({
        originalName: file.originalname,
        fileName: storedName,
        mimeType: file.mimetype,
        size: file.size,
      });
    }

    response.status(201).json({
      message: `${storedFiles.length} CV file(s) uploaded successfully`,
      files: storedFiles,
    });
  } catch (error) {
    next(error);
  }
}