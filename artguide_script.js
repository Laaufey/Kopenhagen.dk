// fetching the data from WordPress
fetch("http://andreimihutoni.com/wp_kopenhagen/wp-json/wp/v2/happening")
    .then(res => res.json())
    .then(handleData)


//handeling the data
function handleData(happening) {
    // looping through each post
    happening.forEach(showHappening)
}




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


    if (happening.location_type == "Museum") {
        document.querySelector(".institutions").appendChild(clone);
        console.log("museum section works")
    } else if (happening.location_type == "Gallery") {
        document.querySelector(".galleries").appendChild(clone);
        console.log("galery section works")
    } else if (happening.location_type == "Other") {
        document.querySelector(".exhibitions").appendChild(clone);

    }
}



//  Search bar


const wpLink = 'http://andreimihutoni.com/wp_kopenhagen/wp-json/wp/v2/happening';

function searchKeyword(value) {
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
    document.querySelector(".exhibitions").innerHTML = '';
}

