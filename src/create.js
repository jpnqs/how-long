

var now = new Date(),
    // minimum date the user can choose, in this case now and in the future
    minDate = now.toISOString().substring(0,10);

// set min date to date input
document.getElementById('date').setAttribute('min', minDate);


function onCreateLink() {

    var dateVal = document.getElementById('date').value;

    // parse date value correctly
    var date = new Date(dateVal);

    var currentDate = new Date();
    var title = document.getElementById('title').value;

    // generate url hash from current date - date input - title input
    var hash = '#' + currentDate.getFullYear() + ( currentDate.getMonth() + 1 ).toString().padStart(2, '0') + currentDate.getDate().toString().padStart(2, '0') + '-' + date.getFullYear() + ( date.getMonth() + 1 ).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');

    // add title after hash seperated by /
    hash += '/' + encodeURIComponent(title);

    // set to output
    document.getElementById('output').href = window.location.href.replace('create.html', '') + hash;
    // set title as link title of output
    document.getElementById('output').innerHTML = title;

}

function onCopyLink() {
    // copy adress of output href to clipboard -> its a a element
    var copyText = document.getElementById('output');
    copyTextToClipboard(copyText.href);
}

function onFollowLink() {
    var link = document.getElementById('output').value;
    window.location.href = link;

}

function copyTextToClipboard(text) {
    // copy given text to clipboard
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);


}

function onShareLink() {
    // open share dialog
    if (navigator.share) {
        navigator.share({
            title: 'Daisy',
            text: 'Daisy - Countdown to a date',
            url: document.getElementById('output').href
        })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
    }
}