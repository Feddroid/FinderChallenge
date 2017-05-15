function Contains(o,t){
	if (o.indexOf(t) != -1) {
		return true;
	}
}

function SearchForm(){

	var searchText = $("#search").val().toLowerCase();

	$("#contentData li").each(function(){
		if (!Contains($(this).text().toLowerCase(), searchText)) {
			$(this).hide();
		}else{
			$(this).show();
		}
	});

}

$("#search").keyup(function(){

	var searchValue = $(this).val();

	if (searchValue == "") {
		$("#contentData li").show();
	}

});