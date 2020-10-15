import { useReducer, useEffect } from 'react'
import axios from 'axios'

//---------------ACTIONS---------------------//
const MAKE_REQUEST = 'make-request'
const GET_DATA = 'get-data'
const ERROR = 'error'
const UPDATE_HAS_NEXT_PAGE = 'update-has-next-page'
//------------------------------------------//

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json' : '/positions.json'


const reducer = (state, action) => {
    switch(action.type) {
        case MAKE_REQUEST:
            return { loading: true, jobs: []}
        case GET_DATA:
            return {...state, loading: false, jobs: action.payload.jobs}
        case ERROR:
            return {...state, loading: false, error: action.payload.error, jobs: []}
        case UPDATE_HAS_NEXT_PAGE:
            return {...state, hasNextPage: action.payload.hasNextPage}
        default:
            return state
    }
}

export default function useFetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true})

    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source()
        dispatch({ type: MAKE_REQUEST})
        axios.get(BASE_URL, {
            cancelToken: cancelToken1.token,
            params: { markdown: true, page, ...params}
        })
        .then(res => dispatch({ type: GET_DATA, payload: { jobs: res.data }}))
        .catch(e => {
            if(axios.isCancel(e)) return;
            dispatch({ type: ERROR, payload: { error: e }})
        })

        const cancelToken2 = axios.CancelToken.source()
        axios.get(BASE_URL, {
            cancelToken: cancelToken2.token,
            params: { markdown: true, page: page + 1, ...params}
        })
        .then(res => dispatch({ type: UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.length !== 0 }}))
        .catch(e => {
            if(axios.isCancel(e)) return;
            dispatch({ type: ERROR, payload: { error: e }})
        })

        return () => {
            cancelToken1.cancel()
            cancelToken2.cancel()
        }
    }, [params, page])

    return state
}