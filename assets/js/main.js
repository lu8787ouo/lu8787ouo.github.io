/*
	Directive by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '981px',   '1280px' ],
			narrow:    [ '841px',   '980px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ '481px',   '736px'  ],
			mobilep:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

})(jQuery);

/*表格分頁練習*/
//goPage(參數1,參數2)為我們換頁的function,參數第一個放的是目前頁數，第二個放一頁要秀幾筆

$(function () {
	let $table = $(".table_change"); //抓table class
	let $thRows = $table.find("thead th");  //找到每個th
	$thRows.each(function (key, thRow) { //key是0開始
	  $table
		.find("tbody tr td:nth-child(" + (key + 1) + ")") //選擇器第一個元素是1開始
		.attr("data-th", $(thRow).text());// 將每個td塞入data-th="對應的<th>名稱"
	});
	/*-----------*/
	goPage(1, 2); // 一開始先秀第一頁,以及每一頁最多兩筆資料
  });
  
  //再來，我們假設每一頁只能有兩筆資料顯示
  function goPage(currentPage, pageSize) {
  
	var tr = $(".table_change tbody tr");
	var num = $(".table_change tbody tr").length; //表格所有行數
	var totalPage = Math.ceil(num / pageSize); // 表格所有行數/每頁顯示行數 = 總頁數
  
	$('#numberPage').attr('max', totalPage); // 寫入跳至第幾頁input
  
	$("#numberPage").off('change').on("change", function () { // 當"跳至第幾頁"改變時....
	  let numberPage = $("#numberPage").val();//使用者輸入要跳頁的值
	  if (numberPage > totalPage) { //如果輸入超過總頁數，就跳出行為
		console.log("頁數超過")
		return
	  }
	  goPage(numberPage, 2);//如果是正常的值，就執行換頁，一樣每頁顯示兩筆
	});
  
	var startRow = (currentPage - 1) * pageSize + 1; //開始顯示的行
	var endRow = currentPage * pageSize; //結束顯示的行
	endRow = (endRow > num) ? num : endRow;
  
  
	//遍歷顯示資料實現分頁
	for (var i = 1; i < (num + 1); i++) {
	  var trRow = tr[i - 1];
	  if (i >= startRow && i <= endRow) {
		trRow.style.display = "";
	  } else {
		trRow.style.display = "none";
	  }
	}
  
	//寫入於<div id="pageModule">中
  
	var tempStr = "";
	//如果目前頁數大於1，則可以按首頁跟上一頁
	if (currentPage > 1) {
	  tempStr += `<a href="javascript:;" onClick="goPage(1,${pageSize})">首頁</a>`;
	  tempStr += `<a href="javascript:;" onClick="goPage(${currentPage - 1},${pageSize})">上一頁</a>`;
	} else {
	  tempStr += `<a href="javascript:;" class="disabled">首頁</a>`;
	  tempStr += `<a href="javascript:;" class="disabled">上一頁</a>`;
	}
	//放入頁碼 EX:1/5
	tempStr += `<div><span>第${currentPage}頁</span>/<span>共${totalPage}頁</span></div>`;
  
	//如果目前頁數小於總頁數，則無法按下一頁及尾頁
  
	if (currentPage < totalPage) {
	  tempStr += `<a href="javascript:;" onClick="goPage(${currentPage + 1},${pageSize})">下一頁</a>`;
	  tempStr += `<a href="javascript:;" onClick="goPage(${totalPage},${pageSize})">尾頁</a>`;
	} else {
	  tempStr += `<a href="javascript:;" class="disabled">下一頁</a>`;
	  tempStr += `<a href="javascript:;" class="disabled">尾頁</a>`;
	}
  
	$("#pageModule").html(tempStr);
  }