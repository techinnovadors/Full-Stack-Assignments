document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid");
    const width = 8;

    const candies = [];

    const candyColors = [
        'url(assets/images/red-candy.png)',
        'url(assets/images/yellow-candy.png)',
        'url(assets/images/orange-candy.png)',
        'url(assets/images/purple-candy.png)',
        'url(assets/images/green-candy.png)',
        'url(assets/images/blue-candy.png)'
    ]

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            let candy = document.createElement('div');

            candy.setAttribute("draggable", true);
            candy.setAttribute("id", i);

            let randomColorIndex = Math.floor(Math.random() * candyColors.length);
            candy.style.backgroundImage = candyColors[randomColorIndex];
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
        colorBeingDragged = this.style.backgroundImage;
        candyBeingDragged = parseInt(this.id);
    }

    function dragLeave() {
        console.log(this.id, "DragLeave");
    }

    function dragDrop() {
        colorBeingReplaced = this.style.backgroundImage;
        candyBeingReplaced = parseInt(this.id);

        this.style.backgroundImage = colorBeingDragged;
        candies[candyBeingDragged].style.backgroundImage = colorBeingReplaced;
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
            candies[candyBeingDragged].style.backgroundImage = colorBeingDragged;
            candies[candyBeingReplaced].style.backgroundImage = colorBeingReplaced;
        }

    }


});