<script type="text/javascript" src="//code.jquery.com/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="../SiteAssets/GanttChart/HillbillySolutions.GanttChart.js" ></script>
<script type="text/javascript" src="../SiteAssets/GanttChart/js/jquery.fn.gantt.min.js" ></script>
<script src="../SiteAssets/GantChart/moment.min.js"></script>

<link rel="stylesheet" href="../SiteAssets/GanttChart/css/style.css">

<style type="text/css">

/* 
	Example css style for an entry in the gantt chart
	the below entry is for a class called "ganttCustom".
	the included css file (style.css) comes with several styles already 
	defined that can be used including:
  		ganttRed 
  		ganttGreen 
  		ganttOrange
*/
.fn-gantt .ganttCustom {
    background-color: #F9C4E1;
}
.fn-gantt .ganttCustom .fn-label {
    color: #78436D !important;
}


</style>

<script type="text/javascript">

  $().PAITGantt({
        listName:  'Gantt', //name of list to use for Gantt Chart
		viewTitle: 'All Items', //name of the view to use that will determine which items are returned (allows for custom queries)
		startDate: 'StartDate', //INTERNAL Field name of start date field
		endDate: 'OData__EndDate', //INTERNAL Field name of end date field
		category1: 'OData__Category', //INTERNAL Field name of Category 1 field (Main task)
		category2: 'Category2', //INTERNAL Field name of Category 2 field (sub task grouped by Category 1)
		cssClass: 'cssClass', //INTERNAL Field name of field that specifies css class to use for entry
		url: 'https://masonjar.sharepoint.com/sites/demos/Lists/Gantt/DispForm.aspx?ID=' //URL to go to when user clicks on an entry. 
    });
    
</script>
