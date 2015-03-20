
  function checar_tiempos(player,cb,tiempos, tiempos_falsos_banners){
    var tiempo;
    player.getTime(function(time){
      tiempo = time;
      var _cb = cb(parseInt(tiempo),tiempos,player,tiempos_falsos_banners);
      var new_tiempos = _cb.tiempos;
      var new_tiempos_banners = _cb.tiempos_banners;
      setTimeout(function(){ checar_tiempos(player,cb,new_tiempos, new_tiempos_banners) }, 100);
    });
  }

  function cb(time,tiempos,player, tiempos_banners){
    var _video = player;
    player.addEventListener('playState', function(i){
        player.ended = i;
    });
    player.addEventListener('interaction', function(i){
        player.interaction = i;
    });
    if(player.ended == "mediaEnded" || player.interaction == "seekbar"){
      tiempos = $.extend({}, tiempos_questions_originales);
      tiempos_banners = $.extend({}, tiempos_originales_banners);

    }

    //if(player.ended == "mediaEnded"){
      //$('[id^=banner]').hide();
    //}
    if(String(time) in tiempos){
      var question = tiempos[String(time)];
      delete tiempos[String(time)];
      if($(question).is(":visible") == false){
        _video.pause();
        $(question).show();
      }
    }
    if(String(time) in tiempos_banners){
      var banner = tiempos_banners[String(time)];
      delete tiempos_banners[String(time)];
      if($(banner).is(":visible") == false){
        $(banner).show();
      }
    }
    var _return = new Object();
    _return.tiempos = tiempos;
    _return.tiempos_banners = tiempos_banners;
    return _return;
  }

  function agregar_retro(div,mensaje, bueno){
    if(bueno){
      mensaje = "<p style='color:green;'>" +mensaje+"</p>"
    }else{
      mensaje = "<p style='color:red;'>" +mensaje+"</p>"
    }
    div.find('#retroalimentacion').html(mensaje);
    setTimeout(function(){
      div.find('#retroalimentacion').empty()
      div.hide();
      reanudar_video();
    },2000)
  }
  


  function reanudar_video(){
    myPlayer = new vzPlayer('video_movie');
    myPlayer.play2();
  }
  
  function validarRespuesta(context){
    var $this = $(context);
    var $parent1 = $this.parent();
    var $parent2 = $parent1.parent();
    var $div_quiz = $parent2.parent();
    var $respuesta_selected = $div_quiz.find(':checked');
    if($respuesta_selected.data('correcta')){
      agregar_retro($div_quiz, "Perfecto!", true);
    }else{
      agregar_retro($div_quiz, "Hmmm intentalo de nuevo!", false);
    }

  }

  function close_banner(context){
    var c = $(context);
    c.parent().parent().hide();
  }
  
  $(document).ready(function(){
    var myPlayer = document.getElementById('video_movie');
    var video2 = $(myPlayer);
    window.tiempos_questions_originales = video2.data('times');
    window.tiempos_originales_banners = video2.data('times-banners');
    window.tiempos_falsos_banners = $.extend({}, tiempos_originales_banners);
    window.tiempos_falsos = $.extend({}, tiempos_questions_originales);
    myPlayer = new vzPlayer('video_movie');
    myPlayer.ready(function(){
      checar_tiempos(myPlayer,cb,tiempos_falsos, tiempos_falsos_banners);
    });
    
  });   
