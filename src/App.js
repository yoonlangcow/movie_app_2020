import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import "./App.css";

class App extends React.Component{
    state = {
        isLoading : true,
        movies : []
    }

    getMovies = async() => {
        /*
        * axios.get()은 항상 빠르지 않다.
        * 우리는 자바스크립트에게 componentDidMount 함수가 끝날때까지 시간이 걸릴 수 있다고 말해야한다.
        * async ... await ~
        * 비동기 함수가 완성되었다.
        * axios가 끝날때까지 기다렸다가 계속해!
        * */
        const {data : {data : {movies}}} = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating");
        // console.log(movies);

        this.setState( { movies, isLoading : false });
    }

    /* componentDidMount에서 해야할 일 : data를 fetch */
    componentDidMount() {
        this.getMovies();
    }

    render(){
        const { isLoading, movies } = this.state;
        return (
            <section className="container">
                {isLoading ? (
                    <div className="loader">
                        <span className="loader__text">Loading...</span>
                    </div>
                ) : (
                    <div className="movies">
                        {movies.map( movie => (
                            <Movie
                                key={movie.id}
                                id={movie.id}
                                year={movie.year}
                                title={movie.title}
                                summary={movie.summary}
                                poster={movie.medium_cover_image}
                                genres={movie.genres}
                            />
                        ))}
                    </div>
                )}
            </section>
        );
    }
}

export default App;
