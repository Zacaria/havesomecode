onReady(main);

function onReady(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function main() {
  document
    .querySelector('.print')
    .addEventListener('click', printPage);
}

function printPage() {
  window.print();
}
