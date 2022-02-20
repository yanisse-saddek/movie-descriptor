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
        loadPage()
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
                    if(dataImg !== null){
                        $('#content').prepend('<div class="carte" style="width:20vw;display:flex;flex-direction:column; align-items:center">'+'<img height="320px" src="'+apiImg+'"><p style="font-size:1.2rem;font-weight:bold;margin:0">'+dataInfo+'</p>'+'<span>'+ dataDate +'</span>'+'<p class="description" style="padding:1rem;">'+dataDesc+'</p>'+'</div>')
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
    for(i=0; i<$('.dot').length; i++){
        $('.dot').remove(i)
    }
}
function loadPage(i){
    delList()
    page = i;
    console.log(i)
    
    apiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=123131ea405ceb7ba968916397a05764&language=FR&page=" + page
    $.ajax({
        url: apiUrl,
        success: function(film, statuts, response) { 
            allPages = film.total_pages
            if(page>3){
                $('.dot-list').append('<div class="dot" onclick=loadPage('+ 1 +')>'+ '<<' +'</div>')           
            }
            if(page>2){
                backPage = page-1
                $('.dot-list').append('<div class="dot" onclick=loadPage('+ backPage +')>'+ '<' +'</div>')           
            }
            for(i=page; i<page+10; i++){
                if(i<490){
                    $('.dot-list').append('<div class="dot" onclick=loadPage('+ i +')>'+ i +'</div>')                
                }else if(i>=500 && i>=490){
console.log(i)                    
                }else if(i>=490){
                    console.log(i-1)
                    $('.dot-list').append('<div class="dot" onclick=loadPage('+ i+')>'+ i +'</div>')                                    
                }
            }
            if(page>1){
                forwardPage = page+1
                $('.dot-list').append('<div class="dot" onclick=loadPage('+ forwardPage +')>'+ '>' +'</div>')           
            }
            $('.dot-list').append('<div class="dot" onclick=loadPage('+ 500 +')>'+ '>>' +'</div>')           
            
            
            for(i=0; i<film.results.length; i++){
                getDesc = "https://api.themoviedb.org/3/search/movie?api_key=123131ea405ceb7ba968916397a05764&language=fr-FR&append_to_response=credits&query=" + film.results[i].title
                $.ajax({
                    url: getDesc,
                    success: function(description){
                        title = description.results[0].title
                        desc = description.results[0].overview
                        dataImg =  description.results[0].poster_path
                        dataDate = description.results[0].release_date
                        dataDate = new Date(dataDate);
                        dataDate = dataDate.toLocaleString()
                        dataDate = dataDate.split(",")[0]
    
                        apiImg = "https://image.tmdb.org/t/p/w500/" + dataImg
                        if(dataImg !== null){
                            $('#content').prepend('<div class="carte" style="width:20vw;display:flex;flex-direction:column; align-items:center">'+'<img height="320px" src="'+apiImg+'"><p style="font-size:1.2rem;font-weight:bold;margin:0">'+title+'</p>'+'<span>'+ dataDate +'</span>'+'<p class="description" style="padding:1rem;">'+desc+'</p>'+'</div>')
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

loadPage(1)