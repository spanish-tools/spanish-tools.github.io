let term_choice = ""
let term1term2_pairs = []
function analyzetext(){
    //use term1 or term2 as the term?

    if(document.getElementById("term1").checked){
        term_choice = "term1"
    }
    else{
        term_choice = "term2"
    }
    //get rid of previously existing test content
    document.getElementById("test-container").innerHTML = ""
    //generate the list to test:
    term1term2_pairs = document.getElementById("terms").value.split(/\r?\n/);
    term1term2_pairs = shuffle(term1term2_pairs)
    for(let i = 0; i<term1term2_pairs.length; i++){
        construct_div(term1term2_pairs[i], term_choice, i)
    }
    document.getElementById("grade").style.visibility = "visible"
}

//construct divs containing test content.
function construct_div(pair_of_cs_terms, term_choice, id){
    if(term_choice == "term2"){
        let prompt = document.createElement("p")
        prompt.id = "prompt"+id
        prompt.innerHTML = id + ". "+pair_of_cs_terms.substring(0,pair_of_cs_terms.indexOf(","))
        let answerbox = document.createElement("input")
        answerbox.id = "answerbox"+id
        //turn off autocorrect in all browsers, including Safari iOS, the worst offender!
        answerbox.spellcheck = "false"
        answerbox.autocorrect="off"
        answerbox.autocomplete = "off"
        answerbox.autocapitalize = "off"
        let idk_link = document.createElement("a")
        idk_link.innerText = "No idea?"
        idk_link.href = "javascript:show_answer("+id+")"
        idk_link.tabIndex = "-1"
        let answer = document.createElement("p")
        answer.id = "answer"+id
        document.getElementById("test-container").appendChild(prompt)
 
        document.getElementById("test-container").appendChild(answerbox)
        document.getElementById("test-container").appendChild(idk_link)        
        document.getElementById("test-container").appendChild(answer)
    }
    if(term_choice == "term1"){
        let prompt = document.createElement("p")
        prompt.id = "prompt"+id
        prompt.innerHTML = id + ". "+pair_of_cs_terms.substring(pair_of_cs_terms.indexOf(",")+1, pair_of_cs_terms.length)
        let answerbox = document.createElement("input")
        answerbox.id = "answerbox"+id
        answerbox.spellcheck = "false"
        answerbox.autocorrect="off"
        answerbox.autocomplete = "off"
        answerbox.autocapitalize = "off"
        let idk_link = document.createElement("a")
        idk_link.innerText = "No idea?"
        idk_link.href = "javascript:show_answer("+id+")"
        idk_link.tabIndex = "-1"
        let answer = document.createElement("p")
        answer.id = "answer"+id
        document.getElementById("test-container").appendChild(prompt)

        document.getElementById("test-container").appendChild(answerbox)
        document.getElementById("test-container").appendChild(idk_link)        
        document.getElementById("test-container").appendChild(answer)
    }
}

//from stack overflow (Fisher-Yates shuffle)
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  function grade(){
    let score = 0
    if(term_choice == "term2"){
        for(let id = 0; id<term1term2_pairs.length; id++){
            let prompt = "prompt"+id
            let answerbox = "answerbox"+id
            let answer = "answer"+id
            //.split(" ").join("") -> remove all spaces so that things like Hace ... a??os will be graded correctly even if it says hace...a??os, which is basically correct.
            if(document.getElementById(answerbox).value.trim().toLowerCase().split(" ").join("") == term1term2_pairs[id].substring(term1term2_pairs[id].indexOf(",")+1, term1term2_pairs[id].length).trim().toLowerCase().split(" ").join("")){
                document.getElementById(prompt).style.color = "green"
                score = score+1
                document.getElementById(answer).innerHTML = "Correct! Answer was:" + term1term2_pairs[id].substring(term1term2_pairs[id].indexOf(",")+1, term1term2_pairs[id].length)
            }
            else{
                document.getElementById(prompt).style.color = "red"
                document.getElementById(answer).innerHTML = "Incorrect! Answer was:" + term1term2_pairs[id].substring(term1term2_pairs[id].indexOf(",")+1, term1term2_pairs[id].length)
            }
        }
    }
    else{
        for(let id = 0; id<term1term2_pairs.length; id++){
            let answerbox = "answerbox"+id
            let prompt = "prompt"+id
            let answer = "answer"+id
            //console.log(document.getElementById(answerbox).value.trim().toLowerCase())
            //console.log(term1term2_pairs[id].substring(0,term1term2_pairs[id].indexOf(",")).trim().toLowerCase())
            if(document.getElementById(answerbox).value.trim().toLowerCase().split(" ").join("") == term1term2_pairs[id].substring(0,term1term2_pairs[id].indexOf(",")).trim().toLowerCase().split(" ").join("")){
                score = score+1
                document.getElementById(prompt).style.color = "green"
                document.getElementById(answer).innerHTML = "Correct! Answer was:" + term1term2_pairs[id].substring(0,term1term2_pairs[id].indexOf(","))
            }
            else{
                document.getElementById(prompt).style.color = "red"
                document.getElementById(answer).innerHTML = "Incorrect! Answer was:" + term1term2_pairs[id].substring(0,term1term2_pairs[id].indexOf(","))
            }
        }
    }
    let percent_correct = score / term1term2_pairs.length * 100
    document.getElementById("score").innerHTML ="Score: " +score + " / " + term1term2_pairs.length + " (" + percent_correct + "%)"
  }

  function avancemosU1L2(){
    document.getElementById("terms").value = `Acampar,to camp
Dar una caminata,to take a walk/to hike
estar de vacaciones,to be on vacation
hacer una excursi??n,to go on an excursion, guided tour
Mandar tarjetas postales,to send postcards
Montar a caballo,to ride a horse
Pescar,to go fishing
El tiempo libre,free time
Tomar fotos,to take photos
el turista/la turista,tourist
ver las atracciones,to go sightseeing
visitar un museo,to visit a museum
el alojamiento,lodging
el ascensor,elevator
la habitaci??n doble,double room
la habitaci??n individual,single room
hacer una reservaci??n,to make a reservation
tener una reservaci??n,to have a reservation
el hostal,hostel; inn
el hotel,hotel
la llave,key
la recepci??n,reception desk
el anillo,ring
el arete,earring
las artesan??as,handicrafts
el collar,necklace
las joyas,jewelry
el recuerdo,souvenir
la tarjeta postal,postcard
bello,beautiful
caro,expensive
demasiado,too; too much
el dinero en efectivo,cash
el mercado al aire libre,open-air market
regatear,to bargain
la tarjeta de cr??dito,credit card
ayer,yesterday
anteayer,the day before yesterday
el mes pasado,last month
el a??o pasado,last year
la semana pasada,last week
Hace ... a??os,... years ago
me gustar??a,I would like
??podr??a ver?,Could I see/look at...?
Le dejo... en...,I'll give... to you for...
??Que bello!,How beautiful!
??Que caro!,How expensive!`
if(document.getElementById("term1").checked == false && document.getElementById("term2").checked == false){
    document.getElementById("term1").checked = true
    document.getElementById("term2").checked = false
}
    //get rid of previously existing test content
    document.getElementById("test-container").innerHTML = ""
    analyzetext()
  }
function avancemosU2L2(){
    document.getElementById("terms").value = `acostarse (o-ue),to go to bed
    afeitarse,to shave oneself (starting with "a")
    apagar la luz,to turn off the light
    arreglarse,to get ready
    ba??arse,to take a bath
    cepillarse los dientes,to brush one's teeth
    despertarse (e:ie),to wake up
    dormirse,to fall asleep
    ducharse,to take a shower
    encender la luz,to turn on the light
    entrenarse,train; work out (starting with "e")
    lavarse,to wash oneself
    maquillarse,to put on makeup
    peinarse,to comb oneself
    ponerse la ropa,to put on clothes
    vestirse (e:i),to get dressed
    secarse,to dry oneself
    tener prisa,to be in a hurry
    tener sue??o,to be sleepy
    la rutina,routine
    la cara,face
    el codo,elbow
    el cuello,neck
    el dedo,finger
    el dedo del pie,toe
    el diente,tooth
    la garganta,throat
    el hombro,shoulder
    la mu??eca,wrist
    el o??do,inner ear
    la u??a,nail
    el cepillo (de dientes),brush (toothbrush)
    el champ??,shampoo
    la crema de afeitar,shaving cream
    el desodorante,deodorant
    el jab??n,soap
    la pasta de dientes,toothpaste
    el peine,comb
    el secador de pelo,hair dryer
    la toalla,towel
    la ropa,clothing
    primero,first
    entonces,then;so (starting with "e")
    luego,then (starting with "l")
    m??s tarde,later on
    por fin,finally
    al final,in the end
    a veces,sometimes
    frecuentemente,frequently
    generalmente,generally
    normalmente,normally
    raramente,rarely
    levantarse,to get up
    el inodoro,toilet
    el lavamanos, sink
    el desperator, alarm clock
    ponerse la pijama y las pantuflas, put on the pijama and the slippers
    secarse el cuelpo, to dry oneself's body
    hacer la cama, to make the bed (starting with "H")
    tender la cama, to make the bed (starting with "T")
    tomar la siesta, to take the siesta
    hacer ejercicio, to exercise/workout (starting with "H")
    cortarse, to cut oneself (e.g. haircut, papercut, etc.)
    rasurarse, to shave oneself (starting with "r")
    te??irse (e:i), to dye one's hair
    pintarse, to paint oneself (e.g. put makeup on oneself)
    morise (o:ue), to die
    llamarse, to be called
    re??rse, to laugh
    ser codo, to be greedy
    relajarse, to relax`
    //don't override the user's choice if they had one
    if(document.getElementById("term1").checked == false && document.getElementById("term2").checked == false){
        document.getElementById("term1").checked = true
        document.getElementById("term2").checked = false
    }

    //get rid of previously existing test content
    document.getElementById("test-container").innerHTML = ""
    analyzetext()
  }


  function avancemosReview(){
    document.getElementById("terms").value = `ser,to be (DOCTOR)
    estar,to be (PLACE)
    haber,to have
    hacer,to do, to make
    poder (o:ue),to be able to
    decir (e:i),to say, to tell
    ir,to go
    ver,to see
    dar,to give
    saber,to know (facts)
    querer (e:ie),to want
    llegar,to arrive
    pasar,to pass / to spend time / to happen
    deber,should
    poner,to put
    parecer,to seem
    quedar,to stay, to remain
    creer,to believe, to think
    hablar,to talk, to speak
    llevar,to bring, to carry
    dejar,to leave, to let
    seguir (e:i),to follow, to continue
    encontrar,to find
    llamar(se),to call, to be called; to be named
    venir,to come, to arrive
    pensar (e:ie),to think, to plan
    salir,to leave, to go out
    volver (o:ue),to return
    tomar,to take, to drink
    conocer,to know (familiar)
    vivir,to live
    sentirse (e:ie),to feel (emotionally, physically)
    mirar,to look at, to watch
    contar (o:ue),to count; to tell
    empezar (e:ie),to start, to begin
    esperar,to wait
    buscar,to look for, to search
    entrar,to enter, to go into
    trabajar,to work
    escribir,to write
    entender (e:ie),to understand
    pedir (e:i),to ask for, to request
    recordar (o:ue),to remember
    terminar,to end; to finish
    conseguir (e:i),to get, obtain
    servir (e:i),to serve
    sacar,to take out
    necesitar,to need
    leer,to read
    o??r,hear, listen
    comprender,to understand
    preguntar,to ask
    tocar,to touch, to play an instrument
    estudiar,to study
    correr,to run
    pagar,to pay
    ayudar,to help
    gustar,to like, to be pleasing
    jugar,to play
    escuchar,to listen
    almorzar (el almuerzo),to eat lunch (lunch)
    cenar (la cena),to have dinner (dinner)
    desayunar (el desayuno),to eat breakfast (breakfast)
    costar (o:ue),to cost
    regatear,to bargain
    preferir (e:ie),to prefer
    practicar,to practice
    abordar,to board
    acampar,to camp
    mandar,to send
    montar (en bicicleta / a caballo),to ride (a bike, a horse)
    acostarse (o:ue),to go to bed
    arreglarse,to get ready
    apagar,to turn off
    encender (e:ie),to turn on
    ba??arse,to take a bath
    lavarse,to wash oneself
    peinarse,to comb one's hair
    ganar,to win
    explicar,to explain
    escoger,to choose
    leer,to read
    traducir,to translate
    conducir/manejar,to drive
    recibir,to receive
    surfear,to surf
    textear,to text
    dormirse,to fall asleep
    aburrir (gustar verb),to bore
    encantar (gustar verb),to like very much, to love
    fascinar (gustar verb),to fascinate
    interesar (gustar verb),to interest
    preocupar (gustar verb),to worry
    ponerse,to put on
    levantar,lift
    pintarse,to paint
    cortarse,to cut oneself, to get a haircut
    pasear,to go for a walk
    caminar,to walk
    cantar,to sing`
    //don't override the user's choice if they had one
    if(document.getElementById("term1").checked == false && document.getElementById("term2").checked == false){
        document.getElementById("term1").checked = true
        document.getElementById("term2").checked = false
    }

    //get rid of previously existing test content
    document.getElementById("test-container").innerHTML = ""
    analyzetext()
  }

//an IDK hint
function show_answer(id){
    let answer = "answer"+id
    if(term_choice == "term1"){
        document.getElementById(answer).innerHTML = "Hint:" + term1term2_pairs[id].substring(0,term1term2_pairs[id].indexOf(","))
    }
    else{
        document.getElementById(answer).innerHTML = "Hint:" + term1term2_pairs[id].substring(term1term2_pairs[id].indexOf(",")+1, term1term2_pairs[id].length)
    }
    
}

//Note:
//Spanish Tools is a project of the Erica Corral Project, it is adapted from the code for OpenTest.
