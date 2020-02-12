<script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script> 

<script type="text/javascript" src="//cdn.datatables.net/1.10.10/js/jquery.dataTables.min.js"></script>
<link  type="text/css" rel="stylesheet" href="//cdn.datatables.net/1.10.10/css/jquery.dataTables.min.css" /> 

<style type="text/css">
#example_filter {
  float: left;
  text-align: left;
  font-size: large;
  border-radius: 5px; 
-moz-border-radius: 5px; 
-webkit-border-radius: 5px; 
border: 2px solid #800000;
   padding-top: 5px;
    padding-right: 5px;
    padding-bottom: 5px;
    padding-left: 5px;
-webkit-box-shadow: 3px 6px 5px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 3px 6px 5px 0px rgba(0,0,0,0.75);
box-shadow: 3px 6px 5px 0px rgba(0,0,0,0.75);
}

#example_length {
  display: none;
}

#example {
	padding-top: 10px;
}

.letter
{
    cursor: pointer;
}

</style>

<script type="text/javascript">

var CamargoClientArray = [];
var PhoneBook = {};

jQuery(document).ready(function($) {

	  
		var call = $.ajax({
    		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/webs?$select=Title,Url",
    		type: "GET",
    		dataType: "json",
    		headers: {
    			Accept: "application/json;odata=verbose"
    		}
   	
    	});
    	call.done(function (data,textStatus, jqXHR){
    	
    		
    		for (index in data.d.results)
    		{
    			var thisClient = 
    				{
    					client: "<a href='"+data.d.results[index].Url+"'>" + data.d.results[index].Title + "</a>" 
    				};
 				CamargoClientArray.push(thisClient);
 				var letter = data.d.results[index].Title.substring(0,1).toUpperCase();
 				var thisLetter = PhoneBook[letter];
 				if (thisLetter == null)
 				{
 					thisLetter = new Array();
 				}
 				thisLetter.push(thisClient);
 				PhoneBook[letter] = thisLetter;
    		}
    		
			$('#example').dataTable({
				"destroy": true,
		        "bProcessing": true,
		        "iDisplayLength": 10,
		        "aaData": CamargoClientArray ,
		        "aoColumns": [
		            { "mData": "client" }
		  		]
			  });

	
    	});
    	call.fail(function (jqXHR,textStatus,errorThrown){
    		alert("Error retrieving Tasks: " + jqXHR.responseText);
    	});
    	
    	$(".letter").click(function()
    	{
    		displayPhoneBook($(this).text());
    	});

});

function displayPhoneBook(letter)
{
				$('#example').dataTable({
				"destroy": true,
		        "bProcessing": true,
		        "iDisplayLength": 50,
		        "aaData": PhoneBook[letter] ,
		        "aoColumns": [
		            { "mData": "client" }
		  		]
			  });

}

</script> 

<h2>
<span class='letter'>A</span> | 
<span class='letter'>B</span> | 
<span class='letter'>C</span> | 
<span class='letter'>D</span> | 
<span class='letter'>E</span> | 
<span class='letter'>F</span> | 
<span class='letter'>G</span> | 
<span class='letter'>H</span> | 
<span class='letter'>I</span> | 
<span class='letter'>J</span> | 
<span class='letter'>K</span> | 
<span class='letter'>L</span> | 
<span class='letter'>M</span> | 
<span class='letter'>N</span> | 
<span class='letter'>O</span> | 
<span class='letter'>P</span> | 
<span class='letter'>Q</span> | 
<span class='letter'>R</span> | 
<span class='letter'>S</span> | 
<span class='letter'>T</span> | 
<span class='letter'>U</span> | 
<span class='letter'>V</span> | 
<span class='letter'>W</span> | 
<span class='letter'>X</span> | 
<span class='letter'>Y</span> | 
<span class='letter'>Z</span> 
</h2><br>

<table cellpadding="0" cellspacing="0" border="0" class="display" id="example" >
<thead><th></th></thead>
</table>



