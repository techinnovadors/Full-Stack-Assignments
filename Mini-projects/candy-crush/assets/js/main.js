document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid");
    const width = 8;
    let score = 0;

    const candies = [];

    const candyImages = [
        'url(assets/images/red-candy.png)',
        'url(assets/images/yellow-candy.png)',
        'url(assets/images/orange-candy.png)',
        'url(assets/images/purple-candy.png)',
        'url(assets/images/green-candy.png)',
        'url(assets/images/blue-candy.png)'
    ];



    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            let candy = document.createElement('div');
            let randomImageIndex = Math.floor(Math.random() * candyImages.length);

            candy.setAttribute("draggable", true);
            candy.setAttribute("id", i);
            candy.style.backgroundImage = candyImages[randomImageIndex];

            grid.appendChild(candy);
            candies.push(candy)
        }
    }
    createBoard();

    let ImageBeingDragged;
    let candyBeingDragged;
    let ImageBeingReplaced;
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
        ImageBeingDragged = this.style.backgroundImage;
        candyBeingDragged = parseInt(this.id);
    }

    function dragLeave() {
        console.log(this.id, "DragLeave");
    }

    function dragDrop() {
        ImageBeingReplaced = this.style.backgroundImage;
        candyBeingReplaced = parseInt(this.id);

        this.style.backgroundImage = ImageBeingDragged;
        candies[candyBeingDragged].style.backgroundImage = ImageBeingReplaced;
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
            checkRowforThree();

            candyBeingReplaced = null;
            candyBeingDragged = null;
            ImageBeingReplaced = null;
            ImageBeingDragged = null;
        } else if (candyBeingReplaced && !isValidMove) {
            candies[candyBeingDragged].style.backgroundImage = ImageBeingDragged;
            candies[candyBeingReplaced].style.backgroundImage = ImageBeingReplaced;
        }
    }


    function generateRandomCandies() { 
        let len = width * (width - 1) - 1;  // 55
        for (let i = 0; i < len; i++) {
            if (candies[i + width].style.backgroundImage === '') {
                candies[i + width].style.backgroundImage = candies[i].style.backgroundImage
                candies[i].style.backgroundImage = ''
                // Candy in first row has no backgroud
                if (i < width && candies[i].style.backgroundImage == '') {
                    candies[i].style.backgroundImage = candyImages[
                        Math.floor(Math.random() * candyImages.length)
                    ];
                }
            }
        }
    }

    function checkRowforThree() {
        let invalidIndex = [];
        /**
         * Get All Invalid  corner indices
         */
        for (let i = width - 2; i < width * width - 3; i += width)
            invalidIndex.push(i, i + 1);

        for (let i = 0; i < width * width - 3; i++) {
            let threeCandies = [i, i + 1, i + 2];
            let desiredImage = candies[i].style.backgroundImage;

            /**
             * If i present in the  invalidIndex Array forget it;
             */

            if (invalidIndex.includes(i)) continue;
            /***
             * 
             * 24  25  26
             * If Every Element satisfies the condition after arrow 
             * Or for every element the fuction returns true.
             * 
             * then the final result is true 
             */
            let match = threeCandies.every(index => desiredImage != "" && candies[index].style.backgroundImage == desiredImage);
            if (match) {
                score += 3;
                console.log(score)
                threeCandies.forEach(index => candies[index].style.backgroundImage = "")
            }

        }
    }

    checkRowforThree();


    function checkColumnforThree() {
        let len = width * (width - 2) - 1;

        for (let i = 0; i < len; i++) {
            let threeCandies = [i, i + width, i + width * 2];
            let desiredImage = candies[i].style.backgroundImage;

            /***
             * 
             * If Every Element satisfies the condition after arrow 
             * Or for every element the fuction returns true.
             * then the final result is true 
             * 
             */
            let match = threeCandies.every(index => desiredImage != "" && candies[index].style.backgroundImage == desiredImage);
            if (match) {
                score += 3;
                console.log(score)
                threeCandies.forEach(index => candies[index].style.backgroundImage = "")
            }

        }
    }

    checkColumnforThree();







    window.setInterval(function () {
        checkColumnforThree()
        checkRowforThree();
        generateRandomCandies();
    }, 500);

});