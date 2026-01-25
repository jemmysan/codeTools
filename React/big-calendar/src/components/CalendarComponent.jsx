import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";

// 1. Correction de l'import (Destructuring)
// import { withDragAndDrop } from "react-big-calendar/lib/addons/dragAndDrop";
// import { withDragAndDrop } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";


// Modifiez cette ligne :
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import EventPopUp from "./EventPopUp";

const localizer = momentLocalizer(moment);

// 2. Définition du composant DnD en DEHORS de la fonction
// const DnDCalendar = withDragAndDrop(Calendar);
const DnDCalendar = withDragAndDrop.default ? withDragAndDrop.default(Calendar) : withDragAndDrop(Calendar);

// 1. Définissez une liste de couleurs élégantes
const EVENT_COLORS = ['#4f46e5', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

// 2. Créez la fonction de sélection
const eventStyleGetter = (event) => {
  // Option A : Aléatoire pur à chaque rendu (déconseillé car change au scroll)
  // Option B : Basé sur l'ID de l'événement (la couleur reste la même pour l'objet)
  const colorIndex = event.id % EVENT_COLORS.length;
  const backgroundColor = EVENT_COLORS[colorIndex];

  return {
    style: {
      backgroundColor: backgroundColor,
      borderRadius: '2px',
      opacity: 0.8,
      color: 'white',
      border: 'none',
      display: 'block'
    }
  };
};



const eventsList = [
  {
    id: 1,
    title: "Meeting with John",
    start: new Date(moment().add(1, "days").set({ hour: 10, minute: 0 })),
    end: new Date(moment().add(1, "days").set({ hour: 11, minute: 0 })),
  },
  {
    id: 2,
    title: "Lunch with Sarah",
    start: new Date(moment().subtract(20, "days").set({ hour: 12, minute: 0 })),
    end: new Date(moment().subtract(20, "days").set({ hour: 12, minute: 0 })),
  },
  {
    id: 3,
    title: "Project DeadLine",
    start: new Date(moment().subtract(3, "days").startOf("day")),
    end: new Date(moment().subtract(20, "days").endOf("day")),
  },
  {
    id: 4,
    title: "Workshop",
    start: new Date(moment().subtract(10, "days").set({ hour: 9, minute: 0 })),
    end: new Date(moment().subtract(10, "days").set({ hour: 17, minute: 0 })),
  },
  {
    id: 5,
    title: "Workshop",
    start: new Date(moment().subtract(15, "days").set({ hour: 9, minute: 30 })),
    end: new Date(moment().subtract(15, "days").set({ hour: 17, minute: 0 })),
  },
];

// Note : Il est préférable de définir DnDCalendar en dehors du rendu ou via useMemo

export default function CalendarComponent() {
  const [events, setEvents] = useState(eventsList);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpenEvent, setIsOpenEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  

  // --- LOGIQUE DRAG & DROP ---
  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const idx = events.indexOf(event);
    let updatedEvent = { 
    ...event, 
    start, 
    end, 
    allDay: droppedOnAllDaySlot 
  };

  const nextEvents = [...events];
  if (idx > -1) {
    nextEvents.splice(idx, 1, updatedEvent);
    setEvents(nextEvents);
  }
  };

  const resizeEvent = ({ event, start, end }) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === event.id ? { ...ev, start, end } : ev)),
    );
  };
  // ----------------------------

  const handleSelectEvent = (event) => {
    setSelectedDate(null);
    setSelectedEvent(event);
    setIsOpenEvent(true);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setSelectedEvent(null);
    setIsOpenEvent(true);
  };

  const handleSave = (eventData) => {
    if (eventData.id) {
      // Mise à jour
      setEvents((prev) =>
        prev.map((ev) => (ev.id === eventData.id ? eventData : ev)),
      );
    } else {
      // Création
      const newEvent = {
        ...eventData,
        id: events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1,
      };
      setEvents((prev) => [...prev, newEvent]);
    }
    setIsOpenEvent(false); // Fermer le popup après sauvegarde
  };

  const handleDelete = (eventId) => {
  if (window.confirm("Voulez-vous vraiment supprimer cet événement ?")) {
    setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
    setIsOpenEvent(false); // Ferme la popup après suppression
  }
};

  return (
    <>
      <div style={{ height: '80vh', padding: '20px' }}>
        <DnDCalendar
         eventPropGetter={eventStyleGetter}
          selectable
          localizer={localizer}
          // ATTENTION : Utilisez 'events' (state) et non 'eventsList' (static)
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          // Props nécessaires pour le Drag and Drop
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          resizable
          style={{ height: "77vh" }}
        />
      </div>

      {isOpenEvent && (
        <EventPopUp
          key={selectedEvent?.id || selectedDate?.toString()}
          isOpen={isOpenEvent}
          onClose={() => setIsOpenEvent(false)}
          date={selectedDate}
          event={selectedEvent}
          onSave={handleSave}
          onDelete={handleDelete} // ✅ On passe la fonction ici
        />
      )}
    </>
  );
}
