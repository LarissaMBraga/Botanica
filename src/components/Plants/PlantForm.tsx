
import { useState, type FormEvent, type ChangeEvent } from "react";
import { Leaf, X } from "lucide-react";
import type { PlantCategory, PlantFormData } from "../../types/plant";
import { plantCategories } from "../../data/plantCategories";
import { validatePlantForm } from "../../utils/validation";
import ImageUpload from "../UI/ImageUpload";
import Button from "../UI/Button";
import Input from "../UI/Input";

interface PlantFormProps {
  onSubmit: (data: PlantFormData) => Promise<void>;
  onCancel: () => void;
}

const initialForm: PlantFormData = {
  name: "",
  species: "",
  category: "Indoor",
  plantedAt: "",
  wateringFrequency: 7,
  description: "",
  image: ""
};

export default function PlantForm({
  onSubmit,
  onCancel
}: PlantFormProps) {
  const [form, setForm] = useState<PlantFormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function updateField<K extends keyof PlantFormData>(
    field: K,
    value: PlantFormData[K]
  ) {
    setForm(current => ({ ...current, [field]: value }));

    setErrors(current => {
      const updated = { ...current };
      delete updated[field];
      return updated;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validatePlantForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      await onSubmit(form);
      setForm(initialForm);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="plant-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <span className="eyebrow">GROW YOUR COLLECTION</span>
          <h3>Add a new plant</h3>
          <p>Tell us a little about your new green friend.</p>
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

      <div className="form-grid">
        <Input
          label="Plant name"
          name="name"
          placeholder="e.g. Monstera"
          value={form.name}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateField("name", event.target.value)
          }
          error={errors.name}
          required
        />

        <Input
          label="Species"
          name="species"
          placeholder="e.g. Monstera deliciosa"
          value={form.species}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateField("species", event.target.value)
          }
          error={errors.species}
          required
        />

        <div className="form-field">
          <label htmlFor="plant-category">Category</label>
          <select
            id="plant-category"
            value={form.category}
            onChange={event =>
              updateField("category", event.target.value as PlantCategory)
            }
          >
            {plantCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Planting date"
          name="plantedAt"
          type="date"
          value={form.plantedAt}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateField("plantedAt", event.target.value)
          }
          error={errors.plantedAt}
          required
        />

        <Input
          label="Watering frequency (days)"
          name="wateringFrequency"
          type="number"
          min="1"
          max="365"
          value={String(form.wateringFrequency)}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateField("wateringFrequency", Number(event.target.value))
          }
          error={errors.wateringFrequency}
          required
        />

        <div className="form-field form-field-full">
          <label htmlFor="plant-description">Description</label>
          <textarea
            id="plant-description"
            placeholder="What makes this plant special?"
            value={form.description}
            onChange={event =>
              updateField("description", event.target.value)
            }
            rows={3}
          />
          {errors.description && (
            <span className="field-error">{errors.description}</span>
          )}
        </div>

        <div className="form-field form-field-full">
          <label>Plant photo</label>
          <ImageUpload
            value={form.image}
            onChange={image => updateField("image", image)}
            error={errors.image}
          />
        </div>
      </div>

      {submitError && (
        <div className="form-error-banner">{submitError}</div>
      )}

      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" loading={loading} disabled={loading}>
          <Leaf size={16} />
          {loading ? "Adding plant..." : "Add plant"}
        </Button>
      </div>
    </form>
  );
}
