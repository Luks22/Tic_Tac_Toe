import React from 'react';

class Quadrado extends React.Component{
  
  render(){
    return(
      <button
        className="quadrado"
        onClick={()=>{this.props.onClick()}}>
        {this.props.value}
      </button>
    );
  }
  
}

class Tabuleiro extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      quadrados: Array(9).fill(null),
      xIsNext: true,
    };
  }
  
  handleClick(i){
    const quadrados = this.state.quadrados.slice();
    
    if(calculateWinner(quadrados)){
      alert("Jogo Encerrado");
      return;
    }
    
    if(quadrados[i]){
      alert("Quadrado Ocupado");
      return;
    }
    
    quadrados[i] = this.state.xIsNext ? "X":"O";
    this.setState({
      quadrados: quadrados,
      xIsNext: !this.state.xIsNext,
    });
  }
  
  
  renderizarQuadrado(i){
    return(
    <Quadrado
      value = {this.state.quadrados[i]}
      onClick={()=>{this.handleClick(i)}}
     />
     )
  }
  
  createBoard = () =>{
    let board = [];
    let count = 0;
    for(let i = 0; i<3; i++){
      let collums = [];
      for(let j = 0; j<3; j++){
        collums.push(this.renderizarQuadrado(count));
        count++;
      }
      
      board.push(<div className="board-row">{collums}</div>);
    }
    
    return board;
  }
      
   aleatorio = () => {
     
     const quadrados = this.state.quadrados.slice();
     const jogadorAtual = this.state.xIsNext ? "X":"O";
     const spot = randomBot(quadrados, jogadorAtual); 
     
     if(calculateWinner(quadrados)){
      alert("Jogo Encerrado");
      return;
    }
     
     if(quadrados[spot]){
       alert("Quadrado Ocupado");
       return;
     }
    
    quadrados[spot] = jogadorAtual;
    this.setState({
      quadrados: quadrados,
      xIsNext: !this.state.xIsNext,
    });
     
  }
  
      render() {
        const vencedor = calculateWinner(this.state.quadrados);
        let status;
        
        if(vencedor){
          status = "Vencedor: " + vencedor;
        }
        else{
          status = "Jogador: " + (this.state.xIsNext ? "X": "O");
        }
        
        return (
          <div>
            <div className="status">{status}</div>
              <div calssName="game-info">
                <button onClick = {()=>{this.setState({
                    quadrados: Array(9).fill(null),
                    xIsNext: true,
                  })}}>
                  {"reiniciar"}
                </button>
                
                <button onClick = {()=>{this.aleatorio()}}>
                  {"Aleatório"}
                </button>
                
              </div>
             {this.createBoard()}
          </div>
        );
    }

}

class Jogo extends React.Component{
  render(){
    return(
      <div className = "game">
        <div className="game-board">
          <Tabuleiro />
        </div>
        
        <div calssName="game-info">
        </div>
      </div>
    );
  }
}


function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  
  for(let i=0;i<lines.length;i++){
    const[a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

function randomNumber(){
  let spot = Math.ceil(Math.random()*10) -1;
  
  if(spot >= 0 && spot < 9){
    return spot;
  }
  
  return randomNumber();
}

function randomBot(squares, playerAtual){
  const spots = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  
  let jogadorAnterior = []; 
  let jogadorAtual = [];
  let jogadas = [];
  let count = 0;
  let espaco = -1;
  
    squares.map((value, pos)=>{
      if(value !== playerAtual && value != null){
        jogadorAnterior.push(pos);
      }else if(value === playerAtual && value != null){
        jogadorAtual.push(pos);
      }
    });

  for(let i = 0; i<spots.length;i++){
    for(let j = 0; j<spots[i].length;j++){
      if(jogadorAnterior.includes(spots[i][j])){
        count++;
      }else if(!jogadorAtual.includes(spots[i][j])){
        espaco = j;
      } 
    }
    if(count == 2 && espaco >= 0){
      jogadas.push(spots[i][espaco]);
    }
    count = 0;
    espaco = -1;
  }
  
  if(jogadas.length > 1 || jogadas[0] == null){
    return randomNumber();
  }else{
    return jogadas[0];
  }
  
}

export default Jogo;

