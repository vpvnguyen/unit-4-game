// score
var wins = 0;
var loses = 0;

// main crystal number; 19 - 120
var mainNum;

// array of numbers to choose from; 1 - 12
var randomNumArr = [1, 5, 8, 12];

// store crystal counts
var count = 0;

// random number between min and max numbers
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// pass in to shuffle array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

// Run game; generate random number between 19 - 120 for number to match
function game() {
    mainNum = randomIntFromInterval(19, 120);
    $('#main-number').html(`${mainNum}`);

    // shuffle array
    shuffle(randomNumArr);
    // random randomNumArr and assign each number to a crystal
    for (var i = 0; i < randomNumArr.length; i++) {
        $('#all-crystals').append(`<span class="crystals" id="crystals-${randomNumArr[i]}" value="${randomNumArr[i]}"> ${randomNumArr[i]}`);
    };

    // check if user wins or loses
    function score() {
        if (count === mainNum) {
            console.log('WIN!');
            wins++;
            count = 0;
            $('#all-crystals').html('');
            $('#wins').html(`Wins: ${wins}`);
            game();
        }
        if (count > mainNum) {
            console.log('LOSE!');
            loses++;
            count = 0;
            $('#all-crystals').html('');
            $('#loses').html(`Loses: ${loses}`);
            game();
        }
        console.log(`wins: ${wins} | loses: ${loses}`);
    };

    // get value from attribute and add the value to count
    $(document).ready(function() {
        $('.crystals').on('click', function() {
            var crystalText = $(this).attr('value');
            var crystalVal = parseInt(crystalText);
            console.log(`\nClicked: ${crystalVal}`);

            // add value of crystal to count
            count += crystalVal;
            console.log(`Total count: ${count}`);

            // check score
            score();
        }); // end document.ready
    }); // end crystals.click
}; // end game

// game execution
game();