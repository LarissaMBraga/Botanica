
import type { Plant } from "../../types/plant";
import PlantDetails from "../../components/Plants/PlantDetails";
import JournalEntry from "../../components/Journal/JournalEntry";
import EmptyState from "../../components/Common/EmptyState";
import "./PlantProfile.css";

interface PlantProfileProps {
  plant: Plant;
  onBack: () => void;
  onDelete: (id: string) => void;
  onPhotoUpdate: (image: string) => void;
  onAddNote: () => void;
}

export default function PlantProfile({
  plant,
  onBack,
  onDelete,
  onPhotoUpdate,
  onAddNote
}: PlantProfileProps) {
  return (
    <section className="plant-profile-page">
      <PlantDetails
        plant={plant}
        onBack={onBack}
        onDelete={onDelete}
        onPhotoUpdate={onPhotoUpdate}
        onAddNote={onAddNote}
      />

      <div className="profile-journal">
        <div className="section-title-row">
          <div>
            <span className="eyebrow">GROWTH & MEMORIES</span>
            <h3>Plant journal</h3>
          </div>

          <button className="primary-button" onClick={onAddNote}>
            Add entry
          </button>
        </div>

        {plant.notes.length > 0 ? (
          <div className="journal-timeline">
            {plant.notes.map(note => (
              <JournalEntry key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No memories recorded yet."
            description="Add your first journal entry to document this plant's journey."
            actionLabel="Write first entry"
            onAction={onAddNote}
          />
        )}
      </div>
    </section>
  );
}
