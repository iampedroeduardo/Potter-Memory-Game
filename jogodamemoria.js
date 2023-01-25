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
        on="escolhidos.push(["+lin+","+col+"]);Imagem("+lin+","+col+");if(escolhidos.length%2==0){TiraOnclick();Testa();}"
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
    img.setAttribute("class","relogio");
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
function GeraTab(){
    GeraPosicoes();
    SorteiaTab();
    TirarRadio();
    meuInterval=setInterval(Tempo,1000)
}
function TirarRadio(){
    div=document.getElementById("dificuldade");
    div.parentNode.removeChild(div);
}
var tab=[], escolhidos=[], posicoes=[], nivel, linhas, resol, colunas=4, fotos=["harry","rony","hermione","luna","ginny","dumbledore","draco","hagrid","snape","sirius","jameslily","fredgeorge","remus","voldemort","neville","minerva","dobby","tonks"], tempo, meuInterval;
