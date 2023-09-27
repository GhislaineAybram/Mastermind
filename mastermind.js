// Un grand classique des jeux de société ! Ce jeu se joue avec un joueur qui choisit une combinaison de couleur 
// et un autre joueur qui doit deviner ces couleurs et dans quel ordre. Un codemaker et un codebreaker. 
// A chaque tour, le codebreaker doit faire une proposition, le codemaker doit lui répondre en indiquant le nombre 
// de couleurs bien placées et le nombre de bonne couleur mais mal placées.

// L’ordinateur va proposer une combinaison à deviner. 
const couleursPossibles = ['jaune', 'bleu', 'rose', 'vert', 'violet', 'orange']

let proposition = ['blanc', 'blanc', 'blanc', 'blanc']
let codeSecret = []
let essaisRestants = 12;
let nbCouleursBienPlacees = 0;
let nbCouleursMalPlacees = 0;
let nbEssais = 0;

const couleurRandom = () => {
    return couleursPossibles[Math.floor(Math.random() * couleursPossibles.length)];
}

const creationCodeSecret = () => {
    for (let i = 0; i < 4; i++) {
        let couleurAlea = couleurRandom();
        codeSecret.push(couleurAlea)
    }
    // document.querySelector("#code-secret-jeton1").innerHTML = codeSecret[0];
    // document.querySelector("#code-secret-jeton2").innerHTML = codeSecret[1];
    // document.querySelector("#code-secret-jeton3").innerHTML = codeSecret[2];
    // document.querySelector("#code-secret-jeton4").innerHTML = codeSecret[3];
    // apparition de "?" sur les jetons du code secret
    document.getElementById("code-secret-jeton1").src = `./images/jeton-secret.png`;
    document.getElementById("code-secret-jeton2").src = `./images/jeton-secret.png`;
    document.getElementById("code-secret-jeton3").src = `./images/jeton-secret.png`;
    document.getElementById("code-secret-jeton4").src = `./images/jeton-secret.png`;
}

const lancementJeu = document.getElementById('lancement-jeu')
lancementJeu.addEventListener('click', () => {
    creationCodeSecret();
    document.getElementById('lancement-jeu').style.display = 'none';
    document.getElementById('proposition').style.display = 'block'
})

// fonction qui vérifie que le joueur a choisi des couleurs pour l'ensemble des jetons
const isProposition = (proposition) => {
    proposition[0] = document.getElementById('jeton1').value;
    proposition[1] = document.getElementById('jeton2').value;
    proposition[2] = document.getElementById('jeton3').value;
    proposition[3] = document.getElementById('jeton4').value;
    return (proposition[0] !== 'blanc' && proposition[1] !== 'blanc' && proposition[2] !== 'blanc' && proposition[3] !== 'blanc')
}

// fonction qui retourne true ou false si la bonne combinaison est trouvée ou non
const isBonneCombinaison = (proposition, codeSecret) => {
    return ((proposition[0] === codeSecret[0]) && (proposition[1] === codeSecret[1]) && (proposition[2] === codeSecret[2]) && (proposition[3] === codeSecret[3]))
}

// fonction qui donne le nb de couleurs bien placées / mal placées
const indice = (proposition, codeSecret) => {
    nbCouleursBienPlacees = 0;
    nbCouleursMalPlacees = 0;
    for (let i = 0; i < proposition.length; i++) {
        if (codeSecret[i] === proposition[i]) {
            nbCouleursBienPlacees += 1;
        }
        if (proposition.includes(codeSecret[i]) && (codeSecret[i] !== proposition[i])) {
            nbCouleursMalPlacees += 1;
        }
    }
}

// fonction qui gère la partie (continuer tant que/fin si gagné)
const gestionPartie = (proposition, codeSecret) => {
    if ((isProposition(proposition) === false)) {
        document.querySelector("#reponse").innerHTML = "Renseignez une combinaison !";
        return false
        }
    else {
        if (isBonneCombinaison(proposition, codeSecret) === false) {
            essaisRestants -= 1;
            indice(proposition, codeSecret);
            if (essaisRestants == 0) {
                masquerContenu();
                document.querySelector("#essais").innerHTML = `${essaisRestants} essai restant`;
                // document.querySelector("#indice1").innerHTML = `${nbCouleursBienPlacees} couleur(s) bien placée(s)`;
                // document.querySelector("#indice2").innerHTML = `${nbCouleursMalPlacees} couleur(s) mal placée(s)`;
                document.getElementById("code-secret-jeton1").src = `./images/jeton-${codeSecret[0]}.png`;
                document.getElementById("code-secret-jeton2").src = `./images/jeton-${codeSecret[1]}.png`;
                document.getElementById("code-secret-jeton3").src = `./images/jeton-${codeSecret[2]}.png`;
                document.getElementById("code-secret-jeton4").src = `./images/jeton-${codeSecret[3]}.png`;
                document.getElementById('relancer-jeu').style.display = 'block';
                return document.querySelector("#reponse").innerHTML = "Vous avez perdu !";
            }
            else if (essaisRestants == 1) {
                document.querySelector("#essais").innerHTML = `${essaisRestants} essai restant`;
                // document.querySelector("#indice1").innerHTML = `${nbCouleursBienPlacees} couleur(s) bien placée(s)`;
                // document.querySelector("#indice2").innerHTML = `${nbCouleursMalPlacees} couleur(s) mal placée(s)`;
                return document.querySelector("#reponse").innerHTML = "Rejouez";
            }
            else {
                document.querySelector("#essais").innerHTML = `${essaisRestants} essais restants`;
                // document.querySelector("#indice1").innerHTML = `${nbCouleursBienPlacees} couleur(s) bien placée(s)`;
                // document.querySelector("#indice2").innerHTML = `${nbCouleursMalPlacees} couleur(s) mal placée(s)`;
                return document.querySelector("#reponse").innerHTML = "Rejouez";
            }
        }
        else {
            indice(proposition, codeSecret);
            // document.querySelector("#indice1").innerHTML = `${nbCouleursBienPlacees} couleur(s) bien placée(s)`;
            // document.querySelector("#indice2").innerHTML = `${nbCouleursMalPlacees} couleur(s) mal placée(s)`;
            document.getElementById("code-secret-jeton1").src = `./images/jeton-${codeSecret[0]}.png`;
            document.getElementById("code-secret-jeton2").src = `./images/jeton-${codeSecret[1]}.png`;
            document.getElementById("code-secret-jeton3").src = `./images/jeton-${codeSecret[2]}.png`;
            document.getElementById("code-secret-jeton4").src = `./images/jeton-${codeSecret[3]}.png`;
            document.getElementById('relancer-jeu').style.display = 'block';
            return document.querySelector("#reponse").innerHTML = "Vous avez gagné !";
        }
    }
}

// fonction qui masque la zone proposition = fin de partie
const masquerContenu = () => {
    if (document.getElementById('proposition').style.display == 'block') {
        document.getElementById('proposition').style.display = 'none';
    }
    else {
        document.getElementById('proposition').style.display = 'none';
    }
}

const validationProposition = document.getElementById('validation-proposition');
validationProposition.addEventListener('click', () => {
    if (gestionPartie(proposition, codeSecret) != false) {
    nbEssais += 1;
    document.getElementById(`combinaison${nbEssais}`).style.display = 'flex';
    // document.querySelector(`#proposition${nbEssais}-jeton1`).innerHTML = proposition[0];
    // document.querySelector(`#proposition${nbEssais}-jeton2`).innerHTML = proposition[1];
    // document.querySelector(`#proposition${nbEssais}-jeton3`).innerHTML = proposition[2];
    // document.querySelector(`#proposition${nbEssais}-jeton4`).innerHTML = proposition[3];
    document.getElementById(`proposition${nbEssais}-jeton1`).src = `./images/jeton-${proposition[0]}.png`;
    document.getElementById(`proposition${nbEssais}-jeton2`).src = `./images/jeton-${proposition[1]}.png`;
    document.getElementById(`proposition${nbEssais}-jeton3`).src = `./images/jeton-${proposition[2]}.png`;
    document.getElementById(`proposition${nbEssais}-jeton4`).src = `./images/jeton-${proposition[3]}.png`;
    // document.querySelector(`#proposition${nbEssais}-indice1`).innerHTML = `${nbCouleursBienPlacees} couleur(s) bien placée(s)`;
    // document.querySelector(`#proposition${nbEssais}-indice2`).innerHTML = `${nbCouleursMalPlacees} couleur(s) bien placée(s)`;
    let indice = 1;
    while (nbCouleursBienPlacees > 0) {
        document.getElementById(`proposition${nbEssais}-indice${indice}`).src = `./images/indice-rouge.png`;
        indice += 1;
        nbCouleursBienPlacees -= 1;
    }
    while (nbCouleursMalPlacees > 0) {
        document.getElementById(`proposition${nbEssais}-indice${indice}`).src = `./images/indice-blanc.png`;
        indice += 1;
        nbCouleursMalPlacees -= 1;
    }
}})

// lancement nouvelle partie
const relancerJeu = document.getElementById('relancer-jeu')
relancerJeu.addEventListener('click', () => {
    location.reload()
})




