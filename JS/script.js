
// Sélectionner le SVG avec Snap.svg
let Mongraph;
let layer1, layer2;
let Deuxmille1;
let Deuxmille2;
let Deuxmille3;
let Deuxmille4;
let années;
let an;
let Mongraph2;
let activeYear;
let Colonne2021;
let Colonne2022;
let Colonne2023;
let Colonne2024;
let ColonneActif;
let animationInterval;
let graphTitle; // Déplacez cette déclaration ici pour la rendre accessible
let stopButton;

//metre loaded frame: récupère l'élément charger par load



function Affichergraphe(loadedFragment) {
    console.log(loadedFragment);
    Mongraph.append(loadedFragment);
    années = [Mongraph.select("#year2021"), Mongraph.select("#year2022"),
    Mongraph.select("#year2023"), Mongraph.select("#year2024")];
    NombreAnnées = [Mongraph.select("#btn2021", Mongraph.select("#btn2022", Mongraph.select("#btn2023"),
        Mongraph.select("#btn2024")))]
    Deuxmille1 = Mongraph.select("#year2021");
    Deuxmille2 = Mongraph.select("#year2022");
    Deuxmille3 = Mongraph.select("#year2023");
    Deuxmille4 = Mongraph.select("#year2024");


    années.forEach((année) => {
        if (année) {
            // Ajouter un événement mouseover
            année.mouseover(function () {
                année.animate({ transform: "t0,-50" }, 1000, mina.bounce);
            });

            // Ajouter un événement mouseout pour rétablir l'élément à son état d'origine
            année.mouseout(function () {
                année.animate({ transform: "" }, 1000, mina.bounce);
            });

            // Ajouter un événement click pour afficher seulement l'année cliquée
            année.click(function () {
                années.forEach((a) => {
                    if (a !== année) {
                        a.attr({ display: "none" });

                    }
                });
            });
        }
    });
}



function AfficherGraphiquedeux (loadedFragment) {
    console.log(loadedFragment);
    Mongraph2.append(loadedFragment);
    graphTitle = Mongraph2.select("#titre0");
    stopButton = document.getElementById("arreterAnim");

  
    an = [Mongraph2.select("#an2021"), Mongraph2.select("#an2022"), Mongraph2.select("#an2023"), Mongraph2.select("#an2024")];

    Colonne2021 = Mongraph2.select("#an2021");
    Colonne2022 = Mongraph2.select("#an2022");
    Colonne2023 = Mongraph2.select("#an2023");
    Colonne2024 = Mongraph2.select("#an2024");

    if (!Colonne2021 || !Colonne2022 || !Colonne2023 || !Colonne2024) {
        console.error("Une ou plusieurs colonnes ne sont pas définies.");
        return; // Sortir si les colonnes ne sont pas disponibles
    }
   
    ColonneActif = [Colonne2021, Colonne2022, Colonne2023, Colonne2024];
  
    if (graphTitle) {
        graphTitle.click(moveTitle);
    } else {
        console.error("Le titre n'a pas été trouvé.");
    }

    // Si le bouton d'arrêt est trouvé, on attache l'événement
    if (stopButton) {
        stopButton.addEventListener("click", () => {
            clearInterval(animationInterval);
        });
    } else {
        console.error("Le bouton d'arrêt n'a pas été trouvé.");
    }
    if (graphTitle) {
        graphTitle.click(moveTitle);
    } else {
        console.error("Le titre n'a pas été trouvé.");
    }

    if (stopButton) {
        stopButton.addEventListener("click", () => {
            clearInterval(animationInterval);
        });
    } else {
        console.error("Le bouton d'arrêt n'a pas été trouvé.");
    }



     ColonneActif.forEach((focus) => {
        // Attacher l'événement click
        focus.click(function () {
            TEST(focus); // Appeler TEST avec la colonne cliquée
        });

        // Attacher les événements hover
        focus.hover(
            function () {
                // Diminuer l'opacité des autres colonnes
                ColonneActif.forEach((otherFocus) => {
                    if (otherFocus !== focus) {
                        otherFocus.animate({ opacity: 0.5 }, 300);
                    }
                });
                // Maintenir l'opacité de la colonne survolée
                focus.animate({ opacity: 1 }, 300);
            },
            function () {
                // Rétablir l'opacité des autres colonnes
                ColonneActif.forEach((otherFocus) => {
                    otherFocus.animate({ opacity: 1 }, 300);
                });
            }
        );
    });

    const hoverArea = Mongraph2.select("#coté_lair");

hoverArea.hover(
    function () {
        // Code à exécuter lorsque la souris est sur l'élément
        // Par exemple, vous pouvez changer l'opacité des colonnes
        hoverArea.animate({ transform: "s1.2", fill: "rgba(255, 255, 0, 0.5)" }, 300); // Changer la couleur et grossir
        
    },
    function () {
        // Code à exécuter lorsque la souris quitte l'élément
        console.log("Sortie de la zone !");
        ColonneActif.forEach(colonne => {
           colonne.animate({ transform: "" }, 1000, mina.bounce);
        });
    }
);



}


// Fonction pour gérer l'affichage des colonnes
function TEST(activeFocus) {
    ColonneActif.forEach(focus => {
        if (focus !== activeFocus) {
            focus.attr({ display: "none" }); // Cacher les autres colonnes
        } else {
            focus.attr({ display: "inline" }); // Afficher la colonne active
        }
    });
}
function moveTitle() {
    console.log("Animation du titre activée");
    animationInterval = setInterval(() => {
        const xOffset = Math.floor(Math.random() * 20) - 10;
        const yOffset = Math.floor(Math.random() * 20) - 10;
        const currentX = parseFloat(graphTitle.attr("x"));
        const currentY = parseFloat(graphTitle.attr("y"));
        graphTitle.attr({
            x: currentX + xOffset,
            y: currentY + yOffset
        });
    }, 100);
}

function resetColumns() {
    ColonneActif.forEach(focus => {
        focus.attr({ display: "inline" }); // Réafficher toutes les colonnes
    });
}


// Fonction pour déplacer le titre



function init() {
    console.log("Page chargé");
    Mongraph = Snap("#Mongraph1");
    Mongraph2 = Snap("#Mongraph2");
    Snap.load("Image/graphique2.svg", Affichergraphe);
    Snap.load("Image/graphique1.svg", AfficherGraphiquedeux);
    
    const resetButton = document.getElementById("resetButton");
    if (resetButton) {
        resetButton.addEventListener("click", resetColumns);
    }
   
    
}


        window.addEventListener("load", init)

