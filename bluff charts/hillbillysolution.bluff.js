<script type="text/javascript" src="../SiteAssets/jquery.min.js"></script> 

<script type="text/javascript" src="../SiteAssets/js-class.js"></script>
<script type="text/javascript" src="../SiteAssets/bluff-min.js"></script>
<script type="text/javascript" src="../SiteAssets/excanvas.js"></script>

<script type="text/javascript">

var tasks = {};

jQuery(document).ready(function($) {

	
	  
		var call = $.ajax({
    		url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('Tasks')/items?$select=Title,Id,Status,AssignedTo/Title&$expand=AssignedTo&$top=500",
    		type: "GET",
    		dataType: "json",
    		headers: {
    			Accept: "application/json;odata=verbose"
    		}
   	
    	});
    	call.done(function (data,textStatus, jqXHR){
			
//			alert(jqXHR.responseText);
					
    		for (index in data.d.results)
    		{
    			var thisResult = data.d.results[index];
    			var thisPerson =  thisResult.AssignedTo.Title;
    			var thisStatus =  thisResult.Status.replace(/ /g, '');
    			
    			var thisTask  = tasks[thisPerson];
//				alert(data.d.results[index].AssignedTo[0].Title);  
	  			if (thisTask == undefined)
    			{
    				
    				thisTask = {
    							name: thisPerson,
    							Completed: 0,
    							NotStarted: 0,
    							InProgress: 0,
    							Canceled: 0,
    							total: 1
    						  }
    				
    				thisTask[thisStatus] = 1;
    			    
    			} else {
					thisTask[thisStatus]++;
					thisTask.total++;
    			}
    			tasks[thisPerson] = thisTask;
    			
    		}
    		DisplayBarChart(tasks);
    		
    	});
    	call.fail(function (jqXHR,textStatus,errorThrown){
    		alert("Error retrieving Tasks: " + jqXHR.responseText);
    	});

});

function DisplayBarChart()
{
	var g = eval($("#chartTypeSelect").val());//new Bluff.Line('LineBarChart', '600x400');
    
    g.title = 'Tasks By User';
    g.tooltips = true;

    g.theme_37signals();

	if ($('#chartTypeSelect option:selected').text()=="Pie" || $('#chartTypeSelect option:selected').text()=="Mini Pie" )
	{
		for (index in tasks)
		{
		    g.data(tasks[index].name, tasks[index].total);
		}
	}
	else
	{
		for (index in tasks)
		{
		    g.data(tasks[index].name, [tasks[index].Completed,tasks[index].NotStarted,tasks[index].InProgress,tasks[index].Canceled]);
		}
	}


    g.labels = {0: 'Completed', 1: 'Not Started', 2: 'In Progress',
    	3: 'Canceled'};

    g.draw();
}


</script>
Chart Type: 
<select id="chartTypeSelect" onchange="DisplayBarChart();">
	<option value="new Bluff.Line('LineBarChart', '800x400')">Line</option>
	<option value="new Bluff.Area('LineBarChart', '800x400')">Area</option>
	<option value="new Bluff.Bar('LineBarChart', '800x400')">Bar</option>
	<option value="new Bluff.Dot('LineBarChart', '800x400')">Dot</option>
	<option value="new Bluff.Mini.Bar('LineBarChart', '800x400')">Mini Bar</option>
	<option value="new Bluff.Mini.Pie('LineBarChart', '800x400')">Mini Pie</option>
	<option value="new Bluff.Mini.SideBar('LineBarChart', '800x400')">Mini Side Bar</option>
	<option value="new Bluff.Net('LineBarChart', '800x400')">Net</option>
	<option value="new Bluff.Pie('LineBarChart', '800x400')">Pie</option>
	<option value="new Bluff.SideBar('LineBarChart', '800x400')">Side Bar</option>
	<option value="new Bluff.SideStackedBar('LineBarChart', '800x400')">Side Stacked Bar</option>
	<option value="new Bluff.Spider('LineBarChart', '800x400')">Spider</option>
	<option value="new Bluff.StackedArea('LineBarChart', '800x400')">Stacked Area</option>
	<option value="new Bluff.StackedBar('LineBarChart', '800x400')">Stacked Bar</option>
</select>
<canvas id="LineBarChart" width="600" height="400"></canvas>

