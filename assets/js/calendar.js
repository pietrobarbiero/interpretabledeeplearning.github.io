// Generate and download iCalendar (.ics) file
function generateICS(eventData) {
  var title = (eventData && eventData.title) || "TBA";
  var description = (eventData && eventData.description) || "";
  var location = (eventData && eventData.location) || "";
  var startDate = (eventData && eventData.startDate) || null;
  var endDate = (eventData && eventData.endDate) || null;
  var url = (eventData && eventData.url) || "";

  // If no date is set, return early
  if (!startDate) {
    alert("Event date is not yet announced. Please check back later!");
    return;
  }

  // Format date to iCal format (YYYYMMDDTHHmmssZ)
  function formatDate(date) {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  }

  var start = formatDate(new Date(startDate));
  // Default to 1 hour duration if an end time is not provided.
  var end = formatDate(new Date(endDate || new Date(new Date(startDate).getTime() + 60 * 60 * 1000)));

  // Create iCal content
  var icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Interpretable Deep Learning//Reading Group//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "DTSTART:" + start,
    "DTEND:" + end,
    "SUMMARY:" + title,
    "DESCRIPTION:" + description.replace(/\n/g, "\\n"),
    "LOCATION:" + location,
    "URL:" + url,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "CREATED:" + formatDate(new Date()),
    "LAST-MODIFIED:" + formatDate(new Date()),
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  // Create blob and download
  var blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "reading-group-session.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Example usage - call this function when the button is clicked
function addReadingGroupToCalendar() {
  var titleNode = document.getElementById("session-title");
  var abstractNode = document.getElementById("session-abstract");
  var dateNode = document.getElementById("session-date");
  var meetingNode = document.getElementById("meeting-link");

  // Get event data from the page
  var eventData = {
    title: (titleNode && titleNode.textContent) || "Interpretable Deep Learning Reading Group",
    description: (abstractNode && abstractNode.textContent) || "",
    location: "Online (Zoom)",
    startDate: (dateNode && dateNode.dataset && dateNode.dataset.startDate) || null,
    endDate: (dateNode && dateNode.dataset && dateNode.dataset.endDate) || null,
    url: (meetingNode && meetingNode.href) || "",
  };

  generateICS(eventData);
}
