<script type="text/javascript" src="//code.jquery.com/jquery-1.11.1.min.js"></script> 

<script type="text/javascript" src="//cdn.datatables.net/1.10.3/js/jquery.dataTables.min.js"></script>
<link  type="text/css" rel="stylesheet" href="//cdn.datatables.net/1.10.3/css/jquery.dataTables.min.css" /> 

<script type="text/javascript" src="../SiteAssets/jquery.dataTables.rowGrouping.js"></script>

<div id="overlay"><span id="ModalMessage">WORKING ON IT...</span></div>
Enter State Abbreviation: <input type=text id="stateID" onkeyup="GetZips();" size=5 maxlength="2"> <input type="checkbox" id="groupCheck" onclick="GetZips();"> Group By County
<br>
<h1 id='title'></h1>
<table cellpadding="0" cellspacing="0" border="0" class="display" id="ZipViewTable">
<thead><th>County</th><th>Zip Code</th><th>City</th><th>Timezone</th><th>Area Codes</th><th>Latitude</th><th>Longitude</th><th>Population</th><th>ID</th></thead>
</table>


<style type="text/css">

#overlay {
    position: fixed;
    z-index: 10;
    background: black;
    display: none;
    opacity: .25;
    filter: alpha(opacity=75);
    width: 100%;
    height: 100%;
    color: white;
    text-align: center;
     vertical-align:middle;
     padding-top: 2cm;
}

#ModalMessage{
    z-index: 9;
    color: white;
    opacity: 1;
     font-size: 28px;
     font-weight: 900;
     display:inline-block; 
}


#ZipViewTable
{display:none;}

    .group
    { }

    .subgroup
    {background:#cccccc;background-color:#cccccc;border:1px solid#000;font-family:'Tahoma',sans-serif;font-size:x-small;color:#000;font-weight:bold;padding:5px;margin:5px;text-align:left; }


	.expanded-group{
				background: url("../SiteAssets/minus.jpg") no-repeat scroll left center transparent;
				padding-left: 15px !important;
				background-color:#000000;border:1px solid#000;font-family:'Tahoma',sans-serif;font-size:x-small;color:#fff;font-weight:bold;padding:5px;margin:5px;
			}

			.collapsed-group{
				background: url("../SiteAssets/plus.jpg") no-repeat scroll left center transparent;
				padding-left: 15px !important;
				background-color:#000000;border:1px solid#000;font-family:'Tahoma',sans-serif;font-size:x-small;color:#fff;font-weight:bold;padding:5px;margin:5px;
			}

#ZipViewTable tr:hover {
  background-color: #eeee99;
}




</style>

<script type="text/javascript">

	var oTable;

	function GetZips()
	{
		var state = ($("#stateID").val());
		if (state.length ==2)
		{
		var call = $.ajax({
    		url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('MasterZipCode')/items?$select=Id,Title,zip,primary_city,state,county,area_codes,timezone,latitude,longitude,estimated_population&$filter=state eq '"+state.toUpperCase()+"'&$top=5000",
    		type: "GET",
    		beforeSend: function(){$("#overlay").show();},
            complete: function(){$("#overlay").hide();},
    		dataType: "json",
    		headers: {
    			Accept: "application/json;odata=nometadata"
    		}
   	
    	});
    	call.done(function (data,textStatus, jqXHR){

			if ($("#groupCheck").is(":checked"))
			{

				oTable = $("#ZipViewTable").dataTable({ 
							"fnDrawCallback": rowClick,
							"bDestroy": true,
							"bProcessing": true,
					        "aaData": data.value,
					        "aoColumns": [
					            { "mData": "county" },
					            { "mData": "zip" },		            
					            { "mData": "primary_city" },
					            { "mData": "timezone", "searchable": false },		            
					            { "mData": "area_codes" },		            
					            { "mData": "latitude" },		            
					            { "mData": "longitude" },		            
					            { "mData": "estimated_population" },
					            { "mData": "Id", "visible": false,
								                "searchable": false,
								                "className": "idColumn"
								 }
					        ],"iDisplayLength": 100,"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',"bLengthChange": false,"bProcessing": true,}).rowGrouping({
					        	fnGroupLabelFormat: function(label) { return "COUNTY: "+ label + ""; } ,
					        	bExpandableGrouping: true});					        
			
			} else {
				oTable = $("#ZipViewTable").dataTable({ 
							"fnDrawCallback": rowClick,
							"bDestroy": true,
							"bProcessing": true,
					        "aaData": data.value,
					        "aoColumns": [
					            { "mData": "county" },
					            { "mData": "zip" },		            
					            { "mData": "primary_city" },
					            { "mData": "timezone" },		            
					            { "mData": "area_codes" },		            
					            { "mData": "latitude" },		            
					            { "mData": "longitude" },		            
					            { "mData": "estimated_population" },
					            { "mData": "Id", "visible": false,
								                "searchable": false,
								                "className": "idColumn"}
					            	            
					        ],"iDisplayLength": 100,"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',"bLengthChange": false,"bProcessing": true,});					        
			
			}
			$("#ZipViewTable").show();
			$("#title").html("ZIP CODE INFORMATION FOR " + state.toUpperCase());	


    		});
    	
    	call.fail(function (jqXHR,textStatus,errorThrown){
    		alert("Error retrieving Tasks: " + jqXHR.responseText);
    	});
		
		}
	}


	function rowClick()
	{
			$("tr[role='row']").click(function()
			{
				 var aPos = oTable.fnGetPosition( this );
			    // Get the data array for this row
			    var aData = oTable.fnGetData( aPos );
			    window.open("../Lists/MasterZipCode/DispForm.aspx?ID=" + aData.Id);
			});
	}
</script>