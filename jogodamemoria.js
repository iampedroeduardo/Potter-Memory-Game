function SorteiaTab(){
    fotos=["harry","rony","hermione","luna","ginny","dumbledore","draco","hagrid"];
    fotos2=fotos;
    fotos=fotos.concat(fotos2)
    console.log(fotos);
    for(c=0;c<4;c++){
        tab.push([]);
        for(i=0;i<4;i++){
            n=Math.floor(Math.random()*fotos.length);
            tab[c][i]=fotos[n];
            fotos.splice(n,1);
        }
    }
    console.log(tab);
}
function Imagem(linha,coluna){
    img=document.getElementById("1"+linha+coluna);
    if(img==null){
        img= new Image();
        img.src="Imagens/"+tab[linha][coluna]+".jpg";
        img.style.width="82px";
        img.style.height="82px";
        img.style.margin="0px"
        img.id="1"+linha+coluna;
        td=document.getElementById(""+linha+coluna);
        td.appendChild(img);
    }
}
function Testa(){
    lin1=escolhidos[escolhidos.length-1][0];
    col1=escolhidos[escolhidos.length-1][1];
    lin2=escolhidos[escolhidos.length-2][0];
    col2=escolhidos[escolhidos.length-2][1];
    if(tab[lin1][col1]==tab[lin2][col2]){
        pos=posicoes.indexOf([lin1,col1]);
        posicoes.splice(pos,1);
        pos=posicoes.indexOf([lin2,col2]);
        posicoes.splice(pos,1);
        ColocaOnclick();
    }
    else{
        setTimeout(()=>{
            img1=document.getElementById("1"+lin1+col1);
            img2=document.getElementById("1"+lin2+col2);
            img1.parentNode.removeChild(img1);
            img2.parentNode.removeChild(img2);
            ColocaOnclick();
        },1000);
    }
    if(TestaTudo()==false){
        tela=[
            '<div class="container">',
            '    <div class="box">',
            '        <h1>Meus Parabéns! Você ganhou!</h1>',
            '        <button class="botao">Vamos lá!</button>',
            '    <div>',
            '</div>'
        ]
        setTimeout(()=>{document.querySelector("body").innerHTML=tela.join("\n")},500);
    }
}
function TestaTudo(){
    tof=false
    for(c=0;c<4;c++){
        for(i=0;i<4;i++){
            img=document.getElementById("1"+c+i);
            if(img==null){
                tof=true
            }
        }
    }
    return tof
}
function TiraOnclick(){
    for(c=0;c<4;c++){
        for(i=0;i<4;i++){
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
        on="escolhidos.push(["+lin+","+col+"]);Imagem("+lin+","+col+");if(escolhidos.length%2==0){Testa();TiraOnclick();}"
        td.setAttribute("onclick",on);
    }
}
var tab=[], escolhidos=[], posicoes=[];
for(c=0;c<4;c++){
    for(i=0;i<4;i++){
        posicoes.push([c,i]);
    }
}
SorteiaTab();
