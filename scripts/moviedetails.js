var id = getParameterByName('id');

function getParameterByName(name) {  
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var prodId = getParameterByName('prodId');  

console.log(id)

apiUrl = "https://api.themoviedb.org/3/movie/"+ id +"?api_key=123131ea405ceb7ba968916397a05764&language=fr"
$.ajax({
    url:apiUrl,
    success:function(data){
        videoApi = "https://api.themoviedb.org/3/movie/"+ data.id +"/videos?api_key=123131ea405ceb7ba968916397a05764&language=fr"
        $.ajax({
            url:videoApi, 
            success: function(resultVideoApi){
                title = data.title
                image = "https://image.tmdb.org/t/p/w500/" + data.poster_path
                genreList = data.genres
                description = data.overview
                movieId = data.id
                $('.title').append(title)
                $('.img').attr("src", image)
                $('.movie-description').append(description)
                for(i=0; i<genreList.length; i++){
                    $('.genre-list').append('<p>'+genreList[i].name+'</p>')
                }
                if(!resultVideoApi.results[0]){
                    $('.video-preview').hide()
                }
                else{
                    $('.video').attr('src', 'https://www.youtube.com/embed/' + resultVideoApi.results[0].key )
                }

                for(i=0; i<data.spoken_languages.length;i++){

                    if(data.spoken_languages[i].iso_639_1 === "en"){
                        flag = "<img class='country-icon' src='https://flagcdn.com/gb.svg'>"
                    }else{
                        flag = "<img class='country-icon' src='https://flagcdn.com/"+data.spoken_languages[i].iso_639_1+".svg'>"                        
                    }
                    $('.langages-list').append(flag)
                }
            }
        })
    }
})