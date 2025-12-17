let nome="",email="",xp=0;
let modulos={1:false,2:false,3:false};
let perguntas=[]; let indice=0; let pontos=0;

const banco=[
 {q:"O que é Phishing?",o:["Vírus","Roubo de dados","Backup","Firewall"],c:1},
 {q:"Melhor prática para senhas?",o:["Data nascimento","123456","Senha forte","Anotar no papel"],c:2},
 {q:"O que a LGPD protege?",o:["Empresas","Pessoas","Músicas","Patentes"],c:1},
 {q:"O que é Ransomware?",o:["Sequestra dados","Antivírus","Hardware","Compra"],c:0},
 {q:"2FA serve para?",o:["Lento","Segurança extra","Memória","Remover senha"],c:1},
 {q:"Engenharia social é?",o:["Construção","Manipulação","Rede","Curso"],c:1},
 {q:"Dado sensível",o:["Nome","Email","Saúde","Cargo"],c:2},
 {q:"Bloquear PC mesa é",o:["Mesa limpa","Backup","Compras","RH"],c:0},
 {q:"Onde não guardar backup?",o:["Nuvem","Externo","Mesmo HD","Fita"],c:2},
 {q:"VPN significa",o:["Virtual Private","Very Personal","Public","Virus"],c:0}
];

function mudar(t){document.querySelectorAll(".tela").forEach(e=>e.classList.remove("ativa"));
document.getElementById(t).classList.add("ativa");}

function iniciar(){
    nome=document.getElementById("nome").value.trim();
    email=document.getElementById("email").value.trim();
    if(nome==""||email=="")return;
    document.getElementById("user_title").innerText="Agente "+nome.split(" ")[0];
    mudar("dashboard");
}

function abrirModulo(n){mudar("modulo"+n);}

function concluirModulo(n){
    if(!modulos[n]){modulos[n]=true;xp+=100;}
    atualizarXP();
    voltar();
}

function atualizarXP(){
    document.getElementById("xp").innerText=xp;
    document.getElementById("level").innerText = xp>=300?3:xp>=150?2:1;

    if(modulos[1]&&modulos[2]&&modulos[3])
        document.getElementById("btn_quiz").disabled=false;
}

function voltar(){mudar("dashboard");}

function iniciarQuiz(){
    perguntas=[...banco].sort(()=>Math.random()-0.5).slice(0,10);
    indice=0;pontos=0;
    mostrarPergunta();
    mudar("quiz");
}

function mostrarPergunta(){
    let p=perguntas[indice];
    document.getElementById("quiz_pergunta").innerText=p.q;
    let box=document.getElementById("opcoes");
    box.innerHTML="";
    p.o.forEach((t,i)=>{
        let b=document.createElement("button");
        b.innerText=t;
        b.onclick=()=>responder(i);
        box.appendChild(b);
    });
}

function responder(i){
    if(i==perguntas[indice].c)pontos++;
    indice++;
    if(indice<10)mostrarPergunta();
    else finalizarQuiz();
}

function finalizarQuiz(){
    document.getElementById("acertos").innerText=pontos;
    mudar("resultado");
}

function voltarDashboard(){mudar("dashboard");}
