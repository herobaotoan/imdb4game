export default function Menu() {

    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-dark text-white sticky-top">
                <div class="col-auto">
                    <img src="https://imgur.com/gfGufSO.png" alt="Home" style={{width:"140px",height:"40px"}}/>
                </div>
                |
                <div class="col-1 text-center">
                    <a href="/game" class="text-white">Main</a>
                </div>
                |
                <div class="col-1 text-center">
                    <a href="/login" class="text-white">Logout</a>
                </div>
                |
                <div class="col-1 text-center">
                    <a href="/top" class="text-white">Top Games</a>
                </div>
                |
                <div class="col-1 text-center">
                    <a href="/aboutus" class="text-white">About</a>
                </div>
            </nav>
        </div>
    )
}