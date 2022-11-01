import {useEffect, useState} from 'react'
import axios from "axios";

export default function useQuery(query, page) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [questions, setQuestions] = useState([])
    const [hasMore, setHasMore] = useState([])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: "GET",
            url: `http://localhost:8080/questions`,
            params: {
                search: query,
                page: page,
                size: 20,
                searchDescription: true
            },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(response => {
            setHasMore(response.data.length > 0)
            setQuestions(prevState => [...prevState, ...response.data])
            setLoading(false)
        })
            .catch(e => {
                if(axios.isCancel(e)) {
                    return;
                }
                setError(true)
            })
    }, [query, page])

    useEffect(() => {
        setQuestions([])
    }, [query])

    return {questions, hasMore, loading, error}
}
