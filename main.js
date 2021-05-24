

function fetchData(vuosi = 0, artikkeli = "", kommentti = "") {
    fetch("./data.json").then(response => {
        return response.json();
    })
    .then((data) =>  {
        if (vuosi === 0 && artikkeli === "" && kommentti == "") {
            vuosiRender(data.artikkelit);
        } else if (vuosi != 0 && artikkeli === "") {
            vuosiRender(data.artikkelit);
            let newArticles = [];
            let selectedItem = document.getElementById(vuosi);
            for (let i = 0; i < data.artikkelit.length; i++) {
                if (data.artikkelit[i]["year"] == vuosi) {
                    newArticles.push(data.artikkelit[i]);
                }
            }
            let str = `<ul>`
            newArticles.forEach(function(artikkeli) {
                str += `<li id="${artikkeli.articleName}, ${artikkeli.date}" class="artikkeli" onclick="articleDisplay(this.id)">${artikkeli.articleName} | ${artikkeli.date}</li>`;
            });
            str += `</ul>`;
            selectedItem.innerHTML = str;
        } else if (vuosi == null && artikkeli !== "" && kommentti == "") {
            let teksti = "";
            let [x, y] = [artikkeli.split(",")[0], artikkeli.split(",")[1]];
            for (let i = 0; i < data.artikkelit.length; i++) {
                if (data.artikkelit[i]["articleName"] == x) {
                    teksti = data.artikkelit[i]["articleContent"];
                }
            str = `<p>${teksti}</p>`;
            let kommenttiField = `<textarea name="comments" id="${artikkeli}K">Write your comment here!</textarea>
            <br><input id="${artikkeli}" type="submit" value="Submit" onclick="getInputValue(this.id);">`
            console.log(teksti);
            document.getElementById("IDartikkeli").innerHTML = str;
            document.getElementById("IDkommentti").innerHTML = kommenttiField;
            
            } 
        }
    });
} 
fetchData();
function articleSearch(clicked_id) {
    fetchData(clicked_id);
}
function articleDisplay(clicked_article){
    fetchData(null, clicked_article);
}
function getInputValue(art) {
    let x = art.split(",")[0];
    let inputVal = document.getElementById(art+"K").value;
    return inputVal;
}
function vuosiRender(obj) {
    let testArray = [];
    for (let i = 0; i < obj.length; i++) {
        testArray.push(obj[i].year);
    }
    const eriVuodet = [...new Set(testArray)];
    let str = `<ul>`
    eriVuodet.forEach(function(vuosi) {
        str += `<li id="${vuosi}" class="vuosi" onclick="articleSearch(this.id)">${vuosi}</li>`;
    });
    str += `</ul>`;
    document.getElementById("aikajanaLista").innerHTML = str;
}
