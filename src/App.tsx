
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { usePlants } from "./hooks/usePlants";
import type { Plant, PlantFormData } from "./types/plant";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./components/Plants/Plants.css";
import "./App.css";

const MyPlants = lazy(() => import("./pages/MyPlants/MyPlants"));
const PlantProfile = lazy(() => import("./pages/PlantProfile/PlantProfile"));
const PlantForm = lazy(() => import("./components/Plants/PlantForm"));
const JournalForm = lazy(() => import("./components/Journal/JournalForm"));
const Modal = lazy(() => import("./components/Common/Modal"));

type Page = "dashboard" | "plants";

interface ToastData {
  message: string;
  type: "success" | "error";
}

function App() {
  const {
    plants,
    addPlant,
    updatePlant,
    deletePlant,
    addNote
  } = usePlants();

  const [page, setPage] = useState<Page>("dashboard");
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [showPlantForm, setShowPlantForm] = useState(false);
  const [showJournalForm, setShowJournalForm] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  const selectedPlant = useMemo(
    () => plants.find(plant => plant.id === selectedPlantId) ?? null,
    [plants, selectedPlantId]
  );

  const totalNotes = useMemo(
    () => plants.reduce((total, plant) => total + plant.notes.length, 0),
    [plants]
  );

  useEffect(() => {
    if (!toast) return;

    const timeout = window.setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [toast]);

  function notify(message: string, type: ToastData["type"] = "success") {
    setToast({ message, type });
  }

  function navigate(nextPage: Page) {
    setPage(nextPage);
    setSelectedPlantId(null);
    setMobileMenu(false);
  }

  function openPlant(plant: Plant) {
    setSelectedPlantId(plant.id);
    setShowJournalForm(false);
  }

  async function handlePlantSubmit(data: PlantFormData) {
    try {
      addPlant(data);
      setShowPlantForm(false);
      notify("Your new plant has been added!");
    } catch {
      notify("Unable to add your plant. Please try again.", "error");
      throw new Error("Plant creation failed.");
    }
  }

  async function handleJournalSubmit(content: string, image?: string) {
    if (!selectedPlant) {
      throw new Error("No plant selected.");
    }

    try {
      addNote(selectedPlant.id, content, image);
      setShowJournalForm(false);
      notify("Journal entry saved!");
    } catch {
      notify("Unable to save your journal entry.", "error");
      throw new Error("Journal entry creation failed.");
    }
  }

  function handlePhotoUpdate(image: string) {
    if (!selectedPlant) return;

    try {
      updatePlant(selectedPlant.id, { image });
      notify("Plant photo updated!");
    } catch {
      notify("Unable to update the plant photo.", "error");
    }
  }

  function handleDeletePlant() {
    if (!selectedPlant) return;

    try {
      deletePlant(selectedPlant.id);
      setSelectedPlantId(null);
      setPage("plants");
      notify("Plant removed from your collection.");
    } catch {
      notify("Unable to remove this plant.", "error");
    }
  }

  const pageTitle = selectedPlant
    ? selectedPlant.name
    : page === "dashboard"
      ? "Overview"
      : "My plants";

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        plantCount={plants.length}
        mobileMenu={mobileMenu}
        onNavigate={navigate}
        onClose={() => setMobileMenu(false)}
      />

      <main className="main-area">
        <Header
          title={pageTitle}
          onMenuClick={() => setMobileMenu(true)}
          onNotify={() => notify("You're all caught up!")}
        />

        <div className="page-content">
          <Suspense fallback={null}>
            {selectedPlant ? (
              <PlantProfile
                plant={selectedPlant}
                onBack={() => setSelectedPlantId(null)}
                onDelete={handleDeletePlant}
                onPhotoUpdate={handlePhotoUpdate}
                onAddNote={() => setShowJournalForm(true)}
              />
            ) : page === "dashboard" ? (
              <Dashboard
                plants={plants}
                totalNotes={totalNotes}
                onAdd={() => setShowPlantForm(true)}
                onViewAll={() => navigate("plants")}
                onSelect={openPlant}
              />
            ) : (
              <MyPlants
                plants={plants}
                onSelect={openPlant}
                onAdd={() => setShowPlantForm(true)}
              />
            )}
          </Suspense>
        </div>

        <Footer />
      </main>

      <Suspense fallback={null}>
        <AnimatePresence>
          {showPlantForm && (
            <Modal
              title="Add a new plant"
              subtitle="A new little life for your collection."
              onClose={() => setShowPlantForm(false)}
            >
              <PlantForm
                onSubmit={handlePlantSubmit}
                onCancel={() => setShowPlantForm(false)}
              />
            </Modal>
          )}

          {showJournalForm && selectedPlant && (
            <Modal
              title="New journal entry"
              subtitle={`Record a new moment in ${selectedPlant.name}'s journey.`}
              onClose={() => setShowJournalForm(false)}
            >
              <JournalForm
                onSubmit={handleJournalSubmit}
                onCancel={() => setShowJournalForm(false)}
              />
            </Modal>
          )}

          {toast && (
            <motion.div
              className={`toast ${toast.type === "error" ? "toast-error" : ""}`}
              role="status"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {toast.type === "success" ? (
                <CheckCircle2 size={18} />
              ) : (
                <XCircle size={18} />
              )}
              <span>{toast.message}</span>
              <button
                type="button"
                onClick={() => setToast(null)}
                aria-label="Dismiss notification"
              >
                Ã—
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Suspense>
    </div>
  );
}

export default App;
