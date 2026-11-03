
import type { PlantFormData } from "../types/plant";
import { isFutureDate } from "./dateUtils";

export type PlantFormErrors = Partial<
  Record<keyof PlantFormData, string>
>;

export function validatePlantForm(
  form: PlantFormData
): PlantFormErrors {
  const errors: PlantFormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter a plant name.";
  }

  if (!form.species.trim()) {
    errors.species = "Please enter the plant species.";
  }

  if (!form.plantedAt) {
    errors.plantedAt = "Please select a planting date.";
  } else if (isFutureDate(form.plantedAt)) {
    errors.plantedAt = "The planting date cannot be in the future.";
  }

  if (
    !Number.isInteger(form.wateringFrequency) ||
    form.wateringFrequency < 1 ||
    form.wateringFrequency > 365
  ) {
    errors.wateringFrequency = "Enter a frequency between 1 and 365 days.";
  }

  if (!form.description.trim()) {
    errors.description = "Please add a short description.";
  }

  return errors;
}
