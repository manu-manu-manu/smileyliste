$(document).ready(function() {
  var baseNumSmileys = 50; // Grundanzahl der Smileys
  var numAddedSmileys = 0; // Anzahl der zusätzlich hinzugefügten Smileys
  var smileyStates = [];

  // Funktion zum Laden der Smileys-Zustände aus dem Local Storage
  function loadSmileyStates() {
    var storedData = localStorage.getItem('smileyAppData');
    if (storedData) {
      var parsedData = JSON.parse(storedData);
      smileyStates = parsedData.smileyStates || [];
      numAddedSmileys = parsedData.numAddedSmileys || 0;
      baseNumSmileys = parsedData.baseNumSmileys || baseNumSmileys;
    } else {
      smileyStates = Array(baseNumSmileys).fill('🟡');
    }
  }

  // Funktion zum Speichern der Smileys-Zustände im Local Storage
  function saveSmileyStates() {
    var data = {
      smileyStates: smileyStates,
      numAddedSmileys: numAddedSmileys,
      baseNumSmileys: baseNumSmileys
    };
    localStorage.setItem('smileyAppData', JSON.stringify(data));
  }

  // Funktion zum Erstellen der Smileys basierend auf ihren Zuständen
  function createSmileys() {
    var container = $('#container');
    container.empty(); // Container leeren, falls bereits gefüllt

    var totalSmileys = baseNumSmileys + numAddedSmileys;
    for (var i = 0; i < totalSmileys; i++) {
      var smiley = $('<div/>').addClass('smiley').text(smileyStates[i] || '🟡');
      container.append(smiley);
    }
  }

  // Smileys initial laden und erstellen
  loadSmileyStates();
  createSmileys();

  // Event-Handler für Klick auf Smileys
  $('#container').on('click', '.smiley', function() {
    var index = $(this).index(); // Index des geklickten Smileys


    // Zustand des geklickten Smileys ändern
    if (smileyStates[index] === '🟡') {
      smileyStates[index] = '😑';
    } else if (smileyStates[index] === '😑') {
      smileyStates[index] = '😊';
    } else if (smileyStates[index] === '😊') {
      smileyStates[index] = '😁';
    }

    saveSmileyStates(); // Zustände im Local Storage speichern
    $(this).text(smileyStates[index]); // Text des geklickten Smileys aktualisieren
  });

  // Event-Handler für Button "Ergebnisse zurücksetzen"
  $('#resetBtn').click(function() {
    $('#modal').css('display', 'block');
  });

  // Event-Handler für Ja-Button im Modal
  $('#yesBtn').click(function() {
    baseNumSmileys = 50; // Grundanzahl der Smileys auf 50 zurücksetzen
    numAddedSmileys = 0; // Zusätzlich hinzugefügte Smileys auf 0 zurücksetzen
    smileyStates = Array(baseNumSmileys).fill('🟡'); // Alle Smileys zurücksetzen
    saveSmileyStates(); // Zustände im Local Storage speichern
    createSmileys(); // Smileys aktualisieren
    $('#modal').css('display', 'none'); // Modal schließen
  });

  // Event-Handler für Nein-Button im Modal
  $('#noBtn').click(function() {
    $('#modal').css('display', 'none'); // Modal schließen
  });

  // Event-Handler für Button "Weitere 50 hinzufügen"
  $('#addBtn').click(function() {
    numAddedSmileys += 50;

    saveSmileyStates(); // Zustände im Local Storage speichern
    createSmileys(); // Smileys aktualisieren
  });
});
