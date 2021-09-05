class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
        this.grid = [
            [0, 0, 4, 0],
            [0, 0, 4, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ];
        this.change = false;
        this.addNum();
        this.addNum();
        this.draw();
        this.handle();

    }

    init() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 400;
        this.canvas.height = 400;
        document.body.appendChild(this.canvas);
    }

    addNum() {
        let arr = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] == 0) {
                    arr.push({ x: i, y: j });
                }
            }
        }
        if (arr.length > 0) {
            let randomXY = arr[Math.random() * arr.length >> 0];
            let num = Math.floor(Math.random() * 4);
            if (num < 3) {
                this.grid[randomXY.x][randomXY.y] = 2;
            } else { this.grid[randomXY.x][randomXY.y] = 4; }
        }
    }


    draw() {
        this.context.clearRect(0, 0, 400, 400);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.context.beginPath();
                this.context.moveTo(i * 100, 0);
                this.context.lineTo(i * 100, 400);
                this.context.moveTo(0, i * 100);
                this.context.lineTo(400, i * 100);
                this.context.stroke();
            }
        }

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] == 2) {
                    this.context.fillStyle = '#eee4da';
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
                } else if (this.grid[i][j] == 4) {
                    this.context.fillStyle = '#ede0c8';
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
                } else if (this.grid[i][j] == 8) {
                    this.context.fillStyle = '#f2b179';
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
                } else if (this.grid[i][j] == 16) {
                    this.context.fillStyle = '#ffcea4';
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
                } else if (this.grid[i][j] == 32) {
                    this.context.fillStyle = '#e8c064';
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
                } else if (this.grid[i][j] == 64) {
                    this.context.fillStyle = '#ffab6e';
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
                }

                if (this.grid[i][j] != 0) {
                    this.context.font = '60px time new roman';
                    this.context.fillStyle = "black";
                    this.context.textAlign = "center";
                    this.context.fillText(this.grid[i][j], j * 100 + 50, i * 100 + 70);
                }
            }
        }
    }

    slideLeftOrUp(row) {
        let arr = [];
        for (let i = 0; i < 4; i++) {
            if (row[i] != 0) {
                arr.push(row[i]);
            }
        }
        for (let j = arr.length; j < 4; j++) {
            arr.push(0);
        }
        return arr;
    }


    slideRightOrDown(row) {
        let arr = [];
        for (let i = 0; i < 4; i++) {
            if (row[i] == 0) {
                arr.push(row[i]);
            }
        }
        for (let i = 0; i < 4; i++) {
            if (row[i] != 0) {
                arr.push(row[i]);
            }
        } return arr;
    }

    changeRC(arr1, arr2) {
        for (let i = 0; i < 4; i++) {
            if (arr1[i] != arr2[i]) {
                this.change = true;
            }
        }
    }

    handle() {
        document.addEventListener('keydown', (e) => {
            this.change = false;

            if (e.key == 'ArrowLeft') {
                for (let i = 0; i < 4; i++) {
                    let arr = this.grid[i];
                    this.grid[i] = this.slideLeftOrUp(this.grid[i]);
                    for (let j = 0; j < 4; j++) {
                        if (this.grid[i][j] == this.grid[i][j + 1]) {
                            this.grid[i][j] += this.grid[i][j + 1];
                            this.grid[i][j + 1] = 0;
                        }
                    }
                    this.grid[i] = this.slideLeftOrUp(this.grid[i]);
                    this.changeRC(arr, this.grid[i]);
                }
                if (this.change) { this.addNum() };
                this.draw();

            } else if (e.key == 'ArrowRight') {
                for (let i = 0; i < 4; i++) {
                    let arr = this.grid[i];
                    this.grid[i] = this.slideRightOrDown(this.grid[i]);
                    for (let j = 3; j > 0; j--) {
                        if (this.grid[i][j] == this.grid[i][j - 1]) {
                            this.grid[i][j] += this.grid[i][j - 1];
                            this.grid[i][j - 1] = 0;
                        }
                    }
                    this.grid[i] = this.slideRightOrDown(this.grid[i]);
                    this.changeRC(arr, this.grid[i]);
                }
                if (this.change) { this.addNum() };
                this.draw();

            } else if (e.key == 'ArrowUp') {
                for (let i = 0; i < 4; i++) {
                    let arr = [];
                    for (let j = 0; j < 4; j++) {
                        arr.push(this.grid[j][i]);
                    }
                    let arr1 = arr;
                    arr = this.slideLeftOrUp(arr);
                    for (let l = 3; l > 0; l--) {
                        if (arr[l] == arr[l - 1]) {
                            arr[l] += arr[l - 1];
                            arr[l - 1] = 0;
                        }
                    }
                    arr = this.slideLeftOrUp(arr);
                    for (let k = 0; k < 4; k++) {
                        this.grid[k][i] = arr[k];
                    }
                    this.changeRC(arr, arr1);
                }
                if (this.change) { this.addNum() };
                this.draw();

            } else if (e.key == 'ArrowDown') {
                for (let i = 0; i < 4; i++) {
                    let arr = [];
                    for (let j = 0; j < 4; j++) {
                        arr.push(this.grid[j][i]);
                    }
                    let arr1 = arr;
                    arr = this.slideRightOrDown(arr);
                    for (let l = 3; l > 0; l--) {
                        if (arr[l] == arr[l - 1]) {
                            arr[l] += arr[l - 1];
                            arr[l - 1] = 0;
                        }
                    }
                    arr = this.slideRightOrDown(arr);
                    for (let k = 0; k < 4; k++) {
                        this.grid[k][i] = arr[k];
                    }
                    this.changeRC(arr, arr1);
                }
                if (this.change) { this.addNum() };
                this.draw();
            }
        });
    }

}
var g = new game();

