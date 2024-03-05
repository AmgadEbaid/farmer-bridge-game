import { useEffect, useState } from 'react'
import './App.css'

function App() {


    interface item {
        id: number
        img: string
        , side: boolean
        , name: string
    }
    interface boat {
        id: number
        item: item | undefined
        hasItem: boolean
        boatside: boolean

    }

    enum gameState {
        win = "win",
        lose = "lose",
        play = "play"
    }
    const [game, setgame] = useState<gameState>(gameState.play)



    const [dirState, setdirState] = useState<item[]>([])
    const [initState, setinitState] = useState<item[]>([{
        id: 1,
        img: "fox-svgrepo-com.svg",
        side: false,
        name: "fox"
    }, {
        id: 2,

        img: "goat-svgrepo-com.svg",
        side: false,
        name: "goat"
    }, {
        id: 3,

        img: "vegetables-salad-svgrepo-com.svg",
        side: false,
        name: "veg"
    }])
    const [boat, setBoat] = useState<boat>({
        id: 4,
        item: undefined,
        boatside: false,
        hasItem: false
    })

    const farmerUrl = "farmer.png"

    useEffect(() => {
        if (dirState.length == 3) {
            setgame(gameState.win)
        }
    }, [dirState]);
    function handeInitlPut(id: number) {
        let thisItem: item | undefined = initState.find((item) => item.id == id)
        if (thisItem == undefined || boat.hasItem) {
            return

        }
        let thisInitstate: item[] = initState.filter((item) => item.id !== id)

        if (boat.boatside == thisItem?.side) {
            setBoat(prevBoat => {
                return { ...prevBoat, item: thisItem, hasItem: true };
            });
            setinitState(thisInitstate)
        } else { return }


    }

    function handelDestPut(id: number) {
        let thisItem: item | undefined = dirState.find((item) => item.id == id)
        console.log(thisItem)

        if (thisItem == undefined || boat.hasItem)
            return
        let thisDirstate: item[] = dirState.filter((item) => item.id !== id)
        if (boat.boatside == thisItem?.side) {
            setBoat(prevBoat => {
                return { ...prevBoat, item: thisItem, hasItem: true };
            });
            setdirState(thisDirstate)
        } else { return }


    }
    function handelremove(id: number | undefined) {

        if (id == undefined)
            return

        let thisItem = boat.item as item

        if (thisItem) {
            thisItem.side = boat.boatside;
        } if (boat.boatside == false) {
            setinitState(prevItem => {
                return [...prevItem, thisItem];
            });
        } else if (boat.boatside == true) {
            setdirState(prevItem => {
                return [...prevItem, thisItem];
            });

        }
        setBoat(prevBoat => {
            return { ...prevBoat, item: undefined, hasItem: false };
        });



    }


    function go() {
        setBoat(prevBoat => {
            return { ...prevBoat, boatside: !boat.boatside };
        });
        if (initState.length === 2) {
            const [item, item2] = initState;
            const itemName: string = item.name;
            const item2Name: string = item2.name;

            if (
                (itemName === "fox" && item2Name === "goat") ||
                (itemName === "goat" && item2Name === "fox") ||
                (itemName === "veg" && item2Name === "goat") ||
                (itemName === "goat" && item2Name === "veg")
            ) {
                setgame(gameState.lose);
            }
        }

        if (dirState.length === 2) {
            const [item, item2] = dirState;
            const itemName: string = item.name;
            const item2Name: string = item2.name;

            if (
                (itemName === "fox" && item2Name === "goat") ||
                (itemName === "goat" && item2Name === "fox") ||
                (itemName === "veg" && item2Name === "goat") ||
                (itemName === "goat" && item2Name === "veg")
            ) {
                setgame(gameState.lose);
            }
        }
        console.log(game)

    }


    const source = initState.map(item =>
        <img key={item.id}
            onClick={() => handeInitlPut(item.id)}
            src={item.img}

            style={{
                width: 100,
                height: 100
            }}
        />
    );

    const dest = dirState.map(item =>
        <img key={item.id}
            onClick={() => handelDestPut(item.id)}

            src={item.img}

            style={{
                width: 100,
                height: 100
            }}
        />
    );
    function playagain() {
        setgame(gameState.play)
        setBoat({
            id: 4,
            item: undefined,
            boatside: false,
            hasItem: false
        })
        setinitState([{
            id: 1,
            img: "public/fox-svgrepo-com.svg",
            side: false,
            name: "fox"
        }, {
            id: 2,

            img: "public/goat-svgrepo-com.svg",
            side: false,
            name: "goat"
        }, {
            id: 3,

            img: "vegetables-salad-svgrepo-com.svg",
            side: false,
            name: "veg"
        }])

        setdirState([])
    }

    return (
        <>

            <div className='container'>{
                game !== gameState.play && <div className="mask">

                    <h1>{
                        game
                    }</h1>

                    <button className='playAgain' onClick={playagain}>play again</button>
                </div>
            }

                <div className="game" >
                    <div className='STOP'></div>
                    <div className="ground1">
                        <div className="destination">
                            {dest}

                        </div>

                    </div>
                    <div className="water" style={boat.boatside ? { justifyContent: "start" } : { justifyContent: "end" }}>
                        <div className="boat">
                            <div className="slots">
                                <div className="slot">
                                    <img key={5}

                                        src={farmerUrl}

                                        style={{
                                            width: 80,
                                            height: 100
                                        }}
                                    />
                                </div>
                                <div className="slot itemSlot">
                                    <img key={boat.id}
                                        onClick={() => handelremove(boat.item?.id)}

                                        src={boat.item?.img}

                                        style={{
                                            width: 100,
                                            height: 100
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="ground2">
                        <div className="source">
                            {source}
                        </div>

                    </div>


                </div>
            </div>


            <button className="go" onClick={go}> go</button>
            <button className="solve"> solve</button>

        </>
    )
}

export default App
