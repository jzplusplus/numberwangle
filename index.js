let guessIndex = 0;
let guessesIndex = 0;
let noinput = false;

let template = document.getElementById("guesses").innerHTML;

function process(input)
{
    if (noinput) return;

    let guesses = document.getElementById("guesses");
    let guess = guesses.children[guessesIndex];

    if (input == " ")
    {
        /* ignore */
    }
    else if (input == "Enter")
    {
        if (guessIndex > 0) //require SOME input
        {
            if (Math.random() > 0.9)
            {
                for (let i = 0; i < guess.children.length; i++)
                {
                    guess.children[i].classList.add("yes");
                }

                noinput = true;
                let numberwang = document.getElementById("numberwang");

                numberwang.addEventListener("animationend", function()
                {
                    guesses.innerHTML = template;
                    guessIndex = 0;
                    guessesIndex = 0;
                    numberwang.classList.remove("wang");
                    noinput = false;
                });

                numberwang.classList.add("wang");
            }
            else
            {
                for (let i = 0; i < guessIndex; i++)
                {
                    let correct = Math.random();
                    if (correct < 0.5) guess.children[i].classList.add("nope");
                    else if (correct < 0.75) guess.children[i].classList.add("maybe");
                    else guess.children[i].classList.add("yes");
                }

                guesses.innerHTML += template;
                guessesIndex += 1;
                guessIndex = 0;

                guesses.scrollTop = guesses.scrollHeight;

                if (guessesIndex % 8 == 0)
                {
                    noinput = true;
                    let board = document.getElementById("board");

                    board.addEventListener("animationend", function()
                    {
                        board.classList.remove("rotate");
                        noinput = false;
                    });

                    board.classList.add("rotate");
                }
            }
        }
    }
    else if (input == "Backspace")
    {
        if (guessIndex > 0)
        {
            guessIndex -= 1;
            guess.children[guessIndex].textContent = "-";
        }
    }
    else
    {
        if (guessIndex < guess.children.length)
        {
            let box = guess.children[guessIndex];

            box.textContent = input;
            guessIndex += 1;
        }
    }
}

document.addEventListener("keypress", function(event)
{
    process(event.key);
});

let nums = document.getElementById("numpad").children;
for (let i = 0; i < nums.length; i++)
{
    nums[i].addEventListener("click", function()
    {
        console.log(this.textContent);
        process(this.textContent);
    });
}

console.log("*");