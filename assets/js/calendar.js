// Generate and download iCalendar (.ics) file
function generateICS(eventData) {
  const {
    title = 'TBA',
    description = '',
    location = '',
    startDate = null,
    endDate = null,
    url = ''
  } = eventData;

  // If no date is set, return early
  if (!startDate) {
    alert('Event date is not yet announced. Please check back later!');
    return;
  }

  // Format date to iCal format (YYYYMMDDTHHmmssZ)
  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const start = formatDate(new Date(startDate));
  const end = formatDate(new Date(endDate || new Date(new Date(startDate).getTime() + 60 * 60 * 1000))); // Default 1 hour duration

  // Create iCal content
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Interpretable Deep Learning//Reading Group//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    `URL:${url}`,
    `STATUS:CONFIRMED`,
    `SEQUENCE:0`,
    `CREATED:${formatDate(new Date())}`,
    `LAST-MODIFIED:${formatDate(new Date())}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  // Create blob and download
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'reading-group-session.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Example usage - call this function when the button is clicked
function addReadingGroupToCalendar() {
  // Get event data from the page
  const eventData = {
    title: document.getElementById('session-title')?.textContent || 'Interpretable Deep Learning Reading Group',
    description: document.getElementById('session-abstract')?.textContent || '',
    location: 'Online (Zoom)',
    startDate: document.getElementById('session-date')?.dataset.startDate || null,
    endDate: document.getElementById('session-date')?.dataset.endDate || null,
    url: document.getElementById('meeting-link')?.href || ''
  };

  generateICS(eventData);
}

