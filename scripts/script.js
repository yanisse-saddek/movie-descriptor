/*
 * on commence par une variable qui stockera l'URL:
 * https://api.themoviedb.org/3/search/movie?api_key=123131ea405ceb7ba968916397a05764&language=fr-FR&append_to_response=credits&query=b
 * Cette URL nous permet de récupérer les détails d'un films (ce n'est pas une API de streaming)
* 
* 1) On veut récupérer le champ input de la barre de recherche.
* 1) On veut créer un écouteur d'événement sur les touches appuyées dans la barre de recherche.
* 3) Dans cet écouteur d'événement on veut:
* 	a) on fait une concatenation de l'URL avec la valeur saisi par l'utilisateur  et
* 	b) lancer une requete grâce à ajax sur cet nouvelle URL
 *  c) Dans la fonction de success:
 *    - On stock le lien pour recuperer l'image : https://image.tmdb.org/t/p/w500/
 *    - on récupère la zone d'affichage 
 *    - on remet la zone d'affichage à 0, car on veut effacer les recherches
 *          precedentes
 *    - on parcourt les résultats et on les affiches dans la zone de texte avec
 *      le l'image, le titre, la description
 * */


$('.input-search').keyup(function(){
    if($('.input-search').val() === ""){
        loadPage(1)
        $('.dot-list').show()
    }else{
        $('.dot-list').hide()
    }

    cartList = $('.carte')
    for(i=0; i<cartList.length; i++){
        cartList[i].remove()
    }


    noResult = $('.no-result')
    for(i=0; i<noResult.length; i++){
        noResult[i].remove()
    }
    delList()

    apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=123131ea405ceb7ba968916397a05764&language=fr-FR&append_to_response=credits&query="+$('.input-search').val()
    $.ajax({
        url: apiUrl,
        success: function(data, statuts, response) {  
            console.log(statuts)
            if(data.results.length){
                for(i=data.results.length -1 ; i<data.results.length; i--){

                    dataInfo = data.results[i].title   
                    dataImg = data.results[i].poster_path
                    dataDesc = data.results[i].overview.slice(0,300) + "..."
                    dataDate = data.results[i].release_date
                    dataDate = new Date(dataDate);
                    dataDate = dataDate.toLocaleString()
                    dataDate = dataDate.split(",")[0]
                    apiImg = "https://image.tmdb.org/t/p/w500/" + dataImg
                    more = "film.html?id=" + data.results[i].id

                    if(dataImg !== null){
                        
                        
                        $('#content').prepend(`
                        <div id="${i}" class="carte">
                            <img src="${apiImg}">
                            <p class="title">${dataInfo}</p>
                            <p class="date">${dataDate}</p>
                            <p class="description">${dataDesc}</p>
                            <a class="more" href="${more}">Voir plus</a>
                        </div>
                    `)


                    const card = document.querySelector('.carte');                
                        const TL1 = new TimelineMax({paused: true});
                        TL1
                        .from(card,2,{opacity:0})
                        TL1.play();
                    }
                }
            }else{
                $('#content').prepend('<div class="no-result"><p>Aucun résultat pour: ' + $('.input-search').val() +'</p></div>')
            }
        }
    });
})


window.onscroll = function() {myFunction()};

var header = document.getElementById("searchbar");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

const svg = document.querySelector('#svg-nav');                
const TL3 = new TimelineMax({ repeat: -1, repeatDelay: 20 })
TL3     
.from(svg,1,{rotation:-500})
.from(svg,1,{rotation:500})

function delList(){
    cartList = $('.carte')
    for(i=0; i<cartList.length; i++){
        cartList[i].remove()
    }
}
function delDots(){
    var dot = $('.dot-page')
    for(i=0; i<dot.length; i++){
        dot[i].remove()
    }
}
function loadPage(page,genre){
    delList()
    delDots()
    genreURL = "https://api.themoviedb.org/3/discover/movie?api_key=123131ea405ceb7ba968916397a05764&page="+page+"&with_genres="
    if(1==1){
        if(genre === "Popularité"){
            apiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=123131ea405ceb7ba968916397a05764&language=FR&page=" + page
        }
        else if(genre === 'Action'){
            genreURL += "27" 
        }
        else if(genre === 'Comedie'){
            genreURL += "35" 
        }
        else if(genre === 'Aventure'){
            genreURL += "12" 
        }
        else if(genre === 'Animation'){
            genreURL += "16" 
        }
        else if(genre === 'Crime'){
            genreURL += "80" 
        }
        else if(genre === 'Documentaire'){
            genreURL += "99" 
        }
        else if(genre === 'Drama'){
            genreURL += "18" 
        }
        else if(genre === 'Famille'){
            genreURL += "10751" 
        }
        else if(genre === 'Fantaisie'){
            genreURL += "14" 
        }
        else if(genre === 'Histoire'){
            genreURL += "36" 
        }
        else if(genre === 'Horreur'){
            genreURL += "27" 
        }
        else if(genre === 'Musique'){
            genreURL += "10402" 
        }
        else if(genre === 'Mystere'){
            genreURL += "9648" 
        }
        else if(genre === 'Romance'){
            genreURL += "10749" 
        }
        else if(genre === 'Science Fiction'){
            genreURL += "878" 
        }
        else if(genre === 'Film TV'){
            genreURL += "10770" 
        }
        else if(genre === 'Thriller'){
            genreURL += "53" 
        }
        else if(genre === 'Guerre'){
            genreURL += "10752" 
        }
        else if(genre === 'Western'){
            genreURL += "37" 
        }
    
    }
    console.log(genreURL, page)
    $.ajax({
        url: genreURL,
        success: function(film, statuts, response) { 
            genre = genre
            if(page>1){
                back = page -1
                $('.dot-back').attr('onclick', 'loadPage('+ back  + ",'" +genre+ "'" +')')
            }
            if(page <500){
                forward = page + 1
                $('.dot-forward').attr('onclick', 'loadPage('+ forward  + ",'" +genre+ "'" +')')
            }
            pagetoLoad = page+5
            allDots = 0
            dotList = []
            for(i=1; i<pagetoLoad; i++){
                console.log(-i)
                if(dotList.length <i +9){
                    if(-i>=0){
                        $('.dots').prepend('<div class="dot dot-page">'+ -i +'</div>')
                        $('.dot-page:nth-child('+-i+')').attr('onclick', 'loadPage('+ -i +",'"+ genre + "'" +')')    
                    }
                    $('.dots').append('<div class="dot dot-page">'+ i +'</div>')
                    $('.dot-page:nth-child('+i+')').attr('onclick', 'loadPage('+ i +",'"+ genre + "'" +')')
                    dotList.push(i)
                }else{
                    dotList.shift(1)
                    $('.dot-page:first-child').hide()
                    console.log("yoooo",$('.dot-page:first-child'))
                }
            }
            console.log("page",page)

            allPages = film.total_pages
            for(i=0; i<film.results.length; i++){
                getDesc = "https://api.themoviedb.org/3/search/movie?api_key=123131ea405ceb7ba968916397a05764&language=fr-FR&append_to_response=credits&query=" + film.results[i].title
                $.ajax({
                    url: getDesc,
                    success: function(description){
                        

                        title = description.results[0].title
                        desc = description.results[0].overview.slice(0,300) + "..."
                        dataImg =  description.results[0].poster_path
                        dataDate = description.results[0].release_date
                        dataDate = new Date(dataDate);
                        dataDate = dataDate.toLocaleString()
                        dataDate = dataDate.split(",")[0]
                        more = "film.html?id=" + description.results[0].id
                        apiImg = "https://image.tmdb.org/t/p/w500/" + dataImg
                        if(dataImg !== null){
                            $('#content').prepend(`
                                <div id="${i}" class="carte">
                                    <img src="${apiImg}">
                                    <p class="title">${title}</p>
                                    <p class="date">${dataDate}</p>
                                    <p class="description">${desc}</p>
                                    <a class="more" href="${more}">Voir plus</a>
                                </div>
                            `)
                            const card = document.querySelector('.carte');                
                            const TL1 = new TimelineMax({paused: true});
                            TL1
                            .from(card,2,{opacity:0})
                            TL1.play();
                        }
                    }
                })
        
            }
        }
    });
}
loadPage(1,$('#select :selected').text())
$('#select').change(function(){
    loadPage(1, $('#select :selected').text())
})