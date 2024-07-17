$(document).ready(function() {
  var numSmileys = 50;
  
  // Funktion zum Erstellen der Smileys
  function createSmileys() {
    var container = $('#container');
    container.empty(); // Container leeren, falls bereits gefüllt
    
    for (var i = 0; i < numSmileys; i++) {
      var smiley = $('<div/>').addClass('smiley').text('🌕');
      container.append(smiley);
    }
  }
  
  // Smileys initial erstellen
  createSmileys();
  
  // Event-Handler für Klick auf Smileys
  $('#container').on('click', '.smiley', function() {
    var currentText = $(this).text();
    
    if (currentText === '🌕') {
      $(this).text('😑');
    } else if (currentText === '😑') {
      $(this).text('😊');
    } else if (currentText === '😊') {
      $(this).text('😁');
    } else {
      $(this).text('🌕');
    }
  });
  
  // Event-Handler für Button "Ergebnisse zurücksetzen"
  $('#resetBtn').click(function() {
    $('#modal').css('display', 'block');
  });
  
  // Event-Handler für Ja-Button im Modal
  $('#yesBtn').click(function() {
    createSmileys(); // Smileys zurücksetzen
    $('#modal').css('display', 'none'); // Modal schließen
  });
  
  // Event-Handler für Nein-Button im Modal
  $('#noBtn').click(function() {
    $('#modal').css('display', 'none'); // Modal schließen
  });
  
  // Event-Handler für Button "Weitere 50 hinzufügen"
  $('#addBtn').click(function() {
    numSmileys += 50;
    createSmileys(); // Neue Smileys hinzufügen
  });
});
