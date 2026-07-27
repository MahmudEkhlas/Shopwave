const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/not-supported');
xhr.send();

const xhr1 = new XMLHttpRequest();

xhr1.addEventListener('load', () => {
    console.log(xhr1.response);
});

xhr1.open('GET', 'https://supersimplebackend.dev/hello');
xhr1.send();


const xhr2 = new XMLHttpRequest();

xhr2.addEventListener('load', () => {
    console.log(xhr2.response);
});

xhr2.open('GET', 'https://supersimplebackend.dev/products/first');
xhr2.send();
//smaple push
