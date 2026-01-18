
/**
 * Bible Planner App - authentic Coptic Experience
 * Logic: Distributes 1189 chapters over 365 or 730 days.
 */

// --- State Management ---
const AppState = {
    planType: 1, // 1 year or 2 years
    startDate: null,
    progress: 0, // Completed chapters count
    lastReadDate: null, // For streak calculation
    streakDays: 0,
    todayReadings: {
        morning: [],
        noon: [],
        evening: []
    },
    currentReadingSession: null // 'morning' | 'noon' | 'evening'
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Attach Event Listeners FIRST (Critical)
    const startBtn = document.getElementById('start-journey');
    if (startBtn) {
        startBtn.addEventListener('click', handleStartJourney);
    } else {
        console.error("Start Journey button not found!");
    }

    // 2. Load State
    try {
        loadState();
        checkStreak();
    } catch (e) {
        console.error("State Load Error (Reseting state):", e);
        // Optional: localStorage.clear();
    }

    // 3. Initial UI Render
    // Check if setup is needed
    if (!AppState.startDate) {
        const modal = document.getElementById('setup-modal');
        if (modal) modal.classList.add('active');
    } else {
        updateDailyView();
    }
});

function handleStartJourney() {
    try {
        console.log("Start Journey clicked");
        const planInput = document.querySelector('input[name="plan"]:checked');
        if (!planInput) {
            alert("من فضلك اختر خطة");
            return;
        }

        const plan = planInput.value;
        AppState.planType = parseInt(plan);
        AppState.startDate = new Date().toISOString();
        AppState.progress = 0;
        AppState.streakDays = 0;
        AppState.lastReadDate = null;

        saveState();

        const modal = document.getElementById('setup-modal');
        if (modal) modal.classList.remove('active');

        updateDailyView();
    } catch (err) {
        console.error("Start Journey Error:", err);
        alert("حدث خطأ: " + err.message);
    }
}


// Calculate Streak
function checkStreak() {
    if (!AppState.lastReadDate) return;

    const last = new Date(AppState.lastReadDate);
    const today = new Date();

    // Reset hours to compare dates only
    last.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffMs = today - last;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
        // Missed a day or more -> reset streak
        // Unless we want to be forgiving (e.g. miss 1 day shouldn't kill it?)
        // Let's be strict: > 1 day gap = reset.
        // Wait, if I read yesterday (diff=1), streak kept.
        // If I read today (diff=0), streak kept.
        // If I read day before yesterday (diff=2), broken.
        AppState.streakDays = 0;
    }
    // Note: Incrementing streak happens when completing a reading for *today*
}

function incrementStreak() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Check if already incremented today
    if (AppState.lastReadDate && AppState.lastReadDate.startsWith(todayStr)) {
        return; // Already read today
    }

    // Check if streak is continuous
    if (!AppState.lastReadDate) {
        AppState.streakDays = 1;
    } else {
        const last = new Date(AppState.lastReadDate);
        last.setHours(0, 0, 0, 0);
        const current = new Date();
        current.setHours(0, 0, 0, 0);

        const diff = (current - last) / (1000 * 60 * 60 * 24);

        if (diff <= 1) {
            AppState.streakDays++;
        } else {
            AppState.streakDays = 1; // Reset and start new
        }
    }

    AppState.lastReadDate = today.toISOString();
    saveState();
    updateDailyView(); // To show encouragement
}


// --- Logic: Reading Calculator ---
// --- Logic: Reading Calculator ---
function calculateReadingsForToday() {
    if (!AppState.startDate) return;

    // Use globally defined parallel arrays
    // OT_CHAPTERS = 929 chapters (approx)
    // NT_CHAPTERS = 260 chapters (approx)

    const start = new Date(AppState.startDate);
    const today = new Date();

    // Calculate day number (0-indexed)
    const diffTime = Math.abs(today - start);
    // Ensure we handle time zones broadly by Math.floor on days
    const dayIndex = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Rates per day
    // Plan 1 (1 Year ~ 365 days):
    // OT: 929 / 365 = 2.54 -> approx 2-3 per day
    // NT: 260 / 365 = 0.71 -> approx 1 per day (sometimes 0? No, let's ensure min 0.7 is 5/week.. actually let's just do fraction)

    // Better Logic:
    // Plan 1: OT Factor = 2.6, NT Factor = 0.72
    // Plan 2: OT Factor = 1.3, NT Factor = 0.36

    let otRate = AppState.planType === 1 ? 2.55 : 1.28;
    let ntRate = AppState.planType === 1 ? 0.72 : 0.36;

    // Calculate OT today
    const otStart = Math.floor(dayIndex * otRate);
    const otEnd = Math.floor((dayIndex + 1) * otRate);
    // Slice of OT
    const otTodaysChapters = [];
    for (let i = otStart; i < otEnd && i < OT_CHAPTERS.length; i++) {
        otTodaysChapters.push(OT_CHAPTERS[i]);
    }

    // Calculate NT today
    const ntStart = Math.floor(dayIndex * ntRate);
    const ntEnd = Math.floor((dayIndex + 1) * ntRate);
    // Slice of NT
    const ntTodaysChapters = [];
    for (let i = ntStart; i < ntEnd && i < NT_CHAPTERS.length; i++) {
        ntTodaysChapters.push(NT_CHAPTERS[i]);
    }

    // Check if finished
    if (otStart >= OT_CHAPTERS.length && ntStart >= NT_CHAPTERS.length) {
        return "finished";
    }

    return distributeMixedChapters(otTodaysChapters, ntTodaysChapters);
}

function distributeMixedChapters(ot, nt) {
    // Strategy:
    // Morning: OT Part 1
    // Noon: OT Part 2 (if exists)
    // Evening: NT (if exists)

    const dist = { morning: [], noon: [], evening: [] };

    // Distribute OT
    if (ot.length > 0) {
        if (ot.length === 1) {
            dist.morning.push(ot[0]);
        } else {
            // Split OT between Morning and Noon
            const mid = Math.ceil(ot.length / 2);
            dist.morning = ot.slice(0, mid);
            dist.noon = ot.slice(mid);
        }
    }

    // Distribute NT (Always Evening for consistency, or Noon if Morning used and Noon empty?)
    // User requested Old and New.
    // Let's put NT in Evening primarily.
    if (nt.length > 0) {
        dist.evening = nt;
    }
    // If Evening is empty but we have extra OT in Noon, maybe shift?
    // No, keep structure: Morning/Noon = OT, Evening = NT. 
    // This gives a nice rhythm: "Morning/Noon for Lengthy OT history/prophets, Evening for Gospel/Epistles".

    return dist;
}


// --- UI Updates ---
function updateDailyView() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    // Safety helper
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    setText('current-day-name', today.toLocaleDateString('ar-EG', { weekday: 'long' }));
    setText('current-date-text', today.toLocaleDateString('ar-EG', options));

    // Time Greeting
    const hour = today.getHours();
    let greeting = "سلام و نعمة";
    if (hour >= 5 && hour < 12) {
        greeting = "🌅 صباح الخير - إشراق باكر";
    } else if (hour >= 12 && hour < 16) {
        greeting = "☀️ طابت ظهيرتك - صلاة الساعة السادسة";
    } else if (hour >= 16 && hour < 20) {
        greeting = "🌇 مساء الخير - صلاة الغروب";
    } else {
        greeting = "✨ ليلة مباركة - صلاة النوم";
    }
    setText('time-greeting', greeting);

    // Coptic Date
    if (typeof convertToCoptic === 'function') {
        setText('coptic-date-text', convertToCoptic(today));
    } else {
        // Fallback or simple local implementation
        const fallback = new Intl.DateTimeFormat('ar-EG-u-ca-coptic', { day: 'numeric', month: 'long' }).format(today).replace('ERA1', '').trim();
        setText('coptic-date-text', fallback);
    }

    // Daily Quote
    if (typeof COPTIC_QUOTES !== 'undefined' && COPTIC_QUOTES.length > 0) {
        // Pick based on day of year to stick for the whole day
        const startOfYear = new Date(today.getFullYear(), 0, 0);
        const diff = today - startOfYear;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        const quoteIndex = dayOfYear % COPTIC_QUOTES.length;
        const quote = COPTIC_QUOTES[quoteIndex];

        setText('daily-quote-text', `"${quote.text}"`);
        setText('daily-quote-author', `— ${quote.author}`);
    }

    // Streak Display
    if (AppState.streakDays > 0) {
        const streakDisplay = document.getElementById('streak-display');
        if (streakDisplay) streakDisplay.style.display = 'inline-flex';
        setText('streak-count', AppState.streakDays);
    } else {
        const streakDisplay = document.getElementById('streak-display');
        if (streakDisplay) streakDisplay.style.display = 'none';
    }

    setText('plan-text', AppState.planType === 1 ? 'خطة 1 عام' : 'خطة 2 عام');



    // Calculate readings
    const readings = calculateReadingsForToday();

    if (readings === "finished") {
        alert("مبروك! لقد أتممت الكتاب المقدس.");
        return;
    }

    AppState.todayReadings = readings;

    updateSessionCard('morning', readings.morning);
    updateSessionCard('noon', readings.noon);
    updateSessionCard('evening', readings.evening);

    // Update Progress Bar
    // Calculate total completed approximately based on days
    if (AppState.startDate) {
        const start = new Date(AppState.startDate);
        const dayIndex = Math.floor((today - start) / (1000 * 60 * 60 * 24));
        const totalDays = AppState.planType * 365;
        const percent = Math.min(100, (dayIndex / totalDays) * 100);
        document.getElementById('total-progress').style.width = `${percent}%`;
    }
}

function updateSessionCard(type, chapters) {
    const card = document.getElementById(`session-${type}`);
    const refText = card.querySelector('.reading-ref');
    const readBtn = card.querySelector('.read-btn');

    if (chapters.length === 0) {
        // Hide or dim empty sessions? 
        // User asked for 3 parts. If empty, maybe show "راحة" or "تأمل"?
        // For 2-year plan, noon might often be empty.
        refText.textContent = "وقت للصلاة والتأمل";
        readBtn.style.display = 'none';
        card.style.opacity = '0.5';
    } else {
        // Format: "تكوين 1 - 2" or "تكوين 1"
        const names = chapters.map(c => `${c.bookName} ${c.chapter}`).join('، ');
        refText.textContent = names;
        readBtn.style.display = 'inline-block';
        card.style.opacity = '1';
        readBtn.onclick = () => openReading(type);
    }

    // Check if completed (stored in local storage separately per day?)
    // For simplicity, just check visual state or if we track exact chapter completion
    // We will simple-track completion in UI for now
}

// --- Reading View ---
let currentChaptersList = [];

function openReading(sessionType) {
    AppState.currentReadingSession = sessionType;
    currentChaptersList = AppState.todayReadings[sessionType];

    const overlay = document.getElementById('reading-overlay');
    const title = document.getElementById('reading-title');
    const content = document.getElementById('reading-text');

    // Title
    title.textContent = currentChaptersList.map(c => `${c.bookName} ${c.chapter}`).join(' + ');

    // Show Overlay
    overlay.classList.add('active');

    // Fetch Text
    content.innerHTML = '<div class="spinner"></div><p style="text-align:center; margin-top:1rem;">جاري فتح الكتاب...</p>';

    fetchScriptureText(currentChaptersList).then(html => {
        content.innerHTML = html;
    }).catch(err => {
        content.innerHTML = `<p style="color:red; text-align:center;">حدث خطأ في تحميل النص.<br>${err.message}</p>`;
    });
}

function closeReading() {
    document.getElementById('reading-overlay').classList.remove('active');
}

function completeSession() {
    // Mark UI as done manually
    const card = document.getElementById(`session-${AppState.currentReadingSession}`);
    card.classList.add('completed');
    card.querySelector('.status-marker').innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    closeReading();

    // Check if day is full complete? For now, we increment streak on ANY reading session
    // Or stricter: streak only if whole day is done? 
    // Let's be encouraging: ANY progress counts for streak activity.
    // Ideally we track completion of day. 
    // Let's call it "Activity Streak"
    incrementStreak();
}


// --- API Service ---
// --- Storage / Content Service ---
async function fetchScriptureText(chapters) {
    // Check if content is loaded
    if (typeof BIBLE_FULL_CONTENT === 'undefined') {
        return `<div class="error-box">
            <p>⚠️ لم يتم تحميل ملف الكتاب المقدس.</p>
        </div>`;
    }

    let fullHtml = "";

    for (const chap of chapters) {
        try {
            // Map Book ID to Array Index (ID 1 -> Index 0)
            const bookIndex = chap.bookId - 1;
            const bookData = BIBLE_FULL_CONTENT[bookIndex];

            if (!bookData) {
                fullHtml += `<p class="error-msg">لم يتم العثور على سفر ID: ${chap.bookId}</p>`;
                continue;
            }

            // Map Chapter 1-based to Index 0-based
            const chapterIndex = chap.chapter - 1;
            const verses = bookData.chapters[chapterIndex];

            fullHtml += `<div class="chapter-block">`;
            // Use name from content if available, or fallback to passed name
            const displayName = bookData.name || chap.bookName;
            fullHtml += `<h3>${displayName} ${chap.chapter}</h3>`;

            if (!verses || verses.length === 0) {
                fullHtml += `<p class="error-msg">لا نصوص لهذا الإصحاح.</p>`;
            } else {
                verses.forEach((text, idx) => {
                    const verseNum = idx + 1;
                    fullHtml += `<span class="verse"><span class="verse-num">${verseNum}</span> ${text} </span>`;
                });
            }

            fullHtml += `</div><hr class="chapter-divider">`;

        } catch (e) {
            console.error(e);
            fullHtml += `<div class="error-box"><p>خطأ في عرض ${chap.bookName} ${chap.chapter}</p></div>`;
        }
    }

    return fullHtml;
}



// --- Storage ---
function saveState() {
    try {
        localStorage.setItem('biblePlanState', JSON.stringify(AppState));
    } catch (e) {
        console.error("Save Error:", e);
        // Maybe alert if quota full
    }
}


function loadState() {
    const saved = localStorage.getItem('biblePlanState');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(AppState, parsed);
    }
}
