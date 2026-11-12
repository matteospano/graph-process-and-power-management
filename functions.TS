const { useState, useEffect } = React;

function distribuisciCarte(numGiocatori, carteTotali) {
    const mazzo = Array.from({ length: carteTotali }, (_, i) => i + 1)
        .sort(() => Math.random() - 0.5)
        .slice(0, numGiocatori * 2);

    const players = [];
    for (let i = 0; i < numGiocatori; i++) {
        players.push({
            name: 'P' + (i + 1),
            cards: mazzo.slice(i * 2, i * 2 + 2).sort((a, b) => a - b),
            isHuman: i === 3,
        });
    }
    return players;
}

function calcProb(carta, ground, carteGiocate, carteMano, carteRimanenti) {
    if (!carta) return 0;
    const maxCarta = 100;
    const maggioriPossibili = [];

    for (let x = carta + 1; x <= maxCarta; x++) {
        if (!carteGiocate.includes(x) && !carteMano.includes(x)) {
            maggioriPossibili.push(x);
        }
    }
    const M = maggioriPossibili.length;
    const S = carteRimanenti;

    if (S <= 0) return 0;
    return M / S;
}

function MindSim() {
    const maxCarte = 100;
    const [players, setPlayers] = useState(() => distribuisciCarte(4, maxCarte));
    const [ground, setGround] = useState(0);
    const [carteGiocate, setCarteGiocate] = useState([]);
    const [carteScartate, setCarteScartate] = useState([]);
    const [turn, setTurn] = useState(0);
    const [waitCounts, setWaitCounts] = useState([0, 0, 0, 0]);
    const [turniTotali, setTurniTotali] = useState(0);

    const carteRimanenti = maxCarte - carteGiocate.length - carteScartate.length;
    const partitaFinita = players.every(p => p.cards.length === 0);

    function giocoCarta(playerIdx, carta) {
        const newPlayers = [...players];
        newPlayers[playerIdx] = {
            ...newPlayers[playerIdx],
            cards: newPlayers[playerIdx].cards.filter(x => x !== carta)
        };
        setPlayers(newPlayers);

        if (carta > ground) {
            setCarteGiocate(prev => [...prev, carta]);
            setGround(carta);
        } else {
            setCarteScartate(prev => [...prev, carta]);
        }

        const newWait = [...waitCounts];
        newWait[playerIdx] = 0;
        setWaitCounts(newWait);

        setTurniTotali(prev => prev + 1);
        setTurn((t) => (t + 1) % players.length);
    }

    useEffect(() => {
        if (turn >= players.length || partitaFinita) return;
      if (turn === 3){
            //scarta carte troppo basse in mano al giocatore
        const carteValide = p4.cards.filter(c => c > ground);
        if (carteValide.length !== p4.cards.length) {
          const scartate = p4.cards.filter(c => c <= ground);
          setCarteScartate(prev => [...prev, ...scartate]);

          const newPlayers = [...players];
          newPlayers[3] = { ...p4, cards: carteValide };
          setPlayers(newPlayers);
      }}

        const p = players[turn];
        if (p.cards.length === 0) {
            setTurn(t => (t + 1) % players.length);
            return;
        }

        if (p.isHuman) return;

        const c = Math.min(...p.cards);

        if (c === ground + 1) {
            giocoCarta(turn, c);
            return;
        }

        const probBase = calcProb(c, ground, carteGiocate, p.cards, carteRimanenti);
        const prob = Math.min(1, probBase + 0.07 * waitCounts[turn]);
        const rnd = Math.random();

        if (rnd <= prob) {
            giocoCarta(turn, c);
        } else {
            const newWait = [...waitCounts];
            newWait[turn] += 1;
            setWaitCounts(newWait);
            setTurniTotali(prev => prev + 1);
            setTurn((t) => (t + 1) % players.length);
        }
    }, [turn, players, ground, carteGiocate, waitCounts, partitaFinita]);

    const p4 = players[3];
    const p4Lowest = p4.cards.length ? Math.min(...p4.cards) : null;
    const p4ProbBase = p4Lowest !== null ? calcProb(p4Lowest, ground, carteGiocate, p4.cards, carteRimanenti) : 0;
    const p4Prob = Math.min(1, p4ProbBase + 0.07 * waitCounts[3]);

    function p4Play() {
        if (p4Lowest !== null) {
            giocoCarta(3, p4Lowest);
        }
      setTurniTotali(prev => prev + 1);
    }

    function p4Wait() {
        const newWait = [...waitCounts];
        newWait[3] += 1;
        setWaitCounts(newWait);
        setTurniTotali(prev => prev + 1);
        setTurn((t) => (t + 1) % players.length);
    }

    function renderCard(c, ground, human) {
        return c > ground ? (human? c : ground + 2) : <span style={{ opacity: 0.3 }}>{c}</span>;
    }

    if (partitaFinita) {
        return (
            <div style={{ fontFamily: 'monospace' }}>
                <h1>Partita completata in {turniTotali} turni!</h1>
                <h3>Carte giocate: {carteGiocate.sort((a, b) => a - b).join(', ')}</h3>
                <h3>Carte scartate: {carteScartate.sort((a, b) => a - b).join(', ')}</h3>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: 'monospace' }}>
            <h2>Sul tavolo: {ground}</h2>
            <h3>Carte giocate: {carteGiocate.sort((a, b) => a - b).join(', ')}</h3>
            <h3>Carte scartate: {carteScartate.sort((a, b) => a - b).join(', ')}</h3>
            <h3>Turni trascorsi: {turniTotali}</h3>

            <div className='playersContainer'>

                {players.map((player, idx) => (
                    <div key={player.name} style={{ border: turn === idx ? '2px solid lime' : 'none', padding: 5 }} className={player.isHuman?'player':'bot'}>
                        <h1>{player.name}{player.isHuman ? ' (Tu)' : ''}</h1>
                        <div>
                            [{player.cards.map((c, i) => (
                                <span key={i}>{i > 0 ? ', ' : ''}{renderCard(c, ground, player.isHuman)}</span>
                            ))}]
                        </div>
    <div>Attesa: {waitCounts[idx]}</div>
                        {player.isHuman && player.cards.length > 0 && (
                            <>
                                <div style={{ marginTop: 10 }}>
                                    <button onClick={p4Wait} disabled={turn !== 3}>Aspetta</button>{' '}
                                    <button onClick={p4Play} disabled={turn !== 3 || p4Lowest === null}>Gioca il {p4Lowest}</button>
                                <div>Probabilità che sia la carta più bassa: {(p4Prob * 100).toFixed(1)}%</div>
                                </div>
                            </>
                        )}
                    </div>
                ))}

            </div>

            <div style={{ marginTop: 20 }}>
                <b>Turno di:</b> {players[turn].name} {players[turn].isHuman ? '(Tu)' : '(Bot)'}
            </div>
        </div>
    )
}

ReactDOM.render(<MindSim />, document.getElementById('app'));