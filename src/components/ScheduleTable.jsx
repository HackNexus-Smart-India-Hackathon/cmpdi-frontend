import { Modal, Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const ScheduleTable = () => {
  const meetBaseUrl = process.env.REACT_APP_MEET_BASE_URL;
  const project_id = 1; // Hardcoded project_id change it to redux state
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState('');

  useEffect(() => {
    const fetchEvents = async (project_id) => {
      try {
        const response = await axios.get(`${meetBaseUrl}/events/${project_id}`);
        const formattedEvents = response.data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents(project_id);
  }, [meetBaseUrl]);

  const postEvent = async (event) => {
    try {
      const response = await axios.post(`${meetBaseUrl}/events/create`, event, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const newEvent = {
        ...response.data,
        start: new Date(response.data.start),
        end: new Date(response.data.end),
      };
      setEvents([...events, newEvent]);
    } catch (error) {
      console.error('Error posting event:', error);
    }
  };

  const updateEvent = async (event) => {
    try {
      const response = await axios.put(
        `${meetBaseUrl}/events/${event.id}`,
        event,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const updatedEvent = {
        ...response.data,
        start: new Date(response.data.start),
        end: new Date(response.data.end),
      };
      setEvents(
        events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
      );
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`${meetBaseUrl}/events/${eventId}`);
      setEvents(events.filter((e) => e.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleSelectSlot = ({ start, end }) => {
    setModalType('create');
    setSelectedEvent({ start, end });
    setEventTitle('');
    setModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    setModalType('update');
    setSelectedEvent(event);
    setEventTitle(event.title);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = () => {
    if (modalType === 'create') {
      const newEvent = { ...selectedEvent, title: eventTitle, project_id: 1 };
      postEvent(newEvent);
    } else if (modalType === 'update') {
      const updatedEvent = { ...selectedEvent, title: eventTitle };
      updateEvent(updatedEvent);
    }
    setModalOpen(false);
  };

  const handleDeleteEvent = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(selectedEvent.id);
      setModalOpen(false);
    }
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: '#cfcbcb85',
        color: 'black',
        borderRadius: '5px',
        border: 'none',
        display: 'block',
        padding: '5px',
        margin: '5px',
      },
    };
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-black mb-4">Event Scheduler</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        className="bg-white border-black border"
      />
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>{modalType === 'create' ? 'Create Event' : 'Update Event'}</h2>
          <TextField
            fullWidth
            label="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleModalSubmit}
          >
            {modalType === 'create' ? 'Create' : 'Update'}
          </Button>
          {modalType === 'update' && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteEvent}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </Button>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ScheduleTable;
