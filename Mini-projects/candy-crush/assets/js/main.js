document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid");
    const width = 8;

    const candies = [];

    const candyColors = [
        "red",
        "yellow",
        "orange",
        "green",
        "purple"
    ]

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            let candy = document.createElement('div');

            candy.setAttribute("draggable", true);
            candy.setAttribute("id", i);

            let randomColorIndex = Math.floor(Math.random() * candyColors.length);
            candy.style.backgroundColor = candyColors[randomColorIndex];
            grid.appendChild(candy);
            candies.push(candy)
        }

    }
    createBoard();

    let colorBeingDragged;
    let candyBeingDragged;
    let colorBeingReplaced;
    let candyBeingReplaced;

    candies.forEach(candy => candy.addEventListener("dragstart", dragStart));
    candies.forEach(candy => candy.addEventListener("dragend", dragEnd));
    candies.forEach(candy => candy.addEventListener("dragleave", dragLeave));
    candies.forEach(candy => candy.addEventListener("drop", dragDrop));

    candies.forEach(candy => candy.addEventListener("dragover", function (e) {
        e.preventDefault();
    }));
    candies.forEach(candy => candy.addEventListener("dragenter", function (e) {
        e.preventDefault();
    }));

    function dragStart() {
        colorBeingDragged = this.style.backgroundColor;
        candyBeingDragged = parseInt(this.id);
    }

    function dragLeave() {
        console.log(this.id, "DragLeave");
    }

    function dragDrop() {
        colorBeingReplaced = this.style.backgroundColor;
        candyBeingReplaced = parseInt(this.id);

        this.style.backgroundColor = colorBeingDragged;
        candies[candyBeingDragged].style.backgroundColor = colorBeingReplaced;
    }

    function dragEnd() {

        /**
         * what is a valid move?
         * 
         *  we can swipe two adjacent candies only.
         * 
         *  */

        let validMoves = [
            candyBeingDragged + 1,
            candyBeingDragged - 1,
            candyBeingDragged + width,
            candyBeingDragged - width
        ]

        console.log(candyBeingReplaced, "In drag End")

        const isValidMove = validMoves.includes(candyBeingReplaced)

        if (candyBeingReplaced && isValidMove) {
            candyBeingReplaced = null;
            candyBeingDragged = null;
            colorBeingReplaced = null;
            colorBeingDragged = null;
        } else if (candyBeingReplaced && !isValidMove) {
            candies[candyBeingDragged].style.backgroundColor = colorBeingDragged;
            candies[candyBeingReplaced].style.backgroundColor = colorBeingReplaced;
        }
        
    }


});