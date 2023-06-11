import {useContext, useEffect, useState} from "react";
import {MdOutlineRefresh} from "react-icons/md";
import styles from "./Gameboard.module.scss";
import "../../variable.scss";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import {ThemeContext} from "../../context/ThemeContext";

const Gameboard = (props) => {

    const [turn, setTurn] = useState('X');
    const [status, setStatus] = useState('');
    const [Xplayer, setXplayer] = useState([]);
    const [Oplayer, setOplayer] = useState([]);
    const [clear, setClear] = useState(0);
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
    const [winstate, setWinstate] = useState(["", "", "", "", "", "", "", "", ""]);
    const winCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    const [lastStart, setLastStart] = useState('X');

    const XO = (id, target) => {
        if (!status.includes("It's A Draw.")) {
            if (board[id - 1] !== "") {
                target.setAttribute("wobble", "1");
                setTimeout(() => {target.removeAttribute('wobble');}, 500);
            } else {
                board[id - 1] = turn;
                if (turn === 'X') {
                    Xplayer.push(Number(id));
                    setXplayer(Xplayer);
                } else {
                    Oplayer.push(Number(id));
                    setOplayer(Oplayer);
                }
                setTurn(turn === 'X' ? 'O' : 'X');
            }
        }
    }

    const checker = (arr, target) => target.every(v => arr.includes(v));

    useEffect(() => {
        var winBox;
        var gameOver;
        const XScore = Number(sessionStorage.getItem('XScore')) || 0;
        const OScore = Number(sessionStorage.getItem('OScore')) || 0;

        setBoard(board);
        board.includes("") ? setStatus(`Player ${turn} Turn`) : setStatus("It's A Draw.");
        for (let [index, win] of winCombos.entries()) {
            if (checker(Xplayer, win) === true) {
                gameOver = false;
                gameOver ? setStatus(`Player ${turn} Turn`) : setStatus(`Game over. Player X won.`);
                winBox = win;
                sessionStorage.setItem('XScore', (XScore + 1).toString());
            } else if (checker(Oplayer, win) === true) {
                gameOver = false;
                gameOver ? setStatus(`Player ${turn} Turn`) : setStatus(`Game over. Player O won.`);
                winBox = win;
                sessionStorage.setItem('OScore', (OScore + 1).toString());
            }
        }
        for (var w in winBox) {
            winstate[winBox[w] - 1] = 1;
        }
        setWinstate(winstate);

    }, [turn, Xplayer, Oplayer, winstate]);

    const refreshGame = () => {
        setClear(1);
        const initialPlayer = lastStart === 'X' ? 'O' : 'X';
        setTimeout(() => {
            setBoard(["", "", "", "", "", "", "", "", ""]);
            setWinstate(["", "", "", "", "", "", "", "", ""]);
            setStatus(`Player ${initialPlayer} Turn`);
            setXplayer([]);
            setOplayer([]);
            setTurn(initialPlayer);
            setLastStart(initialPlayer);
            setClear(0);
        }, 200);
    };

    return (
        <div className={styles.gameContainer}>

            <h1 className={styles.title}>Tic Tac Toe</h1>

            <ScoreBoard />

            <Board
                board={board}
                winstate={winstate}
                XO={XO}
                clear={clear}
            />

            <div className={styles.iconContainer}>
                <MdOutlineRefresh className={styles.icon} onClick={refreshGame} />
            </div>

            <h2 className={styles.status}>{status}</h2>

            <div className={styles.footer}>
                <DarkModeToggle />
                <p className={styles.creator}>By mdnazril</p>
            </div>

        </div>
    );
}
const ScoreBoard = (props) => {

    const XScores = sessionStorage.getItem('XScore');
    const OScores = sessionStorage.getItem('OScore');

    const colorFont = (score1, score2) => {
        if (score1 === score2) {
            return "var(--white)";
        } else if (score1 > score2) {
            return "var(--green1)";
        } else {
            return "var(--red)";
        }
    };

    return (
        <div className={styles.scoreContainer}>
            <div style={{color: colorFont(XScores, OScores)}}>PLAYER X</div>
            <div><span>{XScores || 0} </span>:<span> {OScores || 0}</span></div>
            <div style={{color: colorFont(OScores, XScores)}}>PLAYER O</div>
        </div>
    );
};

const Board = (props) => {

    const {board, winstate, XO, clear} = props;

    return (
        <table className={styles.boardContainer}>

            <tbody>

                <tr>
                    <Box
                        id="1"
                        win={winstate[0]}
                        onClick={(e) => {XO(e.target.id, e.target)}}
                        clear={clear}
                        board={board[0]}
                    />
                    <Box
                        id="2"
                        win={winstate[1]}
                        onClick={(e) => {XO(e.target.id, e.target)}}
                        clear={clear}
                        board={board[1]}
                    />
                    <Box
                        id="3"
                        win={winstate[2]}
                        onClick={(e) => {XO(e.target.id, e.target)}}
                        clear={clear}
                        board={board[2]}
                    />
                </tr>

                <tr>

                    <Box
                        id="4"
                        win={winstate[3]}
                        onClick={(e) => {XO(e.target.id, e.target)}}
                        clear={clear}
                        board={board[3]}
                    />
                    <Box
                        id="5"
                        win={winstate[4]}
                        onClick={(e) => {XO(e.target.id, e.target)}}
                        clear={clear}
                        board={board[4]}
                    />
                    <Box
                        id="6"
                        win={winstate[5]}
                        onClick={(e) => {XO(e.target.id, e.target)}}
                        clear={clear}
                        board={board[5]}
                    />
                </tr>

                <tr>
                    <Box
                        id="7"
                        win={winstate[6]}
                        onClick={(e) => {XO(e.target.id, e.target)}}
                        clear={clear}
                        board={board[6]}
                    />
                    <Box
                        id="8"
                        win={winstate[7]}
                        onClick={(e) => {XO(e.target.id, e.target)}}
                        clear={clear}
                        board={board[7]}
                    />
                    <Box
                        id="9"
                        win={winstate[8]}
                        onClick={(e) => {XO(e.target.id, e.target)}}
                        clear={clear}
                        board={board[8]}
                    />
                </tr>

            </tbody>

        </table >
    )
}

const Box = (props) => {

    const {id, win, onClick, clear, board, } = props;

    return (
        <td className={styles.cell}>
            <div className={styles.cellBox} id={id} win={win} onClick={onClick}>
                <span clear={clear} style={{color: board === "X" ? "var(--red)" : "var(--blue)"}}>
                    {board}
                </span>
            </div>
        </td>
    )
}

export default Gameboard;