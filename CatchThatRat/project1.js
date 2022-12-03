$(() => {
    //creating 9 boxes for the game
    for (let i=1; i<=9; i++){
        const boxes = $('<div>').attr('class', 'box');
        boxes.attr('id', i);
        $('.board').append(boxes);
    }

    //Declaring rat to the game
    const rat = $('<div>').addClass('rat');

    //timer and score when initialise
    $('#timer').text(0);
    $('#score').text(0);
    
    const btn = $('.btn').on('click', () => {

        //initial timer after start button is pressed
        let timer = 10;
        $('#timer').text(timer);
        let ratCaught = 0;

        const ratMove = () => {
            //for loop to remove any rat in the box
            for (let i=0; i<=($('.box')).length; i++){
                $('.box').removeClass('rat');
            }
            let randomBox = $('.box')[Math.floor(Math.random()*9)];
            //console.log(randomBox) //showing random id
            $(randomBox).addClass('rat'); //everytime refresh rat will be at random box
        }
        //setInterval(ratMove, 1000) //automatically moving the rat
        //need to set as variable so can stop it when game ends
        let movingRat = setInterval(ratMove, 1000);
        
        const score = $('.box').on('click', (event) => {
            //console.log(event)
            if (($('.rat').attr('id')) === ($(event.currentTarget).attr('id'))) {
                ratCaught++;
                $('#score').text(ratCaught);
                $('.box').removeClass('rat');
            }
        })
        
        const countDown = () => {
            timer--;
            $('#timer').text(timer);
            if (timer === 0) {
                if (ratCaught === 0) {
                    alert("Time's Up! you didn't manage to catch any rats. It's ok try again")
                } else {
                    alert("Time's Up! Congratulations!! You caught "+ ratCaught+ " rats!");
                }
                clearInterval(movingTime); //timer stay at 0 
                clearInterval(movingRat); //rat stop moving
                $('.box').removeClass('rat'); 
                $('#score').text(0); 
            }
        }
        //setInterval(countDown, 1000)
        //need to set as variable so timer stay at 0 when game ends
        let movingTime = setInterval(countDown, 1000);

    })
})