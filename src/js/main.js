const terminal = document.getElementById('terminal')
const container = document.getElementById('container')
const currentDirectory = document.getElementById('dir')
const input = document.getElementById('input')
let inputCounter=0;

container.addEventListener('click', () => {
    input.focus()
})

function Ternimal_Input(event){
    //prevent Tab making input loose focus
    if(event.key === 'Tab') {
        event.preventDefault();
        input.focus();
    }
	const focusElement = document.activeElement.className;
	//const Text=document.querySelector(".Ter_Input").clientWidth;

	const isTyping = (focusElement == "Ter_Input");
    let isPrintableKey = event.key.length === 1;
	if(isTyping){
		if(event.code == 'Backspace'){
			if(inputCounter > 0){
				inputCounter = inputCounter-1;
				document.querySelector(".Blink").style.transform= "translateX("+(inputCounter*12).toString()+"px)";
			}
			
		}
		else if(isPrintableKey){
			inputCounter=inputCounter+1;
			document.querySelector(".Blink").style.transform= "translateX("+(inputCounter*12).toString()+"px)";
		}
	}
}

// Function to generate a random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate an array of unique random lottery numbers
function generateLotteryNumbers(count, minRange, maxRange) {
    let lotteryNumbers = [];
    while (lotteryNumbers.length < count) {
        let number = getRandomInt(minRange, maxRange);
        if (!lotteryNumbers.includes(number)) {
            lotteryNumbers.push(number);
        }
    }
    return lotteryNumbers;
}

// Generate 6 unique lottery numbers between 1 and 45
const lotteryNumbers = generateLotteryNumbers(6, 1, 45);
console.log("Lottery Numbers:", lotteryNumbers);

const addLine = (text, className) => {
    
    let t = "";
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
        t += "&nbsp;&nbsp;";
        i++;
      } else {
        t += text.charAt(i);
      }
    }

    let tag = document.createElement("p");
    tag.className = className || 'new-line'
    //let text = document.createTextNode(t);
    //tag.appendChild(text);
    tag.innerHTML = t
    terminal.append(tag)
}

const addMultiLine = (command, className) => {
    command.map((line) => addLine(line, className))
}

const addOldCommandLine = () => {
    let tag = document.createElement("div");
    tag.className = 'title'
    
    let guestDiv = document.createElement('div')
    let guestText = document.createTextNode('guest@redraccoon\u00A0');
    guestDiv.appendChild(guestText)
    guestDiv.className = 'yellow'

    let inDiv = document.createElement('div')
    let inText = document.createTextNode(``);
    inDiv.appendChild(inText)

    let folderDiv = document.createElement('div')
    let folderText = document.createTextNode(currentDirectory.innerText);
    folderDiv.appendChild(folderText)
    folderDiv.className = 'blue'

    tag.appendChild(guestDiv);
    tag.appendChild(inDiv)
    tag.appendChild(folderDiv)

    let tag2 = document.createElement("div");
    tag2.className = 'title'

    let arrowDiv = document.createElement('div')
    let arrowText = document.createTextNode('>\u00A0');
    arrowDiv.appendChild(arrowText)
    arrowDiv.className = 'green'

    let commandDiv = document.createElement('div')
    let commandText = document.createTextNode(`${input.value}`);
    commandDiv.appendChild(commandText)
    //commandDiv.className = 'blue'

    tag2.appendChild(arrowDiv)
    tag2.appendChild(commandDiv)


    terminal.append(tag)
    terminal.append(tag2)
}

const resetCommand = () => {
    input.value = ''
    document.querySelector(".Blink").style.transform= "translateX("+(1).toString()+"px)";
    inputCounter=0;
}

//command functions
const clear = () => {
    terminal.innerHTML = ``
    document.querySelector('.presentation').innerHTML = ``
    document.querySelector('.presentation-text').innerHTML = ``
}

// const cd = () => {
    
// }




// Define language variable and set default language to English
let language = 'en';

// Function to handle language switching
const switchLanguage = (lang) => {
    if (lang === 'en' || lang === 'kr') {
        language = lang;
        addLine(`Switched language to ${lang.toUpperCase()}`, 'new-line');

    } else {
        addLine('Invalid language. Use "en" for English or "kr" for Korean.', 'new-line');
    }
}

const checkForCommand = () => {

        switch(input.value){
            case "whoami":
                if(language == 'kr'){
                    addMultiLine(whoamiKR, 'new-line')

                }else{
                addMultiLine(whoami, 'new-line')
                }
                break;
            case "clear":
                clear()
                break
            case "help":
                if(language == 'kr'){
                    addMultiLine(helpKR, 'new-line')

                }else{
                addMultiLine(help, 'new-line')}
                break
            case "social":
                if(language == 'kr'){
                    addMultiLine(socialsKR, 'new-line')

                }else{
                addMultiLine(socials, 'new-line')}
                break
            case "youtube":
                addMultiLine(youtube, 'new-line')
                break
            case "course":
                if(language == 'kr'){
                    addMultiLine(courseKR, 'new-line')

                }else{
                addMultiLine(course, 'new-line')
                }
                break
            case "contact":
                addLine(`<a href="mailto:support@redraccoon.kr">Contact Us!</a>`, 'new-line');
                break
            case "lotto":
                const lotteryNumbers = generateLotteryNumbers(6, 1, 45);
                addLine(`Here's your Lotto Numbers! Good Luck!: ${lotteryNumbers.join(", ")}`, 'new-line');
                break;
            default:
                if(language == 'kr'){
                    addLine(`${input.value}: command not found. "help" 커맨드를 사용하여 사용 가능한 명령어를 확인할 수 있습니다.`, 'new-line');

                }else{
                    addLine(`${input.value}: command not found.  Check the list of commands with "help"`, 'new-line');                
                }
             
                
        }
    
}

window.addEventListener("keydown", function (e) {
    if (e.code === "Enter") { 
        addOldCommandLine();
        const command = input.value.trim(); // Remove leading and trailing spaces
        if (command.startsWith('language')) {
            const lang = command.split(" ")[1]; // Get the language code from the command
            switchLanguage(lang); // Pass the language code to switchLanguage
        } else {
            checkForCommand();
        }
        resetCommand();
    }
});

window.addEventListener('keydown',Ternimal_Input);