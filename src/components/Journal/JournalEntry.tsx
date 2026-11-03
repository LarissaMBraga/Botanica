
import { CalendarDays } from "lucide-react";
import type { PlantNote } from "../../types/plant";

interface JournalEntryProps {
  note: PlantNote;
}

export default function JournalEntry({ note }: JournalEntryProps) {
  const date = new Date(note.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <article className="journal-entry">
      <div className="journal-entry-marker">
        <span />
      </div>

      <div className="journal-entry-content">
        <div className="journal-entry-date">
          <CalendarDays size={14} />
          <span>{date}</span>
        </div>

        <p>{note.content}</p>

        {note.image && (
          <div className="journal-entry-image">
            <img src={note.image} alt="Plant journal update" />
          </div>
        )}
      </div>
    </article>
  );
}
