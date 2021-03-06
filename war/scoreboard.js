// pads zero's in front of scores to ensure uniform length and avoid spoilers
function padZeros(ele, len)
{
	while (ele.text().length  < len)
		ele.text('0' + ele.text());
}
// creates a new table row for the additional info questions after the recap
function getInsertQuestionString(question, answer)
{
	return "<tr class=\"ysptblclbg5\" style=\"background-color:F4F5F1\"><td>" + question + "</td><td class=\"yspscores\" style=\"font-family: 'Courier New', monospace;border:1px dotted red;color:F4F5F1\">" + answer + "</td></tr>";
}

// checks whether the scores are within a certain margin (i.e. a close game) after the specified period
function withinMargin(ele, periodNum, margin)
{
	var periodTextAway = ele.find('tbody > tr.ysptblclbg5:eq(0) > td.yspscores:eq(' + periodNum + ')').text();
	var periodTextHome = ele.find('tbody > tr.ysptblclbg5:eq(1) > td.yspscores:eq(' + periodNum + ')').text();
	if (periodTextAway.indexOf('nbsp') != -1) // not up to this period yet
		return 'Yes';
	var awayTotal = parseInt(periodTextAway.substring(periodTextAway.indexOf('(')+1, periodTextAway.indexOf(')')));
	var homeTotal = parseInt(periodTextHome.substring(periodTextHome.indexOf('(')+1, periodTextHome.indexOf(')')));
	return (awayTotal - homeTotal <= margin && homeTotal - awayTotal <= margin ? 'Yes' : 'No&nbsp;');
}

$(function()
{
	$('a').not('[href^="http"]').each(function(index)
	{
		var hrefVal = $(this).attr('href');
		$(this).attr('href','http://sports.yahoo.com'+hrefVal);
	});
	$('img[src*="or_arrow"]').hide(); // arrow indicating winner
	$('tr.ysptblclbg5').each(function(index)
	{
		if ($(this).find('td[class="yspscores"]').length != 0) // NFL pre-game status
		{
			while ($(this).find('td[class="yspscores"]').length < 7) // insert empty scores for OT periods that didn't happen
				$(this).find('td[class="yspscores"]').last().after('<td style="border:1px dotted red;color:EEEEDD" class="yspscores">00</td>');

			// borders showing fields that can be revealed, blend text to background color
			$(this).find('td[class="yspscores"]').css( { border : "1px dotted red", color : "EEEEDD" } );
			hideFinalScores($(this));
			
			var cumulativeScore = 0;
			$(this).find('td[class="yspscores"]').each(function(index) // period scores
			{
				if ($(this).text() != 'X')
					cumulativeScore += parseInt($(this).text());
				padZeros($(this), padZerosPeriodLength);
				if (index > 0 && index < regulationPeriods) // append cumulative score for regulation periods
					$(this).text($(this).text() + "(" + cumulativeScore + ") ");
			});
			
			$(this).find('td > span[class="yspscores"]').each(function(index) // total score
			{
				padZeros($(this), padZerosTotalLength);
			});
		}
	});
	
	$("table.scores").each(function(index)
	{
		$(this).find('tbody > tr > td[width=25]:gt(3)').remove(); // existing NBA OT headers
		$(this).find('tbody > tr > td[width=23]:gt(3)').remove(); //          NFL
		for (var i=1;i<4;i++) // replace with ambiguous OT headers
		{
			$(this).find('tbody > tr > td[width=25]:last').after('<td rowspan="5" width="1" class="yspwhitebg"></td><td width="25" class="yspscores">' + i + 'OT?</td>');
			$(this).find('tbody > tr > td[width=23]:last').after('<td rowspan="5" width="1" class="yspwhitebg"></td><td width="23" class="yspscores">' + i + 'OT?</td>');
		}
		$(this).find('tbody > tr > td[width=25]').attr('width', '40'); // to encompass cumulative scores
		$(this).find('tbody > tr > td[width=23]').attr('width', '40');
		$(this).find('tbody > tr > td[width=18]:lt(-3)').attr('width', '40');
		
		if ($(this).find('tbody > tr.ysptblclbg5:first').find('td[class="yspscores"]').length != 0)
		{
			$(this).next('table').css( { border : "1px dotted red", color : "EEEEDD" } ).children('tbody').css( { visibility : 'hidden' }); // recap box
		
			var insertQuestionsString = "<tr><td><table><tbody>";
			insertQuestionsString += getInsertQuestionsString($(this));
			insertQuestionsString += "</tbody></table></td></tr>";
			$(this).parent().parent().after(insertQuestionsString);
		}
	});
	
	$("table.scores > tbody > tr.ysptblbdr2 > td").attr('colspan', '21'); // to encompass additional OT columns
	$("table.scores > tbody > tr.yspwhitebg:first").attr('colspan', '19');
	$("#yucsHead, .footer, .mast, #hd, #ft, #container, td.ysprtcol1, #ys-scoreboard-main + td, #ysp-leaguescoreboard > div > table > tbody > tr:first, #ysp-leaguescoreboard > table > tbody > tr:first, table.yspcontent:first > tbody > tr:first, #scoreboard > tbody > tr > td:nth-child(2), #scoreboard > tbody > tr > td > table > tbody > tr:lt(-1), div[id^='nfl:scoreboard'] > table > tbody > tr:nth-child(1)").remove(); // unnecessary yahoo stuff
	$("#ys-scoreboard-main, table.yspcontent:first, #doc, #bd, #ysp-leaguescoreboard > div > table, #scoreboard > tbody > tr > td > table").attr('width', '100%');
	$("#doc, #bd").attr('id', null);
	
	// reveal (unhide and make text visible)
	$("tr.ysptblclbg5 > td[class='yspscores'], tr.ysptblclbg5 > td > span[class='yspscores']").click(function ()
	{
		$(this).css( { border : "none", color : "black" } );
	});
	$("table.scores + table").click(function ()
	{
		$(this).children().css("visibility","visible");
		$(this).css( { border : "none", color : "black" } );
	});
});