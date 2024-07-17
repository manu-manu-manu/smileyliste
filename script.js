$(document).ready(function() {
  var numSmileys = 50;
  var smileyStates = []; // Array zum Speichern der Smileys-Zustände
  
  // Funktion zum Laden der Smileys-Zustände aus dem Local Storage
  function loadSmileyStates() {
    var storedStates = localStorage.getItem('smileyStates');
    if (storedStates) {
      smileyStates = JSON.parse(storedStates);
    } else {
      // Falls kein gespeicherter Zustand vorhanden ist, initialisiere mit '🌕'
      smileyStates = Array(numSmileys).fill('🌕');
    }
  }
  
  // Funktion zum Speichern der Smileys-Zustände im Local Storage
  function saveSmileyStates() {
    localStorage.setItem('smileyStates', JSON.stringify(smileyStates));
  }
  
  // Funktion zum Erstellen der Smileys basierend auf ihren Zuständen
  function createSmileys() {
    var container = $('#container');
    container.empty(); // Container leeren, falls bereits gefüllt
    
    for (var i = 0; i < numSmileys; i++) {
      var smiley = $('<div/>').addClass('smiley').text(smileyStates[i]);
      container.append(smiley);
    }
  }
  
  // Smileys initial laden und erstellen
  loadSmileyStates();
  createSmileys();
  
  // Event-Handler für Klick auf Smileys
  $('#container').on('click', '.smiley', function() {
    var index = $(this).index(); // Index des geklickten Smileys
    var currentText = smileyStates[index];
    
    if (currentText === '🌕') {
      smileyStates[index] = '😑';
    } else if (currentText === '😑') {
      smileyStates[index] = '😊';
    } else if (currentText === '😊') {
      smileyStates[index] = '😁';
    } else {
      smileyStates[index] = '🌕';
    }
    
    saveSmileyStates(); // Zustände im Local Storage speichern
    createSmileys(); // Smileys aktualisieren
  });
  
  // Event-Handler für Button "Ergebnisse zurücksetzen"
  $('#resetBtn').click(function() {
    $('#modal').css('display', 'block');
  });
  
  // Event-Handler für Ja-Button im Modal
  $('#yesBtn').click(function() {
    smileyStates = Array(numSmileys).fill('🌕'); // Alle Smileys zurücksetzen
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
    numSmileys += 50;
    loadSmileyStates(); // Smileys-Zustände neu laden
    createSmileys(); // Smileys aktualisieren
  });
});
