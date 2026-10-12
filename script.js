// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Visitor counter
// Week 3: paste your API Gateway URL here after you build the backend.
// Until then the counter stays hidden so the site does not look broken.
const API_URL = "";

const counterEl = document.getElementById("visitor-count");

async function loadVisitorCount() {
  if (!API_URL) {
    counterEl.parentElement.style.display = "none";
    return;
  }
  try {
    const res = await fetch(API_URL, { method: "POST" });
    const data = await res.json();
    counterEl.textContent = data.count;
  } catch (err) {
    counterEl.parentElement.style.display = "none";
  }
}

loadVisitorCount();