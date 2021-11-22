$( document ).ready(function() {

    var page = window.location.pathname;
    history.pushState(page, page, page);
    
    getPage(page);
});

function getPage(page){
    console.log('________________________________________');
    if (page == '' || page == '/') {
        page = '/index';
    }
    console.log(page);
    //TODO check if file exists else error 404
    if(page != '/__layout') {
        //mystixLoad('/pages' + page + '.html', '#page');
        $("#page").load('/pages' + page + '.html');
    }
}

// browser history back / forward
window.addEventListener('popstate', function(event) {
    console.log(JSON.stringify(event.state));
    var page =event.state;
    if (page == null) {
        page = '/';
    }
    getPage(page);
});

//If link clicked prevent default and get page via ajax
$(document).on('click', 'a', function(event) {
    event.preventDefault();
    var page = $(this).attr('href');
    getPage(page);
    history.pushState(page, page, page);
});


function mystixFetch(url, method, body, headers) {
    var options;
    if (body !== false) {
        options = JSON.stringify({
            method: method,
            body: body,
            headers: headers,
            referrer: 'no-referrer'
        });
    }
    else {
        options = JSON.stringify({
            method: method,
            headers: headers,
            referrer: 'no-referrer'
        });
    }

    fetch(url, {
        options
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        // This is the JSON from our response
        //console.log(data);
        onResponse(data);
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    });
}


//This function doesnt work because .innerHTML doesnt exec script tags and most solutions dont exec inherited functions. so using jquery .load() for now.
function mystixLoad(url, selector) {
    fetch(url)
  .then(function(response) {
    return response.text();
  })
  .then(function(html) {
    document.querySelector(selector).innerHTML = html;
  });
}