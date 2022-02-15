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
    length = $('.card')
    console.log(length.length)
    for(i=0; i<length.length; i++){
        length[i].remove()
    }

    apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=123131ea405ceb7ba968916397a05764&language=fr-FR&append_to_response=credits&query="+$('.input-search').val()
    $.ajax({
        url: apiUrl,
        success: function(data, statuts, response) {  
            console.log(statuts)
            for(i=data.results.length -1 ; i<data.results.length; i--){
                dataInfo = data.results[i].original_title   
                dataImg = data.results[i].poster_path
                dataDesc = data.results[i].overview
                apiImg = "https://image.tmdb.org/t/p/w500/" + dataImg
                $('#content').prepend('<div class="card"  style="width:250px;display:flex;flex-direction:column; align-items:center">'+'<img height="370px" src="'+apiImg+'"><p>'+dataInfo+'</p>'+'<p style="padding:1rem">'+dataDesc+'</p>'+'</div>')
            }
        }
    });
})
