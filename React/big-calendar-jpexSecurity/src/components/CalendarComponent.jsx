import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import EventPopUp from "./EventPopUp";
import MissionsCard from "./MissionCard";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop.default ? withDragAndDrop.default(Calendar) : withDragAndDrop(Calendar);

const initialEvents = [
  { id: 1, missionId: 1, title: "Mansa: Design UI", start: new Date(moment().set({ hour: 9 })), end: new Date(moment().set({ hour: 11 })), color: "#4f46e5" },
  { id: 2, missionId: 2, title: "API: Refonte", start: new Date(moment().add(1, 'day').set({ hour: 14 })), end: new Date(moment().add(1, 'day').set({ hour: 16 })), color: "#10b981" },
];

export default function CalendarComponent() {
  const [events, setEvents] = useState(initialEvents);
  const [selectedMission, setSelectedMission] = useState(null);
  const [isOpenEvent, setIsOpenEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);



  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: `${event.color}20`,
      color: event.color,
      borderLeft: `5px solid ${event.color}`,
      borderRadius: '12px',
      fontWeight: '600'
    }
  });

  
  // Dans CalendarComponent.jsx

const handleMissionSelect = (mission) => {
  // Si mission est null (clic sur "Tous"), on réinitialise
  if (!mission) {
    setSelectedMission(null);
    return;
  }
  
  // Sinon, on fait le toggle classique
  setSelectedMission(prev => prev?.id === mission.id ? null : mission);
};

// Rappel de la logique de filtrage qui réagit au null :
const displayEvents = selectedMission 
  ? events.filter(ev => ev.missionId === selectedMission.id)
  : events; // ✅ Si selectedMission est null, on renvoie tout.

  const moveEvent = ({ event, start, end }) => {
    setEvents(prev => prev.map(ev => ev.id === event.id ? { ...ev, start, end } : ev));
  };

  const handleSave = (data) => {
    if (data.id) {
      setEvents(prev => prev.map(ev => ev.id === data.id ? { ...ev, ...data } : ev));
    } else {
      setEvents(prev => [...prev, { ...data, id: Date.now(), color: selectedMission?.color || "#4f46e5", missionId: selectedMission?.id }]);
    }
    setIsOpenEvent(false);
  };

  return (
    <div className="main-wrapper">
      {/* 1. Carte des Missions */}
      <div className="side-panel">
        <MissionsCard 
          onMissionSelect={handleMissionSelect} 
          activeMissionId={selectedMission?.id} 
        />
      </div>

      {/* 2. Calendrier */}
      <div className="calendar-container">
        <h2 className="title-text">
          {selectedMission ? `Planning : ${selectedMission.name}` : "Calendrier Global"}
        </h2>
        
        <div className="calendar-box">
          <DnDCalendar
            localizer={localizer}
            events={displayEvents}
            eventPropGetter={eventStyleGetter}
            onEventDrop={moveEvent}
            onSelectEvent={(ev) => { setSelectedEvent(ev); setIsOpenEvent(true); }}
            onSelectSlot={(slot) => { setSelectedDate(slot.start); setSelectedEvent(null); setIsOpenEvent(true); }}
            selectable
            resizable
          />
        </div>
      </div>

      {isOpenEvent && (
        <EventPopUp 
          isOpen={isOpenEvent} 
          event={selectedEvent} 
          date={selectedDate} 
          onClose={() => setIsOpenEvent(false)} 
          onSave={handleSave} 
          onDelete={(id) => { setEvents(prev => prev.filter(ev => ev.id !== id)); setIsOpenEvent(false); }}
        />
      )}

      {/* Styles CSS Injectés pour gérer le responsive */}
      <style>{`
        .main-wrapper {
          display: flex;
          flex-direction: row; /* Desktop : Missions à gauche, Calendrier à droite */
          gap: 20px;
          padding: 20px;
          background-color: #f8f9fa;
          min-height: 100vh;
          box-sizing: border-box;
        }

        .side-panel {
          flex: 0 0 350px; /* Largeur fixe sur desktop */
        }

        .calendar-container {
          flex: 1;
          background-color: white;
          padding: 25px;
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
        }

        .calendar-box {
          height: 70vh;
        }

        .title-text {
          margin-bottom: 20px;
          font-weight: 800;
        }

        /* --- RESPONSIVE : Point de bascule --- */
        @media (max-width: 625px) {
          .main-wrapper {
            flex-direction: column; /* Mobile : Missions en HAUT, Calendrier en BAS */
          }

          .side-panel {
            flex: none;
            width: 100%;
          }

          .calendar-box {
            height: 60vh; /* Réduit un peu la hauteur sur mobile */
          }
        }
      `}</style>
    </div>
  );
}