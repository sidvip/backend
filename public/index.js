function searchInput(e) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp);
            document.body.innerHTML = xhttp.responseText;
            location.href = location.origin + `/search?search=${e.value}`;
        }
    };
    xhttp.open("GET", `/?search=${e.value}`, true);
    xhttp.send();
}