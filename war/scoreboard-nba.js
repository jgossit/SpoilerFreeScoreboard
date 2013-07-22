var padZerosPeriodLength = 2;
var padZerosTotalLength = 3;
var regulationPeriods = 4;

function hideFinalScores(ele)
{
	ele.find('td > span[class="yspscores"]:even').css( { border : "1px dotted red", color : "FFFFCC" } );
	ele.find('td > span[class="yspscores"]:odd').hide(); // Final/OT etc. spoiler
}

function getInsertQuestionsString(ele)
{
	var overTime = ele.find('tbody > tr.ysptblclbg5:first > td.yspscores:eq(5)').text() == '00' ? 'No&nbsp;' : 'Yes';
	return getInsertQuestionString('Within 8 after third quarter?', withinMargin(ele, 3, 8)) +
		   getInsertQuestionString('Within 8 after fourth quarter?', withinMargin(ele, 4, 8))+
		   getInsertQuestionString('Within 2 after eighth inning?', withinMargin(ele, 8, 2));
}