/*
	Directive by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

/*表格分頁練習*/
//goPage(參數1,參數2)為我們換頁的function,參數第一個放的是目前頁數，第二個放一頁要秀幾筆
/*----產生data-th-----*/
$(function () {
	let $table = $(".table_change"); //抓table class
	let $thRows = $table.find("thead th");  //找到每個th
	$thRows.each(function (key, thRow) { //key是0開始
	  $table
		.find("tbody tr td:nth-child(" + (key + 1) + ")") //選擇器第一個元素是1開始
		.attr("data-th", $(thRow).text());// 將每個td塞入data-th="對應的<th>名稱"
	});
	/*-----------*/
	goPage(1, 10); // 一開始先秀第一頁,以及每一頁最多兩筆資料
  });
  
function goPage(currentPage, psize) {
	var tr =  $(".table_change tbody tr");//用css找到表格
	var num = $(".table_change tbody tr").length;//記錄表格總數
	var totalPage = 0;//總共幾頁
	var pageSize = psize;//一頁顯示幾行
	//以下是總共會有幾個分頁
	var totalPage = Math.ceil(num / pageSize); // 表格所有行數/每頁顯示行數 = 總頁數

	var startRow = (currentPage - 1) * pageSize + 1;//顯示行數  1 11 21
	var endRow = currentPage * pageSize;//結束的行數   10 20 30
	endRow = (endRow > num) ? num : endRow;
	//如果超過總行數，就顯示到行數，沒有就繼續顯示endRow

	for (var i = 1; i < (num + 1); i++) {
		var trow = tr[i - 1];
		if (i >= startRow && i <= endRow) {
			trow.style.display = ""; //將 display 均設為 block，所以成為區塊的呈現方式，強迫換行。(x)
		} else {
			trow.style.display = "none"; //沒了就display就不要顯示 
		}
	}

	var tempStr = ""; //存上一頁 1 2 3 4 5 下一頁

	var innital = currentPage; //下面的頁面 [1] 2 3 4 5 
	var after = currentPage + 4; // 1 2 3 4 [5] 顯示到共五頁


	if (totalPage <= 4) {
		innital = 1 //如果頁面不到五頁，強迫從1開始數
	}

	else if (innital + 4 >= totalPage) {
		innital = totalPage - 4 // 不要讓初始頁面爆表 若只有7頁 選到[5] innital 一樣是[3] 4 5 6 7 
	}

	if (after >= totalPage) {
		after = totalPage //若 after超過總頁數一定只能讓他在總頁數 若只有7頁 選到[5] after 一樣是3 4 5 6 [7] 
	}


	if (currentPage > 1) { //不是第一頁了，上一頁有連結 ，連結#是因為不用跳轉頁面，沒有導向任何網站，只是讓他可以按觸發onClick()方法
		tempStr += "<a href=\"javascript:;\" onClick=\"goPage(" + (currentPage - 1) + "," + psize + ")\"><上一頁     </a>"
		for (var j = innital; j <= after; j++) { //跑innital ~ after的頁面 j =當前頁面 psize顯示行數
			tempStr += "<a href=\"javascript:;\" onClick=\"goPage(" + j + "," + psize + ")\">" + j + "   </a>"
		}



	} else {  //第一頁，所以上一頁沒有連結
		tempStr += "<上一頁     ";
		for (var j = innital; j <= after; j++) { //跑innital ~ after的頁面 j =當前頁面 psize顯示行數
			tempStr += "<a href=\"javascript:;\" onClick=\"goPage(" + j + "," + psize + ")\">" + j + "   </a>"
		}


	}
	if (currentPage < totalPage) { //還沒到最後一頁，所以下一頁還有效果
		tempStr += "<a href=\"javascript:;\" onClick=\"goPage(" + (currentPage + 1) + "," + psize + ")\">下一頁>     </a>";


	} else { //到最後一頁了，下一頁無效化
		tempStr += "  下一頁>     ";


	}
	$("#pageModule").html(tempStr);
}
