var contador=0;//contador para saber cuando acierta y cuando falla el jugador
	var intentos = 10; //número de intentos de los que dispone el jugador
	var n = Math.floor(Math.random()*(49-0+1)+0); //número aleatorio entre 0 y 49
	var words = ["glass", "bottle", "lamp", "chair", "table", "cat", "dog", "hamster", "kitchen", "house", "street", "bridge", "neck", "elbow", "door", "horse", "bear", "eagle", "boat", "fountain", "bycicle", "shore", "tree", "chest", "cigarette", "helmet", "river", "elephant", "tiger", "blue", "orange", "purple", "chemical", "music", "chess", "cheese", "spoon", "professor", "police", "baker", "ocean", "sailor", "paper", "writer", "actor", "floor", "string", "water", "rabbit", "movie", "guitar", "song", "tower", "country", "driver", "university", "airport", "school", "mountain", "beach"];//cargamos las 50 palabras en un array de strings
	//document.getElementById("palabra").innerHTML = words[n]; //muestra la palabra
	var numLetras=words[n].length;//número de letras de la palabra oculta
	var spans = "";//declaramos un variable string vacía
	//bucle para crear las etiquetas span con id's diferentes en función del número de letras que contiene la palabra
	for(i=0;i < numLetras;i++){
		spans=spans+"<span id="+(i+1)+"> _ </span>";
		if (i==numLetras-1) {
			document.getElementById("palabra-oculta").innerHTML = spans; //muestra todos los spans
		}
	}
	//Al cargar la página se desencadena el evento
	window.onload = function() {
		document.onkeypress = pulsarTecla;//al pulsar tecla normal
		document.onkeyup = pulsarTeclaEspecial;//pulsa tecla especial (ejemplo: Shift)
	}
	function pulsarTecla(evObject) {
		var palabra = '';
        var msg = '';
        var elCaracter = String.fromCharCode(evObject.which);//guarda en una variable la letra pulsada
        var contadorAnterior = contador;//contador para diferenciar cuando se ha acertado y cuando se ha fallado
        //evObject.which contiene el codigo numerico para una tecla en particular.
        //El código 0 se refiere a la tecla ESC y el 13 a la tecla ENTER
        if (evObject.which!=0 && evObject.which!=13) {
        	//bucle para recorrer la palabra y compararla con la letra pulsada
        	for(i=0; i < numLetras ;i++){
        		if(words[n].charAt(i)==elCaracter){
        			contador++;
        			document.getElementById(i+1).innerHTML = words[n].charAt(i);
        		}
        	}
        	//if para diferenciar cuando se acierta y cuando se falla
        	if(contadorAnterior==contador){
        		var falladas = document.getElementById("letras-falladas").innerHTML;
        		//este if hace que no se muestren letras falladas repetidas
        		if(falladas.includes(elCaracter)==false){
        			intentos--;//se resta un intento
        			document.getElementById("letras-falladas").innerHTML += (" "+elCaracter+" ");
        		}
        	}else{
        		var acertadas = document.getElementById("letras-acertadas").innerHTML;
        		//este if hace que no se muestren letras falladas repetidas
        		if(acertadas.includes(elCaracter)==false){
        			intentos--;// se resta un intento
        			document.getElementById("letras-acertadas").innerHTML += (" "+elCaracter+" ");
        		}
        	}
        } else {
        	msg = 'Pulsada tecla especial';
        	tecla.innerHTML += msg + '<br/>';
        }

        document.getElementById("intentos").innerHTML = intentos; //se muestran cuantos intentos quedan
        //bucle para rellenar un string con la palabra completa o incompleta
        for(i=0; i < numLetras ;i++){
        	palabra += document.getElementById(i+1).innerHTML;
        }
        //si la palabra está completa entra en el if
        if(words[n]==palabra){
    		document.getElementById("mensaje").innerHTML = "You win :)";
    		document.getElementById("contenedor-intentos").innerHTML = "";
    		document.onkeypress = null;//desactiva el evento al terminar el juego
    		document.onkeyup = null;//desactiva el evento al terminar el juego
    	}else if(intentos<=0){//si intento llega a 0 entra en este if y el jugador ha perdido
    		document.getElementById("mensaje").innerHTML = "You lost :(";
    		document.onkeypress = null;//desactiva el evento al terminar el juego
    		document.onkeyup = null;//desactiva el evento al terminar el juego
    	}
	}
	function pulsarTeclaEspecial(evObject) {
			var msg = '';
	    	var teclaPulsada = evObject.keyCode;

	        if (teclaPulsada == 20) {
	        	msg = 'Pulsado caps lock (act/des mayúsculas)';
	        } else if (teclaPulsada == 16) {
	        	msg = 'Pulsado shift';
	        } else if (eventoControlado == false) {
	        	msg = 'Pulsada tecla especial';
	        }
	        if (msg) {
	        	tecla.innerHTML += msg + '<br/>';
	    	}
	}
