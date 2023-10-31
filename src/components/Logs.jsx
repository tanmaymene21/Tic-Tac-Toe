export default function Logs({ board }) {
  return (
    <ol id="log">
        {board.map(turn => <li key={`${turn.square.row}${turn.square.col}`}>{turn.player} selected {`(${turn.square.row},${turn.square.col})`}</li>)}
    </ol>
  )
}
