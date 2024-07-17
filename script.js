$(document).ready(function() {
  var baseNumSmileys = 50; // Grundanzahl der Smileys
  var numAddedSmileys = 0; // Anzahl der zusätzlich hinzugefügten Smileys
  var smileyStates = [];

  // Funktion zum Laden der Smileys-Zustände aus dem Local Storage
  function loadSmileyStates() {
    var storedStates = localStorage.getItem('smileyStates');
    if (storedStates) {
      var savedData = JSON.parse(storedStates);
      smileyStates = savedData.states;
      numAddedSmileys = savedData.addedCount;
      baseNumSmileys = savedData.baseCount;
    } else {
      smileyStates = Array(baseNumSmileys).fill('🌕');
    }
  }

  // Funktion zum Speichern der Smileys-Zustände im Local Storage
  function saveSmileyStates() {
    var data = {
      states: smileyStates,
      addedCount: numAddedSmileys,
      baseCount: baseNumSmileys
    };
    localStorage.setItem('smileyStates', JSON.stringify(data));
  }

  // Funktion zum Erstellen der Smileys basierend auf ihren Zuständen
  function createSmileys() {
    var container = $('#container');
    container.empty(); // Container leeren, falls bereits gefüllt
    
    for (var i = 0; i < baseNumSmileys + numAddedSmileys; i++) {
      var smiley = $('<div/>').addClass('smiley').text(smileyStates[i] || '🌕');
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
