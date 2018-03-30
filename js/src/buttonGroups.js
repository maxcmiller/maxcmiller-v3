/*
 * Code for the button group that toggles different versions of the
 * Metalithic portfolio item.
 */

contentTabs = [$('#metalithic_v1'), $('#metalithic_v2')];
showButtons = [$('#show_metalithic_v1'), $('#show_metalithic_v2')];

// By default:
$('#metalithic_v1').hide(); // hide the first content tab; and
var selectedButton = 1;     // select the second content tab

function handleShowButtonClick(clickedButtonId) {
  // If the current content tab is already displayed, don't do anything
  if (clickedButtonId == selectedButton) return;

  // First, hide all the content tabs
  for (var i = 0; i < contentTabs.length; i++) {
    contentTabs[i].hide();
  }
  // Then show the tab whose button was clicked
  contentTabs[clickedButtonId].show();

  // Toggle both buttons as active/inactive
  showButtons[clickedButtonId].toggleClass('button--primary');
  showButtons[selectedButton].toggleClass('button--primary');

  // Finally, set the currently selected button to the one just clicked
  selectedButton = clickedButtonId;
}

function createCallback(clickedButtonId) {
  return function() {
    handleShowButtonClick(clickedButtonId);
  }
}

// Create a click handler for all the button group buttons
for (var i = 0; i < showButtons.length; i++) {
  showButtons[i].click(createCallback(i));
}
