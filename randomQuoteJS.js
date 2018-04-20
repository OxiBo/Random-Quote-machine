$(document).ready(function(){
	let backupQuote = {};


	$('button#getQuote').on('click', function(event){
     event.preventDefault();
     getNewQuote();
    });


	$('button#tweet').on('click', function(event) {
        event.preventDefault();
        const urlTweet = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(backupQuote.quoteText +  ' -' + backupQuote.quoteAuthor);
        window.open(urlTweet,"_blank");
	});

    $('button#facebook').on('click', function(event) {
        event.preventDefault();
        const urlFB = 'https://www.facebook.com/sharer.php?u=' + encodeURIComponent(backupQuote.quoteUrl);
        window.open(urlFB,"_blank");
	});

function getNewQuote(){
    const $quoteText = $('#quoteText');
    const $author = $('#author');
    const $quoteFail = $('#quoteFail');


   //error handling
   let quoteRequestTimeout = setTimeout(function(){
        if ($.isEmptyObject(backupQuote)){
         $quoteText.text('Failed to get a new quote');
         $author.text('');
        }
        else {
        $quoteFail.text('Failed to get a new quote');
        $quoteText.text(backupQuote.quoteText);
        $author.text(backupQuote.quoteAuthor);
        };
        }, 8000);


   $.ajax({
      url: "https://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp"
      },
     	cache: false,
      success: function(data){
        $quoteFail.empty();
      $quoteText.text(data.quoteText);
      $author.text(data.quoteAuthor);
      backupQuote = {
      	quoteText: data.quoteText,
      	quoteAuthor:  data.quoteAuthor,
      	quoteUrl: data.quoteLink
      };
      $("button.btnHidden").removeClass('btnHidden');

      clearTimeout(quoteRequestTimeout);
      }
    });
   };
});

// $.getJSON(handlerURL + "&callback=?",
//     function(jsonResult){
//         alert("Success!");
//     })
// .done(function() { alert('getJSON request succeeded!'); })
// .fail(function(jqXHR, textStatus, errorThrown) { alert('getJSON request failed! ' + textStatus); })
// .always(function() { alert('getJSON request ended!'); });




//_____________________________________
// $(document).ready(function(){
// 	var backupQuote = {};


// 	$('button#getQuote').on('click', function(){
//     var $quoteText = $('#quoteText');
//     var $author = $('#author');
//     var $quoteFail = $('#quoteFail');


//    //error handling
//    var quoteRequestTimeout = setTimeout(function(){
//         if ($.isEmptyObject(backupQuote)){
//          $quoteText.text('Failed to get a new quote');
//          $author.text('');
//         }
//         else {
//         $quoteFail.text('Failed to get a new quote');
//         $quoteText.text(backupQuote.quoteText);
//         $author.text(backupQuote.quoteAuthor);
//         };
//         }, 8000);

//      $.ajax({
//       url: "https://api.forismatic.com/api/1.0/",
//       jsonp: "jsonp",
//       dataType: "jsonp",
//       data: {
//         method: "getQuote",
//         lang: "en",
//         format: "jsonp"
//       },
//      	cache: false,
//         success: function(data){
//         console.log(data);
//         $quoteText.text(data.quoteText);
//         $author.text(data.quoteAuthor);
//         backupQuote = {
//         	quoteText: data.quoteText,
//         	quoteAuthor: data.quoteAuthor
//         };

//         clearTimeout(quoteRequestTimeout);
//         },
//        });






// var url = 'http://api.icndb.com/jokes/random';

// //getJSON from application.py with JSON object with a list of articles
//      $.getJSON(url)
//       .done(function(data, textStatus, jqXHR){
//         $('div#quotePlace').html('<p>' + data.value.joke + '</p>');

//         })
//       .fail(function(jqXHR, textStatus, errorThrown) {
//         console.log(errorThrown.toString());
//        });});
