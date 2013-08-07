$(document).ready(function(){

	//# 1. Function to create a new disc.
	//# 2. Function to append disc to starter-peg.

	var peg = [
		[3, 2, 1],
		[],
		[]
	];

	function dropped(event, ui) {
		var target = $(event.target);

		var targetPeg = parseInt(target.data('peg'), 10);
		var sourcePeg = parseInt(ui.draggable.data('peg') ,10);
		var disc = parseInt(ui.draggable.data('disc') ,10);

		if (peg[sourcePeg][peg[sourcePeg].length - 1] == disc) {
			if (checkAllowtoMove(sourcePeg, targetPeg)) {
				moveDisc(sourcePeg, targetPeg);
			}
		}

		updateColumns();
	}

// append disc to starter-peg
	function updateColumns(){
		var array;
		
		for(var k=0; k < 3; k++) {
			array = [];
			for (var i=0; i<peg[k].length; i++){
				array.push('<li class="disc" data-disc="' + peg[k][i] + '" data-peg="' + k + '">' + peg[k][i] + '</li>');
			}
			$('#peg' + k).html(array.reverse().join(''));
		}
		$('.disc').draggable();
	}

	function moveDisc(from, to){
		var a =  peg[from].pop();
		peg[to].push(a);
	}

	function checkAllowtoMove(from, to){

		if (peg[from].length == 0) return false;
		if (peg[to].length == 0) return true;

		var last_index_from = peg[from].length-1;
		var last_num_from = peg[from][last_index_from];

		var last_index_to = peg[to].length-1;
		var last_num_to = peg[to][last_index_to];

		return (last_num_from < last_num_to);
	}
  
	$('.peg').droppable({drop:dropped});

	updateColumns();

});
