
import { useState, type FormEvent } from "react";
import { ImagePlus, X } from "lucide-react";
import ImageUpload from "../UI/ImageUpload";
import Button from "../UI/Button";

interface JournalFormProps {
  onSubmit: (content: string, image?: string) => Promise<void>;
  onCancel: () => void;
}

export default function JournalForm({
  onSubmit,
  onCancel
}: JournalFormProps) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!content.trim()) {
      setError("Please write something about your plant.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onSubmit(content.trim(), image || undefined);
      setContent("");
      setImage("");
    } catch {
      setError("Unable to save your journal entry. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="journal-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <span className="eyebrow">CAPTURE THE MOMENT</span>
          <h3>New journal entry</h3>
          <p>Record a little update about your plant.</p>
        </div>

        <button
          type="button"
          className="form-close"
          onClick={onCancel}
          aria-label="Close form"
        >
          <X size={20} />
        </button>
      </div>

      <div className="form-field">
        <label htmlFor="journal-content">Your notes</label>
        <textarea
          id="journal-content"
          rows={5}
          placeholder="What's happening with your plant today?"
          value={content}
          onChange={event => {
            setContent(event.target.value);
            setError("");
          }}
        />
        {error && <span className="field-error">{error}</span>}
      </div>

      <div className="form-field">
        <label>Attach a photo</label>
        <ImageUpload value={image} onChange={setImage} />
      </div>

      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" loading={loading} disabled={loading}>
          <ImagePlus size={16} />
          {loading ? "Saving entry..." : "Save entry"}
        </Button>
      </div>
    </form>
  );
}
