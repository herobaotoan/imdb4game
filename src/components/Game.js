import React, { useState, useEffect } from "react"


export default function GameList() {
const [data, setData] = useState([])
const endPoint = "http://localhost:4001/games"

const [name, setName] = useState('')
const [genre, setGenre] = useState('')
const [platform, setPlatform] = useState('')
const [developer, setDeveloper] = useState('')
const [img, setImg] = useState('')
const [rating, setRating] = useState([])
const [newRating, setNewRating] = useState(0)
const [id, setId] = useState('')


const [keyword, setKeyword] = useState('')

const save = ()=>{
  fetch(endPoint, {
      method: "put",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: id, name: name, genre: genre, developer:developer, platform: platform, rating: rating, img: img})
  }).then(data => load())
}

const addRating = (id, name, genre, developer, platform, img, rating) => {
  rating.push((Number)(newRating))
  setId(id)
  setName(name)
  setGenre(genre)
  setDeveloper(developer)
  setPlatform(platform)
  setRating(rating)
  setImg(img)
  console.log(id, name, genre, developer, platform, rating, img)
  save()
}

const load = () => {
  fetch(endPoint)
    .then(response => response.json())
    .then(data => setData(data));
}


function search(){

  const pageSize = document.querySelector("#pageSize").value
  const pageNo = document.querySelector("#pageNo").value
  const filterDev = document.querySelector("#filterDev").value
  const filterGenre = document.querySelector("#filterGenre").value
  const filterPlatform = document.querySelector("#filterPlatform").value
  const filterRating = document.querySelector("#filterRating").value

  fetch(endPoint + "/search?keyword="+keyword+"&pageSize="+pageSize+"&pageNo="+pageNo+"&filterGenre="+filterGenre+"&filterDev="+filterDev+"&filterPlatform="+filterPlatform+"&filterRating="+filterRating)
  .then(response => response.json())
  .then(data => {
    populatePageNo(data.Size)
    setData(data.Items)
  }  
)}

function populatePageNo(size){

  const pageSize = document.querySelector("#pageSize").value
  const noPage = size/pageSize
  const pageNoSelect = document.querySelector("#pageNo")
  
  while (pageNoSelect.options.length > 0) {                
    pageNoSelect.remove(0);
  }     

  for (var i = 1; i<=noPage; i++){
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    pageNoSelect.appendChild(opt);
}
}

useEffect(() => {
  search()
 })
 
return (
  <div>
      <h2 class="m-5 pt-5">Trending Games</h2>
        {/* Search bar */}
        <div class="row">
          <div class="col-md-auto">
            <input class="form-control text-white mb-5" style={{backgroundColor: 'rgba(44, 44, 44, 0.8)'}} type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
          </div>
          <div class="col-md-auto">  
            <button class="btn btn-secondary" onClick={()=>search()}>Search</button>
          </div>
          {/* Filter Genre */}
          <div class="col-auto text-white">
            Genre:
          </div>
          <div class="col-auto text-dark">
              <select id="filterGenre" onChange={()=>search()}>
                <option value="">ALL</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Platform">Platform</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Racing">Racing</option>
                <option value="RPG">RPG</option>
                <option value="Shooting">Shooting</option>
                <option value="Simulation">Simulation</option>
                <option value="Sport">Sport</option>
                <option value="Strategy">Strategy</option>
              </select>
          </div>
          {/* Filter Developer */}
          <div class="col-auto text-white">
            Developer:
          </div>
          <div class="col-auto text-dark">
              <select id="filterDev" onChange={()=>search()}>
                <option value="">ALL</option>
                <option value="CD Project">CD Project</option>
                <option value="ConcernedApe">ConcernedApe</option>
                <option value="Electronic Arts">Electronic Arts</option>
                <option value="Insomniac Games">Insomniac Games</option>
                <option value="Mojang Studios">Mojang Studios</option>
                <option value="Nintendo">Nintendo</option>
                <option value="SEGA">SEGA</option>
              </select>
          </div>
          {/* Filter Platform */}
          <div class="col-auto text-white">
            Platform:
          </div>
          <div class="col-auto text-dark">
              <select id="filterPlatform" onChange={()=>search()}>
                <option value="">ALL</option>
                <option value="Android">Android</option>
                <option value="PC">PC</option>
                <option value="PS4">PS4</option>
                <option value="PS5">PS5</option>
                <option value="Switch">Switch</option>
                <option value="Xbox">Xbox</option>
              </select>
          </div>
          {/* Filter Rating */}
          <div class="col-auto text-white">
            Rating higher than: 
          </div>
          <div class="col-auto text-dark">
              <select id="filterRating" onChange={()=>search()}>
                <option value="0">ALL</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
          </div>
        </div>
        <div class="row">  
          {/* Select page number  */}
          <div class="col-auto text-white">
              Page Number: 
          </div>
          <div class="col-auto text-dark">
            <select id="pageNo" onChange={()=>search()}>
              <option value="1">1</option>
            </select>
          </div>
          {/* Select size */}
          <div class="col-auto text-white">
            Page Size:
          </div>
          <div class="col-auto text-dark">
              <select id="pageSize" onChange={()=>search()}>
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
          </div>         
        </div>

      <table class="table table-dark table-borderless">
        <thead>
          <tr>
            <th>Name</th>
            <th>Genre</th>
            <th>Developer</th>
            <th>Platform</th>
            <th>Rating</th>
            <th>Image</th>
            <th>Rate this game</th>
          </tr>
        </thead>
        <tbody>      
          {data.map(a => (
            <tr>
                <td>{a.name}</td>
                <td>{a.genre}</td>
                <td>{a.developer}</td>
                <td>{a.platform}</td>
                <td>{(a.rating.reduce((sum, count) => sum + Number(count), 0) / a.rating.length).toFixed(1)}</td>
                <td><img src={a.img} alt="img" style={{width:"200px",height:"200px"}}></img></td>
                <td class="text-dark row">
                  <div class="col-2">
                  <select id="selRating" value={newRating} onChange={(e) => setNewRating(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  </div>
                  <div class="text-white col-3">Stars</div>
                  <button className="btn btn-secondary" onClick={()=> addRating(a._id, a.name, a.genre, a.developer, a.platform,  a.img, a.rating)}>RATE</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>  
  </div>
);
}
