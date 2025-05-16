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
                        { id: "three-stories-arc", title: "Three Stories Arc" }, //mover para Academic City Arc
                        { id: "kazakiri-hyouka-arc", title: "Kazakiri Hyouka Arc" }//mover para Academic City Arc
                    ]
                },
                {
                    id: "index-s1-church", title: "Versus Catholic Roman Church Arc (Index II)",
                    arcs: [

                        { id: "orsola-rescue-arc", title: "Orsola Acquinas Rescue Arc" },
                        { id: "tree-diagram-remnant-arc", title: "Tree Diagram Remnant Arc" },
                        { id: "daihasei-festival-arc-index", title: "Daihasei Festival Arc (Index)" },
                        { id: "la-regina-del-mar-adriatico-arc", title: "La Regina Del Mar Adriático Arc" },

                    ]
                },
                {
                    id: "index-s3-gods-right-seat", title: "Versus God's Right Seat Arc (Index III)",
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
                    id: "railgun-s1", title: "Toaru Kagaku no Railgun (Anime)",
                    arcs: [
                        { id: "level-upper-arc", title: "Level Upper Arc" },
                        { id: "big-spider-arc", title: "Big Spider Arc" },
                        { id: "poltergeist-arc", title: "Poltergeist Arc" }
                    ]
                },
                {
                    id: "railgun-s", title: "Toaru Kagaku no Railgun S (Anime)",
                    arcs: [
                        { id: "sisters-arc-railgun", title: "Sisters Arc (Railgun)" },
                        { id: "silent-party-arc", title: "Silent Party Arc" }
                    ]
                },
                {
                    id: "railgun-t", title: "Toaru Kagaku no Railgun T (Anime)",
                    arcs: [
                        { id: "daihasei-festival-railgun", title: "Daihasei Festival (Railgun)" },
                        { id: "dream-ranker-arc", title: "Dream Ranker Arc" }
                    ]
                },
                {
                    id: "railgun-manga", title: "Toaru Kagaku no Railgun (Mangá Arcs Post-Anime)",
                    arcs: [
                        { id: "jailbreaker-arc", title: "Jailbreaker Arc" },
                        { id: "first-year-arc", title: "First Year Arc" } // Note: HTML had "First Year Arc Arc" in for attribute
                    ]
                }
            ]
        },
        {
            id: "accelerator",
            title: "Toaru Kagaku no Accelerator",
            groups: [ // Grouped by Anime/Manga for consistency
                {
                    id: "accelerator-anime", title: "Anime Arcs",
                    arcs: [{ id: "necromancer-arc", title: "Necromancer Arc" }]
                },
                {
                    id: "accelerator-manga", title: "Mangá Arcs (Post-Anime events)",
                    arcs: [{ id: "nectar-arc", title: "Nectar Arc" }]
                }
            ]
        },
        {
            id: "dark-matter",
            title: "Toaru Kagaku no Dark Matter (Mangá)",
            arcs: [{ id: "yuzuriha-ringo-arc", title: "Yuzuriha Ringo Arc" }]
        },
        {
            id: "astral-buddy",
            title: "Toaru Kagaku no Astral Buddy (Mangá)",
            arcs: [{ id: "astral-buddy-main-arc", title: "Astral Buddy Arc" }]
        },
        {
            id: "mental-out",
            title: "Toaru Kagaku no Mental Out (Mangá)",
            arcs: [{ id: "tokiwadai-election-arc", title: "Tokiwadai Election Arc" }]
        },
        {
            id: "item",
            title: "Toaru Anbu no ITEM (Mangá)",
            arcs: [
                { id: "enemy-item-arc", title: "Enemy ITEM Arc" },
                { id: "honey-bee-queen-arc", title: "Honey Bee Queen Arc" },
                { id: "dark-justice-arc", title: "Dark Justice Arc" }
            ]
        }
    ];

    // --- DOM ELEMENTS ---
    const checklistContainer = document.getElementById('checklist-container');
    const overallProgressBar = document.getElementById('overall-progress-bar');
    const overallProgressValue = document.getElementById('overall-progress-value');
    const resetButton = document.getElementById('reset-progress-button');
    const loadingPlaceholder = document.querySelector('.loading-placeholder');

    const STORAGE_PREFIX = 'toaruChecklist_';

    // --- STATE ---
    let arcStates = {}; // Stores checked state for each arc { arcId: boolean }

    // --- CORE FUNCTIONS ---

    function generateSafeId(str) {
        return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }

    function renderChecklist() {
        checklistContainer.innerHTML = ''; // Clear previous content or placeholder

        toaruSeriesData.forEach(series => {
            const seriesCard = document.createElement('section');
            seriesCard.className = 'series-card';
            seriesCard.id = `series-${series.id}`;

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
                        arcList.appendChild(createArcItem(arc, series.id, group.id));
                    });
                    details.appendChild(arcList);
                    seriesContent.appendChild(details);
                });
            } else if (series.arcs) { // For series without explicit groups
                const arcList = document.createElement('div');
                arcList.className = 'arc-list arc-list-no-group'; // Add specific class if needed
                series.arcs.forEach(arc => {
                    arcList.appendChild(createArcItem(arc, series.id, series.id + "-main")); // Use series id as group id
                });
                seriesContent.appendChild(arcList);
            }
            seriesCard.appendChild(seriesContent);
            checklistContainer.appendChild(seriesCard);
        });
        if (loadingPlaceholder) loadingPlaceholder.style.display = 'none';
    }

    function createArcItem(arc, seriesId, groupId) {
        const arcItem = document.createElement('div');
        arcItem.className = 'arc-item';

        const checkboxId = `${STORAGE_PREFIX}${generateSafeId(seriesId)}-${generateSafeId(groupId)}-${generateSafeId(arc.id)}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = checkboxId;
        checkbox.dataset.arcId = arc.id; // Use original arc.id for logic
        checkbox.dataset.seriesId = seriesId;
        checkbox.checked = arcStates[checkboxId] || false;
        checkbox.addEventListener('change', handleCheckboxChange);

        const label = document.createElement('label');
        label.htmlFor = checkboxId;
        label.textContent = arc.title;

        arcItem.appendChild(checkbox);
        arcItem.appendChild(label);
        return arcItem;
    }

    function handleCheckboxChange(event) {
        const checkbox = event.target;
        const arcFullId = checkbox.id; // This is the localStorage key
        arcStates[arcFullId] = checkbox.checked;
        localStorage.setItem(arcFullId, checkbox.checked);
        updateProgress();
    }

    function loadProgressFromStorage() {
        let hasStoredData = false;
        toaruSeriesData.forEach(series => {
            const processGroup = (group) => {
                group.arcs.forEach(arc => {
                    const checkboxId = `${STORAGE_PREFIX}${generateSafeId(series.id)}-${generateSafeId(group.id)}-${generateSafeId(arc.id)}`;
                    const storedState = localStorage.getItem(checkboxId);
                    if (storedState !== null) {
                        arcStates[checkboxId] = storedState === 'true';
                        hasStoredData = true;
                        const checkboxElement = document.getElementById(checkboxId);
                        if (checkboxElement) checkboxElement.checked = arcStates[checkboxId];
                    } else {
                        arcStates[checkboxId] = false; // Default to false if not in storage
                    }
                });
            };

            if (series.groups) {
                series.groups.forEach(processGroup);
            } else if (series.arcs) { // For series without groups
                processGroup({ id: series.id + "-main", arcs: series.arcs }); // Simulate a group
            }
        });
        if (hasStoredData || Object.keys(arcStates).length > 0) { // Update progress even if just defaults loaded
            updateProgress();
        }
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
                    const checkboxId = `${STORAGE_PREFIX}${generateSafeId(series.id)}-${generateSafeId(group.id)}-${generateSafeId(arc.id)}`;
                    if (arcStates[checkboxId]) {
                        completedArcsInSeries++;
                        completedArcsOverall++;
                    }
                });
            };

            if (series.groups) {
                series.groups.forEach(countArcs);
            } else if (series.arcs) { // For series without groups
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
        overallProgressBar.style.width = `${overallProgressPercentage.toFixed(0)}%`;
        overallProgressValue.textContent = `${overallProgressPercentage.toFixed(0)}%`;
        document.getElementById('overall-progress-text').textContent = `(${completedArcsOverall} / ${totalArcsOverall} arcos)`; // Assuming you add this element in HTML for more details

    }

    function resetAllProgress() {
        if (confirm("Tem certeza que deseja resetar todo o seu progresso? Esta ação não pode ser desfeita.")) {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith(STORAGE_PREFIX)) {
                    localStorage.removeItem(key);
                }
            });
            arcStates = {}; // Reset in-memory state
            // Uncheck all checkboxes visually and update progress to 0
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            updateProgress(); // This will recalculate all progress to 0
        }
    }

    // --- INITIALIZATION ---
    renderChecklist();
    loadProgressFromStorage(); // This will also call updateProgress if data is found or defaults applied.
    // If no data was in storage, call updateProgress once to set initial 0% state correctly
    if (Object.keys(arcStates).length === 0) { // A more robust check might be needed if all arcs defaulted to false
        updateProgress();
    }


    resetButton.addEventListener('click', resetAllProgress);
});