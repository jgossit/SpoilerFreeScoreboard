var padZerosPeriodLength = 1;
var padZerosTotalLength = 2;
var regulationPeriods = 9;

function hideFinalScores(ele)
{
	ele.find('td > span[class="yspscores"]').css( { border : "1px dotted red", color : "FFFFCC" } );
}

function getInsertQuestionsString(ele)
{
	return getInsertQuestionString('Within 2 after eighth inning?', withinMargin(ele, 8, 2));
}