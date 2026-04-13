// main.js — reads content.json and adds content to the dashboard page

console.log("main.js loaded");


// fetch reads the separate json file — professor said use a separate file not inline json
// /data/content.json — path starts from the base directory (win folder)
fetch("/data/content.json")
  .then(function (response) {
    // .json() parses the response string into a js object — same as JSON.parse() from class
    return response.json();
  })
  .then(function (data) {

    // data is now a js object — curly brackets = object, dot notation to get values
    // going one level deep to grab the dashboard property
    const dashboard = data.dashboard;

    // ── STAT CARDS ──────────────────────────────────────────────────────────
    // dashboard.stats is an array — square brackets = array, forEach to loop through it
    const statsRow = document.querySelector("#stats-row");

    dashboard.stats.forEach(function (stat) {

      // back ticks = template literal — professor showed this in class
      // stat.active checks the boolean value to decide which card gets the blue border
      const cardHTML = `
        <div class="col-6 col-md-3">
          <div class="card ${stat.active ? "shadow-sm h-100 border-primary active-card" : "border-0 shadow-sm h-100"}">
            <div class="card-body text-center py-4">
              <p class="${stat.active ? "text-primary mb-2 small fw-medium" : "text-muted mb-2 small"}">${stat.label}</p>
              <h2 class="fw-bold mb-0 stat-number ${stat.active ? "text-primary" : ""}">${stat.value}</h2>
            </div>
          </div>
        </div>
      `;

      // .innerHTML += puts each card into the row container on the page
      statsRow.innerHTML += cardHTML;
    });


    // ── PERFORMANCE STATS ───────────────────────────────────────────────────
    // dashboard.performance is an array — forEach builds each stat row
    const performanceList = document.querySelector("#performance-list");

    dashboard.performance.forEach(function (item, index) {

      // index tracks position — last item skips the bottom border
      const isLast = index === dashboard.performance.length - 1;

      const rowHTML = `
        <div class="d-flex flex-column align-items-end ${isLast ? "py-3 px-4" : "border-bottom py-3 px-4"}">
          <span class="text-muted small mb-1">${item.label}</span>
          <strong class="fs-4 fw-bold">${item.value}</strong>
        </div>
      `;

      performanceList.innerHTML += rowHTML;
    });


    // ── UNRESOLVED TICKETS ──────────────────────────────────────────────────
    // dashboard.tickets is an array — forEach builds each list item
    const ticketsList = document.querySelector("#tickets-list");

    dashboard.tickets.forEach(function (ticket, index) {

      const isLast = index === dashboard.tickets.length - 1;

      const liHTML = `
        <li class="d-flex justify-content-between align-items-center py-2 ${isLast ? "" : "border-bottom"}">
          <span class="small">${ticket.label}</span>
          <span class="text-muted small fw-semibold">${ticket.count}</span>
        </li>
      `;

      ticketsList.innerHTML += liHTML;
    });


    // ── TASKS ────────────────────────────────────────────────────────────────
    // dashboard.tasks is an array — forEach builds each task row with badge and checkbox
    const tasksList = document.querySelector("#tasks-list");

    dashboard.tasks.forEach(function (task, index) {

      const isLast = index === dashboard.tasks.length - 1;

      // done:true gets strikethrough text — dot notation to read the boolean
      const doneClass = task.done ? "text-muted text-decoration-line-through" : "";

      const taskHTML = `
        <div class="d-flex justify-content-between align-items-center py-2 ${isLast ? "" : "border-bottom"}">
          <div class="d-flex align-items-center gap-2">
            <input type="checkbox" class="form-check-input mt-0 task-check" ${task.done ? "checked" : ""}>
            <span class="small ${doneClass}">${task.label}</span>
          </div>
          <span class="badge rounded-pill text-bg-${task.type} px-3">${task.badge}</span>
        </div>
      `;

      tasksList.innerHTML += taskHTML;
    });

  })
  .catch(function (error) {
    // if the file is not found or has a syntax error, it shows here in console
    console.error("could not load content.json:", error);
  });