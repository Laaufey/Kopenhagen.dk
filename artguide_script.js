window.addEventListener('DOMContentLoaded', getData)


function getData() {

    const ulrParams = new URLSearchParams(window.location.search);
    console.log("URLSearchParams" + window.location);
    const theHappeningId = ulrParams.get("happening_id");
    console.log(theHappeningId);
    // fetching the data from WordPress

    if (theHappeningId) {
        fetch("http://andreimihutoni.com/wp_kopenhagen/wp-json/wp/v2/happening/" + theHappeningId + "?_embed")
            .then(res => res.json())
            .then(showHappeningSingleEvent)
    } else {
        fetch("http://andreimihutoni.com/wp_kopenhagen/wp-json/wp/v2/happening")
            .then(res => res.json())
            .then(handleData)
    }
}



//handeling the data
function handleData(happening) {
    // looping through each post
    happening.forEach(showHappening)
}






let numberoffourMuseums = 0;
let numberoffourGalleries = 0;
let numberoffourOther = 0;
let numberoffourOpenings = 0;

function showHappening(happening) {
    //    console.log(happening)

    //grab the template from html file
    const template = document.querySelector("template").content;
    //make a clone
    const clone = template.cloneNode(true);

    //change content of the template with content from WP posts
    clone.querySelector(".eventTitle").innerHTML = happening.title.rendered;
    clone.querySelector(".artistName").innerHTML = happening.artist;
    clone.querySelector(".dateStart").innerHTML = happening.date_start;
    clone.querySelector(".dateEnd").innerHTML = happening.date_end;

    clone.querySelector(".eventImg").src = happening.image.guid;

    let a = clone.querySelector('a');
    if (a) {
        a.href += happening.id;
    }



    if (happening.location_type == "Museum" && numberoffourMuseums < 4) {
        document.querySelector(".institutions").appendChild(clone);
        console.log("museum section works")
        numberoffourMuseums++;
        console.log(numberoffourMuseums);
    } else if (happening.location_type == "Gallery" && numberoffourGalleries < 4) {
        document.querySelector(".galleries").appendChild(clone);
        numberoffourGalleries++;
        console.log("galery section works")
    } else if (happening.location_type == "Other" && numberoffourOther < 4) {
        document.querySelector(".showrooms").appendChild(clone);
        numberoffourOther++;
        //    } else if (happening.happening_type == "Opening" && numberoffourOpenings < 4 ) {
        //         console.log( numberoffourOpenings)
        //        document.querySelector(".openings").appendChild(clone);
        //        numberoffourOpenings++;
        //
        //    }
        document.querySelector(".openings").innerHTML = '';
        document.querySelector(".exibitions").innerHTML = '';
        document.querySelector(".events").innerHTML = '';
    }
}




// ###################   Search bar


const wpLink = 'http://andreimihutoni.com/wp_kopenhagen/wp-json/wp/v2/happening';

function searchByKeyword(value) {
    console.log(value);

    fetch(wpLink + `?search=${value}`)
        .then(f => f.json())
        .then((searchedData) => {

            searchedData.forEach((happening) => {
                const template = document.querySelector("template").content;
                const copy = template.cloneNode(true);

                copy.querySelector(".eventTitle").innerHTML = happening.title.rendered;
                copy.querySelector(".artistName").innerHTML = happening.artist;
                copy.querySelector(".dateStart").innerHTML = happening.date_start;
                copy.querySelector(".dateEnd").innerHTML = happening.date_end;
                copy.querySelector(".eventImg").src = happening.image.guid;

                document.querySelector(".searchResultWrapper").appendChild(copy);
            })
        });

    //remove search from previous entries
    document.querySelector(".searchResultWrapper").innerHTML = '';
    document.querySelector(".institutions").innerHTML = '';
    document.querySelector(".galleries").innerHTML = '';
    document.querySelector(".showrooms").innerHTML = '';
    document.querySelector(".openings").innerHTML = '';
    document.querySelector(".exibitions").innerHTML = '';
    document.querySelector(".events").innerHTML = '';
}



const wpLinkArea = 'http://andreimihutoni.com/wp_kopenhagen/wp-json/wp/v2/happening';

function searchByArea(value) {
    console.log(value);

    fetch(wpLink)
        .then(f => f.json())
        .then((searchedDataByArea) => {

            searchedDataByArea.forEach((happening) => {
                const template = document.querySelector("template").content;
                const copy = template.cloneNode(true);

                copy.querySelector(".eventTitle").innerHTML = happening.title.rendered;
                copy.querySelector(".artistName").innerHTML = happening.artist;
                copy.querySelector(".dateStart").innerHTML = happening.date_start;
                copy.querySelector(".dateEnd").innerHTML = happening.date_end;
                copy.querySelector(".eventImg").src = happening.image.guid;
                console.log("aaaaaa" + value);
                if (happening.area.toUpperCase() === value.toUpperCase()) {
                    document.querySelector(".searchResultWrapper").appendChild(copy);
                }
            })
        });


    //remove search from previous entries
    document.querySelector(".searchResultWrapper").innerHTML = '';
    document.querySelector(".institutions").innerHTML = '';
    document.querySelector(".galleries").innerHTML = '';
    document.querySelector(".showrooms").innerHTML = '';
    document.querySelector(".openings").innerHTML = '';
    document.querySelector(".exibitions").innerHTML = '';
    document.querySelector(".events").innerHTML = '';
}









//########################## MUSEUMS ###############




function dropInstitutions() {
    document.getElementById("intitutionsDrop").addEventListener("click", function () {
        //        console.log("wooooohoooo")
        document.querySelector(".showrooms").style.display = 'none';
        document.querySelector(".galleries").style.display = 'none';
        document.querySelector(".openings").style.display = 'none';
        for (let i = 0; i < document.querySelector(".institutions").childNodes.length; i++) {
            if (document.querySelector(".institutions").childNodes[i].className == "event") {
                document.querySelector(".institutions").removeChild(document.querySelector(".institutions").childNodes[i]);
                console.log("aaaa");
            }
        }
        fetch("http://andreimihutoni.com/wp_kopenhagen/wp-json/wp/v2/happening")
            .then(res => res.json())
            .then(handleDataMuseumFull)
    })
}
dropInstitutions();


// shows all the events in Museums
function handleDataMuseumFull(happening) {
    // looping through each post
    happening.forEach(showHappeningMuseumFull)
}


function showHappeningMuseumFull(happening) {
    //    console.log(happening)

    //grab the template from html file
    const template = document.querySelector("template").content;
    //make a clone
    const clone = template.cloneNode(true);

    //change content of the template with content from WP posts
    clone.querySelector(".eventTitle").innerHTML = happening.title.rendered;
    clone.querySelector(".artistName").innerHTML = happening.artist;
    clone.querySelector(".dateStart").innerHTML = happening.date_start;
    clone.querySelector(".dateEnd").innerHTML = happening.date_end;

    clone.querySelector(".eventImg").src = happening.image.guid;


    if (happening.location_type == "Museum") {
        document.querySelector(".institutions").appendChild(clone);

    }
}

// ############################# ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^





//########################## GALLERIES ###############




function dropGalleries() {
    document.getElementById("galleriesDrop").addEventListener("click", function () {
        //        console.log("Galleries Drop works")
        document.querySelector(".showrooms").style.display = 'none';
        document.querySelector(".institutions").style.display = 'none';
        document.querySelector(".openings").style.display = 'none';
        for (let i = 0; i < document.querySelector(".galleries").childNodes.length; i++) {
            if (document.querySelector(".galleries").childNodes[i].className == "event") {
                document.querySelector(".galleries").removeChild(document.querySelector(".galleries").childNodes[i]);
                //                console.log("aaaa");
            }
        }
        fetch("http://andreimihutoni.com/wp_kopenhagen/wp-json/wp/v2/happening")
            .then(res => res.json())
            .then(handleDataGalleriesFull)
    })
}
dropGalleries();



// shows all the events in Galleries
function handleDataGalleriesFull(happening) {
    // looping through each post
    happening.forEach(showHappeningGalleriesFull)
}


function showHappeningGalleriesFull(happening) {
    //    console.log(happening)

    //grab the template from html file
    const template = document.querySelector("template").content;
    //make a clone
    const clone = template.cloneNode(true);

    //change content of the template with content from WP posts
    clone.querySelector(".eventTitle").innerHTML = happening.title.rendered;
    clone.querySelector(".artistName").innerHTML = happening.artist;
    clone.querySelector(".dateStart").innerHTML = happening.date_start;
    clone.querySelector(".dateEnd").innerHTML = happening.date_end;

    clone.querySelector(".eventImg").src = happening.image.guid;


    if (happening.location_type == "Gallery") {
        document.querySelector(".galleries").appendChild(clone);

    }
}

// ############################# ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^





//########################## SHOWROOMS ###############




function dropShowrooms() {
    document.getElementById("showroomsDrop").addEventListener("click", function () {
        //        console.log("Galleries Drop works")
        document.querySelector(".galleries").style.display = 'none';
        document.querySelector(".institutions").style.display = 'none';
        document.querySelector(".openings").style.display = 'none';
        for (let i = 0; i < document.querySelector(".showrooms").childNodes.length; i++) {
            if (document.querySelector(".showrooms").childNodes[i].className == "event") {
                document.querySelector(".showrooms").removeChild(document.querySelector(".showrooms").childNodes[i]);
                //                console.log("aaaa");
            }
        }
        fetch("http://andreimihutoni.com/wp_kopenhagen/wp-json/wp/v2/happening")
            .then(res => res.json())
            .then(handleDataShowroomsFull)
    })
}
dropShowrooms();


// shows all the events in Showrooms
function handleDataShowroomsFull(happening) {
    // looping through each post
    happening.forEach(showHappeningShowroomsFull)
}


function showHappeningShowroomsFull(happening) {
    //    console.log(happening)

    //grab the template from html file
    const template = document.querySelector("template").content;
    //make a clone
    const clone = template.cloneNode(true);

    //change content of the template with content from WP posts
    clone.querySelector(".eventTitle").innerHTML = happening.title.rendered;
    clone.querySelector(".artistName").innerHTML = happening.artist;
    clone.querySelector(".dateStart").innerHTML = happening.date_start;
    clone.querySelector(".dateEnd").innerHTML = happening.date_end;

    clone.querySelector(".eventImg").src = happening.image.guid;


    if (happening.location_type == "Other") {
        document.querySelector(".showrooms").appendChild(clone);

    }
}

// ############################# ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^






//########################## DropDown OPENINGS ###############




function dropOpenings() {
    document.getElementById("openingsDrop").addEventListener("click", function () {

        document.querySelector(".institutions").style.display = 'none';
        document.querySelector(".galleries").style.display = 'none';
        document.querySelector(".showrooms").style.display = 'none';
        //        for (let i = 0; i < document.querySelector(".showrooms").childNodes.length; i++) {
        //            if (document.querySelector(".showrooms").childNodes[i].className == "event") {
        //                document.querySelector(".showrooms").removeChild(document.querySelector(".showrooms").childNodes[i]);
        ////                console.log("aaaa");
        //            }
        //        }
        fetch("http://andreimihutoni.com/wp_kopenhagen/wp-json/wp/v2/happening")
            .then(res => res.json())
            .then(handleDataOpeningsFull)
    })
}
dropOpenings();



// shows all the events in Openings
function handleDataOpeningsFull(happening) {
    // looping through each post
    happening.forEach(showHappeningOpeningsFull)
}


function showHappeningOpeningsFull(happening) {
    //    console.log(happening)

    //grab the template from html file
    const template = document.querySelector("template").content;
    //make a clone
    const clone = template.cloneNode(true);

    //change content of the template with content from WP posts
    clone.querySelector(".eventTitle").innerHTML = happening.title.rendered;
    clone.querySelector(".artistName").innerHTML = happening.artist;
    clone.querySelector(".dateStart").innerHTML = happening.date_start;
    clone.querySelector(".dateEnd").innerHTML = happening.date_end;

    clone.querySelector(".eventImg").src = happening.image.guid;


    if (happening.happening_type == "Opening") {
        document.querySelector(".openings").appendChild(clone);
    }
}



// ############################# ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^





//########################## DropDown EXIBITIONS ###############




function dropExibitions() {
    document.getElementById("exibitionsDrop").addEventListener("click", function () {

        document.querySelector(".institutions").style.display = 'none';
        document.querySelector(".galleries").style.display = 'none';
        document.querySelector(".showrooms").style.display = 'none';
        document.querySelector(".openings").style.display = 'none';
        document.querySelector(".events").style.display = 'none';
        //        for (let i = 0; i < document.querySelector(".showrooms").childNodes.length; i++) {
        //            if (document.querySelector(".showrooms").childNodes[i].className == "event") {
        //                document.querySelector(".showrooms").removeChild(document.querySelector(".showrooms").childNodes[i]);
        ////                console.log("aaaa");
        //            }
        //        }
        fetch("http://andreimihutoni.com/wp_kopenhagen/wp-json/wp/v2/happening")
            .then(res => res.json())
            .then(handleDataExibitionsFull)
    })
}
dropExibitions();



// shows all the events in Openings
function handleDataExibitionsFull(happening) {
    // looping through each post
    happening.forEach(showHappeningExibitionsFull)
    //    console.log("xxxxxx");
}


function showHappeningExibitionsFull(happening) {
    //    console.log(happening)

    //grab the template from html file
    const template = document.querySelector("template").content;
    //make a clone
    const clone = template.cloneNode(true);

    //change content of the template with content from WP posts
    clone.querySelector(".eventTitle").innerHTML = happening.title.rendered;
    clone.querySelector(".artistName").innerHTML = happening.artist;
    clone.querySelector(".dateStart").innerHTML = happening.date_start;
    clone.querySelector(".dateEnd").innerHTML = happening.date_end;

    clone.querySelector(".eventImg").src = happening.image.guid;


    if (happening.happening_type == "Exibition") {
        document.querySelector(".exibitions").appendChild(clone);
    }
}



// ############################# ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^




//########################## DropDown EVENTS ###############




function dropEvents() {
    document.getElementById("eventsDrop").addEventListener("click", function () {

        document.querySelector(".institutions").style.display = 'none';
        document.querySelector(".galleries").style.display = 'none';
        document.querySelector(".showrooms").style.display = 'none';
        document.querySelector(".openings").style.display = 'none';
        document.querySelector(".exibitions").style.display = 'none';
        //        for (let i = 0; i < document.querySelector(".showrooms").childNodes.length; i++) {
        //            if (document.querySelector(".showrooms").childNodes[i].className == "event") {
        //                document.querySelector(".showrooms").removeChild(document.querySelector(".showrooms").childNodes[i]);
        ////                console.log("aaaa");
        //            }
        //        }
        fetch("http://andreimihutoni.com/wp_kopenhagen/wp-json/wp/v2/happening")
            .then(res => res.json())
            .then(handleDataEventsFull)
    })
}
dropEvents();



// shows all the events in Openings
function handleDataEventsFull(happening) {
    // looping through each post
    happening.forEach(showHappeningEventsFull)
    //    console.log("xxxxxx");
}


function showHappeningEventsFull(happening) {
    //    console.log(happening)

    //grab the template from html file
    const template = document.querySelector("template").content;
    //make a clone
    const clone = template.cloneNode(true);

    //change content of the template with content from WP posts
    clone.querySelector(".eventTitle").innerHTML = happening.title.rendered;
    clone.querySelector(".artistName").innerHTML = happening.artist;
    clone.querySelector(".dateStart").innerHTML = happening.date_start;
    clone.querySelector(".dateEnd").innerHTML = happening.date_end;

    clone.querySelector(".eventImg").src = happening.image.guid;


    if (happening.happening_type == "Event") {
        document.querySelector(".events").appendChild(clone);
    }
}



// ############################# ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^






//
//
//function resetFilter() {
//    document.getElementById("resetFilter").addEventListener("click", function () {
//        //       delets all the elements in the sections
//        for (let i = 0; i < document.querySelector(".institutions").childNodes.length; i++) {
//            if (document.querySelector(".institutions").childNodes[i].className == "event") {
//                document.querySelector(".institutions").removeChild(document.querySelector(".institutions").childNodes[i]);
//                //                console.log("aaaa");
//            }
//        }
//
//
//        for (let i = 0; i < document.querySelector(".galleries").childNodes.length; i++) {
//            if (document.querySelector(".galleries").childNodes[i].className == "event") {
//                document.querySelector(".galleries").removeChild(document.querySelector(".galleries").childNodes[i]);
//                //                console.log("aaaa");
//            }
//        }
//
//        for (let i = 0; i < document.querySelector(".showrooms").childNodes.length; i++) {
//            if (document.querySelector(".showrooms").childNodes[i].className == "event") {
//                document.querySelector(".showrooms").removeChild(document.querySelector(".showrooms").childNodes[i]);
//                //                console.log("aaaa");
//            }
//        }
//
//        for (let i = 0; i < document.querySelector(".openings").childNodes.length; i++) {
//            if (document.querySelector(".openings").childNodes[i].className == "event") {
//                document.querySelector(".openings").removeChild(document.querySelector(".openings").childNodes[i]);
//                //                console.log("aaaa");
//            }
//        }
//
//        numberoffourMuseums = 0;
//        numberoffourGalleries = 0;
//        numberoffourOther = 0;
//        numberoffourOpenings = 0;
//        console.log("reset pressed")
//        document.querySelector(".showrooms").style.display = 'grid';
//        document.querySelector(".galleries").style.display = 'grid';
//        document.querySelector(".institutions").style.display = 'grid';
//        fetch("http://andreimihutoni.com/wp_kopenhagen/wp-json/wp/v2/happening")
//            .then(res => res.json())
//            .then(handleData)
//    })
//}
//
//resetFilter();



//
//
//
//document.getElementById("area").oninput = function() {searchByArea()};
//
//function searchByArea(i) {
////  alert("The value of the input field was changed.");
//    console.log(i)
//
//     //    console.log(happening)
//
//    //grab the template from html file
//    const template = document.querySelector("template").content;
//    //make a clone
//    const clone = template.cloneNode(true);
//
//    //change content of the template with content from WP posts
//    clone.querySelector(".eventTitle").innerHTML = happening.title.rendered;
//    clone.querySelector(".artistName").innerHTML = happening.artist;
//    clone.querySelector(".dateStart").innerHTML = happening.date_start;
//    clone.querySelector(".dateEnd").innerHTML = happening.date_end;
//
//    clone.querySelector(".eventImg").src = happening.image.guid;
//
////
////    if (happening.location_type == "Museum") {
////        document.querySelector(".institutions").appendChild(clone);
////        console.log("museum section works")
////    } else if (happening.location_type == "Gallery") {
////        document.querySelector(".galleries").appendChild(clone);
////        console.log("galery section works")
////    } else if (happening.location_type == "Other") {
////        document.querySelector(".exhibitions").appendChild(clone);
////
////    }
//}
//
