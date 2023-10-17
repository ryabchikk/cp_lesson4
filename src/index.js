document.getElementById('demoButton').onclick = addSomething;

function addSomething(){
    const someDummyDiv = document.createElement('div');
    someDummyDiv.classList.add('generated');
    const count = document.getElementsByClassName('generated').length;
    const inputText = document.getElementById('inputField').value;
    someDummyDiv.innerHTML = `${inputText} ${count} `;
    const container = document.getElementById('container');
    container.appendChild(someDummyDiv);
}