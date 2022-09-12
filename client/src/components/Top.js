import React, { useState, useEffect } from "react"
import Carousel from 'react-bootstrap/Carousel';
//Install: npm install react-bootstrap bootstrap


export default function Top() {
const [data, setData] = useState([])
const endPoint = "http://localhost:4001/games"

const load = () => {
    fetch(endPoint)
      .then(response => response.json())
      .then(data => setData(data));
}
//Calculate average rating
function avgRating(arr) {
    return ((arr.reduce((sum, count) => sum + Number(count), 0) / arr.length).toFixed(1))
}
//Get top 3 highest rating games
var game1 = ['', '', '', '', '', 0]
var game2 = ['', '', '', '', '', 0]
var game3 = ['', '', '', '', '', 0]
for (var n = 0; n < 3; n++){
    let max = 0
    let id = 0
    for (var i = 0; i < data.length; i++){
        if ((avgRating(data[i].rating) > max) && (data[i].name !== game1[0]) && (data[i].name !== game2[0]) && (data[i].name !== game3[0])){
            max = avgRating(data[i].rating)
            id = i
            console.log(max)
        }
    }
    for (i = 0; i < data.length; i++){
        if (n === 0) { game1 = [data[id].name, data[id].genre, data[id].developer, data[id].platform, data[id].img, avgRating(data[id].rating)]}
        if (n === 1) { game2 = [data[id].name, data[id].genre, data[id].developer, data[id].platform, data[id].img, avgRating(data[id].rating)]}
        if (n === 2) { game3 = [data[id].name, data[id].genre, data[id].developer, data[id].platform, data[id].img, avgRating(data[id].rating)]}
    }
}


useEffect(() => {
    load()    
}, [])

    return(
        <div>
            <h1 class="text-center">Top 3 Rated Games</h1>
            <Carousel>
                <Carousel.Item>
                    <div class="container p-5 mt-5" style={{width : 1000, height : 500, marginTop: 100, backgroundColor: 'rgba(92, 92, 92, 0.8)'}}>
                        <div class="row">
                            <div class="col-5 m-3">
                                <h1>{game1[0]}</h1>
                                <h3>Rating: {game1[5]}</h3>
                                <h3>Genre: {game1[1]}</h3>
                                <h3>Developed by {game1[2]}</h3>
                                <h3>Available now on {game1[3]}</h3>
                            </div>
                            <div class="col-auto">
                                <img alt="top1" src={game1[4]} style={{width : 400, height : 400}}/>
                            </div>
                        </div>
                    </div>

                </Carousel.Item>
                <Carousel.Item>
                    <div class="container p-5 mt-5" style={{width : 1000, height : 500, marginTop: 100, backgroundColor: 'rgba(92, 92, 92, 0.8)'}}>
                        <div class="row">
                            <div class="col-5 m-3">
                                <h1>{game2[0]}</h1>
                                <h3>Rating: {game2[5]}</h3>
                                <h3>Genre: {game2[1]}</h3>
                                <h3>Developed by {game2[2]}</h3>
                                <h3>Available now on {game2[3]}</h3>
                            </div>
                            <div class="col-auto">
                                <img alt="top2" src={game2[4]} style={{width : 400, height : 400}}/>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div class="container p-5 mt-5" style={{width : 1000, height : 500, marginTop: 100, backgroundColor: 'rgba(92, 92, 92, 0.8)'}}>
                        <div class="row">
                            <div class="col-5 m-3">
                                <h1>{game3[0]}</h1>
                                <h3>Rating: {game3[5]}</h3>
                                <h3>Genre: {game3[1]}</h3>
                                <h3>Developed by {game3[2]}</h3>
                                <h3>Available now on {game3[3]}</h3>
                            </div>
                            <div class="col-auto">
                                <img alt="top3" src={game3[4]} style={{width : 400, height : 400}}/>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}