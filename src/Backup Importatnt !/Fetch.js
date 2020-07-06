import sketch from 'sketch'

export default function () {

    fetch("http://api.tyhub.com/sketch_log")
    .then(response => response.text())
    .then(text => console.log(text))
    .catch(e => console.error(e));
    console.log("0")

   let payload = {
      method:'POST',
      body: {'version':'stuff'}
    };
    fetch("http://api.tyhub.com/sketch_log", payload)
    console.log("1")

} 