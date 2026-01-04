let n = parseInt(document.getElementById("n").value);
let is_sorted;

async function swap(box1, box2) {
    await new Promise(resolve => setTimeout(resolve, 500));
    let p1i = box1.getBoundingClientRect().left;
    let p2i = box2.getBoundingClientRect().left;

    let temp = document.createElement('div')
    box1.before(temp);
    box2.before(box1)
    temp.replaceWith(box2);

    let p1f = box1.getBoundingClientRect().left;
    let p2f = box2.getBoundingClientRect().left;


    let animation1 = box1.animate([{ transform: `translateX(${p1i - p1f}px)` },
    { transform: `translateX(0)` }],
        { duration: 1000, easing: "ease-in-out" }
    )

    let animation2 = box2.animate([{ transform: `translateX(${p2i - p2f}px)` },
    { transform: `translateX(0)` }],
        { duration: 1000, easing: "ease-in-out" }
    )

    await Promise.all([animation1.finished, animation2.finished]);
}

async function bubble_sort() {
    let box = document.getElementsByClassName("box");

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            let box1 = box[j];
            let box2 = box[j + 1];

            box1.style.backgroundColor = "orange";
            box2.style.backgroundColor = "orange";

            let hj = Math.ceil(parseInt(box1.style.height) / 6);
            let hj1 = Math.ceil(parseInt(box2.style.height) / 6);

            if (hj > hj1) {

                await swap(box1, box2);

            } else {
                await new Promise(resolve => setTimeout(resolve, 800));
            }

            box[j].style.backgroundColor = "rgb(173, 109, 229)";
        }
        box[n - 1 - i].style.backgroundColor = "green";
    }
    is_sorted = "yes";
}
async function insertion_sort() {
    let box = document.getElementsByClassName("box");
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            let box1 = box[j];
            let box2 = box[i];

            box1.style.backgroundColor = "orange";
            box2.style.backgroundColor = "rgb(190, 83, 1)";

            let hj = Math.ceil(parseInt(box1.style.height) / 6);
            let hj1 = Math.ceil(parseInt(box2.style.height) / 6);

            if (hj > hj1) {
                await swap(box1, box2);
            } else {
                await new Promise(resolve => setTimeout(resolve, 800));
            }

            box[j].style.backgroundColor = "green";
            box[j + 1].style.backgroundColor = "rgb(173, 109, 229)";

        }
    }
    box[n - 1].style.backgroundColor = "green";
}

async function quick_sort(start, end) {
    let box = document.getElementsByClassName("box")
    if (start >= end) {
        box[start].style.backgroundColor = "green";
        box[start - 1].style.backgroundColor = "green";
        return;
    }
    let i = start - 1;
    let j = start;
    let p = end;
    box[p].style.backgroundColor = "red";
    while (j != p) {
        let boxj = box[j]
        boxj.style.backgroundColor = "orange";
        if ((parseInt(boxj.style.height)) < (parseInt(box[p].style.height))) {
            i++;
            let boxi = box[i]
            await new Promise(resolve => setTimeout(resolve, 500))
            boxi.style.backgroundColor = "grey";
            if (i > 0) {
                box[i - 1].style.backgroundColor = "rgb(173, 109, 229)"
            }
            await swap(boxi, boxj)
            boxi.style.backgroundColor = "orange";
            boxj.style.backgroundColor = "grey";
        }


        await new Promise(resolve => setTimeout(resolve, 500));
        box[j].style.backgroundColor = "rgb(173, 109, 229)";
        if (i === j) {
            box[i].style.backgroundColor = "grey";
            if (i > 0) {
                box[i - 1].style.backgroundColor = "rgb(173, 109, 229)"
            }
        }
        j++;
    }
    i++;
    await swap(box[i], box[p])
    box[i].style.backgroundColor = "green";

    quick_sort(i + 1, end);
    quick_sort(start, i - 1);
}

async function value() {

    n = parseInt(document.getElementById("n").value);
    document.querySelector(".container").innerHTML = "";

    for (let i = 0; i < n; i++) {
        let box = document.querySelector(".container")
        let div = document.createElement("div");
        div.setAttribute("class", "box")
        box.append(div)
        let x = 2 + Math.ceil(Math.random() * 76)
        document.getElementsByClassName("box")[i].style.height = `${x}vh`;
        document.getElementsByClassName("box")[i].innerHTML = `${Math.ceil(x)}`;
        document.getElementsByClassName("box")[i].style.width = `${94 / n}vw`;
    }
}


setInterval(() => {
    document.getElementById("n").addEventListener('input', (e) => {
        n = parseInt(e.target.value);
    });
    document.querySelector(".display").innerHTML = `${n}`;
}, 0)


document.querySelector(".set").addEventListener("click", () => {
    if (is_sorted !== "sorting") {
        value();
        is_sorted = "no"


        document.querySelector(".button").addEventListener("click", () => {

            if (document.getElementById("sort_algo").value == "Bubble_sort" && is_sorted === "no") {
                is_sorted = "sorting"
                bubble_sort().then(() => { is_sorted = "yes" });
            }

            else if (document.getElementById("sort_algo").value == "insertion_sort" && is_sorted === "no") {
                is_sorted = "sorting"
                insertion_sort().then(() => { is_sorted = "yes" });
            }

            else if (document.getElementById("sort_algo").value == "quick_sort" && is_sorted === "no") {
                is_sorted = "sorting"
                quick_sort(0, n - 1).then(() => { is_sorted = "yes" });
            }


        })
    }
})

