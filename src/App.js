import './App.css';
import {useEffect, useState, useRef, useCallback} from "react";
import useQuery from "./useQuery";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
    }, [loading, hasMore])


    function handleSearch(e) {
        setQuery(e.target.value);
        setPage(0);
    }

    return (
    <div className="App">
      <header className="App-header">

        {/*<input type="text" value={query} placeholder="Pretrazi..." onChange={handleSearch}/>*/}

          {/*{questions.map((question, index) => {*/}
          {/*    if(questions.length === index + 1) {*/}
          {/*        return (<div ref={lastElementRef} id={question.id}>{question.question}</div>)*/}
          {/*    }*/}
          {/*    return (<div id={question.id}>{question.question}</div>)*/}
          {/*})}*/}
          {/*<div>{loading && "Loading..."}</div>*/}
          <div>
              <Box
                  sx={{
                      width: 500,
                      maxWidth: '100%',
                  }}
              >
                  <TextField onChange={handleSearch}  fullWidth label="fullWidth" id="fullWidth" />
              </Box>
              {questions.map((question, index) => {
                  if(index + 1 === questions.length) {
                      return (<Accordion ref={lastElementRef}>
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                          >
                              <Typography>{question.question}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Typography>
                                  {question.answer}
                              </Typography>
                          </AccordionDetails>
                      </Accordion>)
                  }
                  return (<Accordion>
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                      >
                          <Typography>{question.question}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                          <Typography>
                              {question.answer}
                          </Typography>
                      </AccordionDetails>
                  </Accordion>)

              })}
          </div>
      </header>

    </div>

  );
}

export default App;
