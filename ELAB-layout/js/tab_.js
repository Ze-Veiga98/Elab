
/* To have a tab visible on page load, add the class active to both the initializing menu and the tab.
Please see semantic ui webpage*/

// tab
 $('.menu .item').tab();  


 // Initial displacement
 $('#range1').range({
    min: 0,
    max: 20,
    start: 1,
    input: '#input1'
  });

  // Nnumber of samples
 $('#range2').range({
    min: 0,
    max: 400,
    start: 33,
    input: '#input2'
  });

    