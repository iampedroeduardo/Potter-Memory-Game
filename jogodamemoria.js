function SorteiaTab(){
    if(nivel==1){
        for(c=0;c<12;c++){
            n=Math.floor(Math.random()*fotos.length);
            fotos.splice(n,1);
        }
    }
    else if(nivel==2){
        for(c=0;c<10;c++){
            n=Math.floor(Math.random()*fotos.length);
            fotos.splice(n,1);
        }
    }
    fotos2=fotos;
    fotos=fotos.concat(fotos2)
    console.log(fotos);
    for(c=0;c<linhas;c++){
        tab.push([]);
        for(i=0;i<colunas;i++){
            n=Math.floor(Math.random()*fotos.length);
            tab[c][i]=fotos[n];
            fotos.splice(n,1);
        }
    }
    tabuleiro=document.getElementById("tabuleiro");
    for(c=0;c<linhas;c++){
        tr=document.createElement("tr");
        tr.id=""+c;
        tabuleiro.appendChild(tr);
        for(i=0;i<colunas;i++){
            td=document.createElement("td");
            td.id=""+c+i;
            td.style.height=resol;
            td.style.width=resol;
            tr.appendChild(td);
            img= new Image();
            img.src="Imagens/"+tab[c][i]+".jpg";
            img.style.width=resol;
            img.style.height=resol;
            img.style.margin="0px";
            img.style.opacity="0.0";
            img.id="1"+c+i;
            td.appendChild(img);
        }
        console.log(tabuleiro);
    }
    ColocaOnclick();
}
function Imagem(linha,coluna){
    img=document.getElementById("1"+linha+coluna);
    img.style.opacity="1.0";
}
function Testa(){
    lin1=escolhidos[escolhidos.length-1][0];
    col1=escolhidos[escolhidos.length-1][1];
    lin2=escolhidos[escolhidos.length-2][0];
    col2=escolhidos[escolhidos.length-2][1];
    if(tab[lin1][col1]==tab[lin2][col2]){
        pos=posicoes.indexOf(""+lin1+col1);
        posicoes.splice(pos,1);
        pos=posicoes.indexOf(""+lin2+col2);
        posicoes.splice(pos,1);
        ColocaOnclick();
    }
    else{
        setTimeout(()=>{
            img1=document.getElementById("1"+lin1+col1);
            img2=document.getElementById("1"+lin2+col2);
            console.log(img1);
            img1.style.opacity="0.0";
            img2.style.opacity="0.0";
            ColocaOnclick();
        },1000);
    }
    console.log(TestaTudo());
    if(TestaTudo()==false){
        tela=[
            '<div class="container">',
            '    <div class="box">',
            '        <h1>Meus Parabéns! Você ganhou!</h1>',
            '        <a href="index.html"><button class="botao">Jogar Novamente</button></a>',
            '    <div>',
            '</div>'
        ]
        setTimeout(()=>{document.querySelector("body").innerHTML=tela.join("\n")},500);
    }
}
function TestaTudo(){
    tof=false
    for(c=0;c<linhas;c++){
        for(i=0;i<colunas;i++){
            img=document.getElementById("1"+c+i);
            if(img.style.opacity=="0"){
                tof=true
            }
        }
    }
    return tof
}
function TiraOnclick(){
    for(c=0;c<linhas;c++){
        for(i=0;i<colunas;i++){
            td=document.getElementById(""+c+i);
            td.removeAttribute("onclick");
        }
    }
}
function ColocaOnclick(){
    for(c=0;c<posicoes.length;c++){
        lin=posicoes[c][0];
        col=posicoes[c][1];
        td=document.getElementById(""+lin+col);
        on="escolhidos.push(["+lin+","+col+"]);Imagem("+lin+","+col+");if(escolhidos.length%2==0){TiraOnclick();Testa();"+tent+";}"
        td.setAttribute("onclick",on)
    }
}
function GeraPosicoes(){
    for(c=0;c<linhas;c++){
        for(i=0;i<colunas;i++){
            posicoes.push(""+c+i);
        }
    }
}
function Tempo(){
    tempo--;
    crono=document.getElementById("texto")
    crono.innerHTML=tempo;
    img= new Image();
    img.src="Imagens/relogio.png";
    img.setAttribute("class","icone");
    crono.appendChild(img);
    if(tempo<=tempoinicial/6){
        crono.style.color="red";
    }
    if(tempo==0){
        clearInterval(meuInterval);
        TiraOnclick();
        tela=[
            '<div class="container">',
            '    <div class="box">',
            '        <h1>Sinto muito! Acabou o tempo!</h1>',
            '        <a href="index.html"><button class="botao">Tentar Novamente</button></a>',
            '    <div>',
            '</div>'
        ]
        setTimeout(()=>{document.querySelector("body").innerHTML=tela.join("\n")},500);
    }
}
function Tentativas(){
    texto=document.getElementById("texto")
    texto.innerHTML=tentativas;
    img= new Image();
    img.src="Imagens/cartas.png";
    img.setAttribute("class","icone");
    texto.appendChild(img);
    if(tentativas<=5){
        texto.style.color="red";
    }
    if(tentativas==0 && TestaTudo()==true){
        TiraOnclick();
        tela=[
            '<div class="container">',
            '    <div class="box">',
            '        <h1>Sinto muito! Acabaram suas tentativas!</h1>',
            '        <a href="index.html"><button class="botao">Tentar Novamente</button></a>',
            '    <div>',
            '</div>'
        ]
        setTimeout(()=>{document.querySelector("body").innerHTML=tela.join("\n")},500);
    }
    
}
function GeraTab(){
    GeraPosicoes();
    SorteiaTab();
    TirarRadio();
    if(modo=="tempo"){
        meuInterval=setInterval(Tempo,1000)
    }
    else if(modo=="tentativas"){
        Tentativas();
    }
}
function GeraDificuldade(){
    botao=document.querySelector('input[name="modo"]:checked');
    tempo=document.getElementById("tempo");
    tentativas=document.getElementById("tentativas");
    if(botao.value=="tempo"){
        on1="resol='82px';nivel=1;linhas=3;tempo=30;tempoinicial=tempo;GeraTab()";
        on2="resol='82px';nivel=2;linhas=4;tempo=50;tempoinicial=tempo;GeraTab()";
        on3="resol='60px';nivel=3;linhas=6;colunas=6;tempo=140;tempoinicial=tempo;GeraTab()";
        modo="tempo";
    }
    else if(botao.value=="tentativas"){
        on1="resol='82px';nivel=1;linhas=3;tentativas=15;GeraTab()";
        on2="resol='82px';nivel=2;linhas=4;tentativas=25;GeraTab()";
        on3="resol='60px';nivel=3;linhas=6;colunas=6;tentativas=50;GeraTab()";
        modo="tentativas";
        tent="tentativas--;Tentativas();"
    }
    div=document.getElementById("escolhas");
    titulo=document.createElement("p");
    texto=document.createTextNode("Dificuldade:");
    titulo.appendChild(texto);
    div.appendChild(titulo);
    facil=document.createElement("input");
    facil.setAttribute("type","radio");
    facil.setAttribute("oninput",on1);
    facil.setAttribute("name","dificuldade");
    label=document.createElement("label");
    texto=document.createTextNode("Fácil");
    label.appendChild(texto);
    div.appendChild(facil);
    div.appendChild(label);
    medio=document.createElement("input");
    medio.setAttribute("type","radio");
    medio.setAttribute("oninput",on2);
    medio.setAttribute("name","dificuldade");
    label=document.createElement("label");
    texto=document.createTextNode("Médio");
    label.appendChild(texto);
    div.appendChild(medio);
    div.appendChild(label);
    dificil=document.createElement("input");
    dificil.setAttribute("type","radio");
    dificil.setAttribute("oninput",on3);
    dificil.setAttribute("name","dificuldade");
    label=document.createElement("label");
    texto=document.createTextNode("Difícil");
    label.appendChild(texto);
    div.appendChild(dificil);
    div.appendChild(label);
    tempo.removeAttribute("oninput");
    tentativas.removeAttribute("oninput");
}
function TirarRadio(){
    div=document.getElementById("escolhas");
    div.parentNode.removeChild(div);
}
var tab=[], escolhidos=[], posicoes=[], nivel, linhas, resol, colunas=4, fotos=["harry","rony","hermione","luna","ginny","dumbledore","draco","hagrid","snape","sirius","jameslily","fredgeorge","remus","voldemort","neville","minerva","dobby","tonks"], tempo, meuInterval, tentativas, modo, tent="";
