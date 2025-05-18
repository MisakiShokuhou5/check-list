// script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- DATA ---
    // Structured as separate series entries for OT, NT, and GT, placed consecutively
    const toaruSeriesData = [
        {
            id: "index", // Original Index (Old Testament)
            title: "Toaru Majutsu no Index",
            groups: [
                {
                    id: "index-s1-academic", title: "Academic City Arc (Index I)",
                    arcs: [
                        { id: "index-arc", title: "Index Arc", title_pt: "Arco da Index" },
                        { id: "deep-blood-arc", title: "Deep Blood Arc", title_pt: "Arco do Sangue Profundo" },
                        { id: "sisters-arc-index", title: "Sisters Arc (Index)", title_pt: "Arco das irmãs (Index)" },
                        { id: "angel-falldown-arc", title: "Angel Fall Arc", title_pt: "Arco da Queda Angelical" },
                        { id: "three-stories-arc", title: "Three Stories Arc", title_pt: "Arco das Três Histórias" },
                        { id: "kazakiri-hyouka-arc", title: "Kazakiri Hyouka Arc", title_pt: "Arco da Kazakiri Hyouka" }
                    ]
                },
                {
                    id: "index-s1-church", title: "Versus Catholic Roman Church Arc (Index II)",
                    arcs: [
                        { id: "orsola-rescue-arc", title: "Orsola Acquinas Rescue Arc", title_pt: "Arco do Resgate à Orsola Acquinas" },
                        { id: "tree-diagram-remnant-arc", title: "Tree Diagram Remnant Arc", title_pt: "Arco do Remanescente do Tree Diagram" },
                        { id: "daihasei-festival-arc-index", title: "Daihasei Festival Arc (Index)", title_pt: "Arco do Festival Daihasei (Index)" },
                        { id: "la-regina-del-mar-adriatico-arc", title: "La Regina Del Mar Adriático Arc", title_pt: "Arco La Regina Del Mar Adriático" },

                    ]
                },
                {
                    id: "index-s3-gods-right-seat", title: "Versus God's Right Seat Arc (Index III)",
                    arcs: [
                        { id: "academic-city-invasion-arc", title: "Academic City Invasion Arc", title_pt: "Arco Invasão da Cidade Acadêmica" },
                        { id: "skill-out-uprising-arc", title: "Skill Out Uprising Arc", title_pt: "Arco da Revolta da Skill-Out" },
                        { id: "battle-royale-arc", title: "Battle Royale Arc", title_pt: "Arco da Batalha Real" },
                        { id: "document-of-constantine-arc", title: "Document of Constantine Arc", title_pt: "Arco do Document of Constantine" },
                        { id: "acqua-of-the-back-arc", title: "Acqua of the Back Arc", title_pt: "Arco do Acqua of the Back" },
                        { id: "royal-british-family-arc", title: "Royal British Family Arc", title_pt: "Arco Família Real Britânica" },
                        { id: "dragon-arc", title: "DRAGON Arc", title_pt: "Arco DRAGON" },
                        { id: "world-war-iii-arc", title: "World War III Arc", title_pt: "Arco da Terceira Guerra Mundial" }
                    ]
                }
            ]
        },
        {
            id: "index-nt", // New Testament
            title: "Toaru Majutsu no Index: New Testament",
            groups: [
                {
                    id: "gremlin-arc", title: "Gremlin Arc",
                    arcs: [
                       { id: "freshmen-arc", title: "Freshmen Arc", title_pt: "Arco do Freshmen" },
                       { id: "homecoming-arc", title: "Homecoming Arc", title_pt: "Arco Volta para Casa" },
                       { id: "hawaii-invasion-arc", title: "Hawaii Invasion Arc", title_pt: "Arco da Invasão do Havaí" },
                       { id: "bagagge-city-arc", title: "Bagagge City Arc", title_pt: "Arco da Baggage City" },
                       { id: "ichinaran-festival-arc", title: "Ichinaran Festival Arc", title_pt: "Arco Festival Ichinaran" },
                       { id: "agitate-halation-arc", title: "Agitate Halation Arc", title_pt: "Arco do Agitate Halation" },
                       // --- Moved Othinus Arc here ---
                       { id: "magic-god-othinus-arc", title: "Magic God Othinus Arc", title_pt: "Arco Deusa Mágica Othinus" },
                       // --- End of Moved Arc ---
                    ]
                },
                 // Removed the separate Magic God Arc group
                {
                    id: "fall-of-academic-city-arc", title: "Fall of Academic City Arc",
                    arcs: [
                       { id: "mental-out-nt-arc", title: "Mental Out Arc", title_pt: "Arco Mental Out" },
                       { id: "st-germain-arc", title: "St. Germain Arc", title_pt: "Arco St. Germain" },
                       { id: "magic-god-invasion-arc", title: "Magic God Invasion Arc", title_pt: "Arco Invasão dos Deuses Mágicos" }, // This is a different arc, stays here
                       { id: "world-rejecter-arc", title: "World Rejecter Arc", title_pt: "Arco World Rejecter" },
                       { id: "salome-arc", title: "Salome Arc", title_pt: "Arco Salome" },
                       { id: "element-arc", title: "Element Arc", title_pt: "Arco Elemento" },
                       { id: "kamisato-rescue-arc", title: "Kamisato Rescue Arc", title_pt: "Arco Resgate de Kamisato" },
                       { id: "aleister-crowley-arc", title: "Aleister Crowley Arc", title_pt: "Arco do Aleister Crowley" },
                       { id: "processor-suit-arc", title: "Processor Suit Arc", title_pt: "Arco Traje Processador" },
                       { id: "coronzon-arc", title: "Coronzon Arc", title_pt: "Arco Coronzon" },
                       { id: "kamijou-arc", title: "Kamijou Arc", title_pt: "Arco Kamijou" }
                    ]
                }
            ]
        },
         {
            id: "index-genesis", // Genesis Testament
            title: "Toaru Majutsu no Index: Genesis Testament",
            groups: [
                {
                    id: "rc-occultics-arc", title: "R&C Occultics Arc",
                    arcs: [
                       { id: "christmas-eve-arc", title: "Christmas Eve Arc", title_pt: "Arco Véspera de Natal" },
                       { id: "christmas-day-arc", title: "Christmas Day Arc", title_pt: "Arco Dia de Natal" },
                       { id: "operation-handcuffs-arc", title: "Operation Handcuffs Arc", title_pt: "Arco Operação Algemas" },
                       { id: "los-angeles-arc", title: "Los Angeles Arc", title_pt: "Arco Los Angeles" }
                    ]
                },
                 {
                    id: "transcendent-arc", title: "Transcendent Arc",
                    arcs: [
                       { id: "post-handcuffs-arc", title: "Post-Handcuffs Arc", title_pt: "Arco Pós-Algemas" },
                       { id: "new-years-eve-arc", title: "New Year's Eve Arc", title_pt: "Arco Véspera de Ano Novo" },
                       { id: "new-years-arc", title: "New Year's Arc", title_pt: "Arco Ano Novo" },
                       { id: "hell-tour-arc", title: "Hell Tour Arc", title_pt: "Arco Tour do Inferno" }
                    ]
                }
            ]
        },
        // Railgun and other spin-offs follow as separate series
        {
            id: "railgun-series",
            title: "Toaru Kagaku no Railgun (Series)",
            groups: [
                {
                    id: "railgun-s1", title: "Toaru Kagaku no Railgun",
                    arcs: [
                        { id: "level-upper-arc", title: "Level Upper Arc", title_pt: "Arco do Level Upper" },
                        { id: "big-spider-arc", title: "Big Spider Arc", title_pt: "Arco da Big Spider" },
                        { id: "poltergeist-arc", title: "Poltergeist Arc", title_pt: "Arco do Poltergeist" }
                    ]
                },
                {
                    id: "railgun-s", title: "Toaru Kagaku no Railgun S",
                    arcs: [
                        { id: "sisters-arc-railgun", title: "Sisters Arc (Railgun)", title_pt: "Arco das irmãs (Railgun)" },
                        { id: "silent-party-arc", title: "Silent Party Arc", title_pt: "Arco da Festa Silenciosa" }
                    ]
                },
                {
                    id: "railgun-t", title: "Toaru Kagaku no Railgun T",
                    arcs: [
                        { id: "daihasei-festival-railgun", title: "Daihasei Festival (Railgun)", title_pt: "Arco do Festival Daihasei (Railgun)" },
                        { id: "dream-ranker-arc", title: "Dream Ranker Arc", title_pt: "Arco do Poker Indiano" }
                    ]
                },
                {
                    id: "railgun-manga", title: "Toaru Kagaku no Railgun (Mangá)",
                    arcs: [
                        { id: "jailbreaker-arc", title: "Jailbreaker Arc", title_pt: "Arco da Fuga da Prisão" },
                        { id: "first-year-arc", title: "First Year Arc", title_pt: "Arco do Primeiro Ano" }
                    ]
                }
            ]
        },
        {
            id: "accelerator",
            title: "Toaru Kagaku no Accelerator",
            groups: [
                {
                    id: "accelerator-anime", title: "Anime",
                    arcs: [{ id: "necromancer-arc", title: "Necromancer Arc", title_pt: "Arco da Necromante" }]
                },
                {
                    id: "accelerator-manga", title: "Mangá",
                    arcs: [{ id: "nectar-arc", title: "Nectar Arc", title_pt: "Arco do Nectar" }]
                }
            ]
        },
         {
            id: "item",
            title: "Toaru Anbu no ITEM",
            arcs: [
                { id: "enemy-item-arc", title: "Enemy ITEM Arc", title_pt: "Arco Inimigo da ITEM" },
                { id: "honey-bee-queen-arc", title: "Honey Bee Queen Arc", title_pt: "Arco da  Rainha Abelha de Mel" },
                { id: "dark-justice-arc", title: "Dark Justice Arc", title_pt: "Arco da Justiça Sombria" }
            ]
        },
        // Spin-offs without explicit nested groups (handled by the render logic)
        {
            id: "dark-matter",
            title: "Toaru Kagaku no Dark Matter",
            arcs: [{ id: "yuzuriha-ringo-arc", title: "Yuzuriha Ringo Arc", title_pt: "Arco Ringo Yuzuriha" }]
        },
        {
            id: "astral-buddy",
            title: "Toaru Kagaku no Astral Buddy",
            arcs: [{ id: "astral-buddy-main-arc", title: "Astral Buddy Arc", title_pt: "Arco da Colega Astral" }]
        },
        {
            id: "mental-out-series",
            title: "Toaru Kagaku no Mental Out",
            arcs: [{ id: "tokiwadai-election-arc", title: "Tokiwadai Election Arc", title_pt: "Arco da Eleição de Tokiwadai" }]
        }
    ];

    // --- DEFAULT PRE-SELECTED ARCS ---
    const defaultCheckedArcIds = [
        "index-arc", "sisters-arc-index", "angel-falldown-arc", "three-stories-arc", "kazakiri-hyouka-arc",
        "orsola-rescue-arc", "tree-diagram-remnant-arc", "daihasei-festival-arc-index",
        "la-regina-del-mar-adriatico-arc", "battle-royale-arc", "document-of-constantine-arc", "acqua-of-the-back-arc",
        "level-upper-arc", "sisters-arc-railgun", "daihasei-festival-railgun", "dream-ranker-arc",
        "jailbreaker-arc",
        "necromancer-arc", "nectar-arc", "yuzuriha-ringo-arc"
    ];

    // --- Arc Lookup Map ---
    const arcLookup = {};

    // --- DOM ELEMENTS ---
    const checklistContainer = document.getElementById('checklist-container');
    const overallProgressBar = document.getElementById('overall-progress-bar');
    const overallProgressValue = document.getElementById('overall-progress-value');
    const overallProgressDetailsElement = document.getElementById('overall-progress-text');
    const resetButton = document.getElementById('reset-progress-button');
    const loadingPlaceholder = document.querySelector('.loading-placeholder');
    const translateButton = document.getElementById('translate-button');

    const STORAGE_PREFIX = 'toaruChecklist_';
    const LANGUAGE_STORAGE_KEY = 'toaruChecklist_language';

    // --- STATE ---
    let arcStates = {};
    let currentLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'pt';


    // --- CORE FUNCTIONS ---

    function generateSafeId(str) {
        if (!str) return '';
        return String(str).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }

    function getArcTitle(arcData, language) {
        if (language === 'pt' && arcData.title_pt) {
            return arcData.title_pt;
        }
        return arcData.title;
    }

    function renderChecklist() {
        checklistContainer.innerHTML = '';

        toaruSeriesData.forEach(series => {
            const seriesCard = document.createElement('section');
            seriesCard.className = 'series-card';
            seriesCard.id = `series-${series.id}`;

            const seriesHeader = document.createElement('header');
            seriesHeader.className = 'series-header';
            seriesHeader.innerHTML = `
                <h3>${series.title}</h3>
                <div class="series-progress-container">
                     <div class="progress-text" id="progress-text-${series.id}">0 / 0 (0%)</div>
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

             const renderArcsContainer = (groupOrSeries, seriesId) => {
                 const arcsContainer = document.createElement('div');
                 arcsContainer.className = 'arc-list';
                 const groupIdForId = groupOrSeries.id || generateSafeId(groupOrSeries.title);

                 groupOrSeries.arcs.forEach(arc => {
                     const checkboxGeneratedId = `${STORAGE_PREFIX}${generateSafeId(seriesId)}-${generateSafeId(groupIdForId)}-${generateSafeId(arc.id)}`;
                     arcsContainer.appendChild(createArcItem(arc, seriesId, groupIdForId, arc.id, checkboxGeneratedId));
                 });
                 return arcsContainer;
            }


            if (series.groups) {
                series.groups.forEach(group => {
                    const details = document.createElement('details');
                    details.className = 'arc-group';
                    details.open = true;

                    const summary = document.createElement('summary');
                    summary.textContent = group.title;
                    details.appendChild(summary);

                    details.appendChild(renderArcsContainer(group, series.id));
                    seriesContent.appendChild(details);
                });
            } else if (series.arcs) {
                const arcList = renderArcsContainer(series, series.id);
                arcList.classList.add('arc-list-no-group');
                seriesContent.appendChild(arcList);
            }

            seriesCard.appendChild(seriesContent);
            checklistContainer.appendChild(seriesCard);
        });
        if (loadingPlaceholder) loadingPlaceholder.style.display = 'none';
    }

    function createArcItem(arcData, seriesId, groupId, originalArcId, checkboxGeneratedId) {
        const arcItem = document.createElement('div');
        arcItem.className = 'arc-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = checkboxGeneratedId;
        checkbox.dataset.seriesId = seriesId;
        checkbox.dataset.groupId = groupId;
        checkbox.dataset.arcId = originalArcId;

        checkbox.checked = arcStates[checkboxGeneratedId] || false;
        checkbox.addEventListener('change', handleCheckboxChange);

        const label = document.createElement('label');
        label.htmlFor = checkboxGeneratedId;
        label.textContent = getArcTitle(arcData, currentLanguage);
        label.dataset.checkboxId = checkboxGeneratedId;

        arcItem.appendChild(checkbox);
        arcItem.appendChild(label);
        return arcItem;
    }

    function handleCheckboxChange(event) {
        const checkbox = event.target;
        const checkboxGeneratedId = checkbox.id;
        arcStates[checkboxGeneratedId] = checkbox.checked;
        localStorage.setItem(checkboxGeneratedId, checkbox.checked.toString());
        updateProgress();
    }

    function loadProgressFromStorage() {
         Object.keys(arcLookup).forEach(checkboxGeneratedId => {
              const arcData = arcLookup[checkboxGeneratedId];

              const storedState = localStorage.getItem(checkboxGeneratedId);

              if (storedState !== null) {
                  arcStates[checkboxGeneratedId] = storedState === 'true';
              } else {
                  if (defaultCheckedArcIds.includes(arcData.id)) {
                      arcStates[checkboxGeneratedId] = true;
                  } else {
                      arcStates[checkboxGeneratedId] = false;
                  }
              }

              const checkboxElement = document.getElementById(checkboxGeneratedId);
              if (checkboxElement) {
                  checkboxElement.checked = arcStates[checkboxGeneratedId];
              }
         });

         updateTitlesLanguage(currentLanguage);
         updateProgress();
    }

    function updateProgress() {
        let totalArcsOverall = 0;
        let completedArcsOverall = 0;

        toaruSeriesData.forEach(series => {
            let totalArcsInSeries = 0;
            let completedArcsInSeries = 0;

             const countArcs = (groupOrSeries, seriesId) => {
                 const groupIdForId = groupOrSeries.id || generateSafeId(groupOrSeries.title);

                 groupOrSeries.arcs.forEach(arc => {
                     totalArcsInSeries++;
                     totalArcsOverall++;
                     const checkboxGeneratedId = `${STORAGE_PREFIX}${generateSafeId(seriesId)}-${generateSafeId(groupIdForId)}-${generateSafeId(arc.id)}`;
                     if (arcStates[checkboxGeneratedId]) {
                         completedArcsInSeries++;
                         completedArcsOverall++;
                     }
                 });
             };

             if (series.groups) {
                 series.groups.forEach(group => countArcs(group, series.id));
             } else if (series.arcs) {
                 countArcs(series, series.id);
             }


            const seriesProgress = totalArcsInSeries > 0 ? (completedArcsInSeries / totalArcsInSeries) * 100 : 0;

            const seriesProgressBar = document.getElementById(`progress-bar-${series.id}`);
            const seriesProgressText = document.getElementById(`progress-text-${series.id}`);
            const seriesProgressValue = document.getElementById(`progress-value-${series.id}`);

            if (seriesProgressBar) {
                 const currentWidth = parseFloat(seriesProgressBar.style.width) || 0;
                 if (Math.abs(currentWidth - seriesProgress) > 0.1) {
                     seriesProgressBar.style.transition = 'width 0.5s ease-in-out';
                     seriesProgressBar.style.width = `${seriesProgress.toFixed(0)}%`;
                 } else {
                      seriesProgressBar.style.transition = 'none';
                      seriesProgressBar.style.width = `${seriesProgress.toFixed(0)}%`;
                 }
            }
            if (seriesProgressValue) seriesProgressValue.textContent = `${seriesProgress.toFixed(0)}%`;
            if (seriesProgressText) seriesProgressText.textContent = `${completedArcsInSeries} / ${totalArcsInSeries} (${seriesProgress.toFixed(0)}%)`;
        });

        const overallProgressPercentage = totalArcsOverall > 0 ? (completedArcsOverall / totalArcsOverall) * 100 : 0;
        if (overallProgressBar) {
            const currentWidth = parseFloat(overallProgressBar.style.width) || 0;
             if (Math.abs(currentWidth - overallProgressPercentage) > 0.1) {
                overallProgressBar.style.transition = 'width 0.5s ease-in-out';
                overallProgressBar.style.width = `${overallProgressPercentage.toFixed(0)}%`;
            } else {
                 overallProgressBar.style.transition = 'none';
                 overallProgressBar.style.width = `${overallProgressPercentage.toFixed(0)}%`;
            }
        }
        if (overallProgressValue) overallProgressValue.textContent = `${overallProgressPercentage.toFixed(0)}%`;

        if (overallProgressDetailsElement) {
             overallProgressDetailsElement.textContent = `(${completedArcsOverall} / ${totalArcsOverall} arcos)`;
        }
    }

    function resetAllProgress() {
        if (confirm("Tem certeza que deseja resetar todo o seu progresso? Esta ação não pode ser desfeita.")) {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith(STORAGE_PREFIX) && key !== LANGUAGE_STORAGE_KEY) {
                    localStorage.removeItem(key);
                }
            });

            arcStates = {};
             document.querySelectorAll('.arc-item input[type="checkbox"]').forEach(checkbox => {
                 checkbox.checked = false;
             });

            loadProgressFromStorage();
        }
    }

    function updateTitlesLanguage(language) {
         currentLanguage = language;
         localStorage.setItem(LANGUAGE_STORAGE_KEY, language);

         if (translateButton) {
             translateButton.textContent = language === 'en' ? 'Mostrar em Português' : 'Show in English';
         }

        document.querySelectorAll('.arc-item label').forEach(label => {
            const checkboxGeneratedId = label.dataset.checkboxId;
            const arcData = arcLookup[checkboxGeneratedId];

            if (arcData) {
                label.textContent = getArcTitle(arcData, language);
            }
        });
    }

     function toggleLanguage() {
         const newLanguage = currentLanguage === 'en' ? 'pt' : 'en';
         updateTitlesLanguage(newLanguage);
     }

     // --- Initial Arc Lookup Building ---
     toaruSeriesData.forEach(series => {
         const processGroupForLookup = (groupOrSeries, seriesId) => {
             const groupIdForId = groupOrSeries.id || generateSafeId(groupOrSeries.title);
             groupOrSeries.arcs.forEach(arc => {
                 const checkboxGeneratedId = `${STORAGE_PREFIX}${generateSafeId(seriesId)}-${generateSafeId(groupIdForId)}-${generateSafeId(arc.id)}`;
                 arcLookup[checkboxGeneratedId] = arc;
             });
         };

         if (series.groups) {
             series.groups.forEach(group => processGroupForLookup(group, series.id));
         } else if (series.arcs) {
             processGroupForLookup(series, series.id);
         }
     });


    // --- INITIALIZATION ---
    renderChecklist();
    loadProgressFromStorage();

    if (resetButton) {
        resetButton.addEventListener('click', resetAllProgress);
    }

     if (translateButton) {
         translateButton.addEventListener('click', toggleLanguage);
         translateButton.textContent = currentLanguage === 'en' ? 'Mostrar em Português' : 'Show in English';
     }

});