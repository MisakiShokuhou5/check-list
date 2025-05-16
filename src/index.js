// script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- DATA ---
    // (Based on the user's initial HTML, transformed into a structured JS object)
    const toaruSeriesData = [
        {
            id: "index",
            title: "Toaru Majutsu no Index",
            groups: [
                {
                    id: "index-s1-academic", title: "Academic City Arc (Index I)",
                    arcs: [
                        { id: "index-arc", title: "Index Arc" },
                        { id: "deep-blood-arc", title: "Deep Blood Arc" },
                        { id: "sisters-arc-index", title: "Sisters Arc" },
                        { id: "angel-falldown-arc", title: "Angel Falldown Arc" },
                        { id: "three-stories-arc", title: "Three Stories Arc" },
                        { id: "kazakiri-hyouka-arc", title: "Kazakiri Hyouka Arc" }
                    ]
                },
                {
                    id: "index-s1-church", title: "Versus Catholic Roman Church Arc (Index II)", // User data title
                    arcs: [
                        { id: "orsola-rescue-arc", title: "Orsola Acquinas Rescue Arc" },
                        { id: "tree-diagram-remnant-arc", title: "Tree Diagram Remnant Arc" },
                        { id: "daihasei-festival-arc-index", title: "Daihasei Festival Arc (Index)" },
                        { id: "la-regina-del-mar-adriatico-arc", title: "La Regina Del Mar Adriático Arc" },
                    ]
                },
                {
                    id: "index-s3-gods-right-seat", title: "Versus God's Right Seat Arc (Index III)", // User data title
                    arcs: [
                        { id: "academic-city-invasion-arc", title: "Academic City Invasion Arc" },
                        { id: "skill-out-uprising-arc", title: "Skill Out Uprising Arc" },
                        { id: "document-of-constantine-arc", title: "Document of Constantine Arc" },
                        { id: "acqua-of-the-back-arc", title: "Acqua of the Back Arc" },
                        { id: "royal-british-family-arc", title: "Royal British Family Arc" },
                        { id: "dragon-arc", title: "DRAGON Arc" },
                        { id: "world-war-iii-arc", title: "World War III Arc" }
                    ]
                }
            ]
        },
        {
            id: "railgun-series",
            title: "Toaru Kagaku no Railgun (Series)",
            groups: [
                {
                    id: "railgun-s1", title: "Toaru Kagaku no Railgun", // User data title
                    arcs: [
                        { id: "level-upper-arc", title: "Level Upper Arc" },
                        { id: "big-spider-arc", title: "Big Spider Arc" },
                        { id: "poltergeist-arc", title: "Poltergeist Arc" }
                    ]
                },
                {
                    id: "railgun-s", title: "Toaru Kagaku no Railgun S", // User data title
                    arcs: [
                        { id: "sisters-arc-railgun", title: "Sisters Arc (Railgun)" },
                        { id: "silent-party-arc", title: "Silent Party Arc" }
                    ]
                },
                {
                    id: "railgun-t", title: "Toaru Kagaku no Railgun T", // User data title
                    arcs: [
                        { id: "daihasei-festival-railgun", title: "Daihasei Festival (Railgun)" },
                        { id: "dream-ranker-arc", title: "Dream Ranker Arc" }
                    ]
                },
                {
                    id: "railgun-manga", title: "Toaru Kagaku no Railgun mangá", // User data title
                    arcs: [
                        { id: "jailbreaker-arc", title: "Jailbreaker Arc" },
                        { id: "first-year-arc", title: "First Year Arc" }
                    ]
                }
            ]
        },
        {
            id: "accelerator",
            title: "Toaru Kagaku no Accelerator",
            groups: [
                {
                    id: "accelerator-anime", title: "Anime", // User data title
                    arcs: [{ id: "necromancer-arc", title: "Necromancer Arc" }]
                },
                {
                    id: "accelerator-manga", title: "Mangá", // User data title
                    arcs: [{ id: "nectar-arc", title: "Nectar Arc" }]
                }
            ]
        },
        {
            id: "dark-matter",
            title: "Toaru Kagaku no Dark Matter",
            arcs: [{ id: "yuzuriha-ringo-arc", title: "Yuzuriha Ringo Arc" }]
        },
        {
            id: "astral-buddy",
            title: "Toaru Kagaku no Astral Buddy",
            arcs: [{ id: "astral-buddy-main-arc", title: "Astral Buddy Arc" }]
        },
        {
            id: "mental-out",
            title: "Toaru Kagaku no Mental Out",
            arcs: [{ id: "tokiwadai-election-arc", title: "Tokiwadai Election Arc" }]
        },
        {
            id: "item",
            title: "Toaru Anbu no ITEM",
            arcs: [
                { id: "enemy-item-arc", title: "Enemy ITEM Arc" },
                { id: "honey-bee-queen-arc", title: "Honey Bee Queen Arc" },
                { id: "dark-justice-arc", title: "Dark Justice Arc" }
            ]
        }
    ];

    // --- DEFAULT PRE-SELECTED ARCS ---
    // List of arc.id (short logical ID) that should be checked by default if no localStorage data exists for them.
    const defaultCheckedArcIds = [
        "index-arc", "sisters-arc-index", "three-stories-arc", "kazakiri-hyouka-arc",
        "orsola-rescue-arc", "tree-diagram-remnant-arc", "daihasei-festival-arc-index",
        "la-regina-del-mar-adriatico-arc", "academic-city-invasion-arc", "skill-out-uprising-arc",
        "document-of-constantine-arc", "acqua-of-the-back-arc", "level-upper-arc",
        "sisters-arc-railgun", "daihasei-festival-railgun", "dream-ranker-arc",
        "jailbreaker-arc", "necromancer-arc", "nectar-arc", "yuzuriha-ringo-arc"
    ];


    // --- DOM ELEMENTS ---
    const checklistContainer = document.getElementById('checklist-container');
    const overallProgressBar = document.getElementById('overall-progress-bar');
    const overallProgressValue = document.getElementById('overall-progress-value');
    const resetButton = document.getElementById('reset-progress-button');
    const loadingPlaceholder = document.querySelector('.loading-placeholder');

    const STORAGE_PREFIX = 'toaruChecklist_';

    // --- STATE ---
    let arcStates = {}; // Stores checked state for each arc { checkboxGeneratedId: boolean }

    // --- CORE FUNCTIONS ---

    function generateSafeId(str) {
        // Generates a URL-friendly and ID-friendly string
        return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }

    function renderChecklist() {
        checklistContainer.innerHTML = ''; // Clear previous content or placeholder

        toaruSeriesData.forEach(series => {
            const seriesCard = document.createElement('section');
            seriesCard.className = 'series-card';
            seriesCard.id = `series-${series.id}`; // Use original series.id for card ID

            const seriesHeader = document.createElement('header');
            seriesHeader.className = 'series-header';
            seriesHeader.innerHTML = `
                <h3>${series.title}</h3>
                <div class="series-progress-container">
                    <div class="progress-text" id="progress-text-${series.id}">0%</div>
                    <div class="progress-bar-wrapper">
                        <div id="progress-bar-${series.id}" class="progress-bar-animated">
                             <span id="progress-value-${series.id}">0%</span>
                        </div>
                    </div>
                </div>
            `;
            seriesCard.appendChild(seriesHeader);

            const seriesContent = document.createElement('div');
            seriesContent.className = 'series-content';

            if (series.groups) {
                series.groups.forEach(group => {
                    const details = document.createElement('details');
                    details.className = 'arc-group';
                    details.open = true; // Default to open

                    const summary = document.createElement('summary');
                    summary.textContent = group.title;
                    details.appendChild(summary);

                    const arcList = document.createElement('div');
                    arcList.className = 'arc-list';
                    group.arcs.forEach(arc => {
                        // Pass original arc.id for default checking logic
                        arcList.appendChild(createArcItem(arc, series.id, group.id, arc.id));
                    });
                    details.appendChild(arcList);
                    seriesContent.appendChild(details);
                });
            } else if (series.arcs) { // For series without explicit groups
                const arcList = document.createElement('div');
                arcList.className = 'arc-list arc-list-no-group';
                series.arcs.forEach(arc => {
                     // Pass original arc.id for default checking logic
                    arcList.appendChild(createArcItem(arc, series.id, series.id + "-main", arc.id));
                });
                seriesContent.appendChild(arcList);
            }
            seriesCard.appendChild(seriesContent);
            checklistContainer.appendChild(seriesCard);
        });
        if (loadingPlaceholder) loadingPlaceholder.style.display = 'none';
    }

    function createArcItem(arcData, seriesId, groupId, originalArcId) { // Added originalArcId parameter
        const arcItem = document.createElement('div');
        arcItem.className = 'arc-item';
        
        // Construct the unique ID for the checkbox, used as key in arcStates and localStorage
        const checkboxGeneratedId = `${STORAGE_PREFIX}${generateSafeId(seriesId)}-${generateSafeId(groupId)}-${generateSafeId(originalArcId)}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = checkboxGeneratedId;
        checkbox.dataset.arcId = originalArcId; // Store original arc.id for easier reference if needed elsewhere
        checkbox.dataset.seriesId = seriesId; // Store seriesId for potential specific logic

        // Initial checked state during rendering will be false. loadProgressFromStorage will update it.
        checkbox.checked = arcStates[checkboxGeneratedId] || false; 
        checkbox.addEventListener('change', handleCheckboxChange);

        const label = document.createElement('label');
        label.htmlFor = checkboxGeneratedId;
        label.textContent = arcData.title;

        arcItem.appendChild(checkbox);
        arcItem.appendChild(label);
        return arcItem;
    }

    function handleCheckboxChange(event) {
        const checkbox = event.target;
        const checkboxGeneratedId = checkbox.id; // This is the key for arcStates and localStorage
        arcStates[checkboxGeneratedId] = checkbox.checked;
        localStorage.setItem(checkboxGeneratedId, checkbox.checked.toString()); // Store as string 'true'/'false'
        updateProgress();
    }

    function loadProgressFromStorage() {
        let hasAnyStoredData = false; // Tracks if any item was loaded from localStorage

        toaruSeriesData.forEach(series => {
            const processGroup = (group) => {
                group.arcs.forEach(arc => {
                    // Construct the ID used for storing this arc's state
                    const checkboxGeneratedId = `${STORAGE_PREFIX}${generateSafeId(series.id)}-${generateSafeId(group.id)}-${generateSafeId(arc.id)}`;
                    const storedState = localStorage.getItem(checkboxGeneratedId);
                    
                    const checkboxElement = document.getElementById(checkboxGeneratedId);

                    if (storedState !== null) {
                        // If data is found in localStorage, use it
                        arcStates[checkboxGeneratedId] = storedState === 'true';
                        hasAnyStoredData = true;
                    } else {
                        // If no data in localStorage, check against default pre-selected list
                        if (defaultCheckedArcIds.includes(arc.id)) { // arc.id is the short, logical ID
                            arcStates[checkboxGeneratedId] = true;
                        } else {
                            arcStates[checkboxGeneratedId] = false;
                        }
                        // At this point, arcStates[checkboxGeneratedId] has either the default or false
                    }
                    
                    // Update the visual checkbox element
                    if (checkboxElement) {
                        checkboxElement.checked = arcStates[checkboxGeneratedId];
                    }
                });
            };

            if (series.groups) {
                series.groups.forEach(processGroup);
            } else if (series.arcs) {
                processGroup({ id: series.id + "-main", arcs: series.arcs }); // Simulate a group for series with direct arcs
            }
        });

        // Always update progress after attempting to load from storage or applying defaults.
        // This ensures the UI reflects the initial state correctly.
        updateProgress();
    }
    
    function updateProgress() {
        let totalArcsOverall = 0;
        let completedArcsOverall = 0;

        toaruSeriesData.forEach(series => {
            let totalArcsInSeries = 0;
            let completedArcsInSeries = 0;

            const countArcs = (group) => {
                group.arcs.forEach(arc => {
                    totalArcsInSeries++;
                    totalArcsOverall++;
                    // Construct the ID used for storing this arc's state to check arcStates
                    const checkboxGeneratedId = `${STORAGE_PREFIX}${generateSafeId(series.id)}-${generateSafeId(group.id)}-${generateSafeId(arc.id)}`;
                    if (arcStates[checkboxGeneratedId]) { // Check the state from our arcStates object
                        completedArcsInSeries++;
                        completedArcsOverall++;
                    }
                });
            };

            if (series.groups) {
                series.groups.forEach(countArcs);
            } else if (series.arcs) {
                countArcs({ id: series.id + "-main", arcs: series.arcs });
            }

            const seriesProgress = totalArcsInSeries > 0 ? (completedArcsInSeries / totalArcsInSeries) * 100 : 0;
            
            const seriesProgressBar = document.getElementById(`progress-bar-${series.id}`);
            const seriesProgressText = document.getElementById(`progress-text-${series.id}`);
            const seriesProgressValue = document.getElementById(`progress-value-${series.id}`);

            if (seriesProgressBar) seriesProgressBar.style.width = `${seriesProgress.toFixed(0)}%`;
            if (seriesProgressValue) seriesProgressValue.textContent = `${seriesProgress.toFixed(0)}%`;
            if (seriesProgressText) seriesProgressText.textContent = `${completedArcsInSeries} / ${totalArcsInSeries} (${seriesProgress.toFixed(0)}%)`;
        });

        const overallProgressPercentage = totalArcsOverall > 0 ? (completedArcsOverall / totalArcsOverall) * 100 : 0;
        if (overallProgressBar) overallProgressBar.style.width = `${overallProgressPercentage.toFixed(0)}%`;
        if (overallProgressValue) overallProgressValue.textContent = `${overallProgressPercentage.toFixed(0)}%`;
        
        // Assuming an element with id 'overall-progress-text' exists for the detailed count
        const overallProgressDetailsElement = document.getElementById('overall-progress-text'); 
        if (overallProgressDetailsElement) {
             overallProgressDetailsElement.textContent = `(${completedArcsOverall} / ${totalArcsOverall} arcos)`;
        }
    }

    function resetAllProgress() {
        if (confirm("Tem certeza que deseja resetar todo o seu progresso? Esta ação não pode ser desfeita.")) {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith(STORAGE_PREFIX)) {
                    localStorage.removeItem(key);
                }
            });
            
            // Reset in-memory arcStates based on defaults or to all false
            // For a true reset to initial defaults (including pre-selected), re-evaluate defaults.
            // For a reset to all false (ignoring defaults), do arcStates = {}; and loop to set all to false.
            // Current approach: effectively reloads as if it's the first time (respecting defaults if no storage).
            arcStates = {}; // Clear current states

            // Re-populate arcStates with defaults, then update checkboxes and progress
            // This simplifies by reusing parts of loadProgressFromStorage logic.
            toaruSeriesData.forEach(series => {
                const processGroupReset = (group) => {
                    group.arcs.forEach(arc => {
                        const checkboxGeneratedId = `${STORAGE_PREFIX}${generateSafeId(series.id)}-${generateSafeId(group.id)}-${generateSafeId(arc.id)}`;
                        // On reset, check defaults again if you want pre-selected items to reappear
                        // or set all to false for a complete wipe.
                        // For now, let's make reset clear ALL (no defaults re-applied unless loadProgress logic does it inherently)
                        // The simplest reset is to clear arcStates and localStorage, then call loadProgressFromStorage
                        // which will then apply defaults as localStorage is empty.
                        const checkboxElement = document.getElementById(checkboxGeneratedId);
                        if (checkboxElement) checkboxElement.checked = false; // Visually uncheck
                        arcStates[checkboxGeneratedId] = false; // Update in-memory state to false explicitly on reset
                    });
                };
                if (series.groups) series.groups.forEach(processGroupReset);
                else if (series.arcs) processGroupReset({ id: series.id + "-main", arcs: series.arcs });
            });
            
            updateProgress(); // Recalculate progress (should be 0% or reflect defaults if logic changes)

            // A more robust reset to truly initial state (respecting defaults again):
            // arcStates = {};
            // loadProgressFromStorage(); // This will re-apply defaults as localStorage is now empty.
        }
    }

    // --- INITIALIZATION ---
    // 1. Render the basic HTML structure of the checklist.
    //    Checkboxes will be initially unchecked visually as arcStates is empty.
    renderChecklist(); 

    // 2. Load progress from localStorage. If an arc has no stored state,
    //    it will check defaultCheckedArcIds to set its initial state.
    //    This function also updates the visual checkboxes and calls updateProgress().
    loadProgressFromStorage(); 
    
    // No need for an additional updateProgress() call here as loadProgressFromStorage handles it.

    if (resetButton) { // Ensure resetButton exists before adding listener
        resetButton.addEventListener('click', resetAllProgress);
    }
});