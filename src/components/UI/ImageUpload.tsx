
import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { readImage } from "../../utils/imageUtils";

interface ImageUploadProps {
  value: string;
  onChange: (image: string) => void;
  error?: string;
}

export default function ImageUpload({
  value,
  onChange,
  error
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState("");

  async function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileError("");

    try {
      const image = await readImage(file);
      onChange(image);
    } catch (error) {
      setFileError(
        error instanceof Error
          ? error.message
          : "Unable to upload this image."
      );
    }

    event.target.value = "";
  }

  function removeImage() {
    onChange("");
    setFileError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="image-upload">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleChange}
        hidden
      />

      {value ? (
        <div className="image-upload-preview">
          <img src={value} alt="Selected plant" />

          <button
            type="button"
            className="image-remove"
            onClick={removeImage}
            aria-label="Remove image"
          >
            <X size={17} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="image-upload-trigger"
          onClick={() => inputRef.current?.click()}
        >
          <ImagePlus size={23} />
          <strong>Choose an image</strong>
          <span>PNG, JPG or WEBP · Up to 5 MB</span>
        </button>
      )}

      {(fileError || error) && (
        <span className="field-error">{fileError || error}</span>
      )}
    </div>
  );
}
