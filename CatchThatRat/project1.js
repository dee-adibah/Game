$(() => {
    //creating 9 boxes for the game
    for (let i=1; i<=9; i++){
        const boxes = $('<div>').attr('class', 'box');
        boxes.attr('id', i);
        $('.board').append(boxes);
    }

    //Adding table for score history
    const scoreTable = $('<table>');
    const thead = $('<tr>');
    const tableName = $('<th>').text('Name');
    const tableDate = $('<th>').text('Date');
    const tableTime = $('<th>').text('Time');
    const tableResult = $('<th>').text('Result');
    $('#scoreboard').append(scoreTable);
    scoreTable.append(thead);
    thead.append(tableName, tableDate, tableTime, tableResult);

    //timer and score when initialise
    $('#timer').text(0 + ' secs');
    let ratCaught = 0;
    $('#score').text(ratCaught);
    
    //Game start
    const btn = $('.btn').on('click', () => {

        //initial timer after start button is pressed
        let timer = 10;
        $('#timer').text(timer + ' secs');
        // let ratCaught = 0; //declaring here cause the 3rd tries not working
        // $('#score').text(ratCaught);
        
        const ratCatMove = () => {
            //for loop to remove any rat in the box
            for (let i=0; i<=($('.box')).length; i++){
                $('.box').removeClass('rat');
                $('.box').removeClass('cat');
            }
            let randomBox = $('.box')[Math.floor(Math.random()*9)];
            //console.log(randomBox) //showing random id
            let ratOrCat = Math.floor(Math.random()*3);
            //console.log(ratOrCat)
            if (ratOrCat === 1) {
                $(randomBox).addClass('cat');
            } else {
                $(randomBox).addClass('rat');
            }
        }
        //setInterval(ratCatMove, 1000) //automatically moving the rat
        //need to set as variable so can stop it when game ends
        let movingRatCat = setInterval(ratCatMove, 1000);

        const score = $('.box').on('click', (event) => {
            //console.log(event)
            if (($('.rat').attr('id')) === ($(event.currentTarget).attr('id'))) {
                ratCaught++;
                $('#score').text(ratCaught);
                $('.box').removeClass('rat');
            } else if (($('.cat').attr('id')) === ($(event.currentTarget).attr('id'))) {
                ratCaught--;
                $('#score').text(ratCaught);
                $('.box').removeClass('cat');
            }
        })
        
        const countDown = () => {
            timer--;
            $('#timer').text(timer + ' secs');
            if (timer === 0) {
                if (ratCaught <= 0) {
                    alert("Time's Up! you didn't manage to catch any rats. It's ok try again")
                } else {
                    let person = prompt("Time's Up! Congratulations!! You caught "+ ratCaught+ " rats!\nPlease enter your name", "your name");
                    //alert("Time's Up! Congratulations!! You caught "+ ratCaught+ " rats!");
                    let scoreBoard = [];
                    if (ratCaught < 0) {
                        ratCaught = 0;
                    }
                    scoreBoard.push(ratCaught);

                    //Getting to show date and time in proper format
                    let today = new Date();
                    let date = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear()
                    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    
                    //Displaying name, date, time & result
                    scoreTable.append('<tr>'+ '<td>' + person + '<td>' + date + '<td>' + time + '<td>' + scoreBoard + '</td></tr>');
                }
                
                clearInterval(movingTime); //timer stay at 0 
                clearInterval(movingRatCat); //rat or cat stop moving
                $('.box').removeClass('rat'); 
                $('.box').removeClass('cat');
                
                ratCaught = 0;
                $('#score').text(ratCaught); 
                //console.log(ratCaught)
            }
        }
        //setInterval(countDown, 1000)
        //need to set as variable so timer stay at 0 when game ends
        let movingTime = setInterval(countDown, 1000);
    })
})