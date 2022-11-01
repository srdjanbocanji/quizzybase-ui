import logo from './logo.svg';
import './App.css';
import {useEffect, useState, useRef, useCallback} from "react";
import Table from "./Table";
import useQuery from "./useQuery";

function App() {
    const [query, setQuery] = useState("")
    const [page, setPage] = useState(0)

    const {questions, hasMore, loading, error} = useQuery(query, page)

    const observer = useRef()
    const lastElementRef = useCallback(node => {
        if(loading) return
        if(observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore) {
                setPage(prevState => prevState + 1)
            }
        })
        if(node) {
            observer.current.observe(node)
        }
        console.log(node)
    }, [loading, hasMore])


    function handleSearch(e) {
        setQuery(e.target.value);
        setPage(0);
    }

    return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={query} placeholder="Pretrazi..." onChange={handleSearch}/>
          {questions.map((question, index) => {
              if(questions.length === index + 1) {
                  return (<div ref={lastElementRef} id={question.id}>{question.question}</div>)
              }
              return (<div id={question.id}>{question.question}</div>)
          })}
          <div>{loading && "Loading..."}</div>
      </header>
    </div>

  );
}

export default App;
