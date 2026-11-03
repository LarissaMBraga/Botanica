
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp"
];

export function readImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      reject(new Error("Please select a PNG, JPG or WEBP image."));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      reject(new Error("Image size must be smaller than 5 MB."));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Unable to read this image."));
      }
    };

    reader.onerror = () => {
      reject(new Error("An error occurred while reading the image."));
    };

    reader.readAsDataURL(file);
  });
}
