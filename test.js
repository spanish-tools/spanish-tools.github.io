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
            //.split(" ").join("") -> remove all spaces so that things like Hace ... años will be graded correctly even if it says hace...años, which is basically correct.
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
hacer una excursión,to go on an excursion, guided tour
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
la habitación doble,double room
la habitación individual,single room
hacer una reservación,to make a reservation
tener una reservación,to have a reservation
el hostal,hostel; inn
el hotel,hotel
la llave,key
la recepción,reception desk
el anillo,ring
el arete,earring
las artesanías,handicrafts
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
la tarjeta de crédito,credit card
ayer,yesterday
anteayer,the day before yesterday
el mes pasado,last month
el año pasado,last year
la semana pasada,last week
Hace ... años,... years ago
me gustaría,I would like
¿podría ver?,Could I see/look at...?
Le dejo... en...,I'll give... to you for...
¡Que bello!,How beautiful!
¡Que caro!,How expensive!`
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
    bañarse,to take a bath
    cepillarse los dientes,to brush one's teeth
    despertarse (e-ie),to wake up
    dormirse,to fall asleep
    ducharse,to take a shower
    encender la luz,to turn on the light
    entrenarse,train; work out (starting with "e")
    lavarse,to wash oneself
    maquillarse,to put on makeup
    peinarse,to comb one's hair
    ponerse la ropa,to put on clothes
    vestirse (e-i),to get dressed
    secarse,to dry oneself
    tener prisa,to be in a hurry
    tener sueño,to be sleepy
    la rutina,routine
    la cara,face
    el codo,elbow
    el cuello,neck
    el dedo,finger
    el dedo del pie,toe
    el diente,tooth
    la garganta,throat
    el hombro,shoulder
    la muñeca,wrist
    el oído,inner ear
    la uña,nail
    el cepillo (de dientes),brush (toothbrush)
    el champú,shampoo
    la crema de afeitar,shaving cream
    el desodorante,deodorant
    el jabón,soap
    la pasta de dientes,toothpaste
    el peine,comb
    el secador de pelo,hair dryer
    la toalla,towel
    la ropa,clothing
    primero,first
    entonces,then;so
    luego,then
    más tarde,later on
    por fin,finally
    al final,in the end
    a veces,sometimes
    frecuentemente,frequently
    generalmente,generally
    normalmente,normally
    raramente,rarely
    levantarse,to get up
    inodoro,toilet
    el lavamanos, sink
    el desperator, alarm clock
    ponerse la pijama y las pantuflas, put on the pijama and the slippers
    secarse el cuepo, to dry oneself's body
    hacer la cama, to make the bed (starting with "H")
    tender la cama, to make the bed (starting with "T")
    tomar la siesta, to take the siesta
    hacer ejercicio, to exercise/workout (starting with "H")
    cortarse, to cut oneself (e.g. haircut, papercut, etc.)
    rasurarse, to shave oneself (starting with "r")
    teñirse, to dye one's hair
    pintarse, to paint oneself (e.g. put makeup on oneself)
    morise, to die
    llamarse, to be called
    reírse, to laugh
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