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


    // ### "Recommended" section ###

    // 1. condition: if any of the posts is recommended (if is recommended, has the value "1")
    if (happening.recomended == "1") {

    // 2. append the clone in the "Recommended" section ("fistsSec" section in the html)
        document.querySelector(".firstSec").appendChild(clone);
    }





    //###    Happening now / Upcoming    ###


    // In order to divide the events into "happening now" and "upcoming" we need to compare the event's date (from JSON) and today's date (JS generated);
    // The date from JSON come in the format: "2020-04-28";
    // The JS generated today's date is in this format: "Thu Apr 30 2020 09:11:57 GMT+0200 (Central European Summer Time)";
    //In order to compare them, the dates need to be in the same format;


    // 1. creating a variable with today's date
    const todayDate = new Date();
    //            console.log("TodayDate:  " + todayDate);


    //changeing the format of today's date
    const d = new Date(todayDate)
    const year = d.getFullYear()
    const date = d.getDate()
    const Month = d.getMonth()
    const monthsCountStartsFrom0 = 1
    const month = Month + monthsCountStartsFrom0

    // puting all the dates values from above, into one string, in the desired format (yyyy-mm-dd), in the variable: "today"
    const today = "" + year + "-" + "0" + month + "-" + date;
    console.log("Today(converted): " + today)


    // 2. creating a variable for the event's starting and ending date
    const eventStartDate = happening.date_start;
    const eventEndDate = happening.date_end;
    console.log("Event Start Date: " + eventStartDate)


    // 3. comparing the dates and injecting the events in the right category
    function CompareDate() {

        if (today > eventStartDate) {
            console.log("Happening now");
            document.querySelector(".happening").appendChild(clone);
        } else if (today < eventStartDate) {
            console.log("Upcoming");
            document.querySelector(".upcoming").appendChild(clone);
        }
    }

    CompareDate();


}
