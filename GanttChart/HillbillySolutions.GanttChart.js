/*
 * PAITGantt - Create a Gantt chart in SharePoint using a custom list
 * Version 1.0 
 * @requires jQuery v1.7 or greater 
 * @requires jQuery.Gantt
 *			  moment.js
 *			 jquery.cookie
 *
 * Copyright (c) 2016 Mark Rackley / PAIT Group
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */
/**
 * @description Turn a SharePoint 2013/2016 list in SharePoint into a Gantt Chart
 * @type jQuery
 * @name PAITGantt
 * @category Plugins/PAITGantt
 * @author Mark Rackley / http://www.paitgroup.com / mrackley@paitgroup.com
 */

$.fn.PAITGantt = function (options)
{
	var categoryData = {};
	
	document.write('<div class="PAITGantt"></div>');
	
     var opt = $.extend({}, {
		listName: 'Gantt',
		viewTitle: 'All Items',
		title: 'Title',
		startDate: 'StartDate',
		endDate: '_EndDate',
		category1: '_Category',
		category2: 'Category2',
		cssClass: 'cssClass',
		url: '#',
    }, options);

		 var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + opt.listName + "')/Views/getbytitle('" + opt.viewTitle + "')";
		
		var call = $.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			headers: {
				Accept: "application/json;odata=verbose"
			}
		});
		call.done(function (data,textStatus, jqXHR){
			var viewQuery = data.d.ViewQuery;
			var viewXml = '<View><Query>' + viewQuery + '</Query></View>';
			var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + opt.listName + "')/getitems"; 
			var query = {  
				'query' : {
					'__metadata': { 'type': 'SP.CamlQuery' }, 
					'ViewXml' : viewXml  
				}
			};
			var call2 = $.ajax({
				url: url,
				type: "POST",
				dataType: "json",
				data:  JSON.stringify(query),
				headers: {
					Accept: "application/json;odata=verbose",
					"Content-Type": "application/json;odata=verbose",
		            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
				}
	
			});
			call2.done(function (data,textStatus, jqXHR){
				
				
				for(index in data.d.results)
				{
					thisCatData = categoryData[data.d.results[index][opt.category1]];
					if (thisCatData == undefined)
					{
						thisCatData = {
							category: data.d.results[index][opt.category1], 
							subCats: {},
							hidden: false,
							to: data.d.results[index][opt.endDate],
							from: data.d.results[index][opt.startDate]
							};
					}
					var subCat = thisCatData.subCats[data.d.results[index][opt.category2]];
					if (subCat == undefined)
					{
						subCat = {
							subCategory: data.d.results[index][opt.category2],
							values: []
						};
						
					}
					if ( moment(thisCatData.to).diff(moment(data.d.results[index][opt.endDate])) < 0)
					{
						thisCatData.to = data.d.results[index][opt.endDate];
					}
					if ( moment(thisCatData.from).diff(moment(data.d.results[index][opt.startDate])) > 0)
					{
						thisCatData.from = data.d.results[index][opt.startDate];
					}
					subCat.values.push({
							to: data.d.results[index][opt.endDate],
							from: data.d.results[index][opt.startDate],
							desc: data.d.results[index][opt.title] + "("+moment(data.d.results[index][opt.startDate]).format('MM/DD/YYYY') +" - "+moment(data.d.results[index][opt.endDate]).format('MM/DD/YYYY')+")", 
							label: data.d.results[index][opt.title],
							customClass: data.d.results[index][opt.cssClass],
							dataObj: data.d.results[index].Id
						});
					thisCatData.subCats[data.d.results[index][opt.category2]] = subCat;
					categoryData[data.d.results[index][opt.category1]] = thisCatData;
				}
				
				

				RenderGantt();
				
			});
		
			call2.fail(function (jqXHR,textStatus,errorThrown){
				alert("Error retrieving Fields: " + jqXHR.responseText);
			});
			
		});

		call.fail(function (jqXHR,textStatus,errorThrown){
			alert("Error retrieving view: " + jqXHR.responseText);
		});	
		
		function RenderGantt()
		{
			var ganttData = new Array();

			for (cat in categoryData)
			{
			
				currentcat = cat;
				var expand = "- ";
				if (categoryData[cat].hidden)
				{
					expand = "+ ";
				}

				ganttData.push({
					name: expand + currentcat,
					desc: " ",
					values: [{
							to: categoryData[cat].to,
							from: categoryData[cat].from,
							desc: "("+moment(categoryData[cat].from).format('MM/DD/YYYY') +" - "+moment(categoryData[cat].to).format('MM/DD/YYYY')+")", 
							label: "("+moment(categoryData[cat].from).format('MM/DD/YYYY') +" - "+moment(categoryData[cat].to).format('MM/DD/YYYY')+")", 
							customClass: "ganttGrey",
							dataObj: "0"
							}
							]
				});
		
				if (!categoryData[cat].hidden)
				{
					for (subcat in categoryData[cat].subCats)
					{
												
						ganttData.push({
							name: " ",
							desc: subcat,
							values: categoryData[cat].subCats[subcat].values
						});
						currentcat = " ";
					
					}
				}
			}

			$(".PAITGantt").gantt({
				source: "ajax/data.json",
				scale: "days",
				minScale: "days",
				maxScale: "months",
				source: ganttData,
				itemsPerPage: 25,
				useCookie: true,
				scrollToToday: false,
				onItemClick: function(data) {
					window.open(opt.url + data, '_blank');
				},
				onAddClick: function(dt, rowId) {
					//alert("Empty space clicked - add an item!");
				},
				onRender: function() {
					$("div[id^='rowheader'").click(function()
					{
						var category1 = $.trim($(this).text()).replace("+ ","").replace("- ","");
						if(category1.length>0)
						{
							
							categoryData[category1].hidden = !(categoryData[category1].hidden);
							RenderGantt();
						}
						
					});
					console.log("chart rendered");
				}
			});				
		
		}	
}