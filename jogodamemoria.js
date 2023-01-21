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
    if(tab[escolhidos[escolhidos.length-1][0]][escolhidos[escolhidos.length-1][1]]==tab[escolhidos[escolhidos.length-2][0]][escolhidos[escolhidos.length-2][1]]){
        jogador+=1;
        td=document.getElementById(""+escolhidos[escolhidos.length-1][0]+escolhidos[escolhidos.length-1][1]);
        td.removeAttribute("onclick");
        td2=document.getElementById(""+escolhidos[escolhidos.length-2][0]+escolhidos[escolhidos.length-2][1]);
        td2.removeAttribute("onclick");
    }
    else{
        img1=document.getElementById("1"+escolhidos[escolhidos.length-1][0]+escolhidos[escolhidos.length-1][1]);
        img2=document.getElementById("1"+escolhidos[escolhidos.length-2][0]+escolhidos[escolhidos.length-2][1]);
        img1.parentNode.removeChild(img1);
        img2.parentNode.removeChild(img2);
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
var tab=[], escolhidos=[], jogador=0;
SorteiaTab();